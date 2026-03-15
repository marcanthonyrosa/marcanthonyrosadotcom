import { NextResponse } from 'next/server'

export type LeaderboardEntry = {
  initials: string
  location: string
  score: number
  level: number
  ts: number
}

// In-memory fallback when KV is not configured (local dev)
const memStore: LeaderboardEntry[] = []
const MAX_STORED = 100

async function getKv() {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return null
  try {
    const { Redis } = await import('@upstash/redis')
    return new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  } catch {
    return null
  }
}

const KEY = 'marcman:scores'

export async function GET() {
  try {
    const kv = await getKv()
    if (!kv) {
      const top10 = [...memStore].sort((a, b) => b.score - a.score).slice(0, 10)
      return NextResponse.json(top10, { headers: { 'Cache-Control': 'no-store' } })
    }
    const members = (await kv.zrange(KEY, 0, 9, { rev: true })) as unknown[]
    console.log('[leaderboard GET] raw members:', JSON.stringify(members))
    const entries = members
      .map(m => {
        try {
          if (typeof m === 'string') return JSON.parse(m) as LeaderboardEntry
          if (typeof m === 'object' && m !== null) return m as LeaderboardEntry
          return null
        } catch { return null }
      })
      .filter(Boolean)
    const headers = { 'Cache-Control': 'no-store' }
    return NextResponse.json(entries, { headers })
  } catch (err) {
    console.error('[leaderboard GET]', err)
    return NextResponse.json([])
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { initials, location, score, level } = body

    if (!initials || typeof score !== 'number' || score < 0) {
      return NextResponse.json({ ok: false, error: 'Invalid data' }, { status: 400 })
    }

    const entry: LeaderboardEntry = {
      initials: String(initials).toUpperCase().replace(/[^A-Z]/g, '').slice(0, 3),
      location: String(location || 'Unknown').slice(0, 60),
      score,
      level: Number(level) || 1,
      ts: Date.now(),
    }

    const kv = await getKv()
    if (!kv) {
      memStore.push(entry)
      memStore.sort((a, b) => b.score - a.score)
      if (memStore.length > MAX_STORED) memStore.splice(MAX_STORED)
      return NextResponse.json({ ok: true })
    }

    const memberStr = JSON.stringify(entry)
    await kv.zadd(KEY, { score, member: memberStr })
    await kv.zremrangebyrank(KEY, 0, -(MAX_STORED + 1))
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[leaderboard POST]', err)
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    // Extract the real client IP from forwarded headers (Railway / proxies set these)
    const forwarded = req.headers.get('x-forwarded-for')
    const ip = forwarded ? forwarded.split(',')[0].trim() : req.headers.get('x-real-ip') ?? ''

    // For loopback (local dev), use ip-api.com which auto-detects the server's outbound IP
    const isLoopback = !ip || ip === '127.0.0.1' || ip === '::1'

    if (isLoopback) {
      const res = await fetch('http://ip-api.com/json/', { cache: 'no-store' })
      const data = await res.json()
      if (data.status !== 'success' || !data.city) return NextResponse.json({ location: 'Unknown' })
      const parts = [data.city, data.region, data.countryCode].filter(Boolean)
      return NextResponse.json({ location: parts.join(', ') })
    }

    const res = await fetch(`https://ipwho.is/${ip}`, { cache: 'no-store' })
    const data = await res.json()

    if (!data.success || !data.city) {
      return NextResponse.json({ location: 'Unknown' })
    }

    const parts = [data.city, data.region_code, data.country_code].filter(Boolean)
    return NextResponse.json({ location: parts.join(', ') })
  } catch {
    return NextResponse.json({ location: 'Unknown' })
  }
}

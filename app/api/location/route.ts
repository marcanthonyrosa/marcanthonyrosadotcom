import { NextRequest, NextResponse } from 'next/server'

/** Vercel RFC3986-encodes non-ASCII geo header values */
function decodeGeoHeader(value: string | null): string {
  if (!value) return ''
  try {
    return decodeURIComponent(value.replace(/\+/g, ' '))
  } catch {
    return value
  }
}

/** City, region, country — matches ipwho output shape; avoids external API when Vercel already resolved geo */
function locationFromVercelHeaders(req: NextRequest): string | null {
  const city = decodeGeoHeader(req.headers.get('x-vercel-ip-city'))
  const region = req.headers.get('x-vercel-ip-country-region') ?? ''
  const country = req.headers.get('x-vercel-ip-country') ?? ''
  const parts = [city, region, country].filter(Boolean)
  return parts.length ? parts.join(', ') : null
}

function firstForwardedIp(header: string | null): string {
  if (!header) return ''
  return header.split(',')[0]?.trim() ?? ''
}

export async function GET(req: NextRequest) {
  try {
    const fromVercel = locationFromVercelHeaders(req)
    if (fromVercel) {
      return NextResponse.json({ location: fromVercel })
    }

    // Prefer IPs Vercel preserves when x-forwarded-for is overwritten (e.g. proxy / mobile app edge)
    const ip =
      firstForwardedIp(req.headers.get('x-vercel-forwarded-for')) ||
      firstForwardedIp(req.headers.get('x-forwarded-for')) ||
      (req.headers.get('x-real-ip') ?? '').trim() ||
      (req.headers.get('cf-connecting-ip') ?? '').trim()

    const isLoopback = ip === '127.0.0.1' || ip === '::1'
    const isMissingClientIp = !ip

    // Local dev / explicit loopback: ip-api infers caller (dev machine) from server egress
    if (isLoopback || isMissingClientIp) {
      const res = await fetch('http://ip-api.com/json/', { cache: 'no-store' })
      const data = await res.json()
      if (data.status !== 'success' || !data.city) return NextResponse.json({ location: 'Unknown' })
      const parts = [data.city, data.region, data.countryCode].filter(Boolean)
      return NextResponse.json({ location: parts.join(', ') })
    }

    const res = await fetch(`https://ipwho.is/${encodeURIComponent(ip)}`, { cache: 'no-store' })
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

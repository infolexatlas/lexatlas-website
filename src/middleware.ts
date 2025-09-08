// middleware.ts
import { NextResponse, NextRequest } from 'next/server'

// Normalize /kits/* slugs only. Do NOT handle host redirects here; Vercel domain settings will.
function normalizeKitSlug(pathname: string) {
  const lowered = pathname
    .replace(/[\u2012\u2013\u2014\u2015]/g, '-') // unicode dashes → '-'
    .replace(/_/g, '-')
    .toLowerCase()

  // Collapse stray "6" between ISO3 codes only within /kits/* segment
  // Examples handled: /kits/fra-6can, /kits/fra6can, /kits/fra-6-can
  const fixed = lowered.replace(/(\/kits\/)([a-z]{3})-?6-?([a-z]{3})(?=\/|$)/, '$1$2-$3')

  return fixed
}

export function middleware(req: NextRequest) {
  const { pathname, search, hash } = req.nextUrl

  // Only canonicalize /kits/* routes
  if (pathname.startsWith('/kits/')) {
    const normalized = normalizeKitSlug(pathname)
    if (normalized !== pathname) {
      const url = req.nextUrl.clone()
      url.pathname = normalized
      url.search = search
      url.hash = hash
      return NextResponse.redirect(url, 308)
    }
  }

  return NextResponse.next()
}

// IMPORTANT: Exclude static assets and system routes so CSS/JS/images/fonts are never intercepted.
export const config = {
  matcher: [
    '/((?!_next/|images/|fonts/|favicon.ico|robots.txt|sitemap.xml|wp-sitemap.xml|api/).*)',
  ],
}

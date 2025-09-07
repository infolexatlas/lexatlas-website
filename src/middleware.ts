// middleware.ts
import { NextResponse, NextRequest } from 'next/server'

// Normalize /kits/* slugs only. Do NOT handle host redirects here; Vercel domain settings will.
function normalizeKitSlug(pathname: string) {
  const normalized = pathname
    .replace(/[\u2012\u2013\u2014\u2015]/g, '-') // unicode dashes → '-'
    .replace(/_/g, '-')
    .toLowerCase()
  return normalized
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

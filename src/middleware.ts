import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Redirect old single-country routes to the pair selector
  // /kits/marriage-kit/[country] -> /kits/marriage-kit
  if (pathname.match(/^\/kits\/marriage-kit\/[A-Z]{2}$/)) {
    return NextResponse.redirect(new URL('/kits/marriage-kit', request.url))
  }

  // Redirect old single-country routes with lowercase to the pair selector
  // /kits/marriage-kit/[country] -> /kits/marriage-kit
  if (pathname.match(/^\/kits\/marriage-kit\/[a-z]{2}$/)) {
    return NextResponse.redirect(new URL('/kits/marriage-kit', request.url))
  }

  // Handle case-insensitive pair redirects (e.g., US-FR -> FR-US)
  const pairMatch = pathname.match(/^\/kits\/marriage-kit\/([A-Z]{2})-([A-Z]{2})$/)
  if (pairMatch) {
    const [, country1, country2] = pairMatch
    if (country1 > country2) {
      // Redirect to alphabetical order
      const canonicalPair = `${country2}-${country1}`
      return NextResponse.redirect(new URL(`/kits/marriage-kit/${canonicalPair}`, request.url))
    }
  }

  // Handle lowercase pair redirects to uppercase
  const lowercasePairMatch = pathname.match(/^\/kits\/marriage-kit\/([a-z]{2})-([a-z]{2})$/)
  if (lowercasePairMatch) {
    const [, country1, country2] = lowercasePairMatch
    const upperCountry1 = country1.toUpperCase()
    const upperCountry2 = country2.toUpperCase()
    
    // Ensure alphabetical order
    const [first, second] = [upperCountry1, upperCountry2].sort()
    const canonicalPair = `${first}-${second}`
    
    return NextResponse.redirect(new URL(`/kits/marriage-kit/${canonicalPair}`, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/kits/marriage-kit/:path*',
  ],
}

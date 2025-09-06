import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Skip middleware in development to avoid accidental slow paths
  if (process.env.NODE_ENV === 'development') {
    return NextResponse.next();
  }
  
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

  const res = NextResponse.next()
  
  // Add CSP reporting in development
  if (process.env.NODE_ENV !== 'production') {
    const csp = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' blob: data:",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob:",
      "connect-src 'self' https://plausible.io https://*.plausible.io https://*.stripe.com ws:",
      "font-src 'self' data:",
      "frame-src 'self' https://*.stripe.com",
      "worker-src 'self' blob:"
    ].join('; ');

    res.headers.set('Content-Security-Policy-Report-Only', `${csp}; report-to=csp-endpoint`);
    res.headers.set('Report-To', JSON.stringify({
      group: 'csp-endpoint',
      max_age: 10886400,
      endpoints: [{ url: '/api/csp-report' }]
    }));
  }

  return res
}

export const config = {
  matcher: ['/((?!_next|api/healthz|__ping|favicon|manifest|logo|og|public).*)'],
}

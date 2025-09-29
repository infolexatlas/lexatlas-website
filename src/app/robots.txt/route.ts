import { NextResponse } from 'next/server'

export async function GET() {
  const robotsTxt = `User-agent: *
Allow: /

# Disallow internal API and preview routes
Disallow: /api/
Disallow: /preview/

# Disallow admin and API routes
Disallow: /admin/
Disallow: /_next/
Disallow: /checkout
Disallow: /kits/*/success
Disallow: /kits/*/cancel

# Allow all kit pages
Allow: /kits/

# Crawl delay
Crawl-delay: 1

# Sitemap
Sitemap: https://lex-atlas.com/sitemap.xml
`

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}
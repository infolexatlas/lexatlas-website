import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
  
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

# Allow marriage kit pages
Allow: /kits/marriage-kit/

# Crawl delay
Crawl-delay: 1

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml`

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}

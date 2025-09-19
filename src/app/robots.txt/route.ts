import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const baseUrl = 'https://lex-atlas.com'
  
  const robotsTxt = `User-agent: *
Allow: /

# Allow favicons and logos for better search visibility
Allow: /favicon.ico
Allow: /favicon-*.png
Allow: /apple-touch-icon.png
Allow: /logo-*.png
Allow: /manifest.webmanifest

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
Allow: /kits/

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

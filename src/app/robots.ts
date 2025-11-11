import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/', '/kits/', '/preview/'],
        disallow: [
          '/api/',
          '/admin/',
          '/_next/',
          '/checkout',
          '/kits/*/success',
          '/kits/*/cancel',
        ],
        crawlDelay: 1,
      },
    ],
    sitemap: 'https://lex-atlas.com/sitemap.xml',
  }
}


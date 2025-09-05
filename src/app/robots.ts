import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/checkout'] }],
    sitemap: 'https://lexatlas.com/sitemap.xml',
  };
}



import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: '*', allow: '/', disallow: ['/checkout'] }],
    sitemap: `${process.env.NEXT_PUBLIC_BASE_URL || 'https://lexatlas.com'}/sitemap.xml`,
  };
}



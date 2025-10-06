// src/app/sitemap.ts
import { MetadataRoute } from 'next'
import { KIT_SLUGS } from '@/lib/kits.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://lex-atlas.com'
  const now = new Date()

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${base}/kits`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/pricing`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/cookie-policy`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const kitRoutes: MetadataRoute.Sitemap = KIT_SLUGS.map(slug => ({
    url: `${base}/kits/${slug}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.9,
  }))

  const previewRoutes: MetadataRoute.Sitemap = KIT_SLUGS.map(slug => ({
    url: `${base}/preview/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticRoutes, ...kitRoutes, ...previewRoutes]
}

import { MetadataRoute } from 'next'
import { PRIORITY_SLUGS } from '@/lib/kits.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://lexatlas.com'
  
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/kits`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/legal/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/legal/cookies`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.3,
    },
  ]

  // Add OpenGraph images
  const ogImages = [
    {
      url: `${baseUrl}/og/home.svg`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/og/home.png`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/og/about.svg`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/og/about.png`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/og/kits.svg`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/og/kits.png`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/og/marriage/default.svg`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
    {
      url: `${baseUrl}/og/marriage/default.png`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.1,
    },
  ]

  // Add priority kit pages
  const kitPages = PRIORITY_SLUGS.map(slug => ({
    url: `${baseUrl}/kits/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Add preview pages
  const previewPages = PRIORITY_SLUGS.map(slug => ({
    url: `${baseUrl}/preview/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...ogImages, ...kitPages, ...previewPages]
}

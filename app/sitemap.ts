import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo.config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.site.url

  // Main routes
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ]

  return routes
}

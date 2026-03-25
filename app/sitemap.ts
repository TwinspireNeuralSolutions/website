import { MetadataRoute } from 'next'
import { seoConfig } from '@/lib/seo.config'
import { i18n } from '@/i18n/config'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = seoConfig.site.url

  const localeEntries = i18n.locales.flatMap((locale) => [
    {
      url: `${baseUrl}/${locale}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/${locale}/component-library`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ])

  return localeEntries
}

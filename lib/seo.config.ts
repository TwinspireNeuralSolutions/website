/**
 * SEO configuration for the Twinspire website.
 * Used by sitemap.ts and metadata generation.
 */
export const seoConfig = {
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://twinspire.io',
    name: 'Twinspire',
    description: 'Twinspire — performance analytics for elite sports teams.',
  },
  defaultLocale: 'en',
} as const

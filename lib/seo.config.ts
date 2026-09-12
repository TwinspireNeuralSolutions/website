/**
 * SEO configuration for the Twinspire website.
 * Used by sitemap.ts and metadata generation.
 */
export const seoConfig = {
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.twinspire.ai',
    name: 'Twinspire',
    description:
      "Twinspire integrates club and athlete data into an individual physiological model that learns each athlete's baseline and surfaces meaningful deviations for professional interpretation.",
  },
  defaultLocale: 'en',
} as const

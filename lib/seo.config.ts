/**
 * SEO configuration for the Twinspire website.
 * Used by sitemap.ts and metadata generation.
 */
export const seoConfig = {
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://twinspire.ai',
    name: 'Twinspire',
    description:
      'Twinspire builds a personalised neuromuscular model for every footballer — unifying fragmented club and athlete data to help physios reduce days lost, lower reinjury rates, and make confident return-to-play decisions.',
  },
  defaultLocale: 'en',
} as const

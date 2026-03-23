export const seoConfig = {
  site: {
    name: 'Twinspire',
    description: 'Authentication and team management platform',
    url: 'https://twinspire.com',
    ogImage: 'https://twinspire.com/og-image.jpg',
    twitterHandle: '@twinspire',
    keywords: ['authentication', 'team management', 'secure platform'],
  },
  pages: {
    home: {
      title: 'Twinspire | Secure Platform',
      description: 'Secure authentication and team management platform',
      keywords: ['authentication', 'secure login', 'team management'],
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Twinspire',
  },
  structuredData: {
    organization: {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Twinspire',
      description: 'Secure platform for team management',
      url: 'https://twinspire.com',
      foundingDate: '2024',
      sameAs: [],
      contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Service',
        availableLanguage: ['English'],
      },
    },
    softwareApplication: {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'Twinspire Platform',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        ratingCount: '1',
      },
      description: 'Secure platform for authentication and team management',
    },
  },
}

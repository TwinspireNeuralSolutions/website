export const seoConfig = {
  site: {
    name: 'Twinspire',
    description:
      'AI-powered digital twins for injury prevention, rehabilitation tracking, and performance optimization. Revolutionizing recovery for sport teams and physiotherapy with real-time data insights.',
    url: 'https://twinspire.com', // Update with your actual domain
    ogImage: 'https://twinspire.com/og-image.jpg', // Update with your OG image path
    twitterHandle: '@twinspire', // Update with your Twitter handle
    keywords: [
      'AI rehabilitation',
      'digital twins',
      'injury prevention',
      'sports recovery',
      'physiotherapy technology',
      'athlete performance tracking',
      'EMG sensors',
      'wearable integration',
      'predictive injury prevention',
      'rehabilitation tracking',
      'biomechanical analysis',
      'sports medicine technology',
      'AI-driven recovery',
      'performance optimization',
      'rehab monitoring',
      'athlete health',
      'movement analysis',
      'recovery platform',
      'sports physiotherapy',
      'injury prediction AI',
    ],
  },
  pages: {
    home: {
      title:
        'Twinspire | AI-Powered Rehabilitation & Injury Prevention Platform',
      description:
        "Transform rehabilitation and prevent injuries with Twinspire's AI-driven digital twins. Real-time insights for sport teams and physiotherapists. Predict injuries, track recovery, optimize performance.",
      keywords: [
        'AI rehabilitation platform',
        'injury prevention software',
        'digital twin technology',
        'sports team recovery',
        'physiotherapy AI',
      ],
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
      '@type': 'MedicalBusiness',
      name: 'Twinspire',
      description:
        'AI-powered digital twins for injury prevention, rehabilitation tracking, and performance optimization for sport teams and physiotherapy.',
      url: 'https://twinspire.com',
      logo: 'https://twinspire.com/tns-logo-black.png',
      foundingDate: '2024',
      sameAs: [
        // Add your social media links here
        // 'https://www.linkedin.com/company/twinspire',
        // 'https://twitter.com/twinspire',
      ],
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
      applicationCategory: 'HealthApplication',
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
      description:
        'AI-driven platform for injury prevention, rehabilitation tracking, and performance optimization using digital twin technology.',
    },
  },
}

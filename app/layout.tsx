import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.twinspire.ai'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Twinspire | Individual Athlete Intelligence & Physiological Digital Twin',
    template: '%s | Twinspire',
  },
  description:
    "Twinspire integrates club and athlete data into a continuously evolving physiological digital twin that learns each athlete's individual baseline and surfaces meaningful deviations for performance and medical staff.",
  keywords: [
    'physiological digital twin',
    'individual athlete model',
    'athlete data integration',
    'performance decision support',
    'longitudinal athlete intelligence',
    'athletic passport',
    'individual physiological response profile',
    'DTU sports technology',
    'EU sports AI',
    'personalised athlete model',
    'club athlete data integration',
    'athlete monitoring platform',
    'sports performance data',
    'return to play decision support',
    'football performance technology',
  ],
  authors: [{ name: 'Twinspire Neural Solutions', url: SITE_URL }],
  creator: 'Twinspire Neural Solutions',
  publisher: 'Twinspire Neural Solutions',
  category: 'Sports Technology',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      en: `${SITE_URL}/en`,
      da: `${SITE_URL}/da`,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    alternateLocale: 'da_DK',
    url: SITE_URL,
    siteName: 'Twinspire',
    title: 'Twinspire | Individual Athlete Intelligence',
    description:
      "A continuously evolving physiological digital twin that learns what is normal for each athlete and surfaces meaningful deviations with the signals driving them.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Twinspire individual athlete intelligence platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twinspire | Individual Athlete Intelligence',
    description:
      "A continuously evolving physiological digital twin that learns what is normal for each athlete and surfaces meaningful deviations with the signals driving them.",
    images: [`${SITE_URL}/og-image.png`],
    creator: '@twinspireai',
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  verification: {},
}

/**
 * Root Layout — minimal shell.
 * Providers (Theme, I18n, Auth) live in app/[locale]/layout.tsx
 * so they have access to the locale URL segment.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Satoshi font — FontShare CDN */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=satoshi@300,400,500,700,900&display=swap"
        />
        {/* Inline script: prevents flash of wrong theme before hydration */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const t = localStorage.getItem('tns-theme');
                const r = t === 'dark' ? 'dark' : t === 'light' ? 'light' : (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
                document.documentElement.classList.add(r);
              } catch(e) {}
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  )
}

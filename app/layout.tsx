import type { Metadata } from 'next'
import './globals.css'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://twinspire.ai'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      'Twinspire AI Decision Support for Football Rehab & Return to Play | DTU Research | Europe',
    template: '%s | Twinspire',
  },
  description:
    'Twinspire builds a personalised neuromuscular model for every footballer — unifying fragmented club and athlete data to help physios reduce days lost, lower reinjury rates, and make confident return-to-play decisions.',
  keywords: [
    'football injury prevention',
    'return to play AI',
    'sports rehabilitation software',
    'neuromuscular model football',
    'hamstring reinjury prevention',
    'physio decision support tool',
    'athlete injury data platform',
    'football rehab technology',
    'DTU health tech',
    'GDPR compliant sports analytics',
    'EU sports AI',
    'personalised athlete model',
    'injury risk monitoring football',
    'club athlete data integration',
    'return to play decision support',
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
    title:
      'Twinspire AI Decision Support for Football Rehab & Return to Play',
    description:
      'One in five footballers tears the same muscle twice. Twinspire builds a personalised neuromuscular model for every footballer so physios can see the earliest signals of overload before they become reinjuries.',
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Twinspire AI Return-to-Play Platform for Football',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'Twinspire AI Decision Support for Football Rehab & Return to Play',
    description:
      'One in five footballers tears the same muscle twice. Twinspire connects the full picture and explains what is changing — before it becomes a setback.',
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

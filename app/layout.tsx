import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { seoConfig } from '@/lib/seo.config'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(seoConfig.site.url),
  title: {
    default: seoConfig.pages.home.title,
    template: `%s | ${seoConfig.site.name}`,
  },
  description: seoConfig.pages.home.description,
  keywords: seoConfig.site.keywords,
  authors: [{ name: seoConfig.site.name }],
  creator: seoConfig.site.name,
  publisher: seoConfig.site.name,
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
  openGraph: {
    type: 'website',
    locale: seoConfig.openGraph.locale,
    url: seoConfig.site.url,
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    siteName: seoConfig.openGraph.siteName,
    images: [
      {
        url: seoConfig.site.ogImage,
        width: 1200,
        height: 630,
        alt: `${seoConfig.site.name} - AI-Powered Rehabilitation Platform`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoConfig.pages.home.title,
    description: seoConfig.pages.home.description,
    creator: seoConfig.site.twitterHandle,
    images: [seoConfig.site.ogImage],
  },
  verification: {
    // google: 'your-google-verification-code', // Add when you have it
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
  alternates: {
    canonical: seoConfig.site.url,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(seoConfig.structuredData.organization),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              seoConfig.structuredData.softwareApplication
            ),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  )
}

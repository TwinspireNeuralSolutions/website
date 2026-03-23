import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: {
    default: 'Twinspire | AI-Powered Rehabilitation & Injury Prevention',
    template: '%s | Twinspire',
  },
  description:
    'AI-powered digital twins for injury prevention, rehabilitation tracking, and performance optimization.',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}

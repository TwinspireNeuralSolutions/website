import { type Locale, i18n } from '@/i18n/config'
import { I18nProvider } from '@/i18n'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { SectionDotNav } from '@/components/ui/section-dot-nav'
import { Analytics } from '@vercel/analytics/next'
import { notFound } from 'next/navigation'

interface LocaleLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}

/**
 * Locale Layout
 * Wraps every page with ThemeProvider, I18nProvider (locale from URL),
 * and AuthProvider. Analytics only rendered at this level.
 */
export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params

  if (!i18n.locales.includes(locale as Locale)) {
    notFound()
  }

  return (
    <ThemeProvider>
      <I18nProvider initialLocale={locale as Locale}>
        <AuthProvider>
          {children}
          <SectionDotNav />
        </AuthProvider>
      </I18nProvider>
      <Analytics />
    </ThemeProvider>
  )
}

'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { LanguageSelector } from '@/components/ui/language-selector'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { useTranslation } from '@/i18n'

/**
 * Home Page
 * Entry point for the Twinspire platform.
 * Links are locale-aware using the [locale] URL segment.
 */
export default function Home() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center gap-6 p-8">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <LanguageSelector />
        <ThemeToggle />
      </div>

      <Typography variant="title" className="text-center">
        Twinspire
      </Typography>
      <Typography variant="subtitle" textColor="muted" className="text-center">
        AI-Powered Rehabilitation &amp; Injury Prevention
      </Typography>
      <div className="flex items-center gap-4">
        <Link href={`/${locale}/admin`}>
          <Button variant="primary" showIcon>
            {t('common.login')}
          </Button>
        </Link>
        <Link href={`/${locale}/component-library`}>
          <Button variant="outline">{t('componentLibrary.title')}</Button>
        </Link>
      </div>
    </main>
  )
}

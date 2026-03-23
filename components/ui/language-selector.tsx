'use client'

import { useTranslation } from '@/i18n'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

/**
 * Language Selector — Toggle between English and Danish.
 *
 * Displays a compact toggle that switches the app locale.
 * Persists selection to localStorage.
 */
export function LanguageSelector({ className }: { className?: string }) {
  const { locale, setLocale } = useTranslation()

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <Button
        variant={locale === 'en' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('en')}
        className="h-7 w-9 px-0 text-xs"
        aria-label="Switch to English"
      >
        EN
      </Button>
      <Button
        variant={locale === 'da' ? 'primary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('da')}
        className="h-7 w-9 px-0 text-xs"
        aria-label="Skift til dansk"
      >
        DA
      </Button>
    </div>
  )
}

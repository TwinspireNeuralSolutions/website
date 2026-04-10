'use client'

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Globe } from 'lucide-react'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'

const LANGUAGES = [
  { code: 'en' as const, label: 'English' },
  { code: 'da' as const, label: 'Dansk' },
]

export interface LanguageSelectorProps {
  className?: string
  /** 'transparent' = white text on hero, 'glass' = black text on frosted bar. */
  variant?: 'transparent' | 'glass'
}

/**
 * LanguageSelector — Globe + label + chevron trigger with a plain white dropdown.
 * Closes on outside click and Escape.
 */
export function LanguageSelector({
  className,
  variant = 'transparent',
}: LanguageSelectorProps) {
  const { locale, setLocale } = useTranslation()
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const current = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0]

  useEffect(() => {
    if (!open) return
    const onPointerDown = (e: PointerEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('pointerdown', onPointerDown)
    return () => document.removeEventListener('pointerdown', onPointerDown)
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open])

  // Trigger appearance: black on glass bar, white on transparent hero
  const triggerCls =
    variant === 'glass'
      ? 'text-foreground hover:bg-foreground/[0.06]'
      : 'text-white hover:bg-white/[0.12]'

  const openBg =
    variant === 'glass' ? 'bg-foreground/[0.06]' : 'bg-white/[0.12]'

  return (
    <div ref={containerRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label="Select language"
        className={cn(
          'flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium tracking-wide',
          'transition-colors duration-200 select-none focus-visible:outline-none',
          triggerCls,
          open && openBg
        )}
      >
        <Globe className="h-4 w-4 shrink-0" aria-hidden="true" />
        <span>{current.label}</span>
        <ChevronDown
          aria-hidden="true"
          className={cn(
            'h-3 w-3 shrink-0 transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </button>

      {/* Dropdown — solid white bg, plain black text, crisp and readable */}
      {open && (
        <div
          role="listbox"
          aria-label="Languages"
          className="absolute top-full right-0 z-50 mt-2 min-w-[148px] overflow-hidden rounded-2xl border border-black/[0.08] bg-white shadow-[0_4px_16px_rgba(0,0,0,0.12)]"
          style={{
            animation: 'dropdown-in 0.15s cubic-bezier(0.16, 1, 0.3, 1) both',
          }}
        >
          {LANGUAGES.map(({ code, label }) => (
            <button
              key={code}
              type="button"
              role="option"
              aria-selected={locale === code}
              onClick={() => {
                setLocale(code)
                setOpen(false)
              }}
              className={cn(
                'flex w-full items-center px-4 py-3 text-sm transition-colors duration-150 focus-visible:outline-none',
                locale === code
                  ? 'bg-foreground/[0.04] text-foreground font-semibold'
                  : 'text-foreground/50 hover:bg-foreground/[0.04] hover:text-foreground'
              )}
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

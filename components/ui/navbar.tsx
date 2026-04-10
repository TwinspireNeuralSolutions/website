'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { useParams } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useScrolled } from '@/hooks/useScrolled'
import { Button } from '@/components/ui/button'
import { LanguageSelector } from '@/components/ui/language-selector'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'

const NAV_LINKS = [
  { key: 'nav.problem' as const, id: 'problem' },
  { key: 'nav.product' as const, id: 'product' },
  { key: 'nav.builtFor' as const, id: 'built-for' },
  { key: 'nav.science' as const, id: 'science' },
  { key: 'nav.team' as const, id: 'team' },
]

/** Glass blur applied to both the scrolled bar and the mobile dropdown. */
const GLASS_STYLE: React.CSSProperties = {
  background: 'var(--navbar-glass-bg)',
  backdropFilter: 'blur(24px) saturate(200%)',
  WebkitBackdropFilter: 'blur(24px) saturate(200%)',
}

export function Navbar() {
  const { t } = useTranslation()
  const { locale } = useParams<{ locale: string }>()
  const scrolled = useScrolled(20)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close mobile menu when user starts scrolling
  useEffect(() => {
    if (scrolled) setMobileOpen(false)
  }, [scrolled])

  // Close mobile menu when clicking outside the navbar
  useEffect(() => {
    if (!mobileOpen) return
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [mobileOpen])

  // Lock body scroll while mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  // Glass state: active when scrolled OR when mobile menu is open on the hero
  const glass = scrolled || mobileOpen

  return (
    <header
      ref={navRef}
      className="pointer-events-none fixed inset-x-0 top-0 z-50"
    >
      {/* Bar — glass only when scrolled */}
      <div
        className={cn(
          'pointer-events-auto w-full transition-[background,border-color,box-shadow] duration-300 ease-out',
          glass &&
            'border-b border-[var(--navbar-glass-border)] shadow-[var(--navbar-glass-shadow)]'
        )}
        style={glass ? GLASS_STYLE : undefined}
      >
        <nav
          aria-label="Main navigation"
          className="px-5 py-4 sm:px-10 sm:py-5 md:px-14 lg:px-20"
        >
          <div className="section-inner mx-auto flex items-center gap-2">
            {/* Logo — single dark asset, CSS filter inverts to white on the hero */}
            <Link
              href={`/${locale}`}
              aria-label="Twinspire — go to home"
              className="relative mr-4 h-8 w-[130px] shrink-0 sm:h-9 sm:w-[144px]"
            >
              <Image
                src="/logo-text/logo-black.png"
                alt="Twinspire"
                fill
                priority
                className="object-contain object-left transition-[filter] duration-300"
                style={{
                  filter: glass
                    ? 'brightness(1) invert(0)'
                    : 'brightness(0) invert(1)',
                }}
              />
            </Link>

            {/* Desktop links */}
            <ul className="hidden items-center gap-1 lg:flex">
              {NAV_LINKS.map(({ key, id }) => (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() =>
                      document
                        .getElementById(id)
                        ?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className={cn(
                      'rounded-full px-5 py-2.5 text-sm font-medium tracking-wide uppercase transition-colors duration-200',
                      glass
                        ? 'text-foreground hover:bg-foreground/[0.06]'
                        : 'text-white hover:bg-white/[0.12]'
                    )}
                  >
                    {t(key)}
                  </button>
                </li>
              ))}
            </ul>

            <div className="flex-1" />

            {/* Desktop: lang selector + CTA */}
            <div className="hidden items-center gap-2 lg:flex">
              <LanguageSelector variant={glass ? 'glass' : 'transparent'} />
              <Link href={`/${locale}/admin`}>
                <Button
                  variant="primary"
                  size="sm"
                  showIcon
                  className="bg-[#0ea5e9] text-sm font-medium tracking-wide hover:bg-[#0b8ecf] active:bg-[#0879b3]"
                >
                  {t('nav.teamLogin')}
                </Button>
              </Link>
            </div>

            {/* Mobile: lang selector + burger */}
            <div className="flex items-center gap-1 lg:hidden">
              <LanguageSelector variant={glass ? 'glass' : 'transparent'} />
              <button
                type="button"
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className={cn(
                  'relative flex h-9 w-9 items-center justify-center rounded-full transition-colors duration-200',
                  glass
                    ? 'text-foreground hover:bg-foreground/[0.06]'
                    : 'text-white hover:bg-white/[0.12]'
                )}
              >
                <Menu
                  className={cn(
                    'absolute h-5 w-5 transition-all duration-200',
                    mobileOpen ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
                  )}
                  aria-hidden
                />
                <X
                  className={cn(
                    'absolute h-5 w-5 transition-all duration-200',
                    mobileOpen ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
                  )}
                  aria-hidden
                />
              </button>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile dropdown — always glass, animates height via grid-rows */}
      <div
        id="mobile-nav"
        aria-label="Mobile navigation"
        className={cn(
          'pointer-events-auto grid w-full transition-[grid-template-rows] duration-300 ease-in-out lg:hidden',
          mobileOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        )}
        style={GLASS_STYLE}
      >
        <div className="overflow-hidden">
          <div className="border-t border-[var(--navbar-glass-border)] px-5 sm:px-10">
            <div className="section-inner mx-auto pt-2 pb-6">
              <ul className="mb-4 flex flex-col">
                {NAV_LINKS.map(({ key, id }) => (
                  <li key={key}>
                    <button
                      type="button"
                      onClick={() => {
                        setMobileOpen(false)
                        document
                          .getElementById(id)
                          ?.scrollIntoView({ behavior: 'smooth' })
                      }}
                      className="text-foreground hover:bg-foreground/[0.06] block w-full rounded-full px-4 py-3 text-left text-base font-medium transition-colors duration-150"
                    >
                      {t(key)}
                    </button>
                  </li>
                ))}
              </ul>
              <Link
                href={`/${locale}/admin`}
                onClick={() => setMobileOpen(false)}
                className="block"
              >
                <Button
                  variant="primary"
                  size="default"
                  showIcon
                  className="w-full justify-between"
                >
                  {t('nav.teamLogin')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

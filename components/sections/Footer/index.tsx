'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslation } from '@/i18n'
import { AnimateIn } from '@/components/ui/animate-in'

const NAV_LINKS = [
  { key: 'footer.navProblem' as const, href: '#problem' },
  { key: 'footer.navSolution' as const, href: '#solution' },
  { key: 'footer.navScience' as const, href: '#science' },
  { key: 'footer.navForWhom' as const, href: '#who-for' },
  { key: 'footer.navTeam' as const, href: '#team' },
  { key: 'footer.navJoin' as const, href: '#contact' },
  { key: 'footer.navData' as const, href: '#gdpr' },
] as const

/**
 * FooterSection — Site footer with nav links, full-width TWINSPIRE watermark,
 * tagline, copyright, legal links, and medical disclaimer.
 */
export function FooterSection() {
  const { t, locale } = useTranslation()

  return (
    <footer className="bg-footer-bg relative z-10 w-full overflow-hidden">
      {/* Nav links — single inline row with dot separators */}
      <div className="section-x section-inner mx-auto pt-10 sm:pt-12 md:pt-14">
        <AnimateIn variant="fadeIn">
          <nav className="mb-2 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:mb-12 sm:gap-x-5 md:mb-14">
            {NAV_LINKS.map((link, i) => (
              <React.Fragment key={link.key}>
                <a
                  href={link.href}
                  className="hover:text-primary text-xs font-medium text-black/50 transition-colors"
                >
                  {t(link.key)}
                </a>
                {i < NAV_LINKS.length - 1 && (
                  <span className="text-xs text-black/20 select-none">·</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        </AnimateIn>
      </div>

      {/* TWINSPIRE — full viewport width, black at 10% */}
      <AnimateIn variant="fadeIn" delay={0.1}>
        <div className="mb-1 overflow-hidden text-center select-none">
          <h2
            className="w-full leading-none font-black tracking-tight text-black/10"
            style={{ fontSize: 'clamp(48px, 13vw, 220px)' }}
          >
            TWINSPIRE
          </h2>
        </div>
      </AnimateIn>

      {/* Tagline + bottom bar */}
      <div className="section-x section-inner mx-auto pb-6 sm:pb-8 md:pb-10">
        <div className="mb-8 text-center select-none sm:mb-10">
          <p className="text-[8px] font-bold tracking-[0.6em] text-black/70 sm:text-[10px] sm:tracking-[0.8em] md:text-xs md:tracking-[1em]">
            {t('footer.tagline')}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="border-border border-t pt-4">
          {/* Copyright + legal links row */}
          <div className="flex flex-col items-center justify-between gap-3 sm:flex-row sm:gap-2">
            <p className="text-footer-muted text-xs sm:text-sm">
              {t('footer.copyright')}
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
              <Link
                href={`/${locale}/privacy`}
                className="text-footer-muted hover:text-primary text-xs transition-colors"
              >
                {t('footer.privacyPolicy')}
              </Link>
            </div>
          </div>

          {/* Medical disclaimer */}
          <p className="text-footer-muted mt-4 text-center text-[10px] leading-relaxed opacity-60 sm:text-xs">
            {t('footer.disclaimer')}
          </p>
        </div>
      </div>
    </footer>
  )
}

'use client'

import { useTranslation } from '@/i18n'
import { AnimateIn } from '@/components/ui/animate-in'

const navLinks = [
  { key: 'nav.problem', href: '#problem' },
  { key: 'nav.product', href: '#solution' },
  { key: 'nav.forTeam', href: '#who-for' },
  { key: 'nav.gdpr', href: '#gdpr' },
] as const

/**
 * FooterSection — Site footer with nav links, full-width TWINSPIRE watermark,
 * tagline, copyright, and LinkedIn link.
 */
export function FooterSection() {
  const { t } = useTranslation()

  return (
    <footer className="bg-footer-bg w-full overflow-hidden">
      {/* Nav links */}
      <div className="section-x section-inner mx-auto pt-10 sm:pt-12 md:pt-14">
        <AnimateIn variant="fadeIn">
          <nav className="mb-10 flex flex-wrap items-center justify-center gap-6 sm:mb-12 sm:gap-8 md:mb-14 md:gap-10">
            {navLinks.map((link, i) => (
              <div
                key={link.key}
                className="flex items-center gap-6 sm:gap-8 md:gap-10"
              >
                <a
                  href={link.href}
                  className="hover:text-primary text-sm font-semibold text-black/70 transition-colors sm:text-base"
                >
                  {t(link.key)}
                </a>
                {i < navLinks.length - 1 && (
                  <span className="text-black/70 select-none">•</span>
                )}
              </div>
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
        <div className="border-border flex items-center justify-between border-t pt-4">
          <p className="text-footer-muted text-xs sm:text-sm">
            {t('footer.copyright')}
          </p>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/107427569"
            target="_blank"
            rel="noopener noreferrer"
            className="text-footer-muted hover:text-foreground flex h-7 w-7 items-center justify-center rounded transition-colors"
            aria-label={t('footer.linkedinLabel')}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  )
}

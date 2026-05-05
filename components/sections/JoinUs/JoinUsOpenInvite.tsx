'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { Button } from '@/components/ui/button'
import { useTranslation } from '@/i18n'

/**
 * JoinUsOpenInvite — Centred CTA box inviting anyone interested to get in touch.
 */
export function JoinUsOpenInvite() {
  const { t } = useTranslation()

  return (
    <section className="bg-background border-border relative z-10 w-full border-b">
      <div className="section-x section-inner mx-auto py-16 md:py-24">
        <AnimateIn variant="scaleUp">
          <div className="border-primary/15 bg-primary/[0.04] mx-auto max-w-2xl rounded-3xl border px-8 py-12 text-center sm:px-12">
            <div className="bg-primary/10 mx-auto mb-5 inline-flex h-12 w-12 items-center justify-center rounded-2xl">
              <svg
                viewBox="0 0 24 24"
                className="text-primary h-6 w-6"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                aria-hidden
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
            </div>
            <h2 className="text-foreground mb-4 text-[22px] font-bold sm:text-[26px]">
              {t('joinUsPage.openInviteTitle')}
            </h2>
            <p className="text-foreground/65 mx-auto mb-8 max-w-lg text-[14px] leading-[1.9] sm:text-[15px]">
              {t('joinUsPage.intro.p6')}
            </p>
            <a href={`mailto:${t('joinUsPage.contactEmail')}`}>
              <Button variant="primary" size="lg" showIcon>
                {t('joinUsPage.openInviteButton')}
              </Button>
            </a>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

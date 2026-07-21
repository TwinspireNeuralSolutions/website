'use client'

import { Button } from '@/components/ui/button'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * CTASection — "Ready to See What Your Squad's Data Is Actually Telling You?"
 *
 * Full-width lavender (`footer-bg`) banner with a centred headline,
 * a short supporting paragraph, and a primary CTA button
 * that anchors to the #contact form below.
 */
export function CTASection() {
  const { t } = useTranslation()

  return (
    <section
      id="cta"
      aria-labelledby="cta-heading"
      className="bg-footer-bg relative z-10 w-full"
    >
      <div className="section-x section-y section-inner mx-auto text-center">
        {/* Headline */}
        <AnimateIn variant="headingReveal">
          <h2
            id="cta-heading"
            className="text-foreground mx-auto max-w-[820px] text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]"
          >
            <span className="text-foreground font-bold">{t('cta.title')}</span>{' '}
            <span className="text-primary font-bold">
              {t('cta.titleAccent')}
            </span>{' '}
            {t('cta.titleEnd')}
          </h2>
        </AnimateIn>

        {/* Supporting paragraph */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <p className="text-foreground/70 mx-auto mt-6 max-w-[720px] text-center text-[14px] leading-[1.8] sm:text-[15px] md:mt-8">
            {t('cta.subtitle')}
          </p>
        </AnimateIn>

        {/* CTA button */}
        <AnimateIn variant="fadeUp" delay={0.28}>
          <div className="mt-10 md:mt-12">
            <Button
              variant="primary"
              size="lg"
              showIcon
              onClick={() =>
                document
                  .getElementById('contact')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              {t('cta.button')}
            </Button>
          </div>
        </AnimateIn>

        {/* Note */}
        <AnimateIn variant="fadeUp" delay={0.36}>
          <p className="text-foreground/50 mx-auto mt-4 text-[14px] sm:text-[15px]">
            {t('cta.note')}
          </p>
        </AnimateIn>
      </div>
    </section>
  )
}

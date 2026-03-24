'use client'

import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * CTASection — "Ready to See What Your Squad's Data Is Actually Telling You?"
 *
 * Full-width lavender (`footer-bg`) banner with a centred headline,
 * a short supporting paragraph, a stats line, and a primary CTA button
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
        <AnimateIn variant="fadeUp">
          <Typography
            id="cta-heading"
            variant="title"
            as="h2"
            className="mx-auto max-w-[820px] text-[28px] leading-[1.1] sm:text-[36px] md:text-[44px] lg:text-[52px]"
          >
            {t('cta.title')}
          </Typography>
        </AnimateIn>

        {/* Supporting paragraph */}
        <AnimateIn variant="fadeUp" delay={0.1}>
          <p className="text-foreground/60 mx-auto mt-6 max-w-[580px] text-sm leading-relaxed sm:text-base md:mt-8">
            {t('cta.subtitle')}
          </p>
        </AnimateIn>

        {/* Stats line */}
        <AnimateIn variant="fadeUp" delay={0.18}>
          <p className="text-foreground/50 mx-auto mt-3 max-w-[580px] text-sm sm:text-base">
            {t('cta.stats')}
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
      </div>
    </section>
  )
}

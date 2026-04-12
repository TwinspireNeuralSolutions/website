'use client'

import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * ProblemSection — "You're Making Sunday's Decision with Tuesday's Data."
 *
 * Two-column layout on large screens:
 *   Left (~45%): Large bold headline
 *   Right (~55%): Body paragraphs describing the problem
 *
 * Stacks single-column on mobile (headline → body).
 */
export function ProblemSection() {
  const { t } = useTranslation()

  return (
    <section
      id="problem"
      aria-labelledby="problem-heading"
      className="bg-background relative z-10 w-full"
    >
      <div className="section-x section-y section-inner mx-auto">
        <div className="mx-auto flex flex-col gap-8">
          {/* ── Headline ── */}
          <AnimateIn variant="fadeUp">
            <Typography
              id="problem-heading"
              variant="title"
              as="h2"
              textColor="default"
              className="text-center"
            >
              <span className="block">{t('problem.headlineLine1')}</span>
              <span className="block">{t('problem.headlineLine2')}</span>
            </Typography>
          </AnimateIn>

          {/* ── Body paragraphs ── */}
          <AnimateIn
            variant="fadeUp"
            delay={0.12}
            className="mx-auto flex max-w-3xl flex-col gap-4"
          >
            <p className="text-foreground/65 text-center text-[15px] leading-[1.8] sm:text-base">
              {t('problem.p1')}
            </p>
            <p className="text-foreground/65 text-center text-[15px] leading-[1.8] sm:text-base">
              {t('problem.p2')}
            </p>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

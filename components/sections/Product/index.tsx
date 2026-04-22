'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import Image from 'next/image'
import { splitLastWord } from '@/lib/utils'

export function ProductSection() {
  const { t } = useTranslation()
  const questions = [
    'Are workflows operationally usable for staff?',
    'Do data pipelines provide sufficient quality and continuity?',
    'Do the signals support meaningful individualized modeling in practice?',
  ]

  // use shared highlight helper for consistent title accents

  return (
    <section id="product" className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-12">
        <div className="space-y-12">
          {/* Part 1 — top (two-column info card like Part 2) */}
          <AnimateIn variant="fadeUp" className="flex flex-col gap-6">
            <h2 className="text-foreground mx-auto max-w-[820px] text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
              {(() => {
                const [lead, last] = splitLastWord(t('product.headline1'))
                return (
                  <>
                    <span className="text-foreground font-bold">{lead}</span>{' '}
                    <span className="text-primary font-bold">{last}</span>
                  </>
                )
              })()}
            </h2>

            <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
                <div>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="tracking-wider uppercase"
                    >
                      Digital twin framework
                    </Typography>
                  </div>
                  <p className="text-foreground/75 mt-3 text-[15px] leading-[1.8] md:text-[16px]">
                    Twinspire is developing a research-based digital twin
                    framework for individualized athlete modeling. The system
                    integrates longitudinal data from multiple sources,
                    including training load, neuromuscular testing, clinician
                    input, and wearable-derived physiological measures.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="tracking-wider uppercase"
                    >
                      Approach
                    </Typography>
                  </div>
                  <p className="text-foreground/75 mt-3 text-[15px] leading-[1.8] md:text-[16px]">
                    The approach combines principles from computational motor
                    control, adaptive nonlinear systems, system identification,
                    longitudinal sequence modelling, and self supervised
                    learning to identify individualized representations of how
                    an athlete’s physiological and functional state changes over
                    time.
                  </p>
                </div>

                <div>
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="tracking-wider uppercase"
                    >
                      Structured data layer
                    </Typography>
                  </div>
                  <p className="text-foreground/75 mt-3 text-[15px] leading-[1.8] md:text-[16px]">
                    In parallel, Twinspire is building a structured data layer
                    that links sessions, tests, symptoms, and contextual
                    information into a portable athlete history, supporting
                    continuity and decision-making across performance and
                    rehabilitation.
                  </p>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Part 2 — bottom (two-column info card + research questions) */}
          <AnimateIn
            variant="fadeUp"
            delay={0.08}
            className="flex flex-col gap-6"
          >
            <h3 className="text-foreground mx-auto max-w-[820px] text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
              {(() => {
                const [lead, last] = splitLastWord(t('product.headline2'))
                return (
                  <>
                    <span className="text-foreground font-bold">{lead}</span>{' '}
                    <span className="text-primary font-bold">{last}</span>
                  </>
                )
              })()}
            </h3>

            {/* Combined container: main text and image share the same background */}
            <div className="bg-muted/30 rounded-2xl p-6 md:p-8">
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
                {/* Left: main text (aligned with image) */}
                <div className="prose text-foreground/75 max-w-full">
                  <p className="text-[15px] leading-[1.8] md:text-[16px]">
                    A research prototype has been developed across mobile and
                    web environments, designed to integrate heterogeneous data
                    with minimal input from practitioners. The system now enters
                    real-world validation, focusing on whether it remains
                    usable, robust, and interpretable within elite performance
                    settings.
                  </p>
                </div>

                {/* Right: product image (same background) */}
                <div className="flex w-full items-center justify-center">
                  <Image
                    src="/product/product-mockup.png"
                    alt="Product mockup"
                    width={1080}
                    height={720}
                    className="h-44 w-full max-w-[520px] rounded-xl object-contain sm:h-52 md:h-60"
                  />
                </div>
              </div>
            </div>

            {/* Full-width: research questions remain under the image/text row */}
            <div className="mt-2">
              <div className="bg-muted/40 rounded-2xl p-6 sm:p-8 md:p-10">
                <Typography
                  variant="heading"
                  as="h4"
                  textColor="default"
                  className="mb-4"
                >
                  The current work addresses the following research questions.
                </Typography>

                <ol className="flex flex-col gap-3">
                  {questions.map((q, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="text-primary mt-0.5 text-[14px] leading-[1.8] font-bold tabular-nums sm:text-[15px]">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <p className="text-foreground/75 text-[15px] leading-[1.8] md:text-[16px]">
                        {q}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

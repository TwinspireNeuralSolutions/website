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
        <div className="space-y-12 pt-6">
          {/* Part 1 — top (two-column info card like Part 2) */}
          <AnimateIn variant="fadeUp" className="flex flex-col gap-6">
            <h2 className="mb-4 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-6 lg:text-[32px]">
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

            <div>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-10">
                <div className="pt-6 pl-6">
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="text-[18px] break-words whitespace-normal sm:text-[20px]"
                    >
                      Digital twin <span className="font-bold">framework</span>
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

                <div className="pt-6 pl-6">
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="text-[18px] break-words whitespace-normal sm:text-[20px]"
                    >
                      <span className="font-bold">Approach</span>
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

                <div className="pt-6 pl-6">
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="default"
                      className="text-[18px] break-words whitespace-normal sm:text-[20px]"
                    >
                      Structured data <span className="font-bold">layer</span>
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
            <h3 className="mb-4 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
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

            {/* Combined container: paragraph, image, then questions on mobile; paragraph+questions left and image right on md+ */}
            <div>
              <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-10">
                {/* Left: paragraph + questions (stacked) */}
                <div className="flex flex-col gap-4">
                  <Typography
                    variant="paragraph"
                    textColor="default"
                    className="text-foreground/75 pb-6"
                  >
                    A research prototype has been developed across mobile and
                    web environments, designed to integrate heterogeneous data
                    with minimal input from practitioners. The system now enters
                    real-world validation, focusing on whether it remains
                    usable, robust, and interpretable within elite performance
                    settings.
                  </Typography>

                  <Typography
                    variant="heading"
                    as="h4"
                    textColor="default"
                    className="mt-0 mb-2"
                  >
                    The current work addresses three questions:
                  </Typography>

                  <ul className="marker:text-primary mt-4 list-disc space-y-2 pl-6">
                    <li>
                      <p className="text-foreground/75 text-[15px] leading-[1.8] md:text-[16px]">
                        Are workflows operationally usable for staff?
                      </p>
                    </li>

                    <li>
                      <p className="text-foreground/75 text-[15px] leading-[1.8] md:text-[16px]">
                        Do data pipelines provide sufficient quality and
                        continuity?
                      </p>
                    </li>

                    <li>
                      <p className="text-foreground/75 text-[15px] leading-[1.8] md:text-[16px]">
                        Do the signals support meaningful individualized
                        modeling in practice?
                      </p>
                    </li>
                  </ul>
                </div>

                {/* Right: product image */}
                <div className="flex items-center justify-center">
                  <Image
                    src="/product/product-mockup.png"
                    alt="Product mockup"
                    width={1200}
                    height={800}
                    className="w-full max-w-[720px] rounded-xl object-contain sm:h-80 md:h-96 lg:h-[520px]"
                  />
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

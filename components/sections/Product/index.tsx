'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import Image from 'next/image'
// Card removed for Part 2 layout adjustments
import { splitLastWord } from '@/lib/utils'

export function ProductSection() {
  const { t } = useTranslation()

  // use shared highlight helper for consistent title accents

  return (
    <section id="product" className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-0">
        <div className="space-y-16">
          {/* Part 1 — top (two-column info card like Part 2) */}
          <AnimateIn variant="fadeUp" className="flex flex-col gap-8">
            <h2 className="mb-2 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-4 lg:text-[32px]">
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
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12">
                <div className="py-6 pl-6 md:py-8 md:pl-8">
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="muted"
                      className="text-[18px] break-words whitespace-normal sm:text-[20px]"
                    >
                      {t('product.card1.title')}
                    </Typography>
                  </div>
                  <Typography
                    variant="paragraph"
                    textColor="default"
                    className="mt-3"
                  >
                    {t('product.card1.body')}
                  </Typography>
                </div>

                <div className="py-6 pl-6 md:py-8 md:pl-8">
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="muted"
                      className="text-[18px] break-words whitespace-normal sm:text-[20px]"
                    >
                      {t('product.card2.title')}
                    </Typography>
                  </div>
                  <Typography
                    variant="paragraph"
                    textColor="default"
                    className="mt-3"
                  >
                    {t('product.card2.body')}
                  </Typography>
                </div>

                <div className="py-6 pl-6 md:py-8 md:pl-8">
                  <div className="flex items-center gap-3">
                    <Typography
                      variant="heading"
                      as="h3"
                      textColor="muted"
                      className="text-[18px] break-words whitespace-normal sm:text-[20px]"
                    >
                      {t('product.card3.title')}
                    </Typography>
                  </div>
                  <Typography
                    variant="paragraph"
                    textColor="default"
                    className="mt-3"
                  >
                    {t('product.card3.body')}
                  </Typography>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Part 2 — bottom (two-column info card + research questions) */}
          <AnimateIn
            variant="fadeUp"
            delay={0.08}
            className="flex flex-col gap-8"
          >
            <h2 className="mb-4 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-6 lg:text-[32px]">
              {(() => {
                const [lead, last] = splitLastWord(t('product.headline2'))
                return (
                  <>
                    <span className="text-foreground font-bold">{lead}</span>{' '}
                    <span className="text-primary font-bold">{last}</span>
                  </>
                )
              })()}
            </h2>

            {/* Combined container: paragraph, image, then questions on mobile; paragraph+questions left and image right on md+ */}
            <div>
              <div className="pl-6 md:pl-8">
                <div className="px-0 py-0">
                  <div className="flex flex-col gap-10 md:flex-row md:items-stretch md:gap-16 lg:gap-24">
                    <div className="flex min-w-0 flex-1 flex-col justify-center gap-6 pl-0 md:-translate-y-2 md:pl-0 lg:-translate-y-3">
                      <Typography
                        variant="paragraph"
                        textColor="default"
                        className="mt-0 mb-3"
                      >
                        {t('product.p2')}
                      </Typography>
                    </div>

                    <div className="flex min-w-0 flex-1 items-center overflow-hidden md:-mt-6 lg:-mt-8 xl:-mt-10">
                      <Image
                        src="/product/product-mockup.png"
                        alt="Product mockup"
                        width={1200}
                        height={800}
                        className="w-full max-w-[720px] rounded-xl object-contain sm:h-80 md:h-96 lg:h-[520px]"
                      />
                    </div>
                  </div>

                  {/* Full-width questions block (below text+image) */}
                  <div className="mt-6 md:mt-8">
                    <div className="md:border-border bg-muted/40 mb-0 flex flex-col gap-4 rounded-2xl p-6 md:border md:p-8 md:p-10">
                      <Typography variant="heading" as="h3" textColor="default">
                        {t('product.science.researchTitle')}
                      </Typography>
                      <ol className="flex flex-col gap-4">
                        {[
                          t('product.questions.q1'),
                          t('product.questions.q2'),
                          t('product.questions.q3'),
                        ].map((question, index) => (
                          <li key={index} className="flex gap-4">
                            <span className="text-primary mt-0.5 text-[14px] leading-[1.8] font-bold tabular-nums sm:text-[15px]">
                              {String(index + 1).padStart(2, '0')}
                            </span>
                            <Typography variant="paragraph" textColor="default">
                              {question}
                            </Typography>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

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

                      {/* Questions block — left column, no container */}
                      <Typography variant="heading" as="h3" textColor="default">
                        {t('product.science.researchTitle')}
                      </Typography>
                      <ol className="flex flex-col gap-1">
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

                    <div className="flex min-w-0 flex-1 flex-col gap-4 overflow-hidden md:-mt-6 lg:-mt-8 xl:-mt-10">
                      {/* WebApp — dark mode via CSS filter */}
                      <div className="w-full overflow-hidden rounded-xl border border-white/10 shadow-2xl" style={{background:'#0A0E1A'}}>
                        <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/30 px-3 py-2">
                          <div className="h-2 w-2 rounded-full bg-red-500/60" />
                          <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                          <div className="h-2 w-2 rounded-full bg-green-500/60" />
                          <span className="ml-2 text-[9px] tracking-wide text-white/25">app.twinspire.ai / squad-hub</span>
                        </div>
                        <Image
                          src="/product/webapp-screenshot.png"
                          alt="Twinspire Squad Hub — staff view"
                          width={1912}
                          height={1016}
                          className="block w-full object-cover"
                          style={{filter:'invert(1) hue-rotate(180deg) brightness(0.88) contrast(1.06)'}}
                        />
                      </div>
                      {/* Player app */}
                      <div className="flex items-start gap-4">
                        <div className="overflow-hidden rounded-2xl border border-white/10 shadow-xl" style={{maxWidth:120,flexShrink:0}}>
                          <Image
                            src="/product/app-screenshot.jpg"
                            alt="Twinspire player app"
                            width={390}
                            height={844}
                            className="block w-full object-cover"
                          />
                        </div>
                        <div className="pt-2">
                          <p className="text-[11px] font-semibold uppercase tracking-widest text-white/50">Player App</p>
                          <p className="mt-1 text-[12px] leading-relaxed text-white/35">Morning check-in, personal metrics, and the Athletic Passport. Where the private data stream enters the model.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Removed full-width questions block — now in left column above */}
                </div>
              </div>
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

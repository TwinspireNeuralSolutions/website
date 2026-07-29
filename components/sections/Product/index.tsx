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

                    {/* Product showcase — overlapping laptop + phone frames */}
                    <div className="relative flex min-w-0 flex-1 items-end justify-center overflow-visible md:-mt-6 lg:-mt-8 xl:-mt-10">
                      {/* Laptop / browser frame */}
                      <div className="w-full max-w-[580px]">
                        {/* Screen bezel */}
                        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0A0E1A] shadow-2xl">
                          {/* Browser chrome */}
                          <div className="flex items-center gap-1.5 border-b border-white/5 bg-black/40 px-3 py-2">
                            <div className="h-2 w-2 rounded-full bg-red-500/60" />
                            <div className="h-2 w-2 rounded-full bg-yellow-500/60" />
                            <div className="h-2 w-2 rounded-full bg-green-500/60" />
                            <div className="ml-2 flex-1 rounded bg-white/5 px-2 py-0.5">
                              <span className="text-[9px] tracking-wide text-white/20">app.twinspire.ai / squad-hub</span>
                            </div>
                          </div>
                          <Image
                            src="/product/webapp-screenshot.png"
                            alt="Twinspire Squad Hub"
                            width={1912}
                            height={1016}
                            className="block w-full object-cover"
                            style={{filter:'invert(1) hue-rotate(180deg) brightness(0.88) contrast(1.06)'}}
                          />
                        </div>
                        {/* Laptop base */}
                        <div className="mx-auto h-2 w-[90%] rounded-b-sm bg-white/5" />
                        <div className="mx-auto h-1.5 w-full rounded-b-lg bg-white/[0.03]" />
                      </div>
                      {/* Phone frame — bottom aligned with laptop */}
                      <div className="absolute bottom-4 right-0 z-10 overflow-hidden rounded-[22px] border border-white/15 bg-[#111827] shadow-2xl" style={{width:'23%',minWidth:90,maxWidth:130}}>
                        <Image
                          src="/product/app-screenshot.jpg"
                          alt="Twinspire player app"
                          width={390}
                          height={844}
                          className="block w-full object-cover"
                        />
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

'use client'

import React from 'react'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import Image from 'next/image'
import { splitLastWord } from '@/lib/utils'

export function ProductSection() {
  const { t } = useTranslation()

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
                      {t('product.card1Title')}
                    </Typography>
                  </div>
                  <p className="text-foreground/75 mt-3 text-[15px] leading-[1.8] md:text-[16px]">
                    {t('product.card1Body')}
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
                      {t('product.card2Title')}
                    </Typography>
                  </div>
                  <p className="text-foreground/75 mt-3 text-[15px] leading-[1.8] md:text-[16px]">
                    {t('product.card2Body')}
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
                      {t('product.card3Title')}
                    </Typography>
                  </div>
                  <p className="text-foreground/75 mt-3 text-[15px] leading-[1.8] md:text-[16px]">
                    {t('product.card3Body')}
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
                    {t('product.p2Intro')}
                  </Typography>

                  <Typography
                    variant="heading"
                    as="h4"
                    textColor="default"
                    className="mt-0 mb-2"
                  >
                    {t('product.p2Heading')}
                  </Typography>

                  <ul className="marker:text-primary mt-4 list-disc space-y-2 pl-6">
                    <li>
                      <p className="text-foreground/75 text-[15px] leading-[1.8] md:text-[16px]">
                        {t('product.p2q1')}
                      </p>
                    </li>

                    <li>
                      <p className="text-foreground/75 text-[15px] leading-[1.8] md:text-[16px]">
                        {t('product.p2q2')}
                      </p>
                    </li>

                    <li>
                      <p className="text-foreground/75 text-[15px] leading-[1.8] md:text-[16px]">
                        {t('product.p2q3')}
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

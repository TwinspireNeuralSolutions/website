'use client'

import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * ProductSection
 *
 * Single section, min-height 100 vh.
 * Background: hard split — top 60 % white / bottom 40 % lavender (#e6e6f3).
 *
 * Desktop (lg+):
 *   Left column  — two text blocks (headline + body) pushed to
 *                  top and bottom with space-between.
 *   Right column — product mockup image centered in the full column height,
 *                  in normal document flow (not absolute).
 *
 * Mobile: first text block → full-width image → second text block, stacked.
 */
export function ProductSection() {
  const { t } = useTranslation()

  return (
    <section
      id="product"
      className="relative z-10 w-full"
      style={{
        background: 'linear-gradient(to bottom, #ffffff 60%, #e6e6f3 60%)',
      }}
    >
      <div className="section-x section-inner mx-auto">
        {/*
         * Outer flex row:
         *   mobile  → flex-col (stacks)
         *   desktop → flex-row, min-h-screen so justify-between stretches
         */}
        <div className="flex min-h-screen flex-col lg:flex-row lg:items-stretch lg:gap-16">
          {/* ── Left column: two text blocks ─────────────────────────── */}
          <div className="flex flex-col gap-10 py-14 lg:w-[50%] lg:justify-between lg:gap-0 lg:pt-32 lg:pb-20">
            {/* Top text block */}
            <AnimateIn variant="fadeUp" className="flex flex-col gap-5">
              <Typography
                variant="title"
                as="h2"
                textColor="default"
                className="text-[28px] leading-[1.1] tracking-[-0.03em] sm:text-[36px] lg:text-[44px]"
              >
                {t('product.headline1')}
              </Typography>
              <p className="text-foreground/65 text-[14px] leading-[1.8] sm:text-[15px]">
                {t('product.p1')}
              </p>
            </AnimateIn>

            {/* Mobile image — between the two text blocks */}
            <div className="overflow-hidden lg:hidden">
              <Image
                src="/product/product-mockup.png"
                alt={t('product.mockupAlt')}
                width={1200}
                height={900}
                className="h-auto w-full object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Bottom text block */}
            <AnimateIn
              variant="fadeUp"
              delay={0.1}
              className="flex flex-col gap-5"
            >
              <Typography
                variant="title"
                as="h3"
                textColor="default"
                className="text-[28px] leading-[1.1] tracking-[-0.03em] sm:text-[36px] lg:text-[44px]"
              >
                {t('product.headline2')}
              </Typography>
              <p className="text-foreground/65 text-[14px] leading-[1.8] sm:text-[15px]">
                {t('product.p2')}
              </p>
            </AnimateIn>
          </div>

          {/* ── Right column: image (desktop only) ───────────────────── */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-center lg:py-12">
            <Image
              src="/product/product-mockup.png"
              alt={t('product.mockupAlt')}
              width={1100}
              height={840}
              className="h-auto max-h-[80vh] w-full object-contain drop-shadow-2xl"
              sizes="50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

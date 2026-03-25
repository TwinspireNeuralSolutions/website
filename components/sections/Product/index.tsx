'use client'

import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * ProductSection
 *
 * Layout principle:
 *   - First text block always sits on a white background.
 *   - Second text block ("Athletic Passport") always sits on the lavender (#e6e6f3) background.
 *   - The product mockup image straddles the white/lavender boundary:
 *       desktop → image is vertically centred at the exact midpoint of the section
 *       mobile  → image sits between the two text blocks in a half-white / half-lavender band
 *
 * Mobile:  white band (text1) → gradient band (image) → lavender band (text2)
 * Desktop: absolute half-white / half-lavender bg; left col has two equal flex-1 halves;
 *          right col has image centred → it straddles the midpoint.
 */
export function ProductSection() {
  const { t } = useTranslation()

  return (
    <section id="product" className="relative z-10 w-full overflow-hidden">
      {/* ── MOBILE layout (hidden on lg+) ──────────────────────────────── */}
      <div className="lg:hidden">
        {/* White band: first text */}
        <div className="bg-white">
          <div className="section-x section-inner mx-auto pt-14 pb-8">
            <AnimateIn variant="fadeUp" className="flex flex-col gap-5">
              <Typography
                variant="title"
                as="h2"
                textColor="default"
                className="text-[28px] leading-[1.1] tracking-[-0.03em] sm:text-[36px]"
              >
                {t('product.headline1')}
              </Typography>
              <p className="text-foreground/65 text-[14px] leading-[1.8] sm:text-[15px]">
                {t('product.p1')}
              </p>
            </AnimateIn>
          </div>
        </div>

        {/* Gradient band: image straddles white → lavender */}
        <div
          className="w-full overflow-hidden"
          style={{
            background: 'linear-gradient(to bottom, #ffffff 50%, #e6e6f3 50%)',
          }}
        >
          <div className="section-x section-inner mx-auto">
            <Image
              src="/product/product-mockup.png"
              alt={t('product.mockupAlt')}
              width={1200}
              height={900}
              className="h-auto w-full object-contain drop-shadow-xl"
              sizes="100vw"
              priority
            />
          </div>
        </div>

        {/* Lavender band: second text */}
        <div className="bg-[#e6e6f3]">
          <div className="section-x section-inner mx-auto pt-8 pb-14">
            <AnimateIn
              variant="fadeUp"
              delay={0.1}
              className="flex flex-col gap-5"
            >
              <Typography
                variant="title"
                as="h3"
                textColor="default"
                className="text-[28px] leading-[1.1] tracking-[-0.03em] sm:text-[36px]"
              >
                {t('product.headline2')}
              </Typography>
              <p className="text-foreground/65 text-[14px] leading-[1.8] sm:text-[15px]">
                {t('product.p2')}
              </p>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* ── DESKTOP layout (hidden below lg) ───────────────────────────── */}
      <div className="relative hidden min-h-[70vh] lg:block">
        {/* Absolute background: top half white, bottom half lavender */}
        <div className="absolute inset-0 flex flex-col" aria-hidden>
          <div className="flex-1 bg-white" />
          <div className="flex-1 bg-[#e6e6f3]" />
        </div>

        {/* Content on top */}
        <div className="section-x section-inner relative mx-auto flex min-h-[70vh] gap-16">
          {/* Left column: two equal flex-1 halves — midpoint aligns with bg boundary */}
          <div className="flex w-[50%] flex-col">
            {/* First text — white half, text pushed to bottom of its half */}
            <AnimateIn
              variant="fadeUp"
              className="flex flex-1 flex-col justify-end gap-5 pt-20 pb-12"
            >
              <Typography
                variant="title"
                as="h2"
                textColor="default"
                className="text-[28px] leading-[1.1] tracking-[-0.03em] lg:text-[44px]"
              >
                {t('product.headline1')}
              </Typography>
              <p className="text-foreground/65 text-[14px] leading-[1.8] sm:text-[15px]">
                {t('product.p1')}
              </p>
            </AnimateIn>

            {/* Second text — lavender half, text pushed to top of its half */}
            <AnimateIn
              variant="fadeUp"
              delay={0.1}
              className="flex flex-1 flex-col justify-start gap-5 pt-12 pb-20"
            >
              <Typography
                variant="title"
                as="h3"
                textColor="default"
                className="text-[28px] leading-[1.1] tracking-[-0.03em] lg:text-[44px]"
              >
                {t('product.headline2')}
              </Typography>
              <p className="text-foreground/65 text-[14px] leading-[1.8] sm:text-[15px]">
                {t('product.p2')}
              </p>
            </AnimateIn>
          </div>

          {/* Right column: image centred vertically = exactly at the white/lavender boundary */}
          <div className="flex flex-1 items-center justify-center py-8">
            <Image
              src="/product/product-mockup.png"
              alt={t('product.mockupAlt')}
              width={1100}
              height={840}
              className="h-auto max-h-[75vh] w-full object-contain drop-shadow-2xl"
              sizes="50vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

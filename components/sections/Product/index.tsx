'use client'

import Image from 'next/image'
import { Typography } from '@/components/ui/typography'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * ProductSection — "A Living Model of Every Athlete's Body."
 *
 * Layout:
 *  Row 1: Text left + product mockup image right (stacks on mobile)
 *  Row 2: Two-column text block below (stacks on mobile)
 */
export function ProductSection() {
  const { t } = useTranslation()

  return (
    <section id="product" className="relative z-10 w-full overflow-hidden">
      {/* ── Row 1: White bg — text left only (desktop: ~45% width) ──────── */}
      <div className="bg-white">
        <div className="section-inner mx-auto">
          <div className="section-x pt-8 pb-14 lg:w-[60%] lg:pt-14 lg:pb-24">
            <AnimateIn variant="fadeUp" className="flex flex-col gap-5">
              <Typography
                variant="title"
                as="h2"
                textColor="default"
                className="text-[28px] leading-[1.1] tracking-[-0.03em] sm:text-[36px] lg:text-[44px]"
              >
                {t('product.headline1')}
              </Typography>
              <p className="text-foreground/65 pb-8 text-[14px] leading-[1.8] sm:text-[15px]">
                {t('product.p1')}
              </p>
            </AnimateIn>
          </div>
        </div>
      </div>

      {/* ── Mobile only: floating image with split background, half on each section ──────────────── */}
      <div
        className="z-20 flex w-full justify-center lg:hidden"
        style={{
          marginTop: '-60px',
          marginBottom: '-60px',
          position: 'relative',
        }}
      >
        <div
          className="flex w-[90vw] max-w-[420px] items-center justify-center rounded-2xl shadow-xl"
          style={{
            background: 'linear-gradient(to bottom, #fff 50%, #e6e6f3 50%)',
          }}
        >
          <Image
            src="/product/product-mockup.png"
            alt={t('product.mockupAlt')}
            width={1200}
            height={900}
            className="h-auto w-full object-contain"
            sizes="90vw"
            priority
          />
        </div>
      </div>

      {/* ── Row 2: Light lavender bg — text left only (desktop: ~45% width) ── */}
      <div className="bg-[#e6e6f3]">
        <div className="section-inner mx-auto">
          <div className="section-x py-14 lg:w-[60%] lg:py-24">
            <div className="flex flex-col gap-5">
              <AnimateIn variant="fadeUp">
                <Typography
                  variant="title"
                  as="h3"
                  className="text-foreground pt-8 text-[28px] leading-[1.1] tracking-[-0.03em] sm:text-[36px] lg:text-[44px]"
                >
                  {t('product.headline2')}
                </Typography>
              </AnimateIn>
              <AnimateIn variant="fadeUp" delay={0.12}>
                <p className="text-foreground/65 m-0 text-[14px] leading-[1.8] sm:text-[15px]">
                  {t('product.p2')}
                </p>
              </AnimateIn>
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop only: image absolutely spanning both rows on the right ── */}
      <div className="absolute inset-y-0 right-0 hidden w-[48%] lg:block">
        <div className="relative h-full w-full">
          <Image
            src="/product/product-mockup.png"
            alt={t('product.mockupAlt')}
            fill
            className="object-contain object-center p-8 drop-shadow-2xl"
            sizes="65vw"
            priority
          />
        </div>
      </div>
    </section>
  )
}

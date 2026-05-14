'use client'

import Image from 'next/image'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import { AnimateIn } from '@/components/ui/animate-in'
import { Button } from '@/components/ui/button'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from '@/i18n'

const partners = [
  { src: '/partners/ai.png', alt: 'Alexandra Institute' },
  { src: '/partners/dtu.png', alt: 'DTU' },
  { src: '/partners/myoact.png', alt: 'Myoact' },
  { src: '/partners/beyond-beta.png', alt: 'Beyond Beta' },
  { src: '/partners/dif.png', alt: 'DIF Innovation Lab' },
  { src: '/partners/skylab.png', alt: 'DTU Skylab' },
]

const sliderSettings = {
  infinite: true,
  autoplay: true,
  autoplaySpeed: 0,
  speed: 6000,
  cssEase: 'linear',
  slidesToShow: 6,
  slidesToScroll: 1,
  arrows: false,
  dots: false,
  pauseOnHover: false,
  swipe: false,
  draggable: false,
  responsive: [
    { breakpoint: 1280, settings: { slidesToShow: 6 } },
    { breakpoint: 1024, settings: { slidesToShow: 5 } },
    { breakpoint: 768, settings: { slidesToShow: 4 } },
    { breakpoint: 480, settings: { slidesToShow: 2 } },
  ],
}

/**
 * PartnersSection — Smooth infinite partner logo carousel.
 * All logos share the same fixed bounding box (object-contain) and
 * identical filter treatment: brightness-0 invert opacity-45.
 *
 * When `showPartnershipText` is true, a "Build the Future..." heading,
 * body, and CTA are displayed above the logo carousel.
 */
export function PartnersSection({
  showPartnershipText = false,
}: {
  showPartnershipText?: boolean
}) {
  const { t } = useTranslation()

  return (
    <section
      aria-label="Our partners"
      className="bg-primary relative z-10 w-full overflow-hidden shadow-[0_-12px_48px_rgba(0,0,0,0.15)]"
    >
      {showPartnershipText && (
        <div className="section-x section-inner mx-auto py-16 md:py-20">
          <AnimateIn
            variant="fadeUp"
            className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between md:gap-16"
          >
            <div className="flex flex-col gap-4 md:max-w-[560px]">
              <Typography variant="title" as="h2" textColor="white">
                {t('partners.heading')}
              </Typography>
              <p className="text-[14px] leading-[1.8] text-white/70 sm:text-[15px]">
                {t('partners.body')}
              </p>
            </div>
            <div className="shrink-0">
              <Button
                variant="white"
                size="lg"
                showIcon
                onClick={() =>
                  document
                    .getElementById('contact')
                    ?.scrollIntoView({ behavior: 'smooth' })
                }
              >
                {t('partners.cta')}
              </Button>
            </div>
          </AnimateIn>
        </div>
      )}
      <div className="py-5 md:py-6">
        <AnimateIn variant="fadeIn">
          <div
            style={{
              maskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
            }}
          >
            <Slider {...sliderSettings}>
              {partners.map((p) => (
                <div key={p.alt}>
                  {/* Fixed-size box — object-contain ensures every logo, wide or tall,
                      fills the same space without distortion */}
                  <div className="flex items-center justify-center px-2">
                    <div className="relative h-8 w-full">
                      <Image
                        src={p.src}
                        alt={p.alt}
                        fill
                        sizes="160px"
                        className="object-contain opacity-[0.45] brightness-0 invert"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

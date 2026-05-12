'use client'

import Image from 'next/image'
import { MapPin } from 'lucide-react'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * JoinUsLocation — "Based in Copenhagen" section with image left, text right.
 */
export function CareersLocation() {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto py-10 md:py-14">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <AnimateIn variant="slideLeft">
            <div className="flex flex-col gap-6">
              <h2 className="mb-6 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[26px] lg:mb-8 lg:text-[32px]">
                <span className="text-foreground font-bold">
                  {t('joinUsPage.locationTitle')}
                </span>
              </h2>

              <div className="flex flex-col gap-4">
                <p className="text-foreground/70 text-[14px] leading-[1.8] font-normal sm:text-[15px]">
                  {t('joinUsPage.locationP1')}
                </p>
                <p className="text-foreground/70 text-[14px] leading-[1.8] font-normal sm:text-[15px]">
                  {t('joinUsPage.locationP2')}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-start gap-2.5">
                  <MapPin
                    className="text-primary mt-0.5 h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span className="text-foreground/70 text-[14px] leading-[1.8] font-normal sm:text-[15px]">
                    {t('joinUsPage.locationAddress')}
                  </span>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Image */}
          <AnimateIn variant="slideRight">
            <div className="relative h-[240px] w-full overflow-hidden rounded-2xl sm:h-[300px]">
              <Image
                src="/location/dtu.jpg"
                alt="DTU — Technical University of Denmark"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </AnimateIn>
        </div>
      </div>
    </section>
  )
}

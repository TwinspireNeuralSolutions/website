'use client'

import Image from 'next/image'
import { Globe } from 'lucide-react'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

/**
 * JoinUsLocation — "Based in Copenhagen" section with image left, text right.
 */
export function JoinUsLocation() {
  const { t } = useTranslation()

  return (
    <section className="bg-background relative z-10 w-full">
      <div className="section-x section-inner mx-auto pt-20 pb-16 md:pt-28 md:pb-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Text */}
          <AnimateIn variant="slideLeft">
            <div className="flex flex-col gap-6">
              <h2 className="text-foreground text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[26px] lg:text-[32px]">
                {t('joinUsPage.locationTitle')}
              </h2>

              <div className="flex flex-col gap-4">
                <p className="text-foreground/70 text-[15px] leading-[1.8] sm:text-[16px]">
                  {t('joinUsPage.locationP1')}
                </p>
                <p className="text-foreground/70 text-[15px] leading-[1.8] sm:text-[16px]">
                  {t('joinUsPage.locationP2')}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  <Globe
                    className="text-primary h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span className="text-foreground/70 text-[14px]">
                    {t('joinUsPage.locationLink1')}
                  </span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe
                    className="text-primary h-4 w-4 shrink-0"
                    aria-hidden
                  />
                  <span className="text-foreground/70 text-[14px]">
                    {t('joinUsPage.locationLink2')}
                  </span>
                </div>
              </div>
            </div>
          </AnimateIn>

          {/* Image */}
          <AnimateIn variant="slideRight">
            <div className="relative h-[240px] w-full overflow-hidden rounded-2xl sm:h-[300px]">
              <Image
                src="/location/cph.png"
                alt="Copenhagen"
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

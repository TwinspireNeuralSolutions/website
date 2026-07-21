'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { AnimateIn } from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'

export function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      className="relative h-svh min-h-[600px] w-full overflow-hidden"
      style={{ background: '#020B1E' }}
    >
      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 pt-20 pb-6 sm:px-6 md:px-8 lg:px-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-stretch lg:gap-12">
          <div className="w-full lg:flex lg:w-1/2 lg:items-start lg:justify-start">
            <div className="mt-0 w-full max-w-2xl px-4 text-left sm:mt-10 sm:px-6 lg:mt-0 lg:px-0 lg:pl-6">
              <div className="flex flex-col items-center gap-4 text-center lg:items-start lg:text-left">
                <AnimateIn variant="fadeUp" delay={0.05} immediate>
                  <h1 className="text-[20px] leading-[1.1] font-extrabold tracking-tight text-white uppercase sm:text-[26px] md:text-[32px] lg:text-[36px] xl:text-[40px]">
                    <span className="block">
                      {t('hero.headlineLine1Start')}
                      {t('hero.headlineLine1Highlight')}
                    </span>
                    <span className="block">
                      {t('hero.headlineLine2Start')}
                      {t('hero.headlineLine2Highlight')}
                    </span>
                  </h1>
                </AnimateIn>

                {/* data pills removed per request */}

                <AnimateIn variant="fadeUp" delay={0.15} immediate>
                  <p className="mt-2 max-w-xl text-base leading-relaxed text-white">
                    {t('hero.valueProp')} {t('hero.credibility')}
                  </p>
                </AnimateIn>

                <AnimateIn variant="fadeUp" delay={0.2} immediate>
                  <div className="mt-4">
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
                      {t('hero.cta')}
                    </Button>
                  </div>
                </AnimateIn>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 lg:self-start lg:pl-6">
            <div className="relative mx-auto h-[480px] w-full max-w-[920px] sm:h-[640px] md:h-[840px] lg:mx-0 lg:h-[1040px]">
              <Image
                src="/hero/hero3.png"
                alt="Athlete"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain object-top"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

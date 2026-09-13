'use client'

import { AnimateIn } from '@/components/ui/animate-in'
import { Typography } from '@/components/ui/typography'
import { useTranslation } from '@/i18n'

export function PublicProblemSummarySection() {
  const { t } = useTranslation()

  const items = [
    {
      title: t('problem.block1Title'),
      body: t('problem.p1'),
    },
    {
      title: t('problem.block2Title'),
      body: t('problem.p2'),
    },
  ]

  return (
    <section id="problem" className="bg-background relative z-10 w-full">
      <div className="section-x section-y section-inner mx-auto">
        <AnimateIn variant="fadeUp">
          <h2 className="text-foreground mb-10 text-center text-[22px] leading-[1.2] font-bold tracking-wide uppercase sm:text-[28px] lg:text-[32px]">
            {t('problem.headline')}
          </h2>
        </AnimateIn>

        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-2">
          {items.map((item, index) => (
            <AnimateIn key={item.title} variant="fadeUp" delay={index * 0.08}>
              <div className="bg-muted/30 h-full rounded-xl p-6 sm:p-7">
                <Typography variant="heading" as="h3" textColor="default">
                  {item.title}
                </Typography>
                <Typography variant="paragraph" as="p" className="mt-3">
                  {item.body}
                </Typography>
              </div>
            </AnimateIn>
          ))}
        </div>

        <AnimateIn variant="fadeUp" delay={0.12}>
          <div className="bg-footer-bg mx-auto mt-10 max-w-5xl rounded-xl p-7 text-center sm:p-9">
            <Typography variant="heading" as="h3" textColor="default">
              {t('problem.originHeading')}
            </Typography>
            <Typography
              variant="paragraph"
              as="p"
              className="text-foreground/80 mx-auto mt-3 max-w-3xl"
            >
              {t('problem.originBody')}
            </Typography>
          </div>
        </AnimateIn>
      </div>
    </section>
  )
}

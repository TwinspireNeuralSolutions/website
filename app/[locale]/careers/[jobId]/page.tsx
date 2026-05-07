'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Mail, ArrowLeft } from 'lucide-react'
import { FooterSection } from '@/components/sections/Footer'
import { PartnersSection } from '@/components/sections/Partners'
import { Navbar } from '@/components/ui/navbar'
import { BackgroundVideo } from '@/components/ui/background-video'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'
import { getJob } from '@/data/jobs'

// ─── Typography helpers ────────────────────────────────────────────────────────

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground/70 text-[14px] leading-[1.85] sm:text-[15px]">
      {children}
    </p>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="border-primary/25 mt-4 border-l-2 pl-4">
      <p className="text-primary/75 text-[14px] leading-[1.85] italic sm:text-[15px]">
        {children}
      </p>
    </blockquote>
  )
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="rounded-xl bg-white p-6 sm:p-8">
      <h2 className="text-primary mb-2 text-[11px] font-semibold tracking-[0.15em] uppercase">
        {title}
      </h2>
      <div className="bg-primary/20 mb-5 h-px w-10" />
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2 pl-5">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-foreground/70 list-disc text-[14px] leading-[1.85] sm:text-[15px]"
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

// ─── Role detail content ───────────────────────────────────────────────────────

function PhysioContent() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <Para>{t('joinUsPage.physio.intro')}</Para>
          <Quote>{t('joinUsPage.physio.question')}</Quote>
        </div>
      </div>

      <Section title={t('joinUsPage.physio.theRoleTitle')}>
        <Para>{t('joinUsPage.physio.theRoleDesc')}</Para>
        <Para>{t('joinUsPage.physio.connectIntro')}</Para>
        <BulletList
          items={[
            t('joinUsPage.physio.connect1'),
            t('joinUsPage.physio.connect2'),
            t('joinUsPage.physio.connect3'),
            t('joinUsPage.physio.connect4'),
          ]}
        />
        <Para>{t('joinUsPage.physio.contextNote')}</Para>
      </Section>

      <Section title={t('joinUsPage.physio.doTitle')}>
        <Para>{t('joinUsPage.physio.doLead')}</Para>
        <Para>{t('joinUsPage.physio.doIntro')}</Para>
        <BulletList
          items={[
            t('joinUsPage.physio.do1'),
            t('joinUsPage.physio.do2'),
            t('joinUsPage.physio.do3'),
            t('joinUsPage.physio.do4'),
            t('joinUsPage.physio.do5'),
          ]}
        />
      </Section>

      <Section title={t('joinUsPage.physio.lookingForTitle')}>
        <Para>{t('joinUsPage.physio.lookingForIntro')}</Para>
        <BulletList
          items={[
            t('joinUsPage.physio.lf1'),
            t('joinUsPage.physio.lf2'),
            t('joinUsPage.physio.lf3'),
            t('joinUsPage.physio.lf4'),
            t('joinUsPage.physio.lf5'),
          ]}
        />
      </Section>

      <Section title={t('joinUsPage.physio.offerTitle')}>
        <BulletList
          items={[
            t('joinUsPage.physio.offer1'),
            t('joinUsPage.physio.offer2'),
            t('joinUsPage.physio.offer3'),
            t('joinUsPage.physio.offer4'),
          ]}
        />
      </Section>
    </div>
  )
}

function EngineeringContent() {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-white p-6 sm:p-8">
        <div className="flex flex-col gap-3">
          <Para>{t('joinUsPage.engineering.intro')}</Para>
          <Para>{t('joinUsPage.engineering.nowChallenge')}</Para>
        </div>
      </div>

      <Section title={t('joinUsPage.engineering.theRoleTitle')}>
        <Para>{t('joinUsPage.engineering.theRoleDesc')}</Para>
        <Para>{t('joinUsPage.engineering.messyData')}</Para>
        <Quote>{t('joinUsPage.engineering.goal')}</Quote>
        <Para>{t('joinUsPage.engineering.leadIntro')}</Para>
        <BulletList
          items={[
            t('joinUsPage.engineering.lead1'),
            t('joinUsPage.engineering.lead2'),
            t('joinUsPage.engineering.lead3'),
            t('joinUsPage.engineering.lead4'),
          ]}
        />
        <Para>{t('joinUsPage.engineering.closelyCeo')}</Para>
      </Section>

      <Section title={t('joinUsPage.engineering.respTitle')}>
        <BulletList
          items={[
            t('joinUsPage.engineering.resp1'),
            t('joinUsPage.engineering.resp2'),
            t('joinUsPage.engineering.resp3'),
            t('joinUsPage.engineering.resp4'),
          ]}
        />
        <Para>{t('joinUsPage.engineering.resp5')}</Para>
        <BulletList
          items={[
            t('joinUsPage.engineering.resp5a'),
            t('joinUsPage.engineering.resp5b'),
            t('joinUsPage.engineering.resp5c'),
          ]}
        />
      </Section>

      <Section title={t('joinUsPage.engineering.stackTitle')}>
        <BulletList
          items={[
            t('joinUsPage.engineering.stack1'),
            t('joinUsPage.engineering.stack2'),
            t('joinUsPage.engineering.stack3'),
            t('joinUsPage.engineering.stack4'),
            t('joinUsPage.engineering.stack5'),
          ]}
        />
      </Section>

      <Section title={t('joinUsPage.engineering.lookingForTitle')}>
        <Para>{t('joinUsPage.engineering.lookingForIntro')}</Para>
        <BulletList
          items={[
            t('joinUsPage.engineering.lf1'),
            t('joinUsPage.engineering.lf2'),
            t('joinUsPage.engineering.lf3'),
            t('joinUsPage.engineering.lf4'),
            t('joinUsPage.engineering.lf5'),
          ]}
        />
        <Para>{t('joinUsPage.engineering.bonusTitle')}</Para>
        <BulletList
          items={[
            t('joinUsPage.engineering.bonus1'),
            t('joinUsPage.engineering.bonus2'),
            t('joinUsPage.engineering.bonus3'),
          ]}
        />
      </Section>

      <Section title={t('joinUsPage.engineering.howWeThinkTitle')}>
        <Para>{t('joinUsPage.engineering.hwt1')}</Para>
        <Para>{t('joinUsPage.engineering.hwt2')}</Para>
        <Para>{t('joinUsPage.engineering.hwt3')}</Para>
        <BulletList
          items={[
            t('joinUsPage.engineering.noProcess1'),
            t('joinUsPage.engineering.noProcess2'),
            t('joinUsPage.engineering.noProcess3'),
          ]}
        />
        <Para>{t('joinUsPage.engineering.notResearch')}</Para>
      </Section>

      <Section title={t('joinUsPage.engineering.workingTitle')}>
        <Para>{t('joinUsPage.engineering.working1')}</Para>
        <Para>{t('joinUsPage.engineering.whatWeShare')}</Para>
        <BulletList
          items={[
            t('joinUsPage.engineering.share1'),
            t('joinUsPage.engineering.share2'),
            t('joinUsPage.engineering.share3'),
          ]}
        />
        <Para>{t('joinUsPage.engineering.dtuNote')}</Para>
      </Section>
    </div>
  )
}

// ─── Page ──────────────────────────────────────────────────────────────────────

/**
 * Career detail page — clean job listing matching the design screenshot.
 * Route: /[locale]/careers/[jobId]
 */
export default function CareerDetailPage() {
  const { t } = useTranslation()
  const { locale, jobId } = useParams<{ locale: string; jobId: string }>()

  const job = getJob(jobId)

  // Unknown job — fallback
  if (!job) {
    return (
      <>
        <Navbar />
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6">
          <p className="text-foreground/60 text-[15px]">Position not found.</p>
          <Link
            href={`/${locale}/careers#open-roles`}
            className="text-primary text-[14px] underline hover:opacity-80"
          >
            ← {t('joinUsPage.backToPositions')}
          </Link>
        </main>
        <PartnersSection />
        <FooterSection />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-100">
        {/* ── Hero — blue + video ── */}
        <div className="relative h-[340px] w-full overflow-hidden sm:h-[360px]">
          <div className="bg-primary absolute inset-0" />
          <BackgroundVideo
            src="/hero-video.mp4"
            opacity={0.3}
            className="z-[1]"
          />

          {/* Back link — same left alignment as cards below */}
          <div className="absolute inset-x-0 bottom-24 z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Link
              href={`/${locale}/careers#open-roles`}
              prefetch={true}
              className="text-foreground inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-[13px] font-medium shadow-sm transition-shadow hover:shadow-md"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t('joinUsPage.backToPositions')}
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* ── Header card — half overlaps hero ── */}
          <div className="relative z-10 -mt-20 mb-10 rounded-xl bg-white p-6 sm:p-8">
            <span
              className={cn(
                'mb-4 inline-block rounded-md px-2.5 py-0.5 text-[11px] font-semibold tracking-wide uppercase',
                job.badge === 'science'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-blue-100 text-blue-700'
              )}
            >
              {t(`joinUsPage.${job.id}.department`)}
            </span>

            <h1 className="text-foreground text-[22px] leading-snug font-bold sm:text-[30px]">
              {t(`joinUsPage.${job.id}.title`)}
            </h1>
          </div>

          {/* ── Two-column layout ── */}
          <div className="flex flex-col gap-6 pb-20 lg:flex-row lg:items-start">
            {/* Left — body content */}
            <div className="min-w-0 flex-1">
              {job.id === 'physio' && <PhysioContent />}
              {job.id === 'engineering' && <EngineeringContent />}
            </div>

            {/* Right — sidebar + contact card */}
            <div className="flex w-full shrink-0 flex-col gap-6 lg:w-72 xl:w-80">
              <div className="flex flex-col rounded-xl bg-white p-6">
                <div className="space-y-4 text-[13px]">
                  <div>
                    <p className="text-muted-foreground mb-0.5 text-[11px] font-medium tracking-wide uppercase">
                      {t('joinUsPage.employmentTypeLabel')}
                    </p>
                    <p className="text-foreground font-medium">
                      {t(`joinUsPage.${job.id}.employmentType`)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5 text-[11px] font-medium tracking-wide uppercase">
                      {t('joinUsPage.locationLabel')}
                    </p>
                    <p className="text-foreground font-medium">
                      {t(`joinUsPage.${job.id}.location`)}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground mb-0.5 text-[11px] font-medium tracking-wide uppercase">
                      {t('joinUsPage.departmentLabel')}
                    </p>
                    <p className="text-foreground font-medium">
                      {t(`joinUsPage.${job.id}.department`)}
                    </p>
                  </div>
                </div>

                <a
                  href={`mailto:${t('joinUsPage.contactEmail')}`}
                  className="bg-primary hover:bg-primary-hover mt-8 flex w-full items-center justify-center gap-2 rounded-lg px-6 py-3.5 text-[15px] font-semibold text-white transition-colors"
                >
                  <Mail className="h-4 w-4" aria-hidden />
                  {t('joinUsPage.applyButton')}
                </a>
              </div>

              {/* Contact card — below sidebar */}
              <div className="rounded-xl bg-white p-6">
                <p className="text-foreground/70 font-sans text-[14px] leading-[1.8]">
                  {t(`joinUsPage.${job.id}.contactCtaText`)}{' '}
                  <a
                    href={`mailto:${t('joinUsPage.contactEmail')}`}
                    className="text-primary transition-opacity hover:opacity-80"
                  >
                    {t('joinUsPage.contactEmail')}
                  </a>
                </p>
                <p className="text-foreground/50 mt-1 font-sans text-[13px]">
                  DTU · Copenhagen ·{' '}
                  <a
                    href={`https://${t('joinUsPage.contactWebsite')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary transition-opacity hover:opacity-80"
                  >
                    {t('joinUsPage.contactWebsite')}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <PartnersSection />
      <FooterSection />
    </>
  )
}

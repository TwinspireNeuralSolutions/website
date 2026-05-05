'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Clock, MapPin, Mail, ArrowLeft } from 'lucide-react'
import { FooterSection } from '@/components/sections/Footer'
import { PartnersSection } from '@/components/sections/Partners'
import { useTranslation } from '@/i18n'
import { cn } from '@/lib/utils'
import { getJob } from '@/data/jobs'

// ─── Badge colours ─────────────────────────────────────────────────────────────

const BADGE_COLORS: Record<string, string> = {
  science: 'bg-green-50 text-green-700',
  engineering: 'bg-blue-50 text-blue-700',
}

// ─── Typography helpers ────────────────────────────────────────────────────────

function Para({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-foreground/70 mt-3 font-sans text-[14px] leading-[1.8] font-normal sm:text-[15px]">
      {children}
    </p>
  )
}

function Quote({ children }: { children: React.ReactNode }) {
  return (
    <p className="border-primary/25 text-primary/80 mt-3 border-l-2 pl-3 font-sans text-[14px] leading-[1.8] font-normal italic sm:text-[15px]">
      {children}
    </p>
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
    <div className="mt-10">
      <h2 className="text-foreground mb-4 border-b border-gray-200 pb-3 font-sans text-[16px] leading-snug font-bold">
        {title}
      </h2>
      {children}
    </div>
  )
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-3 space-y-2 pl-10">
      {items.map((item, i) => (
        <li
          key={i}
          className="text-foreground/70 list-disc font-sans text-[14px] leading-[1.8] font-normal sm:text-[15px]"
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
    <>
      <Para>{t('joinUsPage.physio.intro')}</Para>
      <Quote>{t('joinUsPage.physio.question')}</Quote>

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
    </>
  )
}

function EngineeringContent() {
  const { t } = useTranslation()
  return (
    <>
      <Para>{t('joinUsPage.engineering.intro')}</Para>
      <Para>{t('joinUsPage.engineering.nowChallenge')}</Para>

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
    </>
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
        <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-white px-6">
          <p className="text-foreground/60 text-[15px]">Position not found.</p>
          <Link
            href={`/${locale}/join-us#open-roles`}
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
      <main className="min-h-screen bg-white">
        <div className="mx-auto max-w-[700px] px-6 py-10 sm:py-14">
          {/* ── Back link ── */}
          <div className="border-border mb-10 border-b pb-6">
            <Link
              href={`/${locale}/join-us#open-roles`}
              prefetch={true}
              className="text-primary inline-flex items-center gap-1.5 text-[13px] font-medium transition-opacity hover:opacity-80"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t('joinUsPage.backToPositions')}
            </Link>
          </div>

          {/* ── Department badge ── */}
          <div className="mb-6">
            <span
              className={cn(
                'inline-block rounded-sm px-3 py-1.5 text-[12px] font-bold tracking-wider uppercase',
                BADGE_COLORS[job.badge]
              )}
            >
              {t(`joinUsPage.${job.id}.department`)}
            </span>
          </div>

          {/* ── Title ── */}
          <h1 className="text-foreground mb-6 text-[36px] leading-[1.1] font-bold sm:text-[48px]">
            {t(`joinUsPage.${job.id}.title`)}
          </h1>

          {/* ── Meta ── */}
          <div className="text-muted-foreground mb-12 flex flex-wrap gap-x-6 gap-y-2 text-[15px]">
            <span className="flex items-center gap-2">
              <Clock className="h-4 w-4 shrink-0" aria-hidden />
              {t(`joinUsPage.${job.id}.employmentType`)}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 shrink-0" aria-hidden />
              {t(`joinUsPage.${job.id}.location`)}
            </span>
          </div>

          {/* ── Body content ── */}
          {job.id === 'physio' && <PhysioContent />}
          {job.id === 'engineering' && <EngineeringContent />}

          {/* ── Contact footer ── */}
          <div className="mt-10 border-t pt-6">
            <p className="text-foreground/70 font-sans text-[14px] leading-[1.8] font-normal sm:text-[15px]">
              {t(`joinUsPage.${job.id}.contactCtaText`)}{' '}
              <a
                href={`mailto:${t('joinUsPage.contactEmail')}`}
                className="text-primary transition-opacity hover:opacity-80"
              >
                {t('joinUsPage.contactEmail')}
              </a>
            </p>
            <p className="text-foreground/70 mt-1 font-sans text-[14px] leading-[1.8] font-normal sm:text-[15px]">
              {t(`joinUsPage.${job.id}.addressLineText`)}{' '}
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

          {/* ── Apply button ── */}
          <div className="mt-12 pb-20">
            <Link
              href={`/${locale}#contact`}
              className="bg-primary hover:bg-primary-hover inline-flex items-center gap-3 rounded-lg px-8 py-4 text-[16px] font-semibold text-white transition-colors"
            >
              <Mail className="h-5 w-5" aria-hidden />
              {t('joinUsPage.applyButton')}
            </Link>
          </div>
        </div>
      </main>
      <PartnersSection />
      <FooterSection />
    </>
  )
}

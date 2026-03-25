'use client'

import Link from 'next/link'
import { useParams } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { Typography } from '@/components/ui/typography'

interface Section {
  id: string
  title: string
  content: React.ReactNode
}

const SECTIONS: Section[] = [
  {
    id: '1',
    title: '1. Introduction',
    content: (
      <div className="flex flex-col gap-3">
        <p>
          Twinspire is a digital platform designed to support athlete
          performance, injury prevention, and applied sports research.
        </p>
        <p>This policy explains:</p>
        <ul className="flex flex-col gap-1 pl-4">
          <li>what data we collect</li>
          <li>how it is used</li>
          <li>who can access it</li>
          <li>how it is stored</li>
          <li>your rights as a user</li>
        </ul>
        <p>
          By using Twinspire, you acknowledge and agree to the practices
          described in this policy.
        </p>
      </div>
    ),
  },
  {
    id: '2',
    title: '2. Who this policy applies to',
    content: (
      <div className="flex flex-col gap-3">
        <p>This policy applies to:</p>
        <ul className="flex flex-col gap-1 pl-4">
          <li>Athletes (players) using Twinspire</li>
          <li>
            Performance staff (coaches, physiotherapists, medical staff,
            analysts)
          </li>
          <li>
            Authorized administrators within participating teams or
            organizations
          </li>
        </ul>
        <p>
          Different roles have different access rights, but all users are bound
          by this policy.
        </p>
      </div>
    ),
  },
  {
    id: '3',
    title: '3. What data we collect',
    content: (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-foreground font-semibold">3.1 Athlete data</p>
          <p>Depending on your team setup, Twinspire may collect:</p>
          <ul className="flex flex-col gap-1 pl-4">
            <li>
              Training and match load data (e.g. distance, speed, acceleration)
            </li>
            <li>Physiological data (e.g. heart rate, recovery metrics)</li>
            <li>
              Wellness and self-reported data (e.g. readiness, soreness, sleep
              quality)
            </li>
            <li>Injury-related information entered by authorized staff</li>
            <li>Session metadata (date, duration, activity type)</li>
          </ul>
          <p>Data may originate from:</p>
          <ul className="flex flex-col gap-1 pl-4">
            <li>Wearable devices</li>
            <li>Testing systems</li>
            <li>Team management systems</li>
            <li>Manual inputs via the Twinspire app or web platform</li>
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-foreground font-semibold">3.2 Staff data</p>
          <p>For performance staff, Twinspire may collect:</p>
          <ul className="flex flex-col gap-1 pl-4">
            <li>Name, role, and team affiliation</li>
            <li>Login and access metadata</li>
            <li>Actions performed within the platform</li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: '4',
    title: '4. How data is used',
    content: (
      <div className="flex flex-col gap-3">
        <p>Twinspire uses data solely for the following purposes:</p>
        <ul className="flex flex-col gap-1 pl-4">
          <li>Supporting day-to-day performance and training decisions</li>
          <li>Monitoring workload and recovery trends</li>
          <li>Supporting injury prevention and rehabilitation processes</li>
          <li>Providing insights and visualizations to athletes and staff</li>
          <li>Internal analysis and platform improvement</li>
          <li>Aggregated and anonymized research and reporting</li>
        </ul>
        <p>
          Twinspire does not sell personal data and does not use data for
          advertising purposes.
        </p>
      </div>
    ),
  },
  {
    id: '5',
    title: '5. Who can access the data',
    content: (
      <div className="flex flex-col gap-5">
        <div className="flex flex-col gap-2">
          <p className="text-foreground font-semibold">
            5.1 Athlete data access
          </p>
          <p>Athlete data may be accessed by:</p>
          <ul className="flex flex-col gap-1 pl-4">
            <li>The athlete themselves</li>
            <li>
              Authorized performance and medical staff within the same team
            </li>
            <li>
              Authorized Twinspire personnel for technical support and system
              maintenance
            </li>
          </ul>
          <p>Access is role-based and limited to what is necessary.</p>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-foreground font-semibold">
            5.2 Staff responsibilities
          </p>
          <p>Staff users agree to:</p>
          <ul className="flex flex-col gap-1 pl-4">
            <li>Treat athlete data as confidential</li>
            <li>Access data only for professional and approved purposes</li>
            <li>Not share data outside authorized contexts</li>
            <li>Follow applicable team, institutional, and legal guidelines</li>
          </ul>
          <p>Misuse of data may result in access revocation.</p>
        </div>
      </div>
    ),
  },
  {
    id: '6',
    title: '6. Data storage and security',
    content: (
      <div className="flex flex-col gap-3">
        <ul className="flex flex-col gap-1 pl-4">
          <li>
            Data is stored on secure cloud infrastructure located within the
            European Union
          </li>
          <li>
            Industry-standard security practices are used, including access
            controls and logging
          </li>
          <li>Raw source data is stored immutably for traceability</li>
          <li>Processed data is stored in controlled analytical databases</li>
        </ul>
        <p>
          While no system can guarantee absolute security, Twinspire takes data
          protection seriously and applies appropriate technical and
          organizational measures.
        </p>
      </div>
    ),
  },
  {
    id: '7',
    title: '7. Data retention',
    content: (
      <ul className="flex flex-col gap-1 pl-4">
        <li>
          Data is retained for as long as necessary to support team operations
          and analysis
        </li>
        <li>
          Retention may vary depending on team agreements and regulatory
          requirements
        </li>
        <li>
          When data is no longer needed, it may be archived or deleted in
          accordance with applicable policies
        </li>
      </ul>
    ),
  },
  {
    id: '8',
    title: '8. Research and anonymization',
    content: (
      <div className="flex flex-col gap-3">
        <p>Twinspire may use data in aggregated and anonymized form for:</p>
        <ul className="flex flex-col gap-1 pl-4">
          <li>Internal research</li>
          <li>Platform validation</li>
          <li>Academic or applied sports research collaborations</li>
        </ul>
        <p>
          No published or shared research will identify individual athletes.
        </p>
      </div>
    ),
  },
  {
    id: '9',
    title: '9. Your rights',
    content: (
      <div className="flex flex-col gap-3">
        <p>You have the right to:</p>
        <ul className="flex flex-col gap-1 pl-4">
          <li>Request access to your personal data</li>
          <li>Request correction of inaccurate data</li>
          <li>
            Request deletion of your data, subject to legal and contractual
            obligations
          </li>
          <li>Ask how your data is being used</li>
        </ul>
        <p>
          Requests can be made through your team or by contacting Twinspire
          directly.
        </p>
      </div>
    ),
  },
  {
    id: '10',
    title: '10. Consent and withdrawal',
    content: (
      <ul className="flex flex-col gap-1 pl-4">
        <li>Consent is required before using Twinspire</li>
        <li>Consent is recorded with a timestamp and version</li>
        <li>
          Withdrawal of consent may limit or terminate access to the platform
        </li>
        <li>
          Certain data may need to be retained for legal or contractual reasons
        </li>
      </ul>
    ),
  },
  {
    id: '11',
    title: '11. Changes to this policy',
    content: (
      <ul className="flex flex-col gap-1 pl-4">
        <li>This policy may be updated over time</li>
        <li>Material changes will result in a new policy version</li>
        <li>Users may be asked to re-consent when significant updates occur</li>
        <li>Historical consent records are retained for audit purposes</li>
      </ul>
    ),
  },
  {
    id: '12',
    title: '12. Contact',
    content: (
      <div className="flex flex-col gap-2">
        <p>For questions about this policy or your data:</p>
        <p className="text-foreground font-semibold">Twinspire</p>
        <p>
          Email:{' '}
          <a
            href="mailto:info@twinspire.ai"
            className="text-primary underline underline-offset-2 transition-opacity hover:opacity-80"
          >
            info@twinspire.ai
          </a>
        </p>
      </div>
    ),
  },
]

/**
 * PrivacyPage — Full Data Consent & Privacy Policy page.
 * Accessible at /{locale}/privacy
 */
export default function PrivacyPage() {
  const { locale } = useParams<{ locale: string }>()

  return (
    <div className="bg-background min-h-screen">
      {/* Top nav bar */}
      <div className="border-border border-b">
        <div className="section-inner section-x mx-auto flex items-center justify-between py-4">
          <Link
            href={`/${locale}`}
            className="group text-foreground/60 hover:text-foreground flex items-center gap-2 text-sm transition-colors"
          >
            <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <span className="text-foreground/40 text-xs tracking-widest uppercase">
            Twinspire
          </span>
        </div>
      </div>

      <main className="section-inner section-x mx-auto py-16 md:py-24">
        {/* Header */}
        <div className="border-border mb-12 border-b pb-10 md:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span className="bg-primary/10 text-primary rounded-full px-3 py-1 text-[11px] font-semibold tracking-widest uppercase">
              v1.0
            </span>
            <span className="text-foreground/40 text-[11px]">
              Last updated: 20 January 2026
            </span>
          </div>
          <Typography
            variant="title"
            as="h1"
            textColor="default"
            className="text-[28px] leading-[1.1] tracking-[-0.025em] sm:text-[36px] lg:text-[44px]"
          >
            Data Consent &amp; Privacy Policy
          </Typography>
          <p className="text-foreground/60 mt-4 max-w-2xl text-[14px] leading-[1.75] sm:text-[15px]">
            This policy covers how Twinspire collects, uses, and protects
            personal data across its platform. It applies to all athletes,
            performance staff, and administrators.
          </p>
        </div>

        {/* Policy sections */}
        <div className="divide-border flex flex-col divide-y">
          {SECTIONS.map((section) => (
            <div
              key={section.id}
              id={`section-${section.id}`}
              className="py-8 md:grid md:grid-cols-[220px_1fr] md:gap-12 md:py-10"
            >
              <h2 className="text-foreground mb-4 text-[13px] font-bold md:mb-0 md:pt-px">
                {section.title}
              </h2>
              <div className="text-foreground/65 [&_ul]:marker:text-primary text-[13px] leading-[1.8] [&_li]:leading-[1.8] [&_ul]:list-disc">
                {section.content}
              </div>
            </div>
          ))}
        </div>

        {/* Footer rule */}
        <div className="border-border mt-12 border-t pt-8 text-center">
          <p className="text-foreground/40 text-[11px] tracking-wider uppercase">
            End of Policy · Twinspire Neural Solutions · © 2026
          </p>
        </div>
      </main>
    </div>
  )
}

'use client'

import { Typography } from '@/components/ui/typography'
import { useTranslation } from '@/i18n'
import { TeamMember } from './TeamMember'
import {
  founders,
  advisers,
  teamMembers,
  type TeamMemberData,
} from './teamData'

interface TeamGroupProps {
  label: string
  members: TeamMemberData[]
  /** Grid columns class — founders use fewer cols since there are only 2 */
  gridClassName?: string
}

/**
 * TeamGroup — Labelled sub-section of the team grid.
 * Renders a thin divider row with the group name, then a responsive card grid.
 */
function TeamGroup({ label, members, gridClassName }: TeamGroupProps) {
  return (
    <div className="w-full">
      {/* Group label row */}
      <div className="mb-5 flex items-center gap-4">
        <Typography
          variant="heading"
          as="p"
          textColor="default"
          className="text-foreground/50 shrink-0 text-[11px] tracking-widest uppercase"
        >
          {label}
        </Typography>
        <div className="bg-border h-px flex-1" />
      </div>

      {/* Member grid */}
      <div
        className={
          gridClassName ??
          'grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5 xl:grid-cols-5'
        }
      >
        {members.map((member, index) => (
          <TeamMember
            key={`${member.name}-${index}`}
            name={member.name}
            role={member.role}
            image={member.image}
            linkedin={member.linkedin}
          />
        ))}
      </div>
    </div>
  )
}

/**
 * TeamSection — "Built by People Who've Been on the Treatment Table"
 *
 * Three labelled groups:
 *  - Founders   (Co-Founders)
 *  - Advisers
 *  - Team       (the rest)
 *
 * Adapts responsively: 2 cols on mobile → up to 5 on wide screens.
 */
export function TeamSection() {
  const { t } = useTranslation()

  return (
    <section id="team" className="w-full bg-white px-6 py-14 lg:px-8 lg:py-20">
      <div className="mx-auto w-full max-w-[1320px]">
        {/* Heading */}
        <Typography
          variant="title"
          as="h2"
          textColor="default"
          className="mb-10 max-w-[820px] text-left text-[28px] leading-[1.05] tracking-[-0.03em] sm:text-[40px] lg:mb-14 lg:text-[52px]"
        >
          {t('team.heading')}
        </Typography>

        {/* Groups */}
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* ── Founders ── */}
          <TeamGroup
            label={t('team.founders')}
            members={founders}
            gridClassName="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:gap-4 xl:grid-cols-6"
          />

          {/* ── Advisers ── */}
          <TeamGroup
            label={t('team.advisers')}
            members={advisers}
            gridClassName="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:gap-4 xl:grid-cols-6"
          />

          {/* ── Team ── */}
          <TeamGroup
            label={t('team.team')}
            members={teamMembers}
            gridClassName="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:gap-4 xl:grid-cols-6"
          />
        </div>
      </div>
    </section>
  )
}

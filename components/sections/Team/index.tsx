'use client'

import { Typography } from '@/components/ui/typography'
import {
  AnimateIn,
  StaggerContainer,
  StaggerItem,
} from '@/components/ui/animate-in'
import { useTranslation } from '@/i18n'
import { TeamMember } from './TeamMember'
import { founders, advisers, teamMembers } from './teamData'

/**
 * TeamSection — Unified team grid + separate advisers subsection.
 *
 * Layout:
 *  - Section heading
 *  - One combined responsive grid for all team members (founders + team)
 *  - A visually separated "Advisers" subsection below
 */
export function TeamSection() {
  const { t } = useTranslation()

  return (
    <section id="team" className="bg-background relative z-10 w-full">
      <div className="section-x section-y section-inner mx-auto">
        {/* Heading */}
        <AnimateIn variant="fadeUp">
          <Typography
            variant="title"
            as="h2"
            textColor="default"
            className="mb-10 max-w-[820px] text-left lg:mb-14"
          >
            {t('team.heading')}
          </Typography>
        </AnimateIn>

        {/* ── All team members (founders + research) ─────────────────────── */}
        <StaggerContainer
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5 xl:grid-cols-5"
          stagger={0.07}
        >
          {[...founders, ...teamMembers].map((member, index) => (
            <StaggerItem key={`${member.name}-${index}`}>
              <TeamMember
                name={member.name}
                role={t(member.role as Parameters<typeof t>[0])}
                image={member.image}
                linkedin={member.linkedin}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* ── Advisers ──────────────────────────────────────────────────── */}
        <div className="mt-16 w-full lg:mt-20">
          {/* Divider row with label */}
          <AnimateIn variant="fadeIn" className="mb-6 flex items-center gap-4">
            <Typography
              variant="heading"
              as="p"
              textColor="default"
              className="text-foreground/50 shrink-0 text-[11px] tracking-widest uppercase"
            >
              {t('team.advisers')}
            </Typography>
            <div className="bg-border h-px flex-1" />
          </AnimateIn>

          <StaggerContainer
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5 xl:grid-cols-5"
            stagger={0.07}
          >
            {advisers.map((member, index) => (
              <StaggerItem key={`adviser-${member.name}-${index}`}>
                <TeamMember
                  name={member.name}
                  role={t(member.role as Parameters<typeof t>[0])}
                  image={member.image}
                  linkedin={member.linkedin}
                />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </div>
    </section>
  )
}

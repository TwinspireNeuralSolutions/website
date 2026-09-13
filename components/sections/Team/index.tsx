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

export function TeamSection() {
  const { t, locale } = useTranslation()

  const displayRole = (name: string, role: string) => {
    if (name === 'Daryan Kamalifar' || name === 'Roxane Maar') {
      return locale === 'da' ? 'Medstifter' : 'Co-Founder'
    }
    return t(role as Parameters<typeof t>[0])
  }

  return (
    <section id="team" className="bg-background relative z-10 w-full">
      <div className="section-x section-y section-inner mx-auto">
        <AnimateIn variant="fadeUp">
          <h2 className="mb-4 text-center text-[22px] leading-[1.2] tracking-wide uppercase sm:text-[28px] lg:mb-6 lg:text-[32px]">
            <span className="text-foreground font-bold">
              {t('team.heading')}
            </span>{' '}
            <span className="text-primary font-bold">
              {t('team.headingAccent')}
            </span>
          </h2>
        </AnimateIn>

        <div className="mb-16 lg:mb-20" />
        <StaggerContainer
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5"
          stagger={0.07}
        >
          {[...founders, ...teamMembers].map((member, index) => (
            <StaggerItem key={`${member.name}-${index}`}>
              <TeamMember
                name={member.name}
                role={displayRole(member.name, member.role)}
                description={
                  member.description
                    ? t(member.description as Parameters<typeof t>[0])
                    : undefined
                }
                readBioLabel={
                  member.description ? t('team.readBio') : undefined
                }
                image={member.image}
                linkedin={member.linkedin}
              />
            </StaggerItem>
          ))}
        </StaggerContainer>

        <div className="mt-16 w-full lg:mt-20">
          <AnimateIn variant="fadeIn" className="mb-6 flex items-center gap-4">
            <Typography
              variant="heading"
              as="p"
              textColor="default"
              className="text-foreground/80 shrink-0 text-[11px] tracking-widest uppercase"
            >
              {t('team.advisers')}
            </Typography>
            <div className="bg-border h-px flex-1" />
          </AnimateIn>

          <StaggerContainer
            className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:gap-5"
            stagger={0.07}
          >
            {advisers.map((member, index) => (
              <StaggerItem key={`adviser-${member.name}-${index}`}>
                <TeamMember
                  name={member.name}
                  role={displayRole(member.name, member.role)}
                  description={
                    member.description
                      ? t(member.description as Parameters<typeof t>[0])
                      : undefined
                  }
                  readBioLabel={
                    member.description ? t('team.readBio') : undefined
                  }
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

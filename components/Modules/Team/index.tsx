'use client'

import Layout from '@/components/Layout'
import { TeamMember } from './TeamMember'
import { teamData } from './teamData'

export const Team = () => {
  return (
    <Layout
      id="team"
      sectionClassName="bg-white px-6 lg:px-8"
      className="max-w-[1650px] py-10 sm:py-12 lg:py-14"
    >
      <div className="mx-auto w-full max-w-[1320px]">
        <h2 className="mb-8 max-w-[920px] text-left text-[30px] leading-[1] font-medium tracking-[-0.03em] text-slate-900 sm:mb-9 sm:text-[40px] lg:text-[52px]">
          Built by People Who've Been on the Treatment Table
        </h2>

        <div className="mx-auto max-w-[1080px]">
          <div className="grid gap-4 sm:grid-cols-2 lg:gap-5 xl:grid-cols-4">
            {teamData.map((member, index) => (
              <TeamMember
                key={index}
                name={member.name}
                role={member.role}
                image={member.image}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

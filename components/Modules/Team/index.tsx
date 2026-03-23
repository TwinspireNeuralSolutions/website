'use client'

import { H1, H3 } from '@/components/Atoms'
import Layout from '@/components/Layout'
import { TeamMember } from './TeamMember'
import { teamData } from './teamData'

export const Team = () => {
  return (
    <Layout id="team" sectionClassName="bg-white" className="py-20">
      <div className="text-center">
        <H1 className="mb-4" color="black">
          Built by People Who've Been on the Treatment Side
        </H1>

        <H3 className="mx-auto mb-16 max-w-2xl text-gray-600">
          Our team combines clinical expertise, engineering excellence, and
          real-world experience.
        </H3>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {teamData.map((member, index) => (
          <TeamMember
            key={index}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </Layout>
  )
}

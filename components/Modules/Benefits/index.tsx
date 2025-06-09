'use client'

import { H1 } from 'components'
import Layout from 'components/Layout'
import { physioDefinitions, sportTeamDefinitions } from './definitions'
import { AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedBenefits } from './AnimatedBenefits'

export const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null as unknown as HTMLElement)
  const isInView = useInView(sectionRef)

  return (
    <Layout
      id="benefits"
      ref={sectionRef}
      sectionClassName="min-h-screen bg-neutral-900"
      className="flex min-h-screen gap-30"
    >
      <H1 className="flex-1" sticky>
        Benefits for {true ? 'Sports Teams' : 'Physio'}
      </H1>

      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <AnimatedBenefits
            key="sport"
            data={sportTeamDefinitions}
            name="Sports Teams"
          />

          <AnimatedBenefits
            key="physio"
            data={physioDefinitions}
            name="Physiotherapists"
          />
        </AnimatePresence>
      </div>
    </Layout>
  )
}

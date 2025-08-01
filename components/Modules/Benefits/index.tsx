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
      sectionClassName="bg-neutral-900 "
      className="flex min-h-screen flex-wrap gap-30"
    >
      <H1 sticky className="md:pt-30">
        Benefits for {true ? 'Sports Teams' : 'Physio'}
      </H1>

      <div className="flex w-full flex-1 flex-col">
        <AnimatePresence mode="wait">
          <AnimatedBenefits
            key="sports-teams"
            data={sportTeamDefinitions}
            name="Sports Teams"
            className="mt-0 lg:mt-50"
          />

          <AnimatedBenefits
            key="physiotherapists"
            data={physioDefinitions}
            name="Physiotherapists"
            className="mt-40 lg:mt-50"
          />
        </AnimatePresence>
      </div>
    </Layout>
  )
}

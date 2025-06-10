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
      sectionClassName="min-h-screen  bg-neutral-900 overflow-x-hidden"
      className="flex min-h-screen flex-wrap gap-30"
    >
      <H1 className="flex-1 text-center lg:text-left" sticky>
        Benefits for {true ? 'Sports Teams' : 'Physio'}
      </H1>

      <div className="flex w-full flex-1 flex-col">
        <AnimatePresence mode="wait">
          <AnimatedBenefits
            data={sportTeamDefinitions}
            name="Sports Teams"
            className="mt-0 lg:mt-250"
          />

          <AnimatedBenefits
            data={physioDefinitions}
            name="Physiotherapists"
            className="mt-40 lg:mt-250"
          />
        </AnimatePresence>
      </div>
    </Layout>
  )
}

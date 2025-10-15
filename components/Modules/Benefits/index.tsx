'use client'

import { H1 } from 'components'
import Layout from 'components/Layout'
import { physioDefinitions, sportTeamDefinitions } from './definitions'
import { AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { AnimatedBenefits } from './AnimatedBenefits'

export const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null as unknown as HTMLElement)

  return (
    <Layout
      id="solutions"
      ref={sectionRef}
      sectionClassName="bg-neutral-900"
      className="relative min-h-screen"
    >
      <div className="flex min-h-screen flex-col gap-8 md:flex-row md:items-start md:gap-30">
        <div className="h-full w-full md:sticky md:top-30 md:flex md:w-1/2">
          <H1 className="w-full md:text-left">Solutions for Sports Teams</H1>
        </div>

        <div className="flex w-full flex-col md:min-h-screen md:w-1/2 md:py-20">
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
      </div>
    </Layout>
  )
}

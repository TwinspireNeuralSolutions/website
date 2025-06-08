'use client'

import { H1 } from 'components'
import Layout from 'components/Layout'
import { physioDefinitions, sportTeamDefinitions } from './definitions'
import { AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import { useSectionScrollProgress, useSectionMultiStepProgress } from 'hooks'
import { AnimatedBenefits } from './AnimatedBenefits'

export const Benefits = () => {
  const sectionRef = useRef<HTMLElement>(null as unknown as HTMLElement)
  const progress = useSectionScrollProgress(sectionRef, 200)
  const { step, stepProgress, overallProgress } = useSectionMultiStepProgress(
    sectionRef,
    [200, 1500, 1500]
  )

  return (
    <Layout
      ref={sectionRef}
      sectionClassName="min-h-screen bg-neutral-900"
      className="flex min-h-screen gap-30"
    >
      {/* Sticky left section */}
      <div className="sticky top-0 flex h-[90%] max-w-[50%] flex-col items-center justify-between pt-30 text-white">
        <H1 progress={progress}>
          Benefits for {step <= 1 ? 'Sports Teams' : 'Physio'}
        </H1>

        <div className="mt-30 mb-12 flex w-full gap-2">
          {/* Animated progress bar */}
          <span
            className={`h-[6px] flex-1 overflow-hidden rounded-full bg-gray-500 transition-all`}
            style={{
              position: 'relative',
              background: '#9ca3af',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${step >= 1 ? 100 : 0}%`,
                background: '#fff',
                borderRadius: '9999px',
                transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          </span>
          {/* Static gray bar */}
          <span
            className={`h-[6px] flex-1 overflow-hidden rounded-full bg-gray-500 transition-all`}
            style={{
              position: 'relative',
              background: '#9ca3af',
            }}
          >
            <span
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                height: '100%',
                width: `${step >= 2 ? 100 : 0}%`,
                background: '#fff',
                borderRadius: '9999px',
                transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            />
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col">
        <AnimatePresence mode="wait">
          <AnimatedBenefits key="sport" data={sportTeamDefinitions} />

          <AnimatedBenefits key="physio" data={physioDefinitions} />
        </AnimatePresence>
      </div>
    </Layout>
  )
}

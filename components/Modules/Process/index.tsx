'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

import Layout from '@/components/Layout'
import { H1, H2 } from '@/components'
import { processDefinitions } from './definitions'
import { ProcessSteps } from './ProcessSteps'

const stepVariants = {
  hidden: {
    opacity: 0,
    x: -40,
    scale: 0.95,
  },
  inactive: {
    opacity: 0.4,
    x: -20,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  active: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
}

export const Process = () => {
  const textRef0 = useRef(null)
  const textRef1 = useRef(null)
  const textRef2 = useRef(null)
  const textRefs = [textRef0, textRef1, textRef2]

  const inView0 = useInView(textRef0, {
    margin: '-20% 0px -20% 0px',
    amount: 0.3,
  })
  const inView1 = useInView(textRef1, {
    margin: '-20% 0px -20% 0px',
    amount: 0.3,
  })
  const inView2 = useInView(textRef2, {
    margin: '-20% 0px -20% 0px',
    amount: 0.3,
  })

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const inViews = [inView0, inView1, inView2]
    const step = inViews.findIndex(Boolean)
    if (step !== -1 && step !== activeStep) setActiveStep(step)
  }, [inView0, inView1, inView2, activeStep])

  return (
    <Layout id="process" className="relative min-h-screen">
      <div className="flex min-h-screen flex-col gap-8 md:flex-row md:items-start md:gap-30">
        <div className="h-full w-full md:sticky md:top-30 md:flex md:w-1/2">
          <H1 color="black" className="w-full md:text-left">
            How Twinspire Delivers Actionable Insights
          </H1>
        </div>

        <div className="flex w-full flex-col md:min-h-screen md:w-1/2 md:flex-row md:py-20">
          <div className="sticky top-20 z-10 h-[100px] flex-1 bg-white pt-0 md:top-0 md:h-[60%] md:pt-30">
            <ProcessSteps activeStep={activeStep} />
          </div>
          <div className="mb-10 flex flex-1 flex-col justify-center">
            {processDefinitions.map(({ title, description }, index) => {
              const isInView = [inView0, inView1, inView2][index]
              const isActive = activeStep === index

              return (
                <motion.div
                  key={index}
                  ref={textRefs[index]}
                  variants={stepVariants}
                  initial="hidden"
                  animate={
                    isInView ? (isActive ? 'active' : 'inactive') : 'hidden'
                  }
                  className={`mt-50 pl-4 md:mt-100 ${index === 0 ? 'md:mt-0' : ''}`}
                >
                  <H2>{title}</H2>
                  <div
                    className="max-w-sm text-sm"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </Layout>
  )
}

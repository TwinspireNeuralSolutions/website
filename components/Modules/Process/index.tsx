'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useMediaQuery } from 'react-responsive'

import Layout from '@/components/Layout'
import { H1, H2 } from '@/components'
import { processDefinitions } from './definitions'
import { ProcessSteps } from './ProcessSteps'

export const Process = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
  const textRefs = [useRef(null), useRef(null), useRef(null)]

  const inViews = textRefs.map((ref) =>
    useInView(ref, { margin: '-40% 0px -40% 0px', amount: 0.5 })
  )
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const step = inViews.findIndex(Boolean)
    if (step !== -1 && step !== activeStep) setActiveStep(step)
  }, [inViews, activeStep])

  return (
    <Layout
      id="process"
      className="flex min-h-screen flex-wrap items-start justify-center"
    >
      <H1 sticky={!isMobile} color="black" className="md:pt-30">
        How Twinspire Delivers Actionable Insights
      </H1>
      <div className="sticky top-20 h-[100px] flex-1 bg-white pt-0 md:top-0 md:h-[60%] md:pt-30">
        <ProcessSteps activeStep={activeStep} />
      </div>
      <div className="mb-10 flex flex-1 flex-col justify-center">
        {processDefinitions.map(({ title, description }, index) => (
          <motion.div
            key={index}
            ref={textRefs[index]}
            initial={{ opacity: 0, x: 0 }}
            animate={
              activeStep === index
                ? { opacity: 1, x: 0 }
                : { opacity: 0.0, x: 0 }
            }
            transition={{ duration: 0.4 }}
            className={`mt-50 md:mt-100 ${index === 0 ? 'md:mt-0' : ''}`}
          >
            <H2>{title}</H2>
            <p className="max-w-sm text-sm">{description}</p>
          </motion.div>
        ))}
      </div>
    </Layout>
  )
}

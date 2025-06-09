'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import Layout from 'components/Layout'
import { H1, H2 } from 'components'
import { processDefinitions } from './definitions'
import { ProcessSteps } from './ProcessSteps'

export const Process = () => {
  // 1. One ref for each text block
  const textRefs = [useRef(null), useRef(null), useRef(null)]
  // 2. One inView value for each block
  const inViews = textRefs.map((ref) =>
    useInView(ref, { margin: '-40% 0px -40% 0px', amount: 0.5 })
  )
  const [activeStep, setActiveStep] = useState(0)

  // 3. UseEffect to update step whenever inView changes
  useEffect(() => {
    // Choose the last inView==true (lowest index wins if more than one)
    const step = inViews.findIndex(Boolean)
    if (step !== -1 && step !== activeStep) setActiveStep(step)
  }, [inViews, activeStep])

  return (
    <Layout
      id="process"
      className="flex min-h-screen items-start justify-center"
    >
      <H1 sticky color="black" className="pt-30">
        How Twinspire Delivers Actionable Insights
      </H1>
      <div className="sticky top-0 h-[60%] flex-1 pt-30">
        <ProcessSteps activeStep={activeStep} />
      </div>
      <div className="mb-30 flex flex-1 flex-col justify-center">
        {processDefinitions.map(({ title, description }, index) => (
          <motion.div
            key={index}
            ref={textRefs[index]}
            initial={{ opacity: 0, x: 80 }}
            animate={
              activeStep === index
                ? { opacity: 1, x: 0 }
                : { opacity: 0.0, x: 100 }
            }
            transition={{ duration: 0.4 }}
            className="mt-100"
          >
            <H2>{title}</H2>
            <p className="max-w-sm text-sm">{description}</p>
          </motion.div>
        ))}
      </div>
    </Layout>
  )
}

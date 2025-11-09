'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Layout from '@/components/Layout'
import { H1, H3 } from '@/components/Atoms/Typography'
import {
  Activity,
  LineChart,
  Timer,
  AlertTriangle,
  Heart,
  Smartphone,
} from 'lucide-react'
import definitions from './definitions'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

export const Services = () => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  // Map icons to each service
  const serviceIcons = [
    Activity, // Pose Detection
    LineChart, // Progress Tracking
    Timer, // Performance Tracking
    AlertTriangle, // Injury Prediction
    Heart, // Rehabilitation Tracking
    Smartphone, // Device Integration
  ]

  return (
    <Layout
      id="services"
      className="flex min-h-screen w-full bg-white"
      sectionClassName="bg-white"
    >
      <div className="m-auto flex h-full w-full max-w-[1400px] flex-col px-4 py-20">
        <H1 className="mx-auto mb-6 text-center" color="black">
          Our Services
        </H1>
        <p className="mx-auto mb-16 max-w-2xl text-center text-lg text-gray-600">
          Advanced AI-powered solutions for performance optimization and injury
          prevention
        </p>
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="mx-auto grid max-w-7xl grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {definitions.map(({ title, description }, index) => {
            const Icon = serviceIcons[index]
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:scale-102 hover:shadow-xl"
              >
                <div className="relative z-10">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0802A3] p-3 shadow-md">
                    <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                  </div>
                  <div className="mt-4 mb-2 flex items-center gap-4">
                    <H3 className="text-xl font-semibold text-gray-800">
                      {title}
                    </H3>
                  </div>
                  <p
                    className="text-sm leading-relaxed text-gray-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </Layout>
  )
}

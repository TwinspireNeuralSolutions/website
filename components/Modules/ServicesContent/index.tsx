'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Layout from '@/components/Layout'
import { H1, H3 } from '@/components'
import {
  Activity,
  LineChart,
  Timer,
  AlertTriangle,
  Heart,
  Smartphone,
} from 'lucide-react'
import definitions from './definitions'

export const Services = () => {
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
      className="flex min-h-screen w-full bg-neutral-900 text-white"
      sectionClassName="bg-neutral-900"
    >
      <div className="m-auto flex h-full w-full max-w-[1400px] flex-col px-4 py-16">
        <H1 className="mx-auto mb-16 text-center">Our Services</H1>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {definitions.map(({ title, description }, index) => {
            const Icon = serviceIcons[index]
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-[#0802A3]/10 p-8 transition-all duration-300 hover:scale-102 hover:bg-[#0802A3]/15"
              >
                <div className="absolute top-0 right-0 -mt-16 -mr-16 h-32 w-32 rounded-full bg-[#0802A3]/5 blur-3xl transition-all duration-300 group-hover:bg-[#0802A3]/10" />
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-xl bg-[#0802A3]/20 p-3 text-[#0802A3] transition-colors duration-300 group-hover:bg-[#0802A3]/30">
                      <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </div>
                    <H3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-[#B5B2FF]">
                      {title}
                    </H3>
                  </div>
                  <p className="pl-[3.25rem] text-sm leading-relaxed text-gray-300">
                    {description}
                  </p>
                </div>
                <div className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 transform bg-gradient-to-r from-[#0802A3] via-[#B5B2FF] to-[#0802A3]/50 transition-transform duration-500 group-hover:scale-x-100" />
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

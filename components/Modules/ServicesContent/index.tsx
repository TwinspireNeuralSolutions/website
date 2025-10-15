'use client'

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
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {definitions.map(({ title, description }, index) => {
            const Icon = serviceIcons[index]
            return (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all duration-300 hover:scale-102 hover:shadow-xl"
              >
                <div className="relative z-10">
                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-xl bg-[#0802A3] p-3 shadow-md">
                      <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
                    </div>
                    <H3 className="text-xl font-semibold text-gray-800">
                      {title}
                    </H3>
                  </div>
                  <p
                    className="pl-[3.25rem] text-sm leading-relaxed text-gray-600"
                    dangerouslySetInnerHTML={{ __html: description }}
                  />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

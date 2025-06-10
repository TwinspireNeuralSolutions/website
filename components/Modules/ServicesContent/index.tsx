'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Layout from '@/components/Layout'
import { H1 } from '@/components'

export const Services = ({ className }: { className?: string }) => {
  const { isMobile } = useMediaQuery()
  const [activeIndex, setActiveIndex] = useState(isMobile ? 0 : 2)

  return (
    <Layout
      id="services"
      className="flex h-screen w-full bg-neutral-900 text-white"
      sectionClassName="bg-neutral-900"
    >
      <div className="m-auto flex h-full w-full max-w-[1400px] flex-col text-center">
        <H1 className="mb-10 md:mb-20">Our Services!</H1>
        <div
          className={`flex h-full w-full flex-col items-center gap-3 lg:flex-row ${className}`}
        >
          {[0, 1, 2, 3, 4].map((idx) => {
            const sizingClasses =
              idx === activeIndex
                ? 'w-full h-80 lg:h-full lg:w-full bg-white'
                : 'flex-none w-full h-4 lg:h-full lg:w-6 bg-gray-800 hover:bg-gray-700 cursor-pointer'

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`rounded-3xl transition-all duration-500 ease-in-out ${sizingClasses}`}
              />
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

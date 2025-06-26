'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import Layout from '@/components/Layout'
import { H1, H3 } from '@/components'
import definitions from './definitions'

export const Services = ({ className }: { className?: string }) => {
  const { isMobile } = useMediaQuery()
  const [activeIndex, setActiveIndex] = useState(0) // Default to middle item

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
          {definitions.map(({ title, description }, idx) => {
            const sizingClasses =
              idx === activeIndex
                ? 'w-full h-80 lg:h-full lg:w-full bg-white'
                : 'flex-none w-full h-6 lg:h-full lg:w-6 bg-gray-800 hover:bg-gray-700 cursor-pointer'

            return (
              <div
                key={idx}
                onClick={() => setActiveIndex(idx)}
                className={`flex items-center justify-center rounded-3xl transition-all duration-500 ease-in-out ${sizingClasses}`}
              >
                {idx !== activeIndex && (
                  <H3 className="origin-center rotate-0 text-center whitespace-nowrap text-white md:rotate-90">
                    {title}
                  </H3>
                )}
                <div className="flex flex-col gap-2 text-black">
                  {idx === activeIndex && <p>{description}</p>}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

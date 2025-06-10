'use client'

import { useState } from 'react'
import { useMediaQuery } from '@/hooks/useMediaQuery'

export const Services = ({ className }: { className?: string }) => {
  const { isMobile } = useMediaQuery()
  const [activeIndex, setActiveIndex] = useState(isMobile ? 0 : 2)

  return (
    <div
      className={`flex h-full w-full flex-col items-center gap-3 lg:flex-row ${className}`}
    >
      {[0, 1, 2, 3, 4].map((idx) => {
        const sizingClasses =
          idx === activeIndex
            ? 'w-full h-60 lg:h-full lg:w-full bg-white'
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
  )
}

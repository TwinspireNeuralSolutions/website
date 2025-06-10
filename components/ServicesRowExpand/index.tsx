'use client'

import { useState } from 'react'

export const ServicesRowExpand = ({ className }: { className?: string }) => {
  const [activeIndex, setActiveIndex] = useState(2)

  return (
    <div className={`flex h-full w-full items-center gap-3 ${className}`}>
      {[0, 1, 2, 3, 4].map((idx) => {
        const sizingClasses =
          idx === activeIndex
            ? 'flex-1 bg-white'
            : 'flex-none w-6 bg-gray-800 hover:bg-gray-700 cursor-pointer'

        return (
          <div
            key={idx}
            onClick={() => setActiveIndex(idx)}
            className={`${sizingClasses} h-full rounded-3xl transition-all duration-500 ease-in-out`}
          />
        )
      })}
    </div>
  )
}

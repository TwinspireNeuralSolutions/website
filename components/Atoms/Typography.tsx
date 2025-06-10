'use client'
import React, { useRef, useState } from 'react'
import { useMotionValueEvent } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useScroll } from 'framer-motion'

export const H1 = ({
  children,
  className = '',
  style = {},
  color = 'white',
  sticky = false,
}: {
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  color?: 'white' | 'black'
  sticky?: boolean
}) => {
  const sectionRef = useRef<HTMLHeadingElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['end end', 'start start'],
  })

  // Local state for the scroll progress [0, 1]
  const [progress, setProgress] = useState(0)
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(latest)
  })

  // Clamp progress to [0, 1]
  const safeProgress = Math.max(0, Math.min(1, progress))

  return (
    <h1
      ref={sectionRef}
      className={`z-10 max-w-5xl text-6xl font-bold uppercase lg:text-8xl ${color === 'white' ? 'text-white' : 'text-black'} ${sticky ? 'sticky top-0 h-[90%] flex-1' : ''} ${className}`}
      style={{
        ...(sticky
          ? {
              backgroundImage: `linear-gradient(to bottom, ${color} 50%, #9ca3af 50%)`,
              backgroundSize: '100% 200%',
              backgroundPosition: `0 ${100 - safeProgress * 100}%`,
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              WebkitTextFillColor: 'transparent',
              transition: 'background-position 0s linear',
              ...style,
            }
          : { ...style }),
      }}
    >
      {children}
    </h1>
  )
}

export const H2 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h2 className={`max-w-5xl text-5xl font-bold uppercase ${className}`}>
      {children}
    </h2>
  )
}
export const H3 = ({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <h3 className={`text-1xl max-w-5xl font-bold uppercase ${className}`}>
      {children}
    </h3>
  )
}

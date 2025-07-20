'use client'
import React, { useRef, useState } from 'react'
import { useMotionValueEvent } from 'framer-motion'
import { useScroll } from 'framer-motion'
import { useMediaQuery } from '@/hooks/useMediaQuery'

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
  const { isMobile } = useMediaQuery()

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

  return sticky && !isMobile ? (
    <h1
      ref={sectionRef}
      className={`z-10 max-w-5xl text-5xl font-bold uppercase md:text-6xl lg:text-8xl ${color === 'white' ? 'text-white' : 'text-black'} ${className}`}
      style={{
        position: 'sticky',
        top: 0,
        height: '90%',
        flex: 1,
        backgroundImage: `linear-gradient(to bottom, ${color} 50%, #9ca3af 50%)`,
        backgroundSize: '100% 200%',
        backgroundPosition: `0 ${100 - safeProgress * 100}%`,
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        transition: 'background-position 0s linear',
        ...style,
      }}
    >
      {children}
    </h1>
  ) : (
    <h1
      className={`max-w-5xl text-center text-5xl font-bold uppercase md:text-6xl lg:text-8xl ${color === 'white' ? 'text-white' : 'text-black'} ${className}`}
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
    <h2
      className={`max-w-2xl text-3xl font-bold uppercase md:text-4xl lg:text-5xl ${className}`}
    >
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
    <h3 className={`text-1xl max-w-xl font-bold uppercase ${className}`}>
      {children}
    </h3>
  )
}

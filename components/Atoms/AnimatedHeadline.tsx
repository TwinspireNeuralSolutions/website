'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ANIMATION_DURATION = 4000
const ANIMATION_CONFIG = {
  duration: 0.7,
  ease: [0.77, 0, 0.175, 1],
}

const words = [
  { text: 'SPORT TEAMS', color: 'bg-blue-400 text-white' },
  { text: 'ATHLETES', color: 'bg-[#0802A3] text-white' },
  { text: 'PHYSIOTHERAPY', color: 'bg-blue-600 text-white' },
] as const

export const AnimatedHeadline = () => {
  const [index, setIndex] = useState(0)

  // Memoize the interval callback
  const updateIndex = useCallback(() => {
    setIndex((currentIndex) => (currentIndex + 1) % words.length)
  }, [])

  useEffect(() => {
    const interval = setInterval(updateIndex, ANIMATION_DURATION)
    return () => clearInterval(interval)
  }, [updateIndex])

  return (
    <h1 className="text-center text-3xl leading-tight font-bold sm:text-5xl md:text-6xl lg:text-8xl">
      REHABILITATION REIMAGINED FOR{' '}
      <span className="relative inline-block h-[1.4em] w-[18ch] overflow-hidden align-middle">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={index}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -60, opacity: 0 }}
            transition={ANIMATION_CONFIG}
            className={`absolute inset-0 flex items-center justify-center ${words[index].color} rounded-lg px-8 shadow-lg`}
            style={{
              minHeight: '1.3em',
              fontWeight: 'bold',
              fontFamily: 'Roboto, sans-serif',
              letterSpacing: '0.04em',
              padding: '0.5rem 2rem',
            }}
            aria-label={words[index].text}
          >
            {words[index].text}
          </motion.div>
        </AnimatePresence>
      </span>
      <br />
      WITH TWINSPIRE
    </h1>
  )
}

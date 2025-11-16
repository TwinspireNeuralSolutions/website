'use client'

import { ReactNode } from 'react'
import { AnimatedParticles } from './AnimatedParticles'
import { BackgroundVideo } from './BackgroundVideo'

interface HeroBackgroundProps {
  children: ReactNode
  className?: string
  showVideo?: boolean
  showParticles?: boolean
  particlesOpacity?: number
  videoOpacity?: number
  videoSrc?: string
  videoDelay?: number
}

/**
 * Reusable hero background wrapper component
 * Combines gradient background, animated particles, and video background
 * Used across hero sections and admin pages for consistent styling
 */
export function HeroBackground({
  children,
  className = '',
  showVideo = true,
  showParticles = true,
  particlesOpacity = 20,
  videoOpacity = 30,
  videoSrc,
  videoDelay,
}: HeroBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#0a0a2e] via-[#16213e] to-[#0f3460] ${className}`}
    >
      {showParticles && <AnimatedParticles opacity={particlesOpacity} />}
      {showVideo && (
        <BackgroundVideo
          src={videoSrc}
          opacity={videoOpacity}
          delay={videoDelay}
        />
      )}
      {children}
    </div>
  )
}


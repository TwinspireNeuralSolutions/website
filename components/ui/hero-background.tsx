'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { BackgroundVideo } from '@/components/ui/background-video'

interface HeroBackgroundProps {
  children: ReactNode
  className?: string
}

/**
 * HeroBackground — full-screen primary-blue background with video overlay.
 * Matches the hero section visual style: image → blue wash → video → vignette.
 */
export function HeroBackground({ children, className }: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        'bg-primary relative min-h-screen overflow-hidden',
        className
      )}
    >
      {/* Same video layer as hero */}
      <BackgroundVideo src="/hero-video.mp4" opacity={0.25} className="z-[2]" />
      {/* Same primary blue wash as hero */}
      <div className="bg-primary/55 absolute inset-0 z-[1]" />
      {/* Same bottom vignette */}
      <div className="from-primary/45 absolute inset-0 z-[3] bg-gradient-to-t via-transparent to-transparent" />
      {/* Content sits above all layers */}
      <div className="relative z-10">{children}</div>
    </div>
  )
}

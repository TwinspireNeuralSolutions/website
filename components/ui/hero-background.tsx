'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils'
import { BackgroundVideo } from '@/components/ui/background-video'

interface HeroBackgroundProps {
  children: ReactNode
  className?: string
  showVideo?: boolean
}

/**
 * HeroBackground — full-screen gradient background with optional video overlay.
 * Used as a layout wrapper for auth/admin pages.
 */
export function HeroBackground({
  children,
  className,
  showVideo = true,
}: HeroBackgroundProps) {
  return (
    <div
      className={cn(
        'relative min-h-screen bg-gradient-to-br from-[#0a0a2e] via-[#16213e] to-[#0f3460]',
        className
      )}
    >
      {showVideo && <BackgroundVideo />}
      {children}
    </div>
  )
}

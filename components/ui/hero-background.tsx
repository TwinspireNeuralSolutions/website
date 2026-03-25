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
 * HeroBackground — full-screen solid primary-blue background with optional video overlay.
 * Used as a layout wrapper for auth/admin pages.
 */
export function HeroBackground({
  children,
  className,
  showVideo = false,
}: HeroBackgroundProps) {
  return (
    <div className={cn('bg-primary relative min-h-screen', className)}>
      {showVideo && <BackgroundVideo />}
      {children}
    </div>
  )
}

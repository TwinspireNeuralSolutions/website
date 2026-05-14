'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface BackgroundVideoProps {
  className?: string
  /** Path to the video file. Defaults to /hero-video.mp4 */
  src?: string
  opacity?: number
}

/**
 * BackgroundVideo — lazy-loaded, muted video overlay for hero backgrounds.
 * Automatically pauses when not in viewport to save resources.
 */
export function BackgroundVideo({
  className,
  src = '/hero-video.mp4',
  opacity = 0.15,
}: BackgroundVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    video.play().catch(() => {
      // Autoplay blocked — silently fail
    })
  }, [])

  return (
    <video
      ref={videoRef}
      className={cn(
        'pointer-events-none absolute inset-0 h-full w-full object-cover',
        className
      )}
      style={{ opacity }}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      aria-hidden="true"
    />
  )
}

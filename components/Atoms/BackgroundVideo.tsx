'use client'

import { useState, useEffect } from 'react'

interface BackgroundVideoProps {
  src?: string
  opacity?: number
  className?: string
  delay?: number
  ariaLabel?: string
}

/**
 * Reusable background video component with lazy loading
 * Used in hero sections and admin pages for consistent video backgrounds
 */
export function BackgroundVideo({
  src = '/hero-video.mp4',
  opacity = 30,
  className = '',
  delay = 100,
  ariaLabel = 'Background hero video showcasing Twinspire platform',
}: BackgroundVideoProps) {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoadVideo(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  if (!shouldLoadVideo) {
    return null
  }

  return (
    <video
      autoPlay
      muted
      loop
      playsInline
      aria-label={ariaLabel}
      className={`absolute top-0 left-0 h-full w-full object-cover mix-blend-overlay transition-opacity duration-500 ${className}`}
      onLoadedData={() => setVideoLoaded(true)}
      preload="metadata"
      style={{ opacity: videoLoaded ? opacity / 100 : 0 }}
    >
      <source src={src} type="video/mp4" />
    </video>
  )
}


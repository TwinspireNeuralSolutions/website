'use client'

interface AnimatedParticlesProps {
  opacity?: number
  className?: string
}

/**
 * Reusable animated background particles component
 * Used in hero sections and admin pages for consistent visual effects
 */
export function AnimatedParticles({
  opacity = 20,
  className = '',
}: AnimatedParticlesProps) {
  return (
    <div
      className={`absolute inset-0 overflow-hidden ${className}`}
      style={{ opacity: opacity / 100 }}
      aria-hidden="true"
    >
      <div className="absolute top-1/4 left-1/4 h-96 w-96 animate-pulse rounded-full bg-purple-500 blur-3xl"></div>
      <div className="animation-delay-2000 absolute top-1/3 right-1/4 h-96 w-96 animate-pulse rounded-full bg-blue-500 blur-3xl"></div>
      <div className="animation-delay-4000 absolute bottom-1/4 left-1/3 h-96 w-96 animate-pulse rounded-full bg-indigo-500 blur-3xl"></div>
    </div>
  )
}


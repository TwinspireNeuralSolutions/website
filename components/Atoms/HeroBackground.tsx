import { ReactNode } from 'react'

interface HeroBackgroundProps {
  children: ReactNode
}

export function HeroBackground({ children }: HeroBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {children}
    </div>
  )
}

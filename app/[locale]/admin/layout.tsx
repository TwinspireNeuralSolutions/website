import { HeroBackground } from '@/components/ui/hero-background'
import { ReactNode } from 'react'

/**
 * Admin Layout
 * Wraps all admin pages (login, dashboard) with the hero video background.
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <HeroBackground>{children}</HeroBackground>
}

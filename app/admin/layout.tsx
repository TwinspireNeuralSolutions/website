import { HeroBackground } from '@/components/Atoms'
import { ReactNode } from 'react'

/**
 * Admin Layout
 * Minimal layout for admin pages
 */
export default function AdminLayout({ children }: { children: ReactNode }) {
  return <HeroBackground>{children}</HeroBackground>
}

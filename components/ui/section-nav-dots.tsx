'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/i18n'

interface NavSection {
  id: string
  labelKey: string
}

const SECTIONS: NavSection[] = [
  { id: 'problem', labelKey: 'nav.problem' },
  { id: 'product', labelKey: 'nav.product' },
  { id: 'science', labelKey: 'nav.science' },
  { id: 'built-for', labelKey: 'nav.builtFor' },
  { id: 'team', labelKey: 'nav.team' },
  { id: 'faq', labelKey: 'nav.faq' },
  { id: 'contact', labelKey: 'nav.contact' },
]

/**
 * SectionNavDots — Fixed vertical strip of section indicator dots on the right edge.
 * Hides while the hero section is visible. Desktop: dots with hover labels.
 * Mobile: replaced by a thin top progress bar.
 */
export function SectionNavDots() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<string>('')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [heroVisible, setHeroVisible] = useState(true)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Hide dots while hero is in view
    const heroEl = document.getElementById('hero')
    const heroObserver = new IntersectionObserver(
      ([entry]) => setHeroVisible(entry.isIntersecting),
      { threshold: 0.1 }
    )
    if (heroEl) heroObserver.observe(heroEl)

    // Determine active section by finding which section's midpoint is
    // closest to the vertical centre of the viewport on every scroll tick.
    const updateActive = () => {
      const mid = window.innerHeight / 2
      let bestId = ''
      let bestDist = Infinity

      SECTIONS.forEach(({ id }) => {
        const el = document.getElementById(id)
        if (!el) return
        const rect = el.getBoundingClientRect()
        const elMid = rect.top + rect.height / 2
        const dist = Math.abs(elMid - mid)
        if (dist < bestDist) {
          bestDist = dist
          bestId = id
        }
      })

      if (bestId) setActiveId(bestId)

      const scrollTop = window.scrollY
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(docHeight > 0 ? scrollTop / docHeight : 0)
    }

    window.addEventListener('scroll', updateActive, { passive: true })
    updateActive()

    return () => {
      heroObserver.disconnect()
      window.removeEventListener('scroll', updateActive)
    }
  }, [])

  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* Mobile — thin progress bar at top */}
      <div
        aria-hidden="true"
        className="bg-primary fixed top-0 left-0 z-[100] h-[2px] transition-[width] duration-150 ease-out sm:hidden"
        style={{ width: `${scrollProgress * 100}%` }}
      />

      {/* Desktop — vertical dots strip */}
      <nav
        aria-label={t('nav.sections')}
        className={cn(
          'fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col items-end gap-5 transition-opacity duration-300 sm:flex',
          heroVisible ? 'pointer-events-none opacity-0' : 'opacity-100'
        )}
      >
        {SECTIONS.map(({ id, labelKey }) => {
          const isActive = activeId === id
          const isHovered = hoveredId === id

          return (
            <button
              key={id}
              aria-label={t(labelKey)}
              onClick={() => scrollToSection(id)}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              className="group flex cursor-pointer items-center gap-2.5 border-0 bg-transparent p-0"
            >
              {/* Section label — slides in on hover */}
              <span
                className={cn(
                  'text-foreground/50 pointer-events-none font-mono text-[9px] tracking-[0.2em] uppercase transition-all duration-200',
                  isHovered
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-1 opacity-0'
                )}
              >
                {t(labelKey)}
              </span>

              {/* Dot */}
              <span
                className={cn(
                  'block rounded-full transition-all duration-300',
                  isActive
                    ? 'bg-primary h-2.5 w-2.5'
                    : 'bg-foreground/20 group-hover:bg-foreground/40 h-1.5 w-1.5'
                )}
              />
            </button>
          )
        })}
      </nav>
    </>
  )
}

SectionNavDots.displayName = 'SectionNavDots'

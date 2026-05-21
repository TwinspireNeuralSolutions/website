'use client'

import { useEffect, useState } from 'react'
import { cn } from '@/lib/utils'
import { useTranslation } from '@/i18n'

const SECTIONS = [
  { id: 'hero', labelKey: 'sectionNav.hero' },
  { id: 'problem', labelKey: 'sectionNav.problem' },
  { id: 'product', labelKey: 'sectionNav.product' },
  { id: 'science', labelKey: 'sectionNav.science' },
  { id: 'team', labelKey: 'sectionNav.team' },
  { id: 'contact', labelKey: 'sectionNav.contact' },
] as const

type SectionId = (typeof SECTIONS)[number]['id']

/**
 * SectionDotNav — Fixed right-edge section indicator with hover labels.
 *
 * Desktop: 6 dots, active dot is larger + glowing, hover reveals section name.
 * Mobile: Hidden; replaced by a thin scroll progress bar pinned to the top edge.
 */
export function SectionDotNav() {
  const { t } = useTranslation()
  const [activeId, setActiveId] = useState<SectionId>('hero')
  const [hoveredId, setHoveredId] = useState<SectionId | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    // Track active section: whichever section covers the viewport mid-point
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId
          if (SECTIONS.some((s) => s.id === id)) {
            setActiveId(id)
          }
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    // Scroll progress for mobile bar
    const handleScroll = () => {
      const scrolled = window.scrollY
      const total = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(total > 0 ? scrolled / total : 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      {/* ── Desktop dot navigation — right edge ─────────────────────────── */}
      <nav
        aria-label={t('sectionNav.ariaLabel')}
        className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col items-end gap-3.5 lg:flex"
      >
        {SECTIONS.map(({ id, labelKey }) => {
          const isActive = activeId === id
          const isHovered = hoveredId === id

          return (
            <div
              key={id}
              className="flex items-center gap-2.5"
              onMouseEnter={() => setHoveredId(id as SectionId)}
              onMouseLeave={() => setHoveredId(null)}
            >
              {/* Section label — slides in on hover */}
              <span
                aria-hidden="true"
                className={cn(
                  'pointer-events-none font-mono text-[9px] tracking-[0.16em] whitespace-nowrap uppercase transition-all duration-200 select-none',
                  isActive ? 'text-primary' : 'text-foreground/40',
                  isHovered
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-1 opacity-0'
                )}
              >
                {t(labelKey as Parameters<typeof t>[0])}
              </span>

              {/* Dot */}
              <button
                type="button"
                aria-label={`Scroll to ${t(labelKey as Parameters<typeof t>[0])}`}
                onClick={() => scrollTo(id)}
                className={cn(
                  'rounded-full transition-all duration-300 ease-out',
                  isActive
                    ? 'bg-primary h-2.5 w-2.5 shadow-[0_0_8px_rgba(8,2,163,0.45)]'
                    : 'bg-foreground/20 hover:bg-foreground/50 h-1.5 w-1.5'
                )}
              />
            </div>
          )
        })}
      </nav>

      {/* ── Mobile scroll progress bar — top edge ────────────────────────── */}
      <div
        role="progressbar"
        aria-valuenow={Math.round(scrollProgress * 100)}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={t('sectionNav.progressAriaLabel')}
        className="bg-primary fixed top-0 left-0 z-[60] h-[2px] origin-left transition-transform duration-100 will-change-transform lg:hidden"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </>
  )
}

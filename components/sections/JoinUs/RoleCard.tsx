'use client'

import { Typography } from '@/components/ui/typography'
import { cn } from '@/lib/utils'
import { MapPin, ChevronDown, Mail } from 'lucide-react'

// ─── RoleSummaryCard ──────────────────────────────────────────────────────────

interface RoleSummaryCardProps {
  id: string
  title: string
  department: string
  location: string
  summary: string
  employmentType: string
  expanded: boolean
  viewLabel: string
  hideLabel: string
  onToggle: (id: string) => void
  children?: React.ReactNode
}

/**
 * Compact, expandable job listing card.
 * Summary row always visible; full detail panel opens on toggle.
 */
export function RoleSummaryCard({
  id,
  title,
  department,
  location,
  summary,
  employmentType,
  expanded,
  viewLabel,
  hideLabel,
  onToggle,
  children,
}: RoleSummaryCardProps) {
  return (
    <div
      className={cn(
        'border-border overflow-hidden rounded-2xl border bg-white transition-shadow duration-300',
        expanded ? 'shadow-md' : 'shadow-sm hover:shadow-md'
      )}
    >
      {/* Primary top accent bar */}
      <div className="bg-primary h-1 w-full" />

      {/* Clickable summary row */}
      <button
        onClick={() => onToggle(id)}
        aria-expanded={expanded}
        aria-controls={`role-detail-${id}`}
        className="group w-full text-left"
      >
        <div className="flex flex-col gap-4 px-6 py-6 sm:px-8 sm:py-7 md:flex-row md:items-center md:gap-6">
          {/* Left: metadata + summary */}
          <div className="min-w-0 flex-1 space-y-2.5">
            {/* Department badge */}
            <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-0.5 text-[11px] font-semibold tracking-wider uppercase">
              {department}
            </span>

            {/* Title */}
            <h3 className="text-foreground text-[18px] leading-snug font-bold sm:text-[21px]">
              {title}
            </h3>

            {/* Location + employment type */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-muted-foreground flex items-center gap-1.5 text-sm">
                <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden />
                {location}
              </span>
              <span className="border-border text-muted-foreground rounded-full border px-2.5 py-0.5 text-xs">
                {employmentType}
              </span>
            </div>

            {/* Two-line summary — only shown when collapsed */}
            {!expanded && (
              <p className="text-foreground/55 line-clamp-2 max-w-2xl text-[13px] leading-relaxed">
                {summary}
              </p>
            )}
          </div>

          {/* Right: toggle CTA */}
          <div className="shrink-0">
            <span
              className={cn(
                'inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition-colors duration-200',
                expanded
                  ? 'bg-primary border-primary text-white'
                  : 'border-primary/30 text-primary group-hover:bg-primary group-hover:border-primary group-hover:text-white'
              )}
            >
              {expanded ? hideLabel : viewLabel}
              <ChevronDown
                className={cn(
                  'h-4 w-4 transition-transform duration-200',
                  expanded && 'rotate-180'
                )}
                aria-hidden
              />
            </span>
          </div>
        </div>
      </button>

      {/* Expanded detail panel */}
      {expanded && (
        <div id={`role-detail-${id}`} className="border-border border-t">
          {children}
        </div>
      )}
    </div>
  )
}

// ─── RoleDetailPanel ──────────────────────────────────────────────────────────

/**
 * Container for the full role description shown when a card is expanded.
 */
export function RoleDetailPanel({
  contactCta,
  children,
}: {
  contactCta: string
  children: React.ReactNode
}) {
  return (
    <div>
      <div className="flex flex-col gap-7 px-6 py-8 sm:px-8">{children}</div>

      {/* Email CTA footer */}
      <div className="border-border bg-primary/5 flex items-center gap-2.5 border-t px-6 py-5 sm:px-8">
        <Mail className="text-primary h-4 w-4 shrink-0" aria-hidden />
        <Typography
          variant="paragraph"
          textColor="primary"
          className="font-medium"
        >
          {contactCta}
        </Typography>
      </div>
    </div>
  )
}

// ─── RoleSection ──────────────────────────────────────────────────────────────

/**
 * A labelled subsection inside a RoleDetailPanel.
 */
export function RoleSection({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-3">
        <span
          className="bg-primary h-4 w-0.5 shrink-0 rounded-full"
          aria-hidden
        />
        <Typography
          variant="heading"
          as="h4"
          className="text-foreground text-[11px] tracking-widest uppercase"
        >
          {title}
        </Typography>
      </div>
      <div className="flex flex-col gap-2 pl-3.5">{children}</div>
    </div>
  )
}

// ─── RoleBulletList ───────────────────────────────────────────────────────────

/**
 * Primary-dot bullet list for use inside RoleSection.
 */
export function RoleBulletList({ items }: { items: string[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            className="bg-primary mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
            aria-hidden
          />
          <Typography variant="paragraph" className="text-foreground/75">
            {item}
          </Typography>
        </li>
      ))}
    </ul>
  )
}

'use client'

import { cn } from '@/lib/utils'

interface SectionStatusProps {
  /** Translated status label — e.g. "Live model active" */
  label: string
  /** Extra classes on the wrapper */
  className?: string
}

/**
 * SectionStatus — A tiny pulsing-dot status indicator styled like software UI.
 * Sits in the top-right corner of a section (section must be `relative`).
 * Reads like a system status, not marketing copy.
 */
export function SectionStatus({ label, className }: SectionStatusProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        'absolute top-4 right-5 z-10 flex items-center gap-1.5 select-none',
        className
      )}
    >
      {/* Pulsing dot */}
      <span className="relative flex h-1.5 w-1.5 shrink-0">
        <span className="bg-primary absolute inline-flex h-full w-full animate-ping rounded-full opacity-35" />
        <span className="bg-primary relative inline-flex h-1.5 w-1.5 rounded-full" />
      </span>
      {/* Status label */}
      <span className="text-foreground/30 font-mono text-[9px] tracking-[0.15em] uppercase">
        {label}
      </span>
    </div>
  )
}

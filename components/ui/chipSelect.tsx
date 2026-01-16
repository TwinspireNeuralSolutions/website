'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'

export type ChipOption = {
  value: string
  label: string
  disabled?: boolean
}

type ChipSelectProps = {
  value: string
  onValueChange: (value: string) => void
  options: ChipOption[]
  className?: string
  disabled?: boolean
  color?: 'blue' | 'white'
}

const ChipSelect = ({
  value,
  onValueChange,
  options,
  className,
  disabled,
}: ChipSelectProps) => {
  return (
    <div
      role="radiogroup"
      aria-disabled={disabled || undefined}
      className={cn('flex flex-wrap gap-2', className)}
    >
      {options.map((opt) => {
        const selected = opt.value === value
        const isDisabled = disabled || opt.disabled

        return (
          <Button
            role="radio"
            className={cn(
              'px-4 py-1',
              selected
                ? 'bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900'
                : 'bg-neutral-100 text-neutral-900 shadow-sm hover:bg-neutral-200',
              isDisabled && 'cursor-not-allowed opacity-50'
            )}
            key={opt.value}
            aria-checked={selected}
            aria-disabled={isDisabled || undefined}
            onClick={() => {
              if (!isDisabled) {
                onValueChange(opt.value)
              }
            }}
          >
            <span className="truncate">{opt.label}</span>
          </Button>
        )
      })}
    </div>
  )
}

ChipSelect.displayName = 'ChipSelect'

export { ChipSelect }

import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * Textarea component — Reusable multi-line text input.
 *
 * Built on shadcn/ui patterns with consistent styling.
 * Supports all native textarea attributes.
 */
export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          'focus-visible:ring-primary/50 flex min-h-[120px] w-full rounded-lg border border-neutral-200 bg-transparent px-3 py-2 text-sm shadow-sm transition-colors placeholder:text-neutral-500 focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-700 dark:placeholder:text-neutral-400',
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }

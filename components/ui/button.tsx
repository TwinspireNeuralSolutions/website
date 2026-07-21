import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'
import { ArrowRight } from 'lucide-react'

/**
 * Button component — Primary design system button.
 *
 * Variants:
 * - `primary`: #0802A3 background, white text
 * - `white`: White background, dark text
 * - `ghost`: Transparent background
 * - `outline`: Border only
 * - `destructive`: Red for destructive actions
 * - `link`: Underlined text link
 *
 * Features:
 * - Optional trailing icon with rotation animation on hover
 * - Icon rotates from slightly upward (-45deg) to straight right (0deg) on hover
 * - Fully accessible with focus-visible styles
 * - Uses shadcn/ui CVA pattern
 */
const buttonVariants = cva(
  'group inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        primary:
          'bg-primary text-white shadow-md hover:bg-primary-hover active:bg-primary-active',
        white:
          'bg-white text-neutral-900 shadow-md hover:bg-neutral-100 active:bg-neutral-200 dark:text-neutral-900',
        ghost:
          'hover:bg-neutral-100 hover:text-foreground dark:hover:bg-neutral-800',
        outline:
          'border border-neutral-200 bg-transparent shadow-sm hover:bg-neutral-100 hover:text-foreground dark:border-neutral-700',
        destructive:
          'bg-red-500 text-white shadow-sm hover:bg-red-600 active:bg-red-700',
        link: 'text-primary underline-offset-4 hover:underline',
        secondary:
          'bg-neutral-100 text-foreground shadow-sm hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700',
      },
      size: {
        default: 'h-10 px-6 py-2',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
    },
  }
)

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Show trailing arrow icon with hover animation */
  showIcon?: boolean
  /** Icon rendering position: 'inline' places it after the text; 'absolute' pins it to the button's right edge */
  iconPosition?: 'inline' | 'absolute'
  /** Use as child (for Link composition) */
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      showIcon = false,
      iconPosition = 'inline',
      children,
      ...props
    },
    ref
  ) => {
    // Icon circle adapts to the button background so it's always visible
    const iconCircleClass =
      variant === 'white'
        ? 'bg-neutral-900/10 group-hover:bg-neutral-900/20'
        : 'bg-white/20 group-hover:bg-white/30'

    /**
     * Icon circle + arrow scale with the button size so the gap between the
     * circle edge and the button edge is always equal on top, bottom, and right.
     *
     * Button heights:  sm = h-8 (32px)  |  default = h-10 (40px)  |  lg = h-12 (48px)
     * Circle sizes:        h-6 (24px)   |           h-8  (32px)   |      h-10 (40px)
     * Inset (each side):  (32-24)/2=4px |          (40-32)/2=4px  |     (48-40)/2=4px
     * Button pr:          pr-1  (4px)   |          pr-1   (4px)   |     pr-1   (4px)
     */
    const iconConfig = {
      sm: { circle: 'h-6 w-6', arrow: 'h-3 w-3', pr: 'pr-1' },
      default: { circle: 'h-8 w-8', arrow: 'h-4 w-4', pr: 'pr-1' },
      lg: { circle: 'h-10 w-10', arrow: 'h-5 w-5', pr: 'pr-1' },
      icon: { circle: 'h-8 w-8', arrow: 'h-4 w-4', pr: 'pr-1' },
    } as const

    const { circle, arrow, pr } = iconConfig[size ?? 'default']

    return (
      <button
        className={cn(
          buttonVariants({ variant, size, className }),
          iconPosition === 'absolute' && 'relative',
          iconPosition === 'inline' && showIcon && pr
        )}
        ref={ref}
        {...props}
      >
        {children}
        {showIcon && iconPosition === 'inline' && (
          <span
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-full backdrop-blur-sm transition-colors duration-200',
              circle,
              iconCircleClass
            )}
          >
            <ArrowRight
              className={cn(
                arrow,
                '-rotate-45 transition-transform duration-200 group-hover:rotate-0'
              )}
            />
          </span>
        )}

        {showIcon && iconPosition === 'absolute' && (
          <span
            className={cn(
              'absolute top-1/2 right-2 inline-flex -translate-y-1/2 items-center justify-center rounded-full transition-colors duration-200',
              circle,
              iconCircleClass
            )}
            aria-hidden
          >
            <ArrowRight
              className={cn(
                arrow,
                '-rotate-45 transition-transform duration-200 group-hover:rotate-0'
              )}
            />
          </span>
        )}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button, buttonVariants }

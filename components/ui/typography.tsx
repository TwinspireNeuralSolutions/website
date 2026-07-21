import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Typography component — Unified text component for the design system.
 *
 * Variants:
 * - `title`: 40px bold — main page titles
 * - `subtitle`: 16px regular — section subtitles
 * - `heading`: 16px bold — card/section headings
 * - `paragraph`: 12px regular — body text, descriptions
 *
 * All text uses the Satoshi font family via CSS variable --font-satoshi.
 * Supports dark mode via the `dark:` Tailwind prefix.
 */
const typographyVariants = cva('font-sans', {
  variants: {
    variant: {
      title:
        'text-[24px] font-bold leading-[1.05] tracking-[-0.03em] sm:text-[34px] lg:text-[44px]',
      subtitle: 'text-[15px] font-normal leading-relaxed sm:text-base',
      heading: 'text-[16px] font-bold leading-snug',
      paragraph: 'text-[14px] font-normal leading-[1.8] sm:text-[15px]',
    },
    textColor: {
      default: '', // resolved per-variant via compoundVariants below
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      white: 'text-white',
      inherit: 'text-inherit',
    },
  },
  compoundVariants: [
    // title: full opacity (100%)
    { variant: 'title', textColor: 'default', className: 'text-foreground' },
    // all other variants: 70% opacity
    {
      variant: 'subtitle',
      textColor: 'default',
      className: 'text-foreground/70',
    },
    {
      variant: 'heading',
      textColor: 'default',
      className: 'text-foreground/70',
    },
    {
      variant: 'paragraph',
      textColor: 'default',
      className: 'text-foreground/70',
    },
  ],
  defaultVariants: {
    variant: 'paragraph',
    textColor: 'default',
  },
})

type TypographyElement =
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

const variantElementMap: Record<string, TypographyElement> = {
  title: 'h1',
  subtitle: 'h2',
  heading: 'h3',
  paragraph: 'p',
}

export interface TypographyProps
  extends
    React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof typographyVariants> {
  /** Override the rendered HTML element */
  as?: TypographyElement
}

const Typography = React.forwardRef<HTMLElement, TypographyProps>(
  ({ className, variant, textColor, as, children, ...props }, ref) => {
    const Component = as ?? variantElementMap[variant ?? 'paragraph'] ?? 'p'

    return React.createElement(
      Component,
      {
        className: cn(typographyVariants({ variant, textColor, className })),
        ref,
        ...props,
      },
      children
    )
  }
)
Typography.displayName = 'Typography'

export { Typography, typographyVariants }

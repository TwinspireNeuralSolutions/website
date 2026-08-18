import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

/**
 * Typography — the single type scale for the site.
 *
 * Six named steps, nothing between them, nothing below 15px except `label`.
 * Sizes are given as clamp-style responsive pairs so there is one decision
 * per step rather than per breakpoint.
 *
 *   display   44 → 82px   Barlow Condensed 900   Hero headlines only
 *   title     30 → 44px   Satoshi 800            Page and major section titles
 *   section   22 → 28px   Satoshi 700            Section headings
 *   heading   17 → 18px   Satoshi 700            Card and block headings
 *   body      15 → 16px   Satoshi 400            All body copy
 *   label     11 → 12px   Satoshi 600 uppercase  Eyebrows and metadata
 *
 * Legacy aliases `subtitle` and `paragraph` map onto `body` so existing
 * call sites keep working; prefer the named steps in new code.
 *
 * Colour: default is full-strength foreground for headings and /80 for body.
 * Never drop text below /80 — opacity is how a page goes muddy.
 */
const typographyVariants = cva('', {
  variants: {
    variant: {
      display:
        "font-['Barlow_Condensed',sans-serif] text-[44px] font-black leading-[1.02] tracking-[-0.02em] sm:text-[62px] lg:text-[82px]",
      title:
        'font-sans text-[30px] font-extrabold leading-[1.08] tracking-[-0.02em] sm:text-[36px] lg:text-[44px]',
      section:
        'font-sans text-[22px] font-bold leading-[1.15] tracking-[-0.01em] sm:text-[25px] lg:text-[28px]',
      heading:
        'font-sans text-[17px] font-bold leading-snug sm:text-[18px]',
      body:
        'font-sans text-[15px] font-normal leading-[1.7] sm:text-[16px]',
      label:
        'font-sans text-[11px] font-semibold uppercase leading-none tracking-[0.12em] sm:text-[12px]',

      // ── Legacy aliases ──
      subtitle:
        'font-sans text-[15px] font-normal leading-[1.7] sm:text-[16px]',
      paragraph:
        'font-sans text-[15px] font-normal leading-[1.7] sm:text-[16px]',
    },
    textColor: {
      default: '', // resolved per-variant below
      muted: 'text-muted-foreground',
      primary: 'text-primary',
      white: 'text-white',
      inherit: 'text-inherit',
    },
  },
  compoundVariants: [
    // Headings carry full strength
    { variant: 'display', textColor: 'default', className: 'text-foreground' },
    { variant: 'title',   textColor: 'default', className: 'text-foreground' },
    { variant: 'section', textColor: 'default', className: 'text-foreground' },
    { variant: 'heading', textColor: 'default', className: 'text-foreground' },
    // Body sits at /80 — the floor, never lower
    { variant: 'body',      textColor: 'default', className: 'text-foreground/80' },
    { variant: 'subtitle',  textColor: 'default', className: 'text-foreground/80' },
    { variant: 'paragraph', textColor: 'default', className: 'text-foreground/80' },
    // Labels are navy by default — they are signposts, not body copy
    { variant: 'label', textColor: 'default', className: 'text-primary' },
  ],
  defaultVariants: {
    variant: 'body',
    textColor: 'default',
  },
})

type TypographyElement =
  'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'

const variantElementMap: Record<string, TypographyElement> = {
  display: 'h1',
  title: 'h1',
  section: 'h2',
  heading: 'h3',
  body: 'p',
  label: 'p',
  // legacy
  subtitle: 'h2',
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
    const Component = as ?? variantElementMap[variant ?? 'body'] ?? 'p'

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

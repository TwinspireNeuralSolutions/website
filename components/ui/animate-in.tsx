'use client'

import * as React from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

// ── Shared timing ──────────────────────────────────────────────────────────────
const EASE: [number, number, number, number] = [0.25, 0.1, 0.25, 1]
const DEFAULT_DURATION = 0.55

// ── Variants ───────────────────────────────────────────────────────────────────
/**
 * Named entrance animation variants shared across all AnimateIn primitives.
 * Every variant has `hidden` (off-screen / invisible) and `visible` (final state).
 */
export const animationVariants = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 },
  },
  fadeDown: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  slideLeft: {
    hidden: { opacity: 0, x: -36 },
    visible: { opacity: 1, x: 0 },
  },
  slideRight: {
    hidden: { opacity: 0, x: 36 },
    visible: { opacity: 1, x: 0 },
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  },
} satisfies Record<string, Variants>

export type AnimationVariant = keyof typeof animationVariants

// ── AnimateIn ──────────────────────────────────────────────────────────────────
interface AnimateInProps {
  /** Animation preset to use. Defaults to "fadeUp". */
  variant?: AnimationVariant
  /** Delay in seconds before the animation starts. */
  delay?: number
  /** Duration in seconds. Defaults to 0.55. */
  duration?: number
  /**
   * When `true`, the animation triggers on page load instead of on scroll.
   * Use for above-the-fold content (e.g. Hero section).
   */
  immediate?: boolean
  /** Applied directly to the wrapping motion.div. */
  className?: string
  children: React.ReactNode
}

/**
 * AnimateIn — Entrance animation wrapper for a single element.
 *
 * - Scroll-triggered by default (`immediate=false`): plays once when 10% of
 *   the element enters the viewport.
 * - Pass `immediate` for above-the-fold Hero content (plays on page load).
 * - Automatically skips animation for users who prefer reduced motion.
 *
 * @example
 * // Scroll-triggered
 * <AnimateIn variant="fadeUp" delay={0.1}>
 *   <Typography variant="title">Heading</Typography>
 * </AnimateIn>
 *
 * // On-load (hero)
 * <AnimateIn variant="fadeUp" delay={0.2} immediate>
 *   <h1>...</h1>
 * </AnimateIn>
 */
export function AnimateIn({
  variant = 'fadeUp',
  delay = 0,
  duration = DEFAULT_DURATION,
  immediate = false,
  className,
  children,
}: AnimateInProps) {
  const prefersReduced = useReducedMotion()

  // Respect prefers-reduced-motion: render without any animation
  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      variants={animationVariants[variant]}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount: 0.1 } })}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

AnimateIn.displayName = 'AnimateIn'

// ── StaggerContainer ───────────────────────────────────────────────────────────
interface StaggerContainerProps {
  /** Seconds between each child's animation start. Defaults to 0.1. */
  stagger?: number
  /** Seconds to wait before the first child animates. Defaults to 0. */
  delayChildren?: number
  /** When `true`, triggers on load instead of scroll. */
  immediate?: boolean
  /** Applied to the wrapping motion.div — use for grid/flex layout classes. */
  className?: string
  children: React.ReactNode
}

/**
 * StaggerContainer — Orchestrates staggered entrance for a list of StaggerItems.
 *
 * Place `StaggerItem` as direct children (or as elements whose variants Framer
 * Motion can propagate to). The container itself is invisible — it only drives
 * timing. Pass your grid / flex `className` here so no extra wrapper is needed.
 *
 * @example
 * <StaggerContainer className="grid grid-cols-3 gap-6" stagger={0.1}>
 *   {cards.map(c => (
 *     <StaggerItem key={c.id}>
 *       <Card {...c} />
 *     </StaggerItem>
 *   ))}
 * </StaggerContainer>
 */
export function StaggerContainer({
  stagger = 0.1,
  delayChildren = 0,
  immediate = false,
  className,
  children,
}: StaggerContainerProps) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: 'visible' }
        : { whileInView: 'visible', viewport: { once: true, amount: 0.05 } })}
      variants={{
        hidden: {},
        visible: {
          transition: { staggerChildren: stagger, delayChildren },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

StaggerContainer.displayName = 'StaggerContainer'

// ── StaggerItem ────────────────────────────────────────────────────────────────
interface StaggerItemProps {
  /** Animation variant inherited from the parent StaggerContainer's timing. */
  variant?: AnimationVariant
  /** Override duration for this specific item. */
  duration?: number
  /** Applied to the wrapping motion.div — pass sizing / layout classes here. */
  className?: string
  children: React.ReactNode
}

/**
 * StaggerItem — A child element inside a `StaggerContainer`.
 *
 * Does NOT set its own `initial` / `animate` / `whileInView` — it inherits
 * animation state propagated by the parent `StaggerContainer`. This is how
 * Framer Motion's variants orchestration works.
 *
 * @example
 * <StaggerContainer stagger={0.08}>
 *   <StaggerItem><Card /></StaggerItem>
 *   <StaggerItem><Card /></StaggerItem>
 * </StaggerContainer>
 */
export function StaggerItem({
  variant = 'fadeUp',
  duration = DEFAULT_DURATION,
  className,
  children,
}: StaggerItemProps) {
  return (
    <motion.div
      className={className}
      variants={animationVariants[variant]}
      transition={{ duration, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

StaggerItem.displayName = 'StaggerItem'

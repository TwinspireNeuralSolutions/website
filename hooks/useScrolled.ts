'use client'

import { useEffect, useLayoutEffect, useState } from 'react'

/**
 * On the server `useLayoutEffect` does not exist — fall back to `useEffect`
 * so there is no SSR warning while still reading the scroll position
 * synchronously on the client before the first paint.
 */
const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect

/**
 * useScrolled — returns `true` once the page has scrolled past `threshold` px.
 *
 * Uses a passive scroll listener so it never blocks the main thread.
 * Reads the initial scroll position synchronously (via useLayoutEffect) to
 * avoid a flash of the wrong navbar state on page refresh.
 *
 * @param threshold  Pixel offset before the hook reports as "scrolled". Default 20.
 */
export function useScrolled(threshold = 20): boolean {
  const [scrolled, setScrolled] = useState(false)

  useIsomorphicLayoutEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold)
    update() // sync initial state
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [threshold])

  return scrolled
}

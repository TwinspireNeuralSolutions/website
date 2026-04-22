import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

import React from 'react'

/**
 * Highlight the last word of a string by wrapping it in a primary-colored span.
 * Returns a React node safe to use in JSX children.
 */
export function highlightLastWord(s: string): React.ReactNode {
  const parts = String(s).trim().split(' ')
  if (parts.length === 0) return s
  const last = parts.pop()
  return React.createElement(
    React.Fragment,
    null,
    parts.join(' '),
    ' ',
    last &&
      React.createElement('span', { className: 'text-primary font-bold' }, last)
  )
}

/**
 * Split a string into [leadingText, lastWord]. If there's only one word,
 * leadingText is an empty string and lastWord contains the word.
 */
export function splitLastWord(s: string): [string, string] {
  const parts = String(s).trim().split(' ')
  if (parts.length === 0) return ['', '']
  if (parts.length === 1) return ['', parts[0]]
  const last = parts.pop() as string
  return [parts.join(' '), last]
}

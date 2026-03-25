'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  resolvedTheme: 'light' | 'dark'
  setTheme: (theme: Theme) => void
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)

function getSystemTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light'
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

/**
 * ThemeProvider — manages dark/light/system theme with localStorage persistence.
 * Uses CSS class strategy on `<html>` element for Tailwind `dark:` variants.
 */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('light')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  const applyTheme = useCallback((resolved: 'light' | 'dark') => {
    setResolvedTheme(resolved)
    const root = document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('tns-theme') as Theme | null
    if (saved) {
      setThemeState(saved)
      applyTheme(saved === 'system' ? getSystemTheme() : saved)
    } else {
      applyTheme(getSystemTheme())
    }
  }, [applyTheme])

  useEffect(() => {
    if (theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)')
      const handler = (e: MediaQueryListEvent) =>
        applyTheme(e.matches ? 'dark' : 'light')
      mq.addEventListener('change', handler)
      applyTheme(mq.matches ? 'dark' : 'light')
      return () => mq.removeEventListener('change', handler)
    }
    applyTheme(theme)
  }, [theme, applyTheme])

  const setTheme = useCallback(
    (newTheme: Theme) => {
      setThemeState(newTheme)
      localStorage.setItem('tns-theme', newTheme)
      applyTheme(newTheme === 'system' ? getSystemTheme() : newTheme)
    },
    [applyTheme]
  )

  const toggleTheme = useCallback(() => {
    setTheme(resolvedTheme === 'light' ? 'dark' : 'light')
  }, [resolvedTheme, setTheme])

  return (
    <ThemeContext.Provider
      value={{ theme, resolvedTheme, setTheme, toggleTheme }}
    >
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme — access the current theme context.
 * Must be used within a ThemeProvider.
 */
export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

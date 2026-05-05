'use client'

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from 'react'
import { type Locale, i18n } from './config'
import en from './locales/en.json'
import da from './locales/da.json'

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}.${NestedKeyOf<T[K]>}`
        : K
    }[keyof T & string]
  : never

type TranslationKey = string

const dictionaries: Record<Locale, typeof en> = { en, da }

interface I18nContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: TranslationKey, params?: Record<string, string>) => string
}

const I18nContext = createContext<I18nContextType | null>(null)

/**
 * Detect user locale from browser/navigator.
 * Checks navigator.language and falls back to geolocation-based timezone heuristic.
 */
function detectLocale(): Locale {
  if (typeof window === 'undefined') return i18n.defaultLocale

  const saved = localStorage.getItem('tns-locale') as Locale | null
  if (saved && i18n.locales.includes(saved)) return saved

  const browserLang = navigator.language?.toLowerCase()
  if (browserLang?.startsWith('da')) return 'da'

  try {
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    if (timezone === 'Europe/Copenhagen') return 'da'
  } catch {
    // Intl not supported
  }

  return i18n.defaultLocale
}

function getNestedValue(obj: Record<string, unknown>, path: string): string {
  const keys = path.split('.')
  let current: unknown = obj
  for (const key of keys) {
    if (current && typeof current === 'object' && key in current) {
      current = (current as Record<string, unknown>)[key]
    } else {
      return path
    }
  }
  return typeof current === 'string' ? current : path
}

interface I18nProviderProps {
  children: ReactNode
  /** Locale from the [locale] URL segment — takes priority over auto-detection */
  initialLocale?: Locale
}

export function I18nProvider({ children, initialLocale }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(
    initialLocale ?? i18n.defaultLocale
  )

  useEffect(() => {
    if (initialLocale) {
      localStorage.setItem('tns-locale', initialLocale)
      document.documentElement.lang = initialLocale
    } else {
      const detected = detectLocale()
      setLocaleState(detected)
      document.documentElement.lang = detected
    }
  }, [initialLocale])

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale)
    localStorage.setItem('tns-locale', newLocale)
    document.documentElement.lang = newLocale

    // Navigate to the new locale URL path
    if (typeof window !== 'undefined') {
      const currentPath = window.location.pathname
      const localePattern = new RegExp(`^/(${i18n.locales.join('|')})(/|$)`)
      const match = currentPath.match(localePattern)
      if (match) {
        const newPath = currentPath.replace(
          localePattern,
          `/${newLocale}${match[2] ?? ''}`
        )
        window.location.pathname = newPath
      } else {
        window.location.pathname = `/${newLocale}${currentPath}`
      }
    }
  }, [])

  const t = useCallback(
    (key: TranslationKey, params?: Record<string, string>): string => {
      let value = getNestedValue(
        dictionaries[locale] as unknown as Record<string, unknown>,
        key
      )
      if (params) {
        Object.entries(params).forEach(([paramKey, paramValue]) => {
          value = value.replace(`{${paramKey}}`, paramValue)
        })
      }
      return value
    },
    [locale]
  )

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useTranslation() {
  const context = useContext(I18nContext)
  if (!context) {
    throw new Error('useTranslation must be used within an I18nProvider')
  }
  return context
}

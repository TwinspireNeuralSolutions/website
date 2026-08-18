'use client'

import { useEffect, useState } from 'react'
import { APP_URL_PRODUCTION, getAppUrl } from '@/lib/app-url'

/**
 * Returns the Squad Hub platform URL matching the current host.
 *
 * Starts on the production URL so server and first client render agree, then
 * corrects after mount if we are actually on a Vercel preview. Anyone who
 * clicks in that first frame lands on production, which is the safe default.
 */
export function useAppUrl(): string {
  const [url, setUrl] = useState(APP_URL_PRODUCTION)

  useEffect(() => {
    setUrl(getAppUrl(window.location.hostname))
  }, [])

  return url
}

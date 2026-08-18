/**
 * Squad Hub platform URL.
 *
 * The platform (twinspire-admin) deploys to two targets in parallel, and so
 * does this site. Sending someone from a Vercel preview of the marketing site
 * to the Firebase production platform is almost never what you want while
 * testing, so the link follows whichever host the visitor is already on.
 *
 *   *.vercel.app  → the Vercel deployment of the platform
 *   anything else → app.twinspire.ai (Firebase App Hosting, production)
 */

export const APP_URL_PRODUCTION = 'https://app.twinspire.ai'
export const APP_URL_VERCEL = 'https://twinspire-admin-twinspire.vercel.app'

/** Resolve the platform URL for a given host. */
export function getAppUrl(hostname: string): string {
  return hostname.endsWith('.vercel.app') ? APP_URL_VERCEL : APP_URL_PRODUCTION
}

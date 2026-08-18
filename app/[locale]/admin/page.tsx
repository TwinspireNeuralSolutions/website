import { headers } from 'next/headers'
import { permanentRedirect } from 'next/navigation'
import { getAppUrl } from '@/lib/app-url'

/**
 * Legacy club login route.
 *
 * Login and the GPS upload tool both live in the Squad Hub platform now. This
 * route only exists so old bookmarks land somewhere useful. It resolves the
 * target from the request host, so a preview of this site sends you to the
 * preview platform rather than production.
 */
export default async function AdminLoginRedirect() {
  const host = (await headers()).get('host') ?? ''
  permanentRedirect(getAppUrl(host))
}

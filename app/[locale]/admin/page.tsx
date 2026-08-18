import { permanentRedirect } from 'next/navigation'

/**
 * Legacy club login route.
 *
 * Login and the GPS upload tool both now live in the Squad Hub platform at
 * app.twinspire.ai. This route only exists so old bookmarks and any links
 * already in the wild land in the right place instead of a dead page.
 */
export default function AdminLoginRedirect() {
  permanentRedirect('https://app.twinspire.ai')
}

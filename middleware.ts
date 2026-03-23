import { NextResponse, type NextRequest } from 'next/server'
import { i18n, type Locale } from '@/i18n/config'

// ---------------------------------------------------------------------------
// Security Headers
// ---------------------------------------------------------------------------
const SECURITY_HEADERS: Record<string, string> = {
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=()',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
}

const CONTENT_SECURITY_POLICY = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://apis.google.com https://*.firebaseapp.com https://*.googleapis.com https://*.calendly.com https://va.vercel-scripts.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.calendly.com https://api.fontshare.com;
  img-src 'self' data: https: blob:;
  font-src 'self' data: https://fonts.gstatic.com https://cdn.fontshare.com;
  connect-src 'self' https://*.firebaseapp.com https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com https://*.calendly.com https://api.fontshare.com https://vitals.vercel-insights.com;
  frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://*.calendly.com https://calendly.com;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`
  .replace(/\s{2,}/g, ' ')
  .trim()

function applySecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(SECURITY_HEADERS).forEach(([key, value]) => {
    response.headers.set(key, value)
  })
  response.headers.set('Content-Security-Policy', CONTENT_SECURITY_POLICY)
  return response
}

// ---------------------------------------------------------------------------
// Locale Detection
// ---------------------------------------------------------------------------
function detectLocaleFromRequest(request: NextRequest): Locale {
  // 1. Check Accept-Language header
  const acceptLang = request.headers.get('accept-language') ?? ''
  if (acceptLang.toLowerCase().startsWith('da')) return 'da'
  // Check for da anywhere in the Accept-Language list
  if (/\bda\b/.test(acceptLang.toLowerCase())) return 'da'

  return i18n.defaultLocale
}

// ---------------------------------------------------------------------------
// Middleware
// ---------------------------------------------------------------------------
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Static assets & Next.js internals — only add security headers
  const isStaticOrInternal =
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.')

  if (isStaticOrInternal) {
    return applySecurityHeaders(NextResponse.next())
  }

  // Check if the path already starts with a supported locale
  const pathnameHasLocale = i18n.locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`)
  )

  if (!pathnameHasLocale) {
    // Redirect to locale-prefixed path
    const locale = detectLocaleFromRequest(request)
    const url = request.nextUrl.clone()
    url.pathname = `/${locale}${pathname === '/' ? '' : pathname}`
    const response = NextResponse.redirect(url)
    return applySecurityHeaders(response)
  }

  return applySecurityHeaders(NextResponse.next())
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
}

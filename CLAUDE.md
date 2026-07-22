# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server (Turbopack) at localhost:3000
npm run build    # Production build
npm run start    # Serve the production build
npm run lint     # ESLint (flat config, next/core-web-vitals + a11y + typescript-eslint)
npm run format   # Prettier --write (also formats Tailwind class order)
npx tsc --noEmit # Type check — run after any code change, must be zero errors
```

There is no test suite in this repo (no test runner/config present) — do not invent one.

Node version is pinned via `.nvmrc` to `24`. A pre-commit hook (Husky) runs `npm run lint`.

## Architecture

Next.js 15 App Router site with locale-prefixed routing, backed by Firebase Auth/Firestore and a small set of Next.js API routes for email and file upload.

### Routing & locales

- `app/layout.tsx` is a minimal root layout (html/body/theme-script only); real providers live in `app/[locale]/layout.tsx` (ThemeProvider, I18nProvider, AuthProvider).
- All page routes are nested under `app/[locale]/` (`en` | `da`), config in `i18n/config.ts`.
- `middleware.ts` handles two concerns for every request: (1) redirects any path without a locale prefix to `/{detected-locale}/...` (detection: Accept-Language header → default `en`; client-side detection in `i18n/index.tsx` also checks `localStorage` and Copenhagen timezone), and (2) applies security headers + a hand-built Content-Security-Policy to every response, including static/`_next`/`api` routes.
- `app/api/*` routes (`upload`, `contact`, `apply`, `reach-out`) are locale-independent and matched by the "static or internal" branch of the middleware (skips locale redirect, still gets security headers).
- Use `useParams<{ locale: string }>()` in client components to read the current locale, and always build internal links/pushes as `` `/${locale}/path` ``.

### Internationalization

- Custom system in `i18n/` (not next-intl or similar): `i18n/index.tsx` exports `I18nProvider` + `useTranslation()` (`t`, `locale`, `setLocale`), dictionaries are `i18n/locales/en.json` / `da.json`.
- Every user-facing string must go through `t('key')` and be added to **both** locale JSON files — there's no fallback/missing-key handling.

### Auth

- Firebase Auth wraps through a query/mutation layer in `services/firebase/` (TanStack Query): `queries/` for reads (`useGetCurrentUser`, `useGetProfile`, `useAuthStateSync`), `mutations/` for writes (sign-in email/Google/Apple, sign-out). `services/firebase/index.ts` is the barrel export — import from there rather than deep paths.
- `hooks/useAuth.ts` composes those into one hook (`user`, `isAuthenticated`, `signInWithEmail/Google/Apple`, `signOut`, loading/error flags per provider) and normalizes Firebase errors to `{ success, error }` results.
- Role checking is a separate hook, `hooks/useIsTeamManager.ts`, which reads a Firestore-backed profile (`useGetProfile`) and checks `profile.role` against an allow-list (`team-manager`, `team`, `manager`). It accepts an already-fetched profile or fetches its own.
- `components/auth/ProtectedRoute.tsx` is the route guard used to wrap manager-only pages (e.g. `app/[locale]/admin/dashboard`): it waits on both auth loading and profile loading, and redirects (default `/sign-in`) if unauthenticated _or_ authenticated-but-not-a-manager. When adding a new protected page, wrap it with this component rather than re-deriving the auth/role checks.
- `services/firebase/config/firebase-config.ts` lazily initializes the Firebase app only in the browser (`typeof window !== 'undefined'`), and no-ops with a console warning if `NEXT_PUBLIC_FIREBASE_*` env vars are missing — auth features degrade gracefully rather than crashing SSR.
- Client-side login attempts are throttled by `lib/security.ts`'s `authRateLimiter` (in-memory, 5 attempts / 15 min per identifier); reuse it for any new auth-adjacent endpoint rather than adding new rate-limiting logic.

### Component library

- All UI primitives live in `components/ui/` (shadcn/ui-style, CVA variants, `React.forwardRef`). Page sections live in `components/sections/<SectionName>/index.tsx`. New primitives should be registered in the living style guide at `app/[locale]/component-library/page.tsx`.
- Design tokens (colors, primary `#0802A3`) are declared in `app/globals.css` — never hardcode hex values or raw `bg-gray-*`/`text-black` in components; use the `bg-primary`/`text-foreground`/etc. tokens.
- **Dark mode is deferred** — `ThemeProvider` is currently locked to light mode. Do not add `dark:` variants to new/edited components until dark mode work explicitly begins (this differs from older guidance in `.claude/skills/frontend.md`, which predates that decision).
- Use `cn()` from `lib/utils.ts` for conditional class names.

### Email & file upload

- `app/api/contact`, `app/api/apply`, `app/api/reach-out` send transactional emails via Resend, using React-rendered templates in `components/emails/`.
- `app/api/upload` streams files to Google Cloud Storage via `@google-cloud/storage`, configured from `GCP_PROJECT_ID` / `GCP_CLIENT_EMAIL` / `GCP_PRIVATE_KEY` / `GCP_BUCKET_NAME` env vars (see `.env.example`).

### Deployment

- Hosted on Firebase App Hosting (`firebase.json`, `.firebaserc`, `apphosting.yaml`).

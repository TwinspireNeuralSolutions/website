# Twinspire — GitHub Copilot Instructions

> Loaded automatically by GitHub Copilot in VS Code for every conversation.
> Defines project architecture, design system, coding standards, and 2026 best practices.

## 🏗️ Project Overview

| Item              | Detail                                                                        |
| ----------------- | ----------------------------------------------------------------------------- |
| **Framework**     | Next.js 15 (App Router, `[locale]` routing) + TypeScript strict               |
| **UI Library**    | shadcn/ui — all primitives in `components/ui/`                                |
| **Styling**       | Tailwind CSS v4 + design tokens in `app/globals.css`                          |
| **State**         | TanStack React Query (server state) + React Context (client state)            |
| **Auth**          | Firebase Auth — hooks in `hooks/`, service layer in `services/firebase/`      |
| **i18n**          | Custom system in `i18n/` — Danish (`da`) + English (`en`), URL-segment driven |
| **Theming**       | Dark / Light / System — `components/providers/ThemeProvider.tsx`              |
| **Font**          | Satoshi — FontShare CDN                                                       |
| **Primary Color** | `#0802A3`                                                                     |

---

## � Project Structure

```
app/
  layout.tsx                     # Minimal root layout (html/body/theme-script only)
  sitemap.ts                     # Locale-aware sitemap
  [locale]/                      # Locale segment (en | da)
    layout.tsx                   # Providers: ThemeProvider, I18nProvider, AuthProvider
    page.tsx                     # Home page
    admin/
      layout.tsx                 # HeroBackground layout wrapper
      page.tsx                   # Team Manager login
      dashboard/page.tsx         # Upload dashboard (protected)
      components/                # Admin-only components
      hooks/                     # Admin-only hooks (useAdminLogin)
    component-library/page.tsx   # Living style guide
  api/
    upload/route.ts              # File upload API (no locale needed)

components/
  ui/                            # shadcn/ui primitives + design system components
  auth/                          # ProtectedRoute guard
  providers/                     # AuthProvider, ThemeProvider

hooks/                           # Shared hooks (useAuth, useIsTeamManager, etc.)
i18n/
  config.ts                      # Locale config (en | da)
  index.tsx                      # I18nProvider + useTranslation
  locales/en.json                # English translations
  locales/da.json                # Danish translations
lib/                             # Utilities: cn(), security helpers, seo config
services/firebase/               # Firebase service layer
```

### URL Routing

| URL                        | Page                                             |
| -------------------------- | ------------------------------------------------ |
| `/`                        | Redirected to `/{detected-locale}` by middleware |
| `/en` or `/da`             | Home page                                        |
| `/en/admin` or `/da/admin` | Team Manager login                               |
| `/en/admin/dashboard`      | Upload dashboard (auth required)                 |
| `/en/component-library`    | Component library style guide                    |

**Locale detection order:** URL segment → Accept-Language header → localStorage → browser language → timezone (Copenhagen → da) → default en

---

## 📦 Component Library — ALWAYS USE shadcn/ui

All UI primitives live in `components/ui/`. **Never create one-off styled elements.**

| Component          | Import Path                         | Notes                                                                                                                                   |
| ------------------ | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| `Button`           | `@/components/ui/button`            | Variants: `primary`, `white`, `ghost`, `outline`, `destructive`, `link`, `secondary`. `showIcon` = animated arrow (−45° → 0° on hover). |
| `Typography`       | `@/components/ui/typography`        | Variants: `title` (40px bold), `subtitle` (16px), `heading` (16px bold), `paragraph` (12px).                                            |
| `Input`            | `@/components/ui/input`             | Standard text input with focus ring                                                                                                     |
| `Textarea`         | `@/components/ui/textarea`          | Multi-line input                                                                                                                        |
| `Label`            | `@/components/ui/label`             | Form label                                                                                                                              |
| `Card`             | `@/components/ui/card`              | Card container with subcomponents                                                                                                       |
| `Alert`            | `@/components/ui/alert`             | Feedback alerts                                                                                                                         |
| `ChipSelect`       | `@/components/ui/chipSelect`        | Selection chips                                                                                                                         |
| `LanguageSelector` | `@/components/ui/language-selector` | EN/DA toggle                                                                                                                            |
| `ThemeToggle`      | `@/components/ui/theme-toggle`      | Dark/light toggle                                                                                                                       |
| `HeroBackground`   | `@/components/ui/hero-background`   | Full-screen gradient + video                                                                                                            |
| `BackgroundVideo`  | `@/components/ui/background-video`  | Lazy-loaded video overlay                                                                                                               |

### Adding New Components

1. `components/ui/` for primitives with variants; `components/modules/` for complex, page-level sections
2. Use **CVA** (`class-variance-authority`) for variant-based styling
3. Use `React.forwardRef` + set `Component.displayName`
4. Add JSDoc `/** */` above every exported component
5. Register new components in the living style guide at `/[locale]/component-library`

### Core Usage Rules

1. **Never hardcode text** — always use `useTranslation()`:

   ```tsx
   const { t } = useTranslation()
   return <Typography variant="title">{t('section.key')}</Typography>
   ```

2. **Never hardcode colors** — use design tokens:

   ```tsx
   // ✅ Correct
   <div className="bg-primary text-white" />
   // ❌ Wrong
   <div className="bg-[#0802A3] text-white" />
   ```

3. **Always use `cn()` for conditional classes**:

   ```tsx
   import { cn } from '@/lib/utils'
   ;<div className={cn('base-classes', condition && 'conditional-class')} />
   ```

4. **Always add new strings to BOTH locale files** — `i18n/locales/en.json` AND `i18n/locales/da.json`

---

## 🎨 Design Tokens — NEVER USE RAW HEX VALUES

```
Primary:    #0802A3  →  bg-primary / text-primary
Hover:      #06018a  →  hover:bg-primary-hover
Active:     #050170  →  active:bg-primary-active
Background: #ffffff  →  bg-background  (dark: #0a0a0a)
Foreground: #0a0a0a  →  text-foreground (dark: #fafafa)
Muted:      #737373  →  text-muted-foreground
Border:     #e5e5e5  →  border-border
```

### Typography Scale

| Variant     | Size | Weight | Element |
| ----------- | ---- | ------ | ------- |
| `title`     | 40px | Bold   | `<h1>`  |
| `subtitle`  | 16px | Normal | `<h2>`  |
| `heading`   | 16px | Bold   | `<h3>`  |
| `paragraph` | 12px | Normal | `<p>`   |

---

## 🌍 Internationalization — MANDATORY

**Every user-facing string MUST go through `useTranslation()`.**

```tsx
// ✅ Correct
const { t, locale, setLocale } = useTranslation()
return <Typography variant="title">{t('section.key')}</Typography>

// ❌ Wrong — never hardcode strings
return <Typography variant="title">Hello World</Typography>
```

- Add ALL new strings to BOTH `i18n/locales/en.json` AND `i18n/locales/da.json`
- Parameterized strings: `t('dashboard.uploadTeamData', { device: 'Vald' })`
- Locale-aware links: `href={`/${locale}/admin`}`
- In page components, use `useParams<{ locale: string }>()` for the current locale

---

## 🌓 Dark / Light Theme

- Always add `dark:` Tailwind variants for every color class
- Use semantic tokens (`bg-background`, `text-foreground`) — never hardcode light/dark hex
- `useTheme()` hook for programmatic theme access
- Anti-FOUC theme script runs in `app/layout.tsx` before hydration

---

## ✅ 2026 Frontend Best Practices

### Component Architecture

1. **Single Responsibility** — one component, one purpose
2. **Composition over Configuration** — small, composable pieces
3. **Props Interface** — always a named TypeScript `interface` for props
4. **Default Props** — use destructuring defaults, not `defaultProps`
5. **Forwarded Refs** — `React.forwardRef` for all UI primitives
6. **Display Name** — always set `Component.displayName` for DevTools
7. **CVA Pattern** — use `class-variance-authority` for variant-based styling
8. **File Size Limit** — under 200 lines; split if larger

### TypeScript Standards

- Strict mode ON — no `any`, no `@ts-ignore` without written justification
- Prefer `interface` over `type` for component props
- Use `satisfies` for config objects
- Always type API response shapes; never infer from `any`
- Use discriminated unions for complex state

### State Management

- **Server State** → TanStack React Query (queries, mutations, cache)
- **UI State** → `useState` / `useReducer` locally; Context for cross-tree globals
- **Form State** → React Hook Form + Zod for complex forms
- Avoid prop drilling beyond 2 levels — lift to context or collocate

### Performance 2026

- Default to **Server Components** — add `'use client'` only for event handlers, hooks, browser APIs
- `React.memo()` for expensive child components that receive stable props
- Always use Next.js `<Image>` — never raw `<img>` tags
- Lazy-load heavy components: `React.lazy()` + `<Suspense fallback={...}>`
- Use `generateStaticParams` for all known dynamic routes (e.g., `[locale]`)
- Avoid layout shift — set explicit width/height on images and embeds

### Accessibility (WCAG 2.1 AA)

- Semantic HTML: `<button>`, `<nav>`, `<main>`, `<section>`, `<article>`
- All interactive elements must be keyboard navigable (Tab / Enter / Space / Escape)
- Icon-only buttons **require** `aria-label`
- Form inputs must have an associated `<Label>` (via `htmlFor` or wrapping)
- Color contrast ≥ 4.5:1 for normal text, ≥ 3:1 for large text
- Focus rings must be visible — never `outline: none` without a replacement

### Security

- Never expose secrets in client code (`NEXT_PUBLIC_` prefix only for genuinely public config)
- Sanitize ALL user inputs before display or API submission
- Validate on both client AND server — never trust client-only validation
- Use `lib/security.ts` rate limiter for all auth endpoints
- CSP headers maintained in `middleware.ts`

---

## 🎨 UI/UX Design Principles

### Visual Design

- **8px grid system** — all spacing values are multiples of 4 or 8 (`p-2`, `p-4`, `gap-6`, etc.)
- **Visual hierarchy** — size, weight, and contrast direct eye flow; most important element is largest/boldest
- **Whitespace** — generous spacing makes interfaces feel premium; don't crowd elements
- **Elevation** — `shadow-sm` for cards, `shadow-md` for modals/dropdowns, `shadow-lg` for overlays

### Motion & Animation

- Prefer CSS transitions over JavaScript animations for performance
- Default duration: `transition-all duration-200`; use `duration-300` for larger elements
- Always respect `prefers-reduced-motion` — wrap motion in a media query or hook
- Button icon animation: ArrowRight rotates from −45° to 0° on hover (`transition-transform duration-200`)
- No instant state changes — use transitions to communicate state

### Responsive Design

- **Mobile-first** — design for 375px, progressively enhance for wider viewports
- Touch targets minimum **44×44px**
- Test breakpoints: 320px, 375px, 768px, 1024px, 1440px
- Use `sm:`, `md:`, `lg:`, `xl:` Tailwind prefixes — never fixed pixel widths for layout

### Forms UX

- Inline validation triggers on **blur**, not on every keystroke
- Error messages explain HOW to fix: "Enter a valid email address" not "Validation failed"
- Disable submit button while loading; show spinner inside button
- Support **Enter key** submission for single-field or simple forms
- Show password strength indicators for password fields
- Auto-focus first field when a form modal opens

---

## ⚠️ Pre-Commit Review — Suggestions (Not Blockers)

When reviewing code changes, Copilot checks these and reports:

1. **i18n Coverage** — Are all new user-facing strings in both `en.json` + `da.json`?
2. **Component Library** — Is the code using `components/ui/` instead of custom HTML/CSS?
3. **Design Tokens** — Are colors using CSS variables/Tailwind tokens, not raw hex?
4. **Dark Mode** — Do new styles have `dark:` variants?
5. **TypeScript** — Are there `any` types that could be more specific? Named `interface` for props?
6. **Accessibility** — Do icon-only buttons have `aria-label`? Are forms keyboard navigable?
7. **Performance** — Is `'use client'` used unnecessarily? Missing `<Image>` component?
8. **Security** — Are user inputs sanitized? Any secrets in client code?
9. **File Size** — Is any file over 200 lines and should be split?
10. **Routing** — Are all links locale-aware (`/${locale}/path`)?

> **Format**: "💡 Suggestion: [what] → [why] → [how to fix]" with a minimal code example.
> These are suggestions for code quality — not blocking errors.

---

## 🔧 Quick Reference

```tsx
// Translation + locale routing
const { t, locale, setLocale } = useTranslation()
const { locale } = useParams<{ locale: string }>()

// Theme
const { theme, resolvedTheme, setTheme, toggleTheme } = useTheme()

// Auth
const { user, isAuthenticated, isLoading, signInWithEmail, signOut } = useAuth()

// Utility
import { cn } from '@/lib/utils'
className={cn('base', condition && 'extra')}

// Locale-aware navigation
<Link href={`/${locale}/admin`}>Login</Link>
router.push(`/${locale}/admin/dashboard`)
```

---

## 🤖 Claude Frontend Skills Applied in This Project

Claude brings deep expertise in:

### Architecture & Patterns

- **Next.js 15 App Router** — server/client component boundaries, nested layouts, parallel routes, intercepting routes, `generateStaticParams`, `generateMetadata`
- **Feature-Sliced Design** — separation of `ui/`, `modules/`, `hooks/`, `services/`, `providers/`
- **Design System Architecture** — CVA variant patterns, compound components, Radix UI primitives, token-driven theming with CSS custom properties

### TypeScript & Code Quality

- Generic component patterns (`<T extends object>`)
- Utility types (`Partial`, `Required`, `Pick`, `Omit`, `ReturnType`, `Parameters`)
- Strict null checks, discriminated unions, exhaustive type narrowing
- `satisfies` operator for config type safety

### Performance Engineering

- Core Web Vitals optimization: LCP, INP (Interaction to Next Paint), CLS
- Bundle analysis with `@next/bundle-analyzer`
- Code splitting, lazy loading, prefetching strategies
- React Server Components to eliminate client JS where possible
- Image optimization: WebP/AVIF, responsive `srcset`, blur placeholders

### Accessibility Engineering

- ARIA design patterns (dialog, listbox, combobox, tabs, tree)
- Focus management in modals and dynamic content
- Screen reader testing with VoiceOver / NVDA
- Keyboard navigation flows (Tab order, focus trapping, Escape handling)

### Animation & Micro-interactions

- Framer Motion for complex orchestrated animations
- CSS `@keyframes` and transitions for performance-critical animations
- Scroll-triggered animations with `IntersectionObserver`
- Respecting `prefers-reduced-motion` at every level

### Internationalization (i18n)

- URL-based locale routing (`/[locale]/path`)
- Browser locale detection from `Accept-Language` + timezone heuristics
- `Intl` API for date, number, currency, relative time formatting
- Pluralization and gender-aware translation patterns

### Security

- XSS prevention: content sanitization, `dangerouslySetInnerHTML` avoidance
- CSP (Content Security Policy) header configuration
- Input validation with Zod on client and server
- Rate limiting for auth endpoints
- OWASP Top 10 awareness in form and API design

### Testing

- Unit tests with Vitest + React Testing Library
- Component tests with `@testing-library/user-event` for interaction simulation
- E2E tests with Playwright (locale-aware navigation testing)
- Snapshot tests for design system regressions

### Developer Experience

- Conventional commits (`feat:`, `fix:`, `refactor:`, `docs:`, `chore:`)
- Husky pre-commit hooks for lint + type checking
- ESLint + Prettier configuration
- Component library pages for visual documentation

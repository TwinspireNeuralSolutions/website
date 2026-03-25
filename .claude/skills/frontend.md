# Twinspire Frontend Skills

## Project Context
- Next.js 15 (App Router) + TypeScript strict mode
- Tailwind CSS v4 with custom design tokens
- shadcn/ui component library in `components/ui/`
- Satoshi font family
- Primary brand color: `#0802A3`
- Firebase Auth for authentication
- i18n with Danish (da) and English (en)
- Dark/light theme support

## Component Library
Always use components from `components/ui/`:
- `Button` (variants: primary, white, ghost, outline, destructive, link, secondary; prop: showIcon for animated arrow)
- `Typography` (variants: title 40px bold, subtitle 16px, heading 16px bold, paragraph 12px)
- `Input`, `Textarea`, `Label` — form primitives
- `Card`, `Alert`, `ChipSelect` — layout & feedback
- `LanguageSelector`, `ThemeToggle` — global controls

## Coding Standards
1. All user-facing text via `useTranslation()` hook — never hardcode strings
2. All colors via Tailwind design tokens — never raw hex in JSX
3. Use `cn()` from `@/lib/utils` for conditional classNames
4. TypeScript interfaces for all props — no `any` types
5. `React.forwardRef` + `displayName` for UI primitives
6. JSDoc comments on all exported components/functions
7. CVA (class-variance-authority) for variant-based component styling
8. One component per file, max 200 lines
9. `'use client'` only when needed
10. Semantic HTML + ARIA labels for accessibility
11. Both `dark:` and light styles for all new UI
12. Translation keys in both `en.json` and `da.json`

## Architecture
- `app/` — Next.js pages (App Router)
- `components/ui/` — Reusable design system components
- `components/auth/` — Auth guard components
- `hooks/` — Shared React hooks
- `i18n/` — Internationalization (provider + locales)
- `providers/` — React context providers (Auth, Theme, I18n)
- `services/firebase/` — Firebase service layer
- `lib/` — Utilities (cn, security helpers)

## Pre-Commit Review Checklist
Suggest improvements (not hard blocks) for:
- Missing translations in either locale file
- Hardcoded text/colors not using design system
- Missing TypeScript types
- Missing accessibility attributes
- Missing dark mode support
- Files exceeding 200 lines
- Components not using library primitives

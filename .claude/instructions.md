# Twinspire Project — Claude Instructions

Read and follow the skills defined in `.claude/skills/frontend.md`.

When writing code for this project:

1. Always use the component library in `components/ui/` — never create one-off styled elements.
2. All user-facing text must use the `useTranslation()` hook from `@/i18n`.
3. All colors must use Tailwind design tokens — never hardcode hex values.
4. Support both dark and light themes using `dark:` Tailwind variants.
5. Follow TypeScript strict mode — no `any` types.
6. Add JSDoc comments to all exported functions and components.
7. Keep files under 200 lines — split if larger.

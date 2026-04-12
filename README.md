# website

## fix-title-size Changes

Date: 2026-04-12 Branch: fix-title-size

### Summary
Title typography was too small and not bold enough. Updated to be larger and
bolder across all breakpoints, matching the agreed design.

### What Changed
1. Title variant size and weight increase
- Changed title from `font-bold` (700) to `font-extrabold` (800).
- Increased sizes: 24px → 28px (mobile), 34px → 40px (sm), 44px → 52px (lg).
- File:
 - components/ui/typography.tsx

2. Hero and Footer titles made responsive
- Replaced hardcoded inline `clamp()` styles with responsive Tailwind breakpoint
  classes.
- Files:
 - components/sections/Hero/index.tsx
 - components/sections/Footer/index.tsx

3. Section heading line splits updated
- Split BuiltFor and Problem headings into two lines matching the design.
- Merged Product headline back into single flowing text.
- Files:
 - components/sections/BuiltFor/index.tsx
 - components/sections/Problem/index.tsx
 - components/sections/Product/index.tsx
 - i18n/locales/en.json
 - i18n/locales/da.json

4. All titles set to uppercase (ALL CAPS)
- Added `uppercase` to the title variant in Typography and Hero h1.
- Capitalized all heading strings in en.json (e.g. "to" → "To", "a" → "A").
- Reduced title sizes for a professional look with caps: 24px (mobile), 32px
  (sm), 42px (lg).
- Files:
 - components/ui/typography.tsx
 - components/sections/Hero/index.tsx
 - i18n/locales/en.json



## FAQ-v2 Changes

Date: 2026-04-10 Branch: FAQ-v2

### Summary
FAQ section title and accordion behavior were updated.

### What Changed
1. FAQ title update
- Changed FAQ title to FAQ's in both locales.
- Files:
 - i18n/locales/en.json
 - i18n/locales/da.json

2. Dropdown spacing update
- Added more top padding inside expanded FAQ answers.
- File:
 - components/sections/FAQ/index.tsx

3. Open/close animation enhancement
- Added smoother expand/collapse timing.
- Added content slide and fade for open/close.
- Improved plus icon motion (rotate and subtle scale).
- File:
 - components/sections/FAQ/index.tsx

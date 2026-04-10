# website

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



## Hero Updated — Branch: `here-updated`

**Date:** 2026-04-10

### Screenshot

![Hero Section](docs/hero-screenshot.png)

> Take a screenshot of the hero section and save it to
> `docs/hero-screenshot.png`

### Summary

Redesigned the Hero section for a more professional, high-impact look. Updated
background image, typography, color accents, and navbar styling.

### What Changed

#### 1. Hero Background Image
- Replaced `/hero-image.jpg` with `/hero2.png` (night-lit stadium, player
  kicking from behind)
- Repositioned image to the right: `object-[right_20%]`
- **File:** `components/sections/Hero/index.tsx`

#### 2. Hero Headline Styling
- Added `uppercase` to the headline
- Increased font size: `clamp(1.9rem, 3.2vw, 4.5rem)` →
  `clamp(2.2rem, 4vw, 4.5rem)`
- "Before You Do." line highlighted in sky blue (`#0ea5e9`)
- **File:** `components/sections/Hero/index.tsx`

#### 3. Hero Subtitle — One Sentence Per Line
- Split single `hero.subtitle` key into three keys: `subtitleLine1`,
  `subtitleLine2`, `subtitleLine3`
- Each sentence renders on its own line with `font-medium tracking-wide`
- **Files:**
  - `components/sections/Hero/index.tsx`
  - `i18n/locales/en.json`
  - `i18n/locales/da.json`

#### 4. Text Fix
- Changed "tears" → "tear" in the English subtitle
- **File:** `i18n/locales/en.json`

#### 5. Navbar — Professional Sizing
- Increased nav padding: `py-3.5` → `py-4` / `py-4` → `py-5`
- Larger logo: `h-7 w-[120px]` → `h-8 w-[130px]` (desktop: `h-9 w-[144px]`)
- Nav links: `uppercase`, `tracking-wide`, wider hit areas (`px-5 py-2.5`), more
  gap
- **File:** `components/ui/navbar.tsx`

#### 6. Team Login Button — Sky Blue
- Changed from default primary to `bg-[#0ea5e9]` (matching the headline accent)
- **File:** `components/ui/navbar.tsx`

#### 7. Language Selector — Refined
- Added `tracking-wide` for consistent typography with nav links
- **File:** `components/ui/language-selector.tsx`

### Files Modified

| File | Change |
|------|--------|
| `components/sections/Hero/index.tsx` | Image, headline style, subtitle split |
| `components/ui/navbar.tsx` | Sizing, spacing, button color, uppercase links |
| `components/ui/language-selector.tsx` | Tracking adjustment |
| `i18n/locales/en.json` | Subtitle split into 3 lines, typo fix |
| `i18n/locales/da.json` | Subtitle split into 3 lines |
| `app/globals.css` | Minor formatting |

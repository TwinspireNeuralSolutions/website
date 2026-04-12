# website

## fix-hero Changes

Date: 2026-04-12 Branch: fix-hero

### Summary
Fixed hero section text and background image.

### What Changed
1. Fixed typo in hero subtitle
- Changed "tears" to "tear" in hero subtitle text.
- File:
 - i18n/locales/en.json

2. Removed number 7 from football player t-shirt on hero background image
- Updated hero background image to remove the number 7 from the player's shirt.



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

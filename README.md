# website

## fix-dash-to-point Changes

Date: 2026-04-12 Branch: fix-dash-to-point

### Summary
Changed bullet indicators from dashes to black dots in the Trust section, with
left padding for better visual hierarchy.

### What Changed
1. Replaced dash indicators with black bullet points
- Changed from a horizontal line to a small filled circle.
- Changed color from primary to black (foreground).
- Added left padding (pl-8) to indent bullets from the text above.
- File:
 - components/sections/ScienceDataTrust/index.tsx



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

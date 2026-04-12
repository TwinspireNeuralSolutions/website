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

## Partnerships Section Placement Update

Date: 2026-04-12 Branch: partnerships-section

### Summary
Moved the Partnerships section to appear immediately after the Problem section
("The Reinjury Rate Hasn't Moved in a Decade. Let's Change That.") for improved
narrative flow and trust-building.

### What Changed
- Updated `app/[locale]/page.tsx` to render
  `<PartnersSection showPartnershipText />` after `<ProblemSection />` instead
  of after the hero or before the footer.
- Follows best practice for trust and collaboration call to action.

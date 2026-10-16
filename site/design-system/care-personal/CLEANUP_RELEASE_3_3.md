# Care is Personal v3.3 — cleanup and optimization

## Changes applied

This release continues the approved cobalt-and-lavender identity. There is no new brand direction.

### Removed unused source

- Removed all 26 disconnected pre-redesign Astro components (including the recruiter homepage and retired lightbox). The six components actively imported by public pages remain.
- Removed 10 unused CSS modules, including the recruiter, portfolio-v4, ledger, practice, traffic and old contact-flow styles.
- Removed three unreferenced client motion modules. The current header/scroll behavior, GSAP section animation and mobile dialog accessibility remain.
- Simplified the active `motion.ts` by removing handlers for the disconnected lightbox and old card interactions.
- Removed the stale 5.9 MB hero cutout and unused overlay/social placeholder. The approved authentic portrait remains.

### Dependency cleanup

- The root dependency manifest no longer declares 23 unused React, animation, legacy font and type packages.
- Sharp is now a declared runtime build dependency; Astro and GSAP remain active.
- Removed Google Fonts network permission from CSP after consolidating to local Public Sans.

### Website improvements

- Editorial headings on mobile are shorter and flow in fewer lines; page titles and descriptions retain the full professional context and keywords.
- Footer small print/link sizes increased; keyboard focus rings strengthened for light and dark backgrounds.
- Open Graph cards use the current cobalt/lavender visual identity. Sharp converts SVG sources to 1200x630 PNG during the build for both homepage and all articles.
- Real portrait generates responsive 360/720/960 WebP variants; JPEG fallback is preserved.
- Editorial photos use `srcset` to avoid downloading desktop-sized versions on phones. Their illustrative status and credits are preserved.
- The contact form now explains that FormSubmit processes messages; do not send sensitive records.

### Testing and deployment

- Build verification now checks that retired code/assets stay removed.
- Browser tests verify generated PNG social previews, mobile heading height and readable footer text.
- Visual regression uses a bounded image wait and downsampled comparison while retaining full-resolution image evidence. The reviewed v3.2→v3.3 design transition is documented; later edits within v3.3 remain subject to normal pixel-difference checks.
- Keep the PR separate from `main` until build, browser and screenshot checks pass. On merge, verify the exact deployed commit through Production Smoke.

## Not changed without verification

Professional records, licensure expiry or renewal claims, IISH contract status, research duties, nursing scope, published articles, routes, and contact addresses.

## Remaining improvements for a separate review

- Replace illustrative third-party photos with more authentic, approved professional imagery from Reeja.
- Migrate the still-active legacy structural CSS selectors (`field-journal-*.css`) after route-level visual parity is proven. Those files still style live sections; deleting them wholesale is unsafe.
- Regenerate/prune legacy transitive lock-file entries using a fresh clean npm install when dependency changes are fully validated.
- Obtain direct confirmation for the Texas RN status before 2026-10-31 and research contract details before 2026-11-30.
- Conduct a manual screen-reader and 200% zoom/reflow audit. The automated checks alone are not WCAG certification.

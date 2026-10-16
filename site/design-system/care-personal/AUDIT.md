# Site-wide UI / UX / Accessibility Audit — 2026-10-16

**Scope:** Current public Astro routes, global design tokens, typography, footer, navigation, article layout, buttons, contact form, and GSAP behavior. All work is isolated to the `audit/design-system-accessibility-2026` branch before release.

## Confirmed findings and action taken

| Severity | Finding | Evidence | Action |
|---|---|---|---|
| P1 | Legacy footer CSS was competing with the new component's hover/link states. | `src/styles/shell.css`, `field-journal-home.css`, `care-personal-inner.css`, plus new footer module each set overlapping selectors. | Retired competing legacy footer selectors; kept `care-article-footer.css` as owner. |
| P1 | Semantic root palette still reflected previous dark-green clinical brand. | `src/styles/tokens.css`: `--accent`, `--bg`, `--text`, etc. | Mapped semantic tokens to cobalt, lavender, ink, and readable muted shades. |
| P1 | Coral was too light for small accent labels over light surfaces. | Legacy coral `#EF7866` is about 2.8:1 on white; another `#D45849` was under 4.5:1. | Added `--brand-coral-ink:#A73E34` (about 6.2:1 on white); reserved bright coral for ornament. |
| P2 | Typography still downloaded three older Google Font families while the current design already used locally imported Public Sans. | `BaseLayout.astro` external stylesheet and older Field Journal declarations. | Migrated older declarations to semantic font tokens and removed the Google Font network dependency. |
| P2 | "Skip to Reeja's profile" was an inaccurate landmark label for research, journal, and contact pages. | `BaseLayout.astro` shared skip link. | Renamed to "Skip to main content" with the same correct landmark target. |
| P2 | Source ownership verification still mandated the retired generic footer stylesheet. | `scripts/verify-source-ownership.mjs`. | Updated contract to require the actual current footer component's style owner. |

## Automated verification added

`tests/browser/accessibility-sitewide.spec.ts` covers:
- Main landmark and one H1 per route
- Images with explicit alt attributes
- Visible anchor/button accessible names
- Visible form field labels, and safe external-tab attributes
- No horizontal overflow at 320, 390, 768, and 1440px
- Computed foreground text contrast >=4.5:1 for representative brand, article, clinical, and footer labels
- Keyboard-visible skip navigation

Existing regression suites additionally test: responsive visual snapshots, mobile-dialog focus trap, valid professional contact form, footer CTA hover/focus contrast, metadata layouts, image loading, content and security headers, reduced-motion rendering, professional facts, and expiry checks.

**Accessibility qualification:** Automated tests are useful but are not a certificate of full WCAG 2.2 AA conformance. A manual keyboard, screen reader, 200% zoom, and visual review is still recommended before making a formal accessibility claim.

## Design governance

See [MASTER.md](./MASTER.md) for owned modules, color and type tokens, interaction rules, and release checklist. Do not re-add footer overrides in any retired CSS module. Adding new global color/typography constants requires updating the token source, not another CSS patch.

## Open follow-ups (not changed without additional verification)

1. A second iteration can combine `fieldJournalMotion.ts` and `carePersonalMotion.ts` after measuring their overlap. Both currently have distinct section-ownership responsibilities; removing either without migration would break motion.
2. Audit the large group of installed motion/animation dependencies and remove only those shown unused by the production bundle.
3. Self-host and optimize approved illustrative photography, with attribution and faithful alt text; current images rely on external Unsplash URLs.
4. Verify the status of the Texas RN license (source expiry 2026-10-31) and research contract (2026-11-30) directly with Reeja before those dates. Do not independently infer a renewal.
5. Run manual assistive-technology and real-device testing for visual focus, legibility, 200% zoom and image text alternatives.

## Release gate

Merge only when GitHub Build Check, Browser Quality, and deployment-root build succeed, plus intentional design-release visual differences have been reviewed. After merging, verify exact production build fingerprint and pass Production Smoke on `main`.

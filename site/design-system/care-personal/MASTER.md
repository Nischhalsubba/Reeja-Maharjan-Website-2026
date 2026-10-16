# Care is Personal — design system v3.2

Applies to all public pages on reejamaharjan.com.np. This is a **working source-of-truth for new UI**, replacing the previous "Field Journal" and clinical-green visual palettes. Historical CSS modules remain only while their required structural layouts are migrated.

## Source ownership

| Concern | Authoritative source |
|---|---|
| Brand identity, semantic colors, type, spacing aliases, focus tokens | `src/styles/tokens.css` |
| Element resets, default focus, reduced motion, skip link | `src/styles/base.css` |
| Header and mobile dialog layout | `src/styles/components.css`, `src/styles/shell.css` |
| Current homepage design | `src/styles/care-is-personal.css` |
| Current inner page templates | `src/styles/care-personal-inner.css` |
| Article detail masthead and **all footer styles** | `src/styles/care-article-footer.css` |
| GSAP homepage, image and microinteraction motion | `src/lib/carePersonalMotion.ts` |
| GSAP legacy inner-page reveals | `src/lib/fieldJournalMotion.ts` (consolidation candidate) |
| Static source contract | `scripts/verify-source-ownership.mjs` |
| Rendered accessibility audit | `tests/browser/accessibility-sitewide.spec.ts` |

Never reintroduce `.site-footer` appearance rules in `shell.css` or `field-journal-home.css`. Do not patch a contrast defect with a new generic global selector or additional `!important` overrides.

## Palette

| Token | Value | Usage |
|---|---|---|
| `--brand-blue` | `#3454F5` | Primary buttons, links, accent UI; white copy on top (5.63:1) |
| `--brand-blue-hover` | `#223FDA` | Hover/active/focused primary actions with white text |
| `--brand-ink` | `#10182F` | Headings/body on light surfaces |
| `--brand-canvas` | `#F8F9FD` | Soft background |
| `--brand-lavender` | `#EEF0FF` | Supporting surfaces |
| `--brand-muted` | `#53617C` | Secondary body copy; 6.2:1 on white |
| `--brand-line` | `#DCE2EF` | Dividers/borders; not for essential textual content |
| `--brand-coral` | `#EF7866` | **Decorative only**: bars, dots, underlines |
| `--brand-coral-ink` | `#A73E34` | Eyebrow labels / other small accent text, about 6.2:1 on white |
| `--brand-focus` | `#FFB69B` | Visible warm focus outline on dark controls |

**Forbidden:** pale brand coral on white for normal-size text; pale lavender text on pale lavender button backgrounds; color-only signaling.

## Type and spacing

- Use self-hosted Public Sans (400/600/700/800), with `system-ui` fallback. Avoid additional external Google Font downloads.
- H1/H2 follow the current article/home/inner template fluid scale. Maintain a maximum readable text measure; do not revert the old 860px cap on the *entire article header*.
- Container maximum: 1240px; standard gutter `clamp(20px, 4vw, 52px)`.
- Body paragraphs: aim for 65–75 characters per line and 1.5–1.7 line height.
- Default interaction target 44px or larger. Keep icon-only controls named.
- Visible focus and keyboard access are essential. Do not rely exclusively on hover movement.
- Respect `prefers-reduced-motion`; never hide page content before JavaScript executes.

## Images and content

Use Reeja's approved personal photos for biographical sections, properly attributed illustrative assets only when needed. Stock images must never be described as her patients, colleagues or actual study work. Keep clinical claims evidence-based and verify time-limited license/contract statuses before publication.

## Release checklist

1. `npm run verify` in `site/` including source, facts, expiry, a11y and Astro checks.
2. Build from the repository root (`npm run build`) for Cloudflare compatibility.
3. Browser quality checks: forms, navigation, all public routes (320/390/768/1440 widths), alt/name labels, focus, text contrast, footer states, and reduced-motion behavior.
4. Review visual regression images, distinguishing intentional design changes from unwanted layout defects.
5. Merge only after approvals; production smoke must confirm the exact deployed commit and public pages.

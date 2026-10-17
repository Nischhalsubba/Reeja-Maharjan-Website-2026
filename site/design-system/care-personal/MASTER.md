# Care is Personal — design system v4.0

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


## v4 editorial hierarchy

All inner pages must use the typography rules owned by `src/styles/care-editorial-v4.css` (not the deleted Field Journal theme):
- Hero H1: fluid 2.9–4.6rem, approximately 1.075 line-height; mobile 2.15–3.12rem.
- Section H2: fluid 2.1–3.55rem, approximately 1.105 line-height; mobile 1.95–2.58rem.
- Article long titles: 2.55–4.95rem on large viewports and 2.05–2.83rem on small screens; max 25ch only above mobile.
- Reading text: 1–1.07rem with 1.68–1.78 line height and a controlled article measure.
- Footer/metadata/legal copy: minimum 0.8125rem (13px) and readable vertical spacing.
- Blue or white 3px focus indicators depending on background; keep text contrast 4.5:1.
- Semantic `data-design-system="care-is-personal"` and v4 `data-design-version` mark the active design.
- OG cards: original SVG visual source, PNG output created by `scripts/generate-social-png.mjs` during Astro build; confirm `/og-default.png` and every article `/og/articles/<slug>.png`.

The retired `field-journal-home.css`, `field-journal-pages.css`, `field-journal-finish.css`, and `fieldJournalMotion.ts` have been removed. Do not reintroduce them.

## Release checklist

1. `npm run verify` in `site/` including source, facts, expiry, a11y and Astro checks.
2. Build from the repository root (`npm run build`) for Cloudflare compatibility.
3. Browser quality checks: forms, navigation, all public routes (320/390/768/1440 widths), alt/name labels, focus, text contrast, footer states, and reduced-motion behavior.
4. Review visual regression images, distinguishing intentional design changes from unwanted layout defects.
5. Merge only after approvals; production smoke must confirm the exact deployed commit and public pages.

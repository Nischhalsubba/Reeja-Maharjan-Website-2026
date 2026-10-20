# Reeja — Editorial Homepage 09

## Intent
A materially new, premium personal-brand homepage for Reeja Maharjan. Existing DS v1 semantic tokens/components and inner pages stay intact.

- **Audience:** recruiters, hospital teams, maternal-health research collaborators and readers.
- **Visual read:** human-first editorial publication rather than healthcare brochure or SaaS dashboard.
- **Craft principles:** Webflow-inspired brand composition, healthcare reading/accessibility discipline, handmade typography and authentic photography.
- **Do not imitate:** Webflow logos, layouts or owned art; avoid generic blue clinical dashboards, made-up metrics, stock photos presented as Reeja.

## Before / After
| Before (v8) | Now (v9) |
|---|---|
| Dark full-bleed low-resolution lakeside hero | Warm paper, asymmetric split hero using the higher resolution **real portrait** |
| Large Public Sans display over photo | Georgia optical serif display with forest-green italic accent |
| Repeated four equal focus cards | Four purposely unequal, magazine-style modules |
| Dark about chapter with oversized portrait crop | Botanical sage chapter with small genuine lakeside photograph |
| Standard stacked job rows | Document-like professional chronology with large typographic numbers |
| Generic two-column research feature | Rich editorial research chapter and four clearly separated participation steps |
| Three equal article cards | Featured cover story plus two supporting article stories |
| Dark end CTA | Light sage conclusion, stark primary action |
| Existing 600px photo stretched full screen | 896×1200 real portrait, context-sized; genuine 4K lakeside original remains tracked in issue #96 |

## Technical implementation
- `src/components/SlateHomepage.astro` retains semantic content from professional facts, profile experience and editorial blog data.
- `src/styles/reeja-editorial-home.css` overrides only the homepage scope and loads after the existing global CSS.
- `src/layouts/BaseLayout.astro` preloads the new hero portrait on the homepage only.
- Existing home section IDs, links, and content remain functional and crawlable.
- Site release version `9.0.0-care-personal`; accepted visual transition `8.2.0-care-personal=>9.0.0-care-personal`.
- Accessibility: real HTML landmarks, textual evidence, named CTAs, independent keyboard focus, contrast-aware dark/light sections, reduced motion, and no horizontal overflow at 320–1920px.

## Before merge
Review rendered evidence from GitHub Visual Regression and Browser Quality (test: `tests/browser/home-editorial-v9.spec.ts`). Verify crop and spacing in screenshots at 320 / 390 / 768 / 1440 and with zoom/reduced motion. Source can express intended design but screenshot review is required to claim it looks right.

## Not implemented or assumed
- No claim of original 4K photographic quality: the personal portrait is 896×1200px and the lakeside original remains 600×338px.
- No new, unverified license status; public facts keep existing source, and expiry is tracked separately.
- No migration of inner-page design or real clinical outcome data.

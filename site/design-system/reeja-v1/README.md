# Reeja Design System · v1.0.0

A **brand-owned**, lightweight design system for Reeja Maharjan's Astro portfolio, nursing experience, maternal-health research, articles and professional-contact journeys.

**Living reference:** `/design-system/` (rendered, public for review, `noindex, follow`).
**Release version:** the DS itself is v1.0.0; the website has its own release/version history.

## 1. Principles

1. **Person before metrics:** clearly identify Reeja, her verifiable nursing qualification, research role and experience before decorative counters or generic dashboards.
2. **One recognizable language:** deep slate chapters, purposeful seafoam accents, Georgia editorial headlines and locally hosted Public Sans for functional text.
3. **Accessible as shipped:** semantic elements; keyboard-visible focus; minimum 44px primary targets; 4.5:1 normal text, 3:1 meaningful non-text components; reduce-motion support; 320px mobile reflow.
4. **Truthful healthcare communication:** distinguish clinical practice from research support; no patient images/data without appropriate authorization; no invented clinical results or affiliation.
5. **Progressive disclosure:** orient, provide evidence, then invite contact; don't bury primary actions or overwhelm healthcare readers.
6. **Performance is a feature:** prefer small Astro islands, no unnecessary JS frameworks, locally hosted type, responsive photographic assets and zero design-framework dependencies.
7. **Purposeful motion:** transitions communicate hierarchy; animations never conceal content or block inputs.

## 2. Sources of truth

| Contract | Location |
|---|---|
| Existing global product/page tokens | `src/styles/tokens.css` |
| Owned semantic DS aliases + component states | `src/styles/design-system.css` |
| Component library | `src/components/design-system/` |
| Rendered reference | `src/pages/design-system/index.astro` and `src/styles/design-system-lab.css` |
| Machine-readable token export for Figma | `design-system/reeja-v1/tokens.json` |
| Token equivalence & contrast gate | `scripts/verify-design-system.mjs` |
| End-to-end component QA | `tests/browser/design-system-v1.spec.ts` |
| Existing global type, reset, accessibility | `src/styles/base.css`, `src/styles/slate-site.css` |

The existing legacy `--brand-blue` variable *contains teal*, due to historic migration. New code should use `--ds-teal-600` and similar semantic roles; legacy tokens remain for backwards compatibility until a measured, screenshot-reviewed removal is possible.

## 3. Foundational tokens

### Color
- Canvas: `#F5F8FA`, paper: `#FFFFFF`
- Deep chapter: `#101C29` / `#1C2C3A`
- Headings: `#202D3D`; quiet text: `#56697B`
- Actions: `#2F7368` default and `#205950` on hover
- Seafoam detail: `#B2E9DB` on dark; soft surface: `#EAF0F5`
- Borders: `#DAE2E8`
- Success `#206049`; warning `#7D5418`; error `#A03535` (always pair with written status)

Radix Colors inspired role/state consistency; this is **our own brand palette** and **not** a Radix color import.

### Typography
- Georgia, serif: editorial headlines, feature cards, key brand statements.
- Public Sans, sans-serif: paragraphs, controls, navigation, notes, tables, form labels.
- H1/H2 responsive; body around 16–17px with 1.6–1.75 line-height; labels/metadata 14px+.
- Headlines should have considered line breaks, not truncation.

### Layout / motion / shape
- 8px spacing grid with documented steps 8/16/24/32/48/64; responsive containers use existing `--gutter`.
- 44px minimum critical target, 4px button radius, 6px surface radius.
- 160ms short / 260ms standard; respect `prefers-reduced-motion: reduce`.
- Prefer borders and tonal planes before large shadows. Photo composition must remain authentic.

## 4. Public component APIs

### `BrandAction.astro`
- Props: `href?`, `variant?: 'primary'|'secondary'|'text'`, `size?: 'default'|'compact'`, `className?`, `target?`, `type?`, `disabled?`, `ariaLabel?`, `dataTrack?`.
- With `href` → native `<a>` navigation; without it → native `<button>`. Disabled navigations yield disabled native buttons (never dead anchors).
- Interactive states: default, hover, keyboard focus, disabled; external links get `rel="noopener noreferrer"` automatically.
- Replaces repeated CTA code in research and hiring, and consistent inner-page CTAs in maternal-health pages.

### `BrandCard.astro`
- Props: `variant?: 'default'|'soft'|'outlined'`, `className?`, `labelledBy?`.
- Native `<article>`; caller owns heading and link labels. Do not make the *entire* card clickable and nest further interactive elements.
- Used in evidence-backed areas of research, hiring and nursing.

### `EvidenceList.astro`
- Props: `items: {label:string;value:string}[]`, `className?`.
- Native `<dl>`, `<dt>`, `<dd>` for real professional information; preserve factual source ownership in calling page.
- No fabricated metrics or licensure status claims.

### `Eyebrow.astro`
- Props: `inverse?`, `className?`.
- Native paragraph; text is optional context, **never a substitute for a semantic heading**.

## 5. Component-state acceptance

| Component | Default | Hover | Focus-visible | Disabled | Dark surface |
|---|---|---|---|---|---|
| Primary action | White on deep teal | White on darker teal | 3px contrasting ring | Native disabled button | Inverse treatment if used |
| Secondary action | Teal outline/text | Soft seafoam fill | 3px ring | Native disabled button | White text, seafoam outline |
| Text action | Underline + teal | Soft fill | 3px ring | Native disabled button | White + seafoam |
| Card | Readable surface, semantic heading | No assumed click affordance | Each contained link is focusable | n/a | Use dark-safe variant |
| Evidence panel | Grouped and labelled facts | n/a | Contained links focusable | n/a | Inverse text for dark hero |

## 6. Figma handoff

The file `tokens.json` is a structured, named token export. Each token has a CSS-variable mapping at `$extensions['reeja/css-variable']`; automated verification fails if Figma-value snapshots drift from CSS.

Suggested pages for the corresponding Figma design file:
- `00 / Cover & changelog`
- `01 / Foundations: colors + type + spacing`
- `02 / Components: actions, cards, evidence, labels, form controls`
- `03 / Patterns: recruitment, research, articles, contact`
- `04 / Responsive + states`
- `05 / Accessibility + handoff`

Suggested Figma component properties:
- `Action / Variant=Primary|Secondary|Text / State=Default|Hover|Focus|Disabled / Size=Default|Compact`
- `Card / Surface=Default|Soft|Outlined`
- `Evidence / Rows=2|3|4`
- `Eyebrow / Contrast=Light|Dark`

Import tokens via a compatible variable/token importer or create native variables manually; token JSON alone does not publish a Figma library. Keep the Figma file under its own name and link it to GitHub as an external design artifact rather than presenting the web reference page as native Figma components.

## 7. Verification and release

```sh
cd site
npm ci
npm run verify:design-system
npm run verify
npx playwright test tests/browser/design-system-v1.spec.ts
```

Before merge: Build Check, Browser Quality, Visual Regression and review of 320/390/768/1440 screenshots; compare **only intentional new DS changes** with release baselines. Verify contact submission separately using an owner-approved test.

## 8. Inspiration and intellectual-property boundaries

- [Webflow Brand Guidelines](https://brand.webflow.com/design-guidelines): craft, hierarchy, art-direction, narrative motion **only**; no copied Webflow identity/graphics/fonts.
- [NHS Design System](https://service-manual.nhs.uk/design-system): public-health clarity, accessibility and proven task patterns; no implied affiliation.
- [Radix Colors](https://www.radix-ui.com/colors): semantic color scales and contrast methodology.
- [Open Props](https://open-props.style/): framework-agnostic CSS custom-property approach. We currently **do not install Open Props**.
- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): accessibility acceptance.

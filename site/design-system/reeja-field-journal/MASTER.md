# Reeja Maharjan Field Journal — Design System MASTER

## Visual thesis
Quiet, tactile research-field-journal identity with warm paper neutrals, ink-first typography, madder and indigo editorial accents, Crimson Pro display type paired with Atkinson Hyperlegible body text, spacious chapter-like rhythm, and mostly flat rectangular components with fine rules and restrained material texture.

## Interaction thesis
Slow, tactile and cinematic rather than flashy: 140–180ms micro-interactions, 420ms section reveals, 620ms hero sequences, subtle translation and contrast on hover, native scrolling with discrete GSAP reveals, no bounce, no scroll hijacking, no perpetual ambient motion, and no Three.js unless a material or research visualization earns its performance cost. Reduced-motion users receive direct stable layouts with short opacity changes only.

## Color tokens
- `--paper: #F4EFE6` — primary background
- `--paper-deep: #E7DDCE` — secondary paper / backing sheet
- `--surface: #FBF8F2` — reading surfaces and controls
- `--ink: #1C1917` — primary text and rules
- `--graphite: #514B45` — secondary copy
- `--muted: #6F675F` — metadata
- `--madder: #8F3D32` — editorial accent
- `--indigo: #263653` — strong accent / CTA hover
- `--brass: #B58A45` — decorative material highlight only
- `--line: #CFC3B2` — dividers and quiet boundaries
- `--success: #355D4A` — semantic success only
- `--danger: #8B2F2A` — semantic error only

## Typography
- Display / editorial: **Crimson Pro**, weights 450–650, italic permitted for selected emphasis.
- Body / UI / forms: **Atkinson Hyperlegible**, 400 and 700.
- Metadata / dates / evidence labels: **JetBrains Mono**, 400–500.
- Hero scale: `clamp(4rem, 7vw, 7rem)` with 0.87–0.92 line-height.
- Section titles: `clamp(2.5rem, 5vw, 5rem)`.
- Body: 1rem–1.1rem, 1.55–1.7 line-height, 58–68 character measure.

The approved preview uses Google Fonts. Production may load these font families from `fonts.googleapis.com` / `fonts.gstatic.com`; the CSP must explicitly allow only those font origins if that delivery path is used.

## Spacing tokens
8, 12, 16, 24, 32, 48, 72, 96px. Use 48–96 for narrative chapters and 12–24 for evidence groups. Avoid decorative emptiness.

## Shape and elevation
- Radius scale: 2px / 6px / 12px.
- Most surfaces remain flat with 1px rules.
- One paper-lift shadow is allowed for portrait / hero material: `0 22px 70px rgba(53,42,32,.12)`.
- No glassmorphism, glossy gradients, large pill buttons, or stacked shadow cards.

## Material language
- Subtle paper grain and ruled-note rhythm.
- Abstract woven diagonals as a low-frequency motif.
- Slight registration imperfections may appear on one or two material surfaces, never randomly across every card.
- Cultural influence remains material and structural, never literal or touristic.

## Base components
### Button
- Minimum height 48px.
- Primary: ink fill / surface text.
- Hover: indigo fill, 2px upward translation, 160ms.
- Active: 1px downward press.
- Focus: 3px visible indigo ring.
- Disabled: 42% opacity, no transform.

### Input / textarea
- Paper background, 1px line border, 6px radius.
- Focus: indigo border plus 3px low-opacity focus halo.
- Labels always visible; never placeholder-only.
- Minimum control height 48px.

### Evidence surface
- Prefer rows, chapters, note sheets, captioned images and registries over generic cards.
- When a card is necessary, use surface paper, one rule, 6px radius max, no decorative shadow.

## Motion tokens
- `fast: 160ms`
- `normal: 420ms`
- `slow: 620ms`
- `ease: cubic-bezier(.4,0,.2,1)`
- `ease-enter: cubic-bezier(.05,.7,.1,1)`
- reveal travel: 12–18px, max 24px for hero material
- stagger: 40–60ms, first visible items only
- no overshoot / bounce
- native scrolling; ScrollTrigger may trigger discrete reveals but should not scrub ordinary content

## Responsive rules
- Verify 375, 768, 1024 and 1440 widths.
- Portrait always preserves full face and useful upper-body context; no `object-fit: cover` crop for the primary portrait.
- Material textures simplify on small screens.
- Touch targets remain at least 44×44 CSS pixels.

## Three.js decision
Default: **do not ship it**. Reconsider only for a specific research visualization or subtle material-depth experiment that cannot be achieved more simply with CSS/SVG and that passes reduced-motion, performance, lifecycle and accessibility review.

## Forbidden patterns
- healthcare-green brand default
- decorative WebGL hero
- gradient-glow blobs
- bento/card farms
- oversized pill UI
- fake metrics
- generic medical icons as decoration
- constant parallax or ambient movement
- empty whitespace used as composition substitute
- literal cultural motifs used as ornament

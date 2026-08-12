# Reeja Care Ledger — Design System Master

## Purpose

Care Ledger is the single visual and interaction authority for Reeja Maharjan's portfolio. It presents nursing, maternal-health research, credentials, writing, and professional contact as a carefully maintained field journal rather than a generic personal-brand landing page.

## Non-negotiable principles

1. **Evidence before decoration.** Every visual container must organise a fact, chronology, source, reading path, or action.
2. **Paper and ink, not interface fashion.** Use warm surfaces, serif editorial hierarchy, precise rules, folio numbers, and documentary captions.
3. **No card soup.** Prefer case-file rows, registry entries, article indexes, chronology, and ruled lists.
4. **No synthetic polish.** Prohibit glassmorphism, animated gradients, glow clouds, bento grids, floating badges, custom cursors, particle fields, and ornamental medical icons.
5. **Motion explains structure.** Reveal, file, trace, and focus. Do not bounce, drift, pulse, or continuously animate ordinary content.
6. **Clinical credibility is quiet.** Professional facts, scope notes, review dates, privacy language, and verification boundaries remain visible.
7. **Accessibility is part of the identity.** Exact mobile-dialog semantics, keyboard operation, focus visibility, reduced motion, and readable contrast are release requirements.

## Visual tokens

### Color

| Token | Value | Use |
|---|---:|---|
| Paper | `#F2EEE5` | Main background |
| Paper light | `#FBF8F2` | Reading and evidence surfaces |
| Paper shade | `#E9E3D7` | Secondary chapters and author notes |
| Ink | `#1B211C` | Primary type, rules, footer, high-contrast states |
| Muted ink | `#5C625B` | Supporting copy and metadata |
| Oxblood | `#8C2F39` | Red thread, section notation, links, correspondence |
| Oxblood dark | `#682029` | Contact chapter and hover state |
| Sage | `#667A68` | Care-oriented secondary markers |
| Brass | `#D9B56D` | Sparse milestone and inverse-label highlight |
| Research blue | `#2D4C63` | Informational semantics only |

Do not introduce additional brand colors without updating the Design DNA JSON and contrast checks.

### Typography

- Display and headings: **Source Serif 4**
- Body and controls: **Public Sans**
- Folios, labels, dates, and verification notes: **system monospace**
- Headings use tight tracking and low line-height; body text remains spacious.
- Article body uses Source Serif 4 for sustained reading.
- Do not use all-caps sans headlines. Uppercase is reserved for short mono notation.

### Shape and depth

- Standard radius: `0–2px`
- Large radius: maximum `6px`, only where a content type needs it
- Pills: only genuine tags or tiny status indicators
- Normal content: no shadow
- Modal navigation: one deep shadow to establish occlusion
- Standard divider: one-pixel ink or warm-neutral rule

## Layout grammar

### Global

- Maximum content width: `1320px`
- Gutter: `clamp(20px, 4.8vw, 72px)`
- Desktop composition: asymmetric 12-column editorial grid
- Common pattern: narrow folio column + main statement + evidence column
- Mobile composition: reading order first; marginalia collapses above content or disappears when redundant

### Homepage sequence

1. Profile field-note spread
2. Professional credibility ledger
3. Role-fit case files
4. Chronological experience ledger
5. Credential registry
6. Editorial reading index
7. Oxblood correspondence chapter

### Supporting pages

- Document masthead rather than marketing hero
- Summary presented as a ruled definition list
- Content groups use evidence rows, not floating cards
- Final professional CTA is an ink or oxblood chapter, not a generic banner

### Blog

- Index behaves like a journal contents page
- Feature article uses scale and space rather than a picture-card pattern
- Article list is a ruled vertical index
- Article pages use a sticky contents margin on wide screens
- Sources, review status, and safety notes remain visible
- Reading body stays near `760px` maximum width

### CV

- Screen view resembles a professional dossier
- Print output remains compact, black-on-white, A4-safe, and break-aware
- Dates and location use mono metadata
- Experience and credentials retain chronological and registry structure

## Component rules

### Buttons

- Rectangular, one-pixel border
- Minimum height `48px`
- Hover and focus invert ink/paper or oxblood/paper
- No translate, scale, bounce, or shadow hover effects

### Links

- Text links use a two-pixel oxblood underline with a visible offset
- Navigation links may invert as indexed cells
- Never rely on color alone for focus or active state

### Inputs

- Visible label above every field
- Open paper field with a strong bottom rule
- Oxblood focus indicator
- Error text is specific and adjacent to the field
- Submission states are announced and focus-managed

### Lists and records

- Use borders, dates, and folio numbers to establish grouping
- Bullets are small care markers, not generic icon circles
- Scope and verification notes use mono text and remain visually subordinate but readable

## Motion system

### Timing

- Micro feedback: `120ms`
- Standard reveal/state change: `320ms`
- Major authored reveal: `560ms`
- Hero thread trace: approximately `1050ms`

### Easing

- Enter: `power3.out` or `cubic-bezier(0.2,0,0,1)`
- Exit: `power2.in` or `cubic-bezier(0.3,0,1,1)`
- No elastic, bounce, or spring overshoot

### Choreography

- Hero notation appears first
- Explicit title lines rise from clipped bounds
- Portrait uncovers vertically once
- Evidence cells file into place with a maximum `40ms` stagger
- Section entries rise `16–18px` once at `86–88%` viewport entry
- No scrubbed parallax or pinned storytelling

### Reduced motion

- Complete final state immediately
- No clipping animation, parallax, permanent loop, or pointer-driven Three.js movement
- Navigation and modal state changes remain immediate and understandable

## Three.js signature

The only advanced 3D element is the **red thread of care** behind the hero portrait.

- Geometry: centripetal `CatmullRomCurve3` sampled into `TubeGeometry`
- Markers: four instanced brass spheres
- Material: transparent custom shader revealing the thread along UV space
- Camera: fixed perspective framing
- Interaction: tiny fine-pointer response only
- Rendering: WebGL2, transparent canvas, DPR capped at `1.5`
- Lifecycle: `ResizeObserver`, visibility pause, cleanup, material/geometry disposal, context release
- Fallback: static SVG path
- Prohibited: particles, connected nodes, post-processing, bloom, orbit controls, zoom, drag, scene backgrounds

## Release checklist

- Astro type check passes
- Lint passes
- Production build passes
- Professional facts and privacy contracts pass
- Mobile navigation exact accessible names remain `Menu`, `Mobile navigation`, and `Close menu`
- Keyboard focus is trapped and restored correctly
- Reduced motion displays the complete final composition
- Browser console and requests remain clean
- Cloudflare serves the exact release commit
- Live Playwright suite passes

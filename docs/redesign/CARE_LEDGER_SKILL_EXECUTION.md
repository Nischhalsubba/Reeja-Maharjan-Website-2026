# Care Ledger Skill Execution Record

## Redesign prompt

> Rebuild Reeja Maharjan's portfolio as a human-authored clinical field journal. Preserve all approved professional facts, routes, privacy boundaries, structured data, contact details, and deployment contracts. Remove generic AI-portfolio conventions including dark gradient heroes, glow networks, floating pills, bento grids, universal card layouts, and broad fade-up animation. Create a distinctive editorial system based on paper, ink, rules, chronology, evidence, marginalia, and one restrained red thread of care. Implement the result in Astro, CSS, GSAP, and Three.js with full accessibility, responsive behavior, reduced-motion support, performance safeguards, cleanup, build verification, and live production browser testing.

## UI/UX Pro Max

Applied to:

- Editorial-grid rather than dashboard composition
- Asymmetric identity and evidence hierarchy
- Responsive reading order at 640px, 900px, and 1120px
- Minimum 44–48px interactive targets
- Strong focus indicators and dark-on-light contrast
- Clear navigation information architecture
- Content-first Astro implementation without unnecessary hydration
- Removal of decorative containers that did not support a user task

Result:

- Numbered desktop index and mobile contents sheet
- Profile masthead, case-file rows, chronology, registry, reading index, and correspondence chapter
- Supporting-page mastheads and ruled evidence lists
- Editorial blog index and readable article layout

## Design DNA

Applied to:

- Complete three-dimensional schema covering design system, design style, and visual effects
- Exact palette, typography, spacing, layout, shape, elevation, component, motion, and rendering rules
- Explicit anti-pattern list to prevent regression into generic portfolio styling
- Defined fallback and performance behavior for all advanced effects

Result:

- `docs/redesign/CARE_LEDGER_DESIGN_DNA.json`
- `design-system/reeja-care-ledger/MASTER.md`

## Genjutsu

Applied to:

- Anti-AI-slop visual audit
- Replacement of generic card soup with information-specific structures
- Human-authored visual metaphor and chapter rhythm
- Platform-aware mobile and desktop composition
- CSS-native state changes before JavaScript animation
- Restraint in ornament, motion, and effects

Rejected patterns:

- Animated gradients
- Glassmorphism
- Floating blobs
- Glowing connected-node spheres
- Bento grids
- Pill navigation
- Custom cursors
- Decorative medical icons
- Fake metrics and status dashboards
- Repeated rounded cards

## Motion Design

Applied to:

- Purpose mapping for every animation
- One-shot entrance choreography
- Clear hierarchy of micro, standard, and macro timings
- Fast exits and restrained entrances
- Reduced-motion final-state rendering
- No scroll-jacking, perpetual card movement, or broad parallax

Motion language:

- Establish the rule
- Reveal the title
- Uncover the figure
- File the evidence
- Trace the care thread

## GSAP Web Animation

Applied to:

- `gsap.context()` scoping
- `gsap.matchMedia()` for desktop and reduced-motion branches
- `ScrollTrigger` one-shot reveals
- Explicit hero title-line sequencing
- Portrait clip reveal
- Evidence-row stagger capped at 40ms
- Cleanup on `pagehide` and `astro:before-swap`
- `overwrite: auto` for competing states
- Removal of duplicate generic hero and reveal systems

Result:

- `src/lib/portfolioMotion.ts` owns authored narrative motion
- `src/lib/motion.ts` now owns only navigation, lightbox, card-link, and progress utilities

## Three.js Guide

Applied to:

- WebGL2 capability check
- Transparent `WebGLRenderer`
- DPR cap at 1.5
- `PerspectiveCamera` with fixed editorial framing
- `CatmullRomCurve3` and `TubeGeometry`
- Instanced milestone markers
- Custom ShaderMaterial with UV reveal
- No post-processing or particle field
- Fine-pointer interaction only
- `ResizeObserver`
- Intersection and document-visibility pausing
- Geometry, material, renderer, and context disposal
- Static SVG fallback for low-end and unavailable WebGL2

Result:

- The former generic icosahedron/network scene is replaced by one oxblood red thread of care.

## GitHub and release engineering

Applied to:

- Direct commits to `main` per user instruction
- Repository contract preservation
- Build Check status inspection
- Production Smoke status inspection
- Live Playwright evidence rather than visual claims without verification

## Files implementing the redesign

- `src/styles/care-ledger.css`
- `src/styles/blog.css`
- `src/styles/cv.css`
- `src/layouts/BaseLayout.astro`
- `src/components/Header.astro`
- `src/components/Footer.astro`
- `src/components/RecruiterHero.astro`
- `src/components/RecruiterRolePaths.astro`
- `src/components/RecruiterExperience.astro`
- `src/components/RecruiterProof.astro`
- `src/components/RecruiterContact.astro`
- `src/components/HeroSpatialScene.astro`
- `src/lib/heroSpatialScene.ts`
- `src/lib/portfolioMotion.ts`
- `src/lib/motion.ts`

## Acceptance standard

The redesign is complete only when:

1. Repository contracts pass.
2. Astro type checking passes.
3. Lint passes.
4. Production build passes.
5. Cloudflare serves the exact release commit.
6. Live smoke checks pass.
7. Live browser accessibility and security checks pass.

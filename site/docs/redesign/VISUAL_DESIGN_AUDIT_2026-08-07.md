# Care Ledger visual design audit — 2026-08-07

## Scope

Reviewed the user-provided desktop screenshots, the current `main` implementation, the public URL `https://reejamaharjan.com.np/`, and the existing responsive browser-quality contract. The public text crawler available during the audit returned an older cached site snapshot, so the fresh screenshots and current repository source were treated as the authoritative visual references; release browser tests remain the final rendering check.

## Design standard used

The correction pass keeps the Care Ledger identity but tightens it around a Swiss/editorial professional-service system:

- 8px-based spacing rhythm with explicit panel insets.
- Strong typography hierarchy without oversized staircase wrapping.
- Rules and dividers remain structural, but never share the same coordinate as live text.
- Portraits are documentary evidence, not decorative crops; the subject must remain visible.
- Mobile removes nonessential visual effects before reducing content legibility.
- One primary action per area with comfortable 44px+ interaction targets.

## Findings and fixes

| # | Severity | Finding | Root cause | Remediation |
|---|---|---|---|---|
| 1 | High | Metadata and bordered panels place text too close to their edges. | Care Ledger partially overrode older card rules, leaving legacy outer borders while replacing row padding with `padding: ... 0`. | Added explicit panel ownership and shared horizontal/vertical inset tokens. Summary rows and blog metadata now have real left/right padding. |
| 2 | High | The oxblood vertical hero rule touches or visually collides with headings. | The pseudo-element was positioned exactly at the content gutter x-coordinate. | Moved the rule left by a responsive clearance token and reduced its visual weight. |
| 3 | Critical visual | The homepage image does not show Reeja's face. | The hero used `/reeja-hero-cutout.png`, whose composition is unsuitable for the figure frame, while the CSS allowed an art-directed cover treatment. | Switched the hero to the existing `/reeja-headshot.jpg` and changed the figure to `object-fit: contain` inside a 4:5 documented frame. |
| 4 | High | Supporting-page hero headlines wrap into an exaggerated staircase, especially on the opportunity page. | Heading max width was only 13ch while the maximum size reached 7rem. | Increased readable measure, reduced maximum display size, and softened tracking/line-height. |
| 5 | Medium | Supporting hero metadata sits too low and leaves a large empty upper-right field. | Hero grid used `align-items: end`. | Changed supporting-page hero alignment to center on desktop and start on narrower layouts. |
| 6 | Medium | Section rules feel too close to labels/headings in several page types. | Common ruled headers used only 18px top clearance. | Raised rule-to-content spacing to a 24–32px responsive range for homepage sections, supporting sections, CV profile blocks, and blog feature blocks. |
| 7 | Medium | Some bordered modules still look like an older card system rather than Care Ledger. | `.section-shell` retained legacy radius/shadow/surface treatment. | Explicitly reset shell radius and shadow, strengthened border ownership, and increased head/body inset. |
| 8 | Medium | Navigation feels underscaled and cramped relative to the editorial masthead. | Desktop labels were 0.74rem with narrow horizontal padding. | Increased nav label size and horizontal padding while retaining the numbered index structure. |
| 9 | Medium | Hero proof cells and editorial cards need more internal breathing room. | Their padding was individually tuned before the final type scale settled. | Standardized larger content padding for proof cells, site cards, reading entries, notes, and author panels. |
| 10 | Medium | The Three.js thread competes with the portrait on small screens. | The spatial scene remained active and repositioned behind a single-column mobile hero. | Reduced it on tablet and removed it below 640px; content and portrait now win the mobile hierarchy. |
| 11 | High QA | Existing visual QA omitted the exact page shown in the spacing screenshot and two other primary supporting routes. | Screenshot matrix covered only home, research, blog, and CV. | Expanded four-width screenshots to home, hire, research, maternal health, nursing practice, blog, and CV. |
| 12 | High QA | Automated tests could pass even if the hero rule moved back onto text or the portrait returned to cover-cropping. | QA checked overflow and screenshots, but not the specific design contracts. | Added regression assertions for rule-to-heading clearance, panel insets, portrait asset, natural image load, and `object-fit: contain` on desktop and mobile. |

## Updated visual tokens

- Panel horizontal inset: `clamp(20px, 2.2vw, 34px)`
- Panel vertical inset: `clamp(18px, 1.8vw, 28px)`
- Large panel inset: `clamp(26px, 3vw, 42px)`
- Decorative rule clearance from text: `clamp(22px, 2.1vw, 30px)`
- Supporting-page H1: `clamp(3rem, 5.5vw, 6rem)` with `0.95` line-height
- Homepage H1 maximum: `6.5rem` with `0.94` line-height
- Portrait frame: 4:5, `object-fit: contain`, no crop

## Files changed in this correction pass

- `src/styles/care-ledger-refinements.css`
- `src/layouts/BaseLayout.astro`
- `src/components/RecruiterHero.astro`
- `tests/browser/visual-quality.spec.ts`
- `tests/browser/design-audit-regressions.spec.ts`

## Acceptance criteria

The correction is considered complete only when:

1. repository verification, Astro check, lint, and build pass;
2. Browser Quality passes at 375, 768, 1024, and 1440 px;
3. all seven primary routes produce screenshots without horizontal overflow;
4. the hiring-page rule stays at least 16px left of its headline;
5. bordered metadata rows retain at least 18px horizontal inset;
6. the homepage hero loads `/reeja-headshot.jpg` with `object-fit: contain` at mobile and desktop widths.

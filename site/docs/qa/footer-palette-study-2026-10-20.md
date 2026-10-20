# Footer defect and alternative color palettes · 2026-10-20

## Confirmed from uploaded browser screenshot
The current footer invitation renders as a bordered, gradient-filled card whose headline begins at the card's left edge. It is inconsistent with the centered footer columns beneath, and the forced Slate & Seafoam style also clashes with the warmer editorial home art direction.

## Footer repair
- Replace the detached card with a continuous deep-slate editorial invitation in the existing footer container.
- Remove gradient, inset border, rounded corners and decorative orb; one integrated footer surface.
- Align invitation and navigation columns to the same container edges, with a distinct separator between title and contact action on wide layouts.
- On narrow screens, stack title and action, moving the separator above the action.
- Retain its existing accessible link, proper keyboard focus state and dark-surface contrast.
- Replace generic promise-led headline with plain "Write to Reeja."

## Palette comparison
The preview at `/palette-studio/` is noindexed and **does not alter production colors**. It uses the real Reeja portrait and textual subject matter, and applies selected palettes to the hero, research story and footer.

| Choice | Paper | Ink | Accent | Soft | Supporting |
|---|---|---|---|---|---|
| Oxblood & Paper | #F6F0E8 | #28282D | #703F50 | #E8DAD7 | #D5BCAA |
| Olive & Linen | #F4F2EA | #28302B | #4E6147 | #DDE4D5 | #C9BA9F |
| Charcoal & Copper | #F3EEE7 | #282A2C | #82513B | #E9DFD3 | #DBC29E |

All main text and primary accent combinations meet 4.5:1 normal-text contrast in calculations. The browser test checks exact palette changes, keyboard switching, semantic pressed states and 320–1440px overflow.

## Decision process
1. Open `/palette-studio/` on the deployed site and compare each option on desktop and phone, or review browser-artifact screenshots.
2. Select the direction. **Do not silently replace the production palette without this decision.**
3. Refactor historical color literals into role-based tokens and migrate header, sections, interactive states, blog pages, and forms together; avoid a global recolor hack.
4. Run full accessibility, responsive and screenshot QA and publish only after passing.

## Release gates
- `npm run verify`
- Cloudflare repository-root build
- Playwright Browser Quality including `tests/browser/footer-palette-studio.spec.ts`
- Visual Regression for existing routes, confirming all non-footer visual changes are intentional.

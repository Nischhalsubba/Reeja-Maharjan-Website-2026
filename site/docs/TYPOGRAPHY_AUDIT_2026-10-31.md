# Reeja sitewide typography and reading-layout audit (2026-10-31)

## Active font inventory
Reviewed all 20 site stylesheets (including route-only design-system, palette and CV print styles), the active imported CSS order in `BaseLayout.astro`, and article markup. Two families are intentionally in use:

1. Georgia (system serif with Times New Roman/serif fallbacks): display and editorial headings.
2. Public Sans (@fontsource self-hosted; imported weights 400, 600, 700 and 800 with system-ui/sans-serif fallbacks): running body copy, navigation, UI controls, metadata and the compact table-of-contents title.

The problem was *conflicting role assignment*, not evidence of another remotely loaded font. Earlier `tokens.css` defined `--font-display` as Public Sans even though the approved final editorial stylesheet repeatedly specified Georgia. Some older CSS generations apply contradictory heading font declarations or heavy weight shorthands. The final shared stylesheet `reeja-sitewide-v11.css` is the current visual authority and stays imported last.

## Fixes
- Updated canonical `--font-display` token to Georgia; `--font-sans` remains self-hosted Public Sans.
- Blog article H1, reading H2/H3 and text roles are explicitly consistent within the existing v12 final stylesheet.
- Table-of-contents title is Public Sans because it is a navigation label, not a long-form editorial heading. TOC heading text and link text now share a 16px inset.
- Resolved the two-line article separator: legacy `.site-article__body section` bottom border and later `.blog-article__body > section` top border. Preserved a single top rule.
- Reduced accumulated article section padding/margins while preserving full content, scroll destinations, GSAP and responsive menu behavior.
- Kept CV's deliberate typographic exception: its H1/H2 Georgia, job roles and detailed labels Public Sans.

## Follow-through
`tests/browser/blog-toc-type-contract.spec.ts` checks computed family names across principal routes, sidebar alignment, single rule at FAQ/Sources, keyboard focus, tablet/mobile TOC and horizontal overflow.

## Open structural debt
The site still imports older CSS generations; this change avoids deleting styles that may power live page variants. A separate measured dependency audit and before/after visual regression are necessary before removing historic CSS. No additional font family/package was introduced. This analysis describes fonts requested by active CSS, not a device-level guarantee that Georgia is installed on every operating system.

## Self-contained SVG and social-image exception
A second source scan also found hard-coded Arial/Helvetica stacks in the OG SVG templates (`site/public/og-default.svg`, `site/src/pages/og/articles/[slug].svg.ts`) and the MOM-HD illustrated diagram. These are **standalone SVG/image assets**, not additional webfont downloads on the web pages. Their declared stacks now prefer Public Sans with system sans fallbacks. Because SVGs served as images and Sharp-rendered PNGs do not inherit the page's loaded CSS, they may still render using the fallback font where Public Sans is not installed; the browser UI itself remains the verified two-family system.

# Reeja Design System v11 — Neutral Editorial

Updated: 2026-10-21

## Brand intent
One restrained, personal design language for a real registered nurse and maternal-health research assistant. Authentic portraiture, clear professional evidence, factual writing, and precise alignment take priority over decoration.

## Canonical role tokens
| Role | Value |
|---|---|
| Canvas | #FAFAF8 |
| Surface | #FFFFFF |
| Stone alternative | #ECEBE7 |
| Soft alternate | #F1F1EE |
| Ink | #17191A |
| Action | #313536 |
| Action hover | #202425 / #39403F |
| Muted text | #505957 |
| Fine border | #D9DBD7 |
| Focus | #17191A |

Source in `src/styles/design-system.css` and `src/styles/reeja-sitewide-v11.css`. Retired '--ds-teal' / '--ds-seafoam' alias names are temporarily retained for backwards-compatible Astro components but now map to monochrome semantic roles. New code must not create new seafoam or slate dependencies.

## Typesetting
- Human headlines: Georgia, regular, measured negative tracking, 1.04–1.17 line height on headings.
- UI, paragraphs, forms and labels: locally sourced Public Sans.
- Regular text target at least 4.5:1 contrast; large text >=3:1.
- Keep body reading measure around 55–70ch (article paragraphs narrower); no floating editorial slogans.
- Maintain real text labels on form inputs and preserve native validation/accessibility.

## Grid and rhythm
- Global maximum content width: 1270 CSS px
- Gutters: 52px each for large desktop (total 104px); 32px each under 1090px; 18px each on small mobile.
- Site header: 72px desktop, 68px mobile. Nav and hero container must share exact left edge.
- Inner-page hero: 74–125px top / 66–100px bottom; 47/51px on phone.
- Content sections: 72–116px desktop / 62px phone; exceptions must be justified by content.
- Reuse documented 8px spacing primitives; do not stack unrelated outer margins and padding.
- Two-column structured evidence on desktop; one column on mobile. Avoid decorative nested cards and arbitrary corner radii.
- Focus ring: 3px charcoal with 4px offset. Respect reduced-motion preference.

## Inner templates affected
- Homepage — `MinimalHomepage.astro`
- Research, nursing, maternal health and hiring — `site-page` hero/evidence/section grid
- CV — professional document styling + explicit print safeguards
- Contact — controls/validation, honeypot visually hidden (never 48px input)
- Blog archive/topic/article — readable mastheads, topic links, article TOC, source-led imagery, metadata
- Global header/footer: same neutral visual system, with a single footer (no duplicate promotional panel)
- Design-system laboratory: now reflects the current tokens and components, noindexed

## SEO and trust rules
- Each route retains unique, descriptive title, meta description, canonical URL, single H1, descriptive internal links and existing Person schema.
- Rewrite headings for user intent, not a keyword quota. See Google Search Central guidance on helpful people-first content.
- Do not invent experiences, licenses, published clinical outcomes, case studies, patient data or reviewer credentials.
- Clinical photos are illustrative unless explicitly identified as Reeja's own photograph; retained credits and license page.
- CV licensure is time-sensitive. Texas RN expiry and any post-October 2026 claims require owner verification before extending.
- Article text retains sourced citations, safety notes, scope and author identification.

## Required release gates
1. Build Check / verify (source, deployment config, Astro).
2. Browser Quality including sitewide v11: 9 priority routes at 320/390/768/1440, H1, foreground/background, no horizontal scroll, nav alignment and mobile form correctness.
3. Visual Regression: before/after screenshots of home, blog, CV and hiring at desktop/tablet/mobile.
4. Manual desktop/mobile review for spacing, image cropping, label color, contrast, footer, hidden fields.
5. Merge only after all green, then confirm `main` version and Cloudflare build. Live domain deployment must be verified separately.

Sources: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html ; https://developers.google.com/search/docs/fundamentals/creating-helpful-content

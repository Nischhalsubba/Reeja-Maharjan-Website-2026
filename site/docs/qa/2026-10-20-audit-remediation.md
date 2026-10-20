# Website design and QA remediation — 2026-10-20

## Scope and evidence

Source: `main` of `Nischhalsubba/Reeja-Maharjan-Website-2026` on 20 October 2026.
Target: WCAG 2.2 AA, recruiter-first contact journey, responsive and editorial consistency.
Changes are proposed in branch `audit-improvements-2026-10-20`.

The source-code inspection and desktop/mobile browser test definitions are not substitutes for screenshots from the actual production deployment. No live screenshot comparison or lab Lighthouse score was obtained by the editor of this branch.

## Implemented in this branch

- Hero now names Reeja and explains her role in the lead paragraph. Primary action opens professional contact, secondary opens the CV.
- A factual, responsive qualification summary displays NNC RN registration, education and current IISH research work, linking to the detailed CV. The summary intentionally avoids repeating an expiring license status.
- Contrast adjusted: shared muted token from `#647587` to `#56697B`; timeline indices to `#596A7C`. Calculated foreground-on-`#F5F8FA` ratios are 5.32:1 and 5.21:1 respectively. Recheck other actual rendered text/surfaces in browser.
- Header and mobile navigation use shared `--site-header-height` values, including 68px on small phones, to prevent overlay gaps.
- Anchor scroll padding accounts for the sticky header.
- The local, above-the-fold hero photo is preloaded on the homepage only.
- Blog topic browsing now links to actual article archives with per-topic content and relevant professional-page links.
- Existing smoke/browser expectations reflect the new CTAs; a dedicated acceptance suite checks homepage identity, topic routes, color contrasts, metadata, mobile dialog behavior and reflow.

## Before merge: automated gates

1. `npm ci --no-audit --no-fund` and `npm run verify` in `site/`.
2. GitHub **Build Check**, **Browser Quality**, and **Visual Regression** complete successfully.
3. Review visual evidence and differences, especially the expanded homepage between the hero and focus sections.
4. Confirm the generated sitemap lists the three `/blog/topics/*/` routes and each has a canonical URL.
5. Confirm actual deploy fingerprint (`/build.json`) matches the approved SHA before declaring production parity.

## Required manual QA (not completed by source inspection)

| Viewports | Checks |
|---|---|
| 320 / 375 / 390 / 430 | Headline cropping and legibility, credential stack, 44px targets, mobile menu, all CTAs, overflow |
| 768 / 1024 | Hero image/text balance, menu breakpoint, topic archive split layout and footer grid |
| 1440 / 1920 | Image sharpness/crop, line length, visual rhythm, content alignment |

Test current Chrome, Firefox and Safari, plus a real Android browser and iOS Safari. Verify at 200% zoom and narrow equivalent of 400% zoom. Confirm page content stays accessible with `prefers-reduced-motion: reduce` and without JavaScript. Use keyboard-only navigation and at least one screen-reader pass.

### High-priority experiences

- Homepage -> Contact: mandatory/optional fields, invalid email and short message, third-party CAPTCHA, successful server delivery, unavailable endpoint, browser back and repeat submissions.
- Homepage -> CV: all credentials, print/PDF output, accurate professional status, no private documents exposed.
- Blog -> topic -> article: nonempty and relevant filters, image fallbacks, citations and article author metadata, back links.
- Mobile menu: opens, traps focus, Escape closes, keyboard focus returns, no sticky-header overlap.
- Professional details: Texas RN expiration on **2026-10-31**, current IISH contract end **2026-11-30**, and `lastVerified` date are verified against authorized records before any status change or renewal claim.

## Remaining work requiring live tools, source assets, or credential owner confirmation

- Lighthouse and CrUX/Core Web Vitals for home, CV, contact, blog index and a long article; record LCP, INP, CLS.
- Pixel-level visual comparison of current deployment against approved design at each viewport.
- Check if the 720×405 authored hero asset is sharp enough at desktop sizes; request a higher-resolution original if needed. Do not upscale the current image and call that restored detail.
- Run axe plus human assistive-technology testing and fix any route-specific warnings.
- Confirm social previews on LinkedIn, Facebook, WhatsApp and X and track actual Search Console coverage.
- Check current official RN status; do not assert that an unverified license has been renewed.
- Consolidate obsolete historical CSS/GSAP selectors only after screenshots and stable regression baselines establish parity.
- Test production contact delivery using a consented, harmless test message, then confirm receipt.
- Any new clinical article needs references checked and editorial review by the named author.

## Release decision

Do not merge based on this report alone. Green CI, reviewed screenshot evidence, and current professional credential verification are required for final production acceptance.

## Follow-up screenshot feedback: navigation, imagery and page parity

Reference: user-provided screenshot of the featured-research section and navigation, 20 October 2026.

- **Navigation:** desktop and mobile active/hover states now explicitly specify both text and fill colors. Active links use a translucent seafoam treatment on slate (not a pale gray pill with unreadable light text). Automated browser expectations cover active/hover states.
- **Hero photograph:** repository's approved personal lakeside hero is **600 × 338px** (not 4K). The available headshot is **896 × 1200px**. Neither can produce genuine 3840 × 2160 detail. The homepage now supports `public/images/reeja-lakeside-4k.webp` as an optional original-photo asset, with actual dimension validation at build time and a responsive preload/srcset. Until the photographer's original is provided, the existing photo remains visible; do not claim the hero photograph is already 4K.
- **Featured research graphic:** discarded the invented blue browser-dashboard artwork in favor of an original 3840 × 2160 scalable SVG showing BP/BG home-monitoring education and follow-up. All labels describe role responsibilities; no fake clinical results or patient data. The same asset appears on the research inner page.
- **Inner-page identity:** homepage Slate & Seafoam opening-section grammar applied to recruiting, clinical research, nursing, maternal health, CV, contact, blog landing, and article pages: dark-slate gradient, white Georgia editorial headings, seafoam details, restrained proof panels, and accessible CTA colors.
- **Visual evidence:** the browser-quality workflow exports screenshots at 390px and 1440px for homepage and representative inner pages plus the full research section. Review artifacts and compare with the uploaded screenshot before merge.
- **Safety:** no personal photo was AI-substituted or incorrectly claimed to be a real 4K photo.

### Outstanding visual acceptance checks

The design changes intentionally modify screenshots relative to `main`; visual regression differences are expected and must be reviewed, not silently waived. Review photograph crop and editorial type at every target viewport. Verify the real source-photo resolution once supplied and check the final 4K export’s quality, license, file size, and metadata.

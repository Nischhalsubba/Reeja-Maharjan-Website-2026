# Source-led image/performance audit

- Home main portrait `/reeja-headshot.jpg`: HTML specifies 896×1200, `loading=eager`, `fetchpriority=high` and a matching preload in global head. Verify it is actually the LCP element before further optimization.
- Clinical experience portrait `/images/reeja-clinical-portrait-2026.jpg`: replaced 281px-wide former WebP with approved 800×1600 JPEG; semantic illustrated-portrait alt; lazy-loaded offscreen; no forced crop.
- Blog photo components provide semantic alt, assigned widths and variants; desktop/mobile `sizes`/srcset should be sampled against built HTML.
- Inline SVG visual assets and social preview files should not appear as independent sitemap content URLs.
- Four self-hosted Public Sans weights and multiple generations of CSS are imported. Do not remove styles without screenshot-based dependency verification; measure actual weight/network impact first.
- GSAP animations and page transitions must preserve reduced-motion preferences and should not hide text from crawlers when JS is disabled.

## Core Web Vitals
| Metric | Good target | Verified measured current value |
|---|---|---|
| LCP | ≤ 2.5s | Unavailable |
| INP | ≤ 200ms | Unavailable |
| CLS | ≤ 0.1 | Unavailable |

Obtain dated mobile/desktop PageSpeed Insights plus CrUX (if coverage exists). Laboratory Lighthouse results do not prove real-user Core Web Vitals. Document test URL, network/device configuration and before/after metrics before claiming performance improvement.

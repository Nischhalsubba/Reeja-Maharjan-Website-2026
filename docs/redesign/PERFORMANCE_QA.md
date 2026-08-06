# Performance QA Report

## Scope

This report records performance-related redesign decisions and the remaining live measurement requirements for the Astro portfolio.

## Performance decisions implemented

| Decision | Status | Rationale |
|---|---|---|
| No Three.js | Complete | Avoids unnecessary JavaScript, GPU work, fallback complexity, and accessibility risk. |
| No external font request | Complete | Uses local/system font stacks to avoid render-blocking font requests and privacy leakage. |
| No new runtime dependency | Complete | Existing dependencies remain sufficient for the redesign. |
| Motion uses transforms and opacity | Complete | GSAP and CSS changes avoid layout-heavy animation. |
| Reduced-motion support | Complete | Nonessential spatial motion is skipped or simplified. |
| Blog and CV layouts are CSS-driven | Complete | No client-side data fetching is needed for reading content. |
| Contact form uses progressive fallback | Complete | Email fallback remains available if async submission fails. |

## Live metrics still required

The brief requires performance evidence, not only implementation decisions. These measurements must be taken against a built and deployed version of the site:

| Metric | Required evidence |
|---|---|
| Lighthouse performance | Homepage, CV, blog index, representative article, contact route/section |
| Accessibility score | Same representative pages |
| Best practices and SEO | Same representative pages |
| JavaScript transfer size | Build output and browser network panel |
| Image transfer size | Browser network panel or build analysis |
| Core Web Vitals | Field data when available, lab values otherwise |
| No horizontal overflow | 375px, 768px, 1024px, 1440px |

## Current limitation

The execution environment used for this update cannot resolve `github.com`, so it cannot install npm dependencies or run the full Astro build and Lighthouse workflow locally. Repository-side Build Check evidence or a live Cloudflare deployment check is still required before the release can be called fully verified.

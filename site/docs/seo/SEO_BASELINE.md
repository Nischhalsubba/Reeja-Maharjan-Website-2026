# Baseline (2026-10-31)

| Audit dimension | Observed evidence | Status |
|---|---|---|
| Astro static generation | `site/astro.config.mjs` output=static | Source-verified |
| Sitemap | `@astrojs/sitemap`, robots sitemap-index reference | Configured; deployed XML requires live verification |
| Metadata | Shared `BaseLayout.astro` title, description, robots, canonical, OG and Twitter | Source-verified, rendered consistency tested by post-build auditor |
| Structured data | Shared WebSite/Person/ProfilePage; article BlogPosting/BreadcrumbList | Source-verified; Google validation pending |
| Published content | 17 typed BlogPost modules with sources, FAQ and disclaimers | Source-verified, not clinical peer review |
| Professional role | IISH MOM-HD research assistant; contract end 2026-11-30 | Source-derived, owner confirmation needed at expiry |
| Texas RN licence | Issue 2025-09-08, recorded expiration 2026-10-31 | Renewal UNVERIFIED; neutral copy applied |
| LCP / INP / CLS | No measured field or lab data obtained | Unknown, no scores invented |
| Search Console clicks / queries / CTR | No authorized property available | Unknown |
| Production HTTP | Web search interface returned a cached historical homepage; current live HTTP audit not reliable there | Require CI production smoke and explicit live response evidence |
| User flow | CV/contact/hiring CTA routes and page shell exist | Source-verified, browser test gate required |

**Baseline references:** `site/src/layouts/BaseLayout.astro`, `site/src/content/professional-facts.ts`, `site/src/content/blog/index.ts`, `site/scripts/verify-seo-output.mjs`.

## External evidence required
Owner-authorized GSC verification and exported reports, 28-day CrUX trend if available, desktop/mobile PageSpeed Insights dated results, actual server HTTP statuses, and current official Texas licensing verification. No estimate substitutes for these results.

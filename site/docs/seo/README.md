# SEO implementation tracker

Audit baseline: 2026-10-31. Source branch: `main`, pre-change commit `5a7aee067e060dc47cf61c488746f9bfa613bb62`.
Website: https://reejamaharjan.com.np/

## Verified source-code findings
- **SEO-000 — Complete:** Examined Astro configuration, global layout, robots.txt, professional-facts source, expiry controls, and public page routes.
- **SEO-001 — Partial:** Static routes inventoried in `URL_INVENTORY.md`; all blog slug instances and deployed URL coverage require a generated build/sitemap validation.
- **SEO-101 — Implemented, CI pending:** Exclude intentional `noindex` design-system and palette demo routes, and the custom 404 from generated sitemap.
- **SEO-102 — Existing:** Shared layout renders title, description, canonical, Open Graph, Twitter, and robots metadata. Individual titles, duplicate detection and rendered-page validation remain pending.
- **SEO-103 — Existing:** Global Person/WebSite/ProfilePage JSON-LD and article JSON-LD exist. Rich-results validation pending.
- **SEO-301 — Blocked by verification:** Source labels Texas RN license as active but lists an expiry date of 2026-10-31; verify renewal through the licensing authority and owner before claims are updated. IISH contract currently states 2026-11-30; recheck at expiry.
- **SEO-401/402 — Partial:** Hero preload and lazy-loading practices exist; performance must be measured, not inferred.
- **SEO-502 — Blocked:** Google Search Console property/indexing and real-user search metrics cannot be confirmed from this repository.

## Verification and release
Confirm CI result; verify built `sitemap-index.xml` and child sitemaps contain neither design-lab URLs nor 404; check that canonical public routes remain. Check live Cloudflare build fingerprint before claiming deployment. Search Console and Lighthouse/CrUX require authorized access or separately captured evidence.

## Scope and safety
Preserve Neutral Editorial v11/v12, actual professional facts, all user-approved images, GSAP motion, accessibility, and existing routes. Avoid automatically extending professional-license expiry dates or inventing clinical claims.

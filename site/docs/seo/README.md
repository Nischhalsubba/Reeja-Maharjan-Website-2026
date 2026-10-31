# Reeja website SEO delivery ledger

Audit initiated 2026-10-31. Repository: `Nischhalsubba/Reeja-Maharjan-Website-2026`. Source baseline `db5ec7745`, subsequent implementation commits documented in `IMPLEMENTATION_LOG.md`.

## Ground-truth rules
- An Astro build or passing source tests do **not** establish search indexing, rankings, real-user Core Web Vitals or Search Console access.
- Source-verified: 8 primary content routes, 17 governed articles and 3 generated topic archives, plus internal design labs and a custom 404. Routes must be validated against generated output.
- Source-verified: global canonical, title, description, social meta and Person/WebSite schema; article BlogPosting/BreadcrumbList; sitemap/robots integration.
- No Google Search Console property data, Google indexing confirmations, CrUX measurements or live site HTTP audits have been authorized/retrieved.
- Clinical facts are safety-sensitive: Texas RN record expires 2026-10-31 and is NOT independently verified as renewed. Public copy uses neutral verification-pending wording.
- Current visual authority: Neutral Editorial v11/v12; older cobalt/green references are historical and must not be mixed into SEO tasks.

## Execution record
- `db5ec7745`: sitemap exclusions and initial docs.
- `06bae93d`: removed unverified "active Texas RN" public assertions, preserved original dates, updated two editorial pages.
- `71822e77`: post-build SEO contract and metadata/sitemap validator, plus OG asset exclusion.
- Future commits: use `IMPLEMENTATION_LOG.md` and GitHub Actions to confirm status.

## Release gates
Build Check; Browser Quality; Visual Regression; Production Smoke. A successful CI run is not proof of Search Console indexing or CrUX performance.

## Priorities
P0: regulator evidence and credential status. P1: SEO route/template correctness, metadata and broken links. P2: source-led content relevance, internal linking and performance improvement after measurement. P3: external search discovery requiring owner authorization.

This directory records evidence and blocked work, not a declaration of complete indexing.

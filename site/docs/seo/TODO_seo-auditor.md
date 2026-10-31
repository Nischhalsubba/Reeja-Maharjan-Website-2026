# SEO implementation task tracker (2026-10-31)

Statuses: Verified / Implemented—CI pending / Pending—external access / Pending—manual or measured verification / Deferred.

| Task | Priority | Status | Evidence / next action |
|---|---|---|---|
| SEO-000 Repository source inventory | P1 | Verified | Astro, content routes, design system and GitHub HEAD examined |
| SEO-001 Route and article inventory | P1 | Source verified; build output pending | 8 main, 17 articles, 3 topics and internal routes; run post-build auditor |
| SEO-002 SEO performance baseline | P2 | Pending—external access | GSC, CrUX and live response measurements |
| SEO-101 Sitemap/noindex hygiene | P1 | Implemented—CI pending | Astro sitemap filtered preview, 404 and OG asset paths |
| SEO-102 Titles/descriptions/canonical | P1 | Implemented—CI pending | Build output audit; fix detected duplicates or missing metadata |
| SEO-103 JSON-LD semantics | P1 | Source verified; Google validation pending | WebSite/Person/ProfilePage/BlogPosting/BreadcrumbList |
| SEO-201 Search-intent mapping | P2 | Source mapped; demand unverified | `KEYWORD_AND_INTENT_MAP.md`, reconcile with GSC |
| SEO-202 Cannibalization review | P2 | Source reviewed; ranking overlap unverified | Keep professional pages distinct from articles; use GSC |
| SEO-203 Internal linking | P1 | Existing paths inspected; build check pending | Internal links contract verified after build |
| SEO-301 Professional credentials | P0 | Public safe wording implemented; renewal blocked | Texas BON verification required; 2026-10-31 recorded expiry |
| SEO-302 Medical content governance | P0 | Structure reviewed; clinician/source audit pending | 17 articles have sources, disclaimers and governance |
| SEO-303 Copy | P2 | Targeted trust updates implemented | Two article modifications; no speculative content changes |
| SEO-401 Image attributes | P2 | Source reviewed; build audit pending | Hero preload and lazy images; image-size warnings |
| SEO-402 Core Web Vitals | P2 | Pending—measurement | LCP/INP/CLS no invented data |
| SEO-403 Accessibility | P1 | Existing browser checks; new audit pending | WCAG 2.2 AA needs full manual + automated review |
| SEO-501 Off-page professional links | P3 | Source reviewed | Preserve real social/credit links; no link scheme |
| SEO-502 Search Console | P2 | Blocked—property access | No verified indexation or traffic data |
| SEO-503 Analytics | P2 | Source reviewed | Optional GA event tracking, consent/privacy review pending |
| SEO-601 Test automation | P1 | Implemented—CI pending | `verify-seo-output.mjs`, CI Build/Browser/Visual |
| SEO-701 Release acceptance | P1 | Pending—production verification | Confirm latest SHA Cloudflare Smoke and live responses |

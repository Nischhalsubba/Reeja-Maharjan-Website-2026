# Reeja website — authoritative outstanding task ledger
Updated: 2026-11-02. Design authority: Neutral Editorial v11/v12.
Latest dependency remediation merged through PR #104 as commit `06eccb3ee73d0db113336584a5c322e21c496c60`.

Do not interpret a "Verified" source/build item as Google indexing, real email delivery, clinical correctness or real-user speed. Full evidence: [ACCEPTANCE_2026-11-02.md](./ACCEPTANCE_2026-11-02.md).

| Task | Priority | Status | Evidence / next action |
|---|---|---|---|
| R-000 | P1 | Verified | Repository route/components/CI inventory checked against current GitHub main. |
| R-001 | P1 | Verified, source/build | 31 HTML pages, 28 sitemap URLs, 0 metadata/sitemap violations. Google index coverage separate. |
| R-002 | P1 | Verified, source/build | 24 referenced local images checked; none missing. 114 deploy files measured. |
| C-101 | P0 | Implemented + automated verified; actual mail blocked | Inline FormSubmit AJAX, honeypot and error preservation verified in mock browser tests. Real inbox delivery not attempted. |
| C-102 | P0 | Open | Provider CAPTCHA is disabled. Server-verified Turnstile and rate limits need secure backend, site/secret keys and provider policy review. |
| S-101 | P0 | Implemented, merged | PR #104 safely updates lockfile; verified 0 high and 0 critical advisories on candidate. |
| S-102 | P1 | Open | Eight moderate advisories remain, all ESLint/TypeScript ESLint/minimatch tooling chain. No blind major downgrade. |
| P-201 | P1 | Incomplete | 17+ historically imported CSS stylesheets remain. Measure and remove proven dead code with visual regression, not a blind purge. |
| P-202 | P1 | Measured as build budget; no field improvement claim | 240,369 CSS bytes; 122,035 JS bytes; 1,646,301 image bytes in generated dist. These are uncompressed shipped-file sums, not network transfer timings. |
| P-203 | P1 | External evidence missing | CrUX 75th-percentile field LCP/INP/CLS and real-device performance are not available. Local Playwright values are lab diagnostics only. |
| T-301 | P1 | Verified, build contract | Titles, descriptions, H1, canonical, JSON-LD syntax, social tags, article dates, sitemap/indexability and internal links passed on 31 built HTML pages. |
| T-302 | P1 | Needs separate live review | External redirect chains, search-selected canonicals, source links and Google Rich Results Test cannot be confirmed by build-only checks. |
| E-401 | P1 | Verified for structure, not clinical review | All 17 blog modules: valid source URL syntax, sections, FAQs, published/updated dates, related links; zero structural issues. |
| E-402 | P0 | Blocked, specialist | 17 articles' high-stakes clinical guidance, applicability to Nepal, external source currency and clinician sign-off require qualified independent review. |
| E-403 | P2 | Partially implemented | NNC official-link corrections and WHO nursing workforce source correction. Remaining 37 unique external editorial URLs need live link/claim review. |
| P-501 | P0 | Blocked, official evidence | Texas RN license record expires 2026-10-31; public wording is neutral pending official regulator verification. |
| P-502 | P1 | Pending at contract date | IISH MOM-HD employment record says through 2026-11-30; reconfirm before expiry and change only with evidence. |
| A-601 | P1 | Automated verified, manual open | Browser tests and visual regression pass on last verified main; exhaustive WCAG 2.2 AA manual and assistive-tech audit remains. |
| A-602 | P1 | Partially verified | Automated responsive and visual checks cover key routes/viewports; all routes across 5 breakpoints/states require manual signoff. |
| M-701 | P1 | Blocked, account access | No authorized Google Search Console property or exported queries, clicks, impressions and indexing coverage. |
| M-702 | P2 | Blocked, account access | GA4 conversion events, lawful consent/retention policy and real-contact completion metrics unverified. |
| M-703 | P2 | Hypothesis map exists; search demand unverified | Keyword/intent mapping recorded, but Search Console and independent demand/competitor analysis missing. |
| R-801 | P1 | Implemented, CI running | Build Check, Browser Quality, Visual Regression, Dependency Security and Production Smoke rerun on merged lockfile. |
| R-802 | P1 | Not yet final sign-off | Require exact production build.json SHA, all release gates green and owner acceptance; a commit alone is not deployment proof. |

## Evidence pointers
- Build at `35ca47c6`: [run 41378194425](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378194425), completed successfully.
- Browser at `35ca47c6`: [run 41378194281](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378194281), completed successfully.
- Visual at `35ca47c6`: [run 41378194449](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378194449), completed successfully.
- Production at `35ca47c6`: [run 41378254804](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378254804), completed successfully.
- All PR #104 candidate checks green before merge: [PR #104](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/pull/104).
- CI on merged `06eccb3` and later commits must be checked separately; statuses are not inherited from PR checks.

## External handoffs
1. Website owner: verify a non-sensitive test contact message reaches the correct inbox and confirm FormSubmit account activation.
2. Texas Board of Nursing / owner: check current license status and renewal evidence; do not infer renewal.
3. Qualified clinician: perform formal clinical/editorial review for each health article and sign off any substantive corrections.
4. Website owner: authorize Google Search Console and GA4 access; only then report real traffic/indexation.
5. Performance analyst: collect representative mobile/desktop CrUX field measurements, or label insufficient data honestly.
6. Security engineer: triage remaining eight moderate npm advisories for dev-only exploitability and plan compatible remediation.

**Gate:** client-ready verdict can be conditional if external evidence is missing, but never "100% complete".

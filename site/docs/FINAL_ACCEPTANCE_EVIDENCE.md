# Final acceptance evidence — 2026-11-02

This is an evidence ledger, not a claim that Google indexing, clinical sign-off, regulatory checks, a live inbox delivery or owner acceptance have occurred. The historical PR #20 acceptance notes were superseded by later work; the verified release baseline below is based on GitHub Actions for the actual `main` commit, not on that historical draft.

## Verified engineering baseline

- Baseline `main` SHA before this follow-up: `429c67596ba18a9eea892483bfb213cff79efd7f`.
- [Build Check run 41378940785](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378940785): success; deployment, professional-facts, expiry, editorial, accessibility-contract, source-ownership, design-system, Astro type-check, lint and build steps all passed. Astro reported non-fatal source warnings, including unused declarations that this follow-up removes.
- Build evidence: 31 HTML pages, 28 sitemap URLs, zero generated SEO errors/warnings, 17 typed article metadata records with zero integrity issues, and 24 referenced local images without missing assets. These are generated-output metrics, not live Google indexing evidence.
- [Browser Quality 41378940761](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378940761): success; 99 passed, one not counted as passed in the local preview summary. Do not substitute a 100/100 claim for that summary.
- [Visual Regression 41378940748](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378940748): success; 4 priority routes compared across 3 viewports; no differences reported.
- [Dependency Security 41378740791](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378740791): success on the lockfile inherited by the baseline. npm audit reported 8 moderate, 0 high, 0 critical; these moderate advisories remain tracked rather than automatically forcing breaking changes.
- [Production Smoke 41378998797](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378998797): success on `429c675...`. Job log explicitly states production served the expected commit, the smoke check passed for `https://reejamaharjan.com.np`, and **100 live browser tests passed**. Production evidence artifact: `cloudflare-production-evidence-429c67596ba18a9eea892483bfb213cff79efd7f` (GitHub Actions artifact ID `13112319175`).
- Production custom-domain verification is automated evidence. The Cloudflare dashboard's account configuration, independent third-party form receipt, Search Console and clinical review remain separately permission-dependent.
- Any subsequent PR merge changes `main` and requires fresh exact-SHA CI and production verification; the above results cannot automatically be attributed to future commits.

## Task ledger

| ID | Priority | Workstream | Verified position | Remaining acceptance condition |
|---|---|---|---|---|
| RW-SEO-00 | P1 | Baseline / inventory | 31 built HTML pages; 28 sitemap URLs; 17 article records inventoried; passing CI | Keep updated after code and content changes |
| RW-SEC-01 | P0 | Contact AJAX | Automated success, rejection, validation and no-redirect flows passed in browser suite | Owner-authorized real message and inbox receipt; server-side spam defense decision |
| RW-SEC-02 | P1 | Dependency vulnerabilities | No high/critical advisories in the latest recorded audit | Review and safely remediate eight moderate tooling advisories |
| RW-PERF-03 | P1 | Performance and frontend | Responsive hero image, asset integrity, page/browser tests and shipped-byte inventory verified | CrUX and repeatable network-conditioned Lighthouse / PSI before-after measurements |
| RW-SEO-04 | P1 | Technical SEO | Generated HTML title, description, canonical, sitemap, H1 and schema checks passed | Google Search Console inspection and separate rich-result/live external link validation |
| RW-ED-05 | P0 | 17 articles | 17 article structure/source-URL syntax audits passed | Current clinical source confirmation and qualified reviewer sign-off for each article |
| RW-TRUST-06 | P0 | Credentials / trust | Expired Texas RN 'active' claims neutralized in public copy; expiry controls passed with warning | Official current Texas license evidence and owner approval; IISH contract reconfirmation at end date |
| RW-UX-07 | P1 | UI / responsive / accessibility | Browser and visual regression checks green; accessible navigation contract verified | Human assistive-technology check and broader manual viewport/reflow review |
| RW-DATA-08 | P2 | Search Console / CrUX | No authorized account data supplied | Grant view-only access or export verifiable property and field metrics |
| RW-REL-09 | P0 | Release and production | Baseline exact-SHA live deployment verified and live browser suite passed | Repeat release gate on any subsequently merged HEAD |

Full per-article source and structure matrix: [SEO acceptance, November 2](seo/ACCEPTANCE_2026-11-02.md). Source-generated URL list: [URL inventory](seo/URL_INVENTORY.md).

## RW-3: Cloudflare production integrity

- Custom domain: `https://reejamaharjan.com.np/`.
- Production smoke verified **baseline commit `429c67596ba18a9eea892483bfb213cff79efd7f`** via deployed build fingerprint.
- Production Smoke workflow: **passed**, run `41378998797`.
- Expected Cloudflare project: `reeja-maharjan-website-2026`; account/dashboard-level configuration **awaiting authorized account evidence**.
- Any further routing/redirect audit outside automated browser scenarios: **not independently signed off**.
- Next release commit / deployed fingerprint: **pending** until any follow-up PR is merged and its own smoke test completes.

## RW-4: professional facts approval

Canonical source: `src/content/professional-facts.ts`.
- Owner approval by Reeja Maharjan: **pending**; no date or signature invented.
- LinkedIn/profile/contact review: **pending**.
- Current Texas RN renewal: **unverified** after source expiry on 2026-10-31; public copy must remain neutral.
- IISH MOM-HD contract renewal: **unverified**; recorded end 2026-11-30, reconfirm before asserting continued employment after that date.
- No private license evidence, patient details or participant records should be published.

## RW-11: live screen-reader review

Automated accessible dialog tests, focus management and responsive browser checks are **passing**. Independent human sign-off remains **pending** for:
- Assistive technology, browser and operating-system versions
- Accessible menu name, expanded state, focus entrance/return and logical navigation order
- Escape behavior, modal background isolation, actual screen-reader announcement and 200%/400% zoom
- Reviewer identity and date

Automated Playwright tests alone are not a recorded human NVDA/VoiceOver audit.

## RW-12: production smoke and browser quality

- Verified baseline expected SHA: `429c67596ba18a9eea892483bfb213cff79efd7f`.
- [Production Smoke, passed](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378998797): custom domain served that SHA; 100 live browser tests passed.
- [Browser Quality, passed](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378940761): local preview suite successful.
- [Visual Regression, passed](https://github.com/Nischhalsubba/Reeja-Maharjan-Website-2026/actions/runs/41378940748): 4 routes × 3 viewports.
- Real FormSubmit inbox receipt: **not tested with an authorized live submission**.
- These results describe the baseline. A later release requires its own evidence.

## RW-13: CSP and external requests

- Remote browser suite's security-header and allowed-request tests passed in the production run `41378998797`.
- Server response header values and page CSP are defined through deployment configuration; **a complete independent/manual header audit is not recorded here**.
- Live script exceptions, failed external photography requests and intermittent third-party provider failures still require spot checks; a green automated suite is not an unlimited uptime guarantee.

## Final merge gate

A release can be accepted as **CONDITIONAL PASS for engineering and production tests** when Build Check, Browser Quality, Visual Regression, Dependency Security and exact-SHA Production Smoke pass. Full client / clinical / discoverability acceptance additionally requires:

1. Owner-approved public professional facts and profile links.
2. Official renewal evidence for any claimed current Texas RN status.
3. Clinical reviewer sign-off for healthcare article claims.
4. Independent assistive-technology review.
5. Owner-authorized live FormSubmit delivery receipt and a documented server-side anti-spam decision.
6. Google Search Console data and field performance evidence, if SEO/traffic outcomes are being signed off.
7. Account-level Cloudflare verification when configuration changes are proposed.

**Verdict at verified baseline:** CONDITIONAL PASS for implemented source, CI and live browser checks; **not** a full clinical, contact-delivery, security, or search-performance sign-off.

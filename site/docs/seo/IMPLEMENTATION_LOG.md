# Implementation history

| Date | Commit | Change | Verification |
|---|---|---|---|
| 2026-10-31 | `db5ec7745` | Exclude internal design preview and 404 paths; create initial SEO evidence notes | GitHub Build/Browser/Visual/Production Smoke previously green |
| 2026-10-31 | `06bae93d` | Neutralize unverifiable active Texas RN license wording; preserve original dates and update two medically relevant articles | CI must be checked; regulator renewal not established |
| 2026-10-31 | `71822e77` | Extend sitemap filter and add post-build route, metadata, schema, H1, sitemap and link verification | CI pending when this report was authored |

Conventions: record actual GitHub SHA, affected URLs, failing CI jobs and deployed fingerprint. Do not backdate author review or update content dates for unmodified articles.

Current owner-dependent evidence: Texas BON renewal / Nursys current check, IISH contract reconfirmation when due, Google Search Console and CrUX.

## Additional batch commits
| Date | Commit | Change | Verification |
|---|---|---|---|
| 2026-10-31 | `777c363c` | Expand to all 14 requested audit/tracker documents, 17 article rows | Build green; source-grounded, no invented metrics |
| 2026-10-31 | `56fd8074` | Article/topic contextual links, visible BreadcrumbList, remove duplicate hiring ProfilePage schema | Build check green, browser and production separate |
| 2026-10-31 | `d059aabf` | Replace NNC source links with reachable official host and guidelines page | Build check green; external browser evidence obtained |
| 2026-10-31 | `b3cc650f` | Lab diagnostics test for mobile and desktop loading | CI superseded by follow-up test correction |
| 2026-10-31 | `3583d98e` | Register perf observers once per page context | CI pending at documentation commit |

A later doc-only commit may move `main` again; confirm final SHA from GitHub before claiming production completion.

# QA and production acceptance

## Test layers
1. `npm run verify:source`, `verify:facts`, `verify:expiry`, `verify:editorial`, `verify:a11y`, `verify:design-system`, Astro type check and ESLint.
2. `npm run build` plus `verify:seo-output` (renders `dist/seo-audit.json`), including canonical URLs, descriptions, H1, JSON-LD, links, sitemap.
3. Browser Quality: desktop/mobile route, navigation, contact, reduced motion, 404 and accessibility checks.
4. Visual Regression: compare screenshots after UI changes; no pixel-perfect claims without evidence.
5. Production Smoke: verify deployed `main` SHA and homepage routes against Cloudflare.

## Accepted / blocked evidence
- Source changes and build audits can be directly tested by GitHub Actions.
- Public web retrieval exposed cached historic content, not reliable proof of current deployment.
- Search Console indexing, live source-URL HTTP responses and CrUX require separate evidence.
- Clinical credential verification requires owner/regulator; do not alter expiry date without evidence.
- Core Web Vitals targets are not automatically measured by the build validator.

CI status after final implementation must be updated from workflow runs. No fabricated status is entered here.

## Verified built SEO audit evidence
GitHub Actions `Build Check` at `56fd8074` succeeded. The verify job printed:
```
SEO output verification: {"htmlPages":31,"sitemapUrls":28,"errors":0,"warnings":0}
```
This audit includes built metadata, canonical tags, H1, JSON-LD, internal HTML links, image attributes and sitemap scope. It is **not** proof of Google indexing, CrUX, server-level redirect correctness or clinical source endorsement.

## New diagnostic
`tests/browser/seo-web-vitals-lab.spec.ts` attaches browser-run FCP/LCP/CLS approximations for 390px and 1440px across home/CV/blog. Do not confuse with real-user INP. Wait for full Browser Quality completion before recording numerical results.

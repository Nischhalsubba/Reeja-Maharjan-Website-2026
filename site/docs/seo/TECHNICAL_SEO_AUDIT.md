# Technical SEO audit

| Task | Finding | Implementation or next verification |
|---|---|---|
| SEO-101 robots | `site/public/robots.txt` allows crawlers and advertises root sitemap index | Confirm deployed response and sitemap accessibility |
| SEO-101 sitemap | Astro sitemap integration was present | Internal labs/404 and OG asset paths filtered, verify generated XML |
| SEO-101 canonical | Shared layout self-references pathname via Astro site origin | Post-build check verifies canonical string and intended domain |
| SEO-101 redirects | No reliable HTTP redirect-chain test performed on live site | Check HTTPS, www/non-www, and slash redirects using actual requests |
| SEO-101 404 | Custom `404.astro` sets noindex, nofollow | Verify server returns actual 404, not soft-404 200 |
| SEO-101 internal links | Site includes role links, topic archive links, CV and contact CTAs | Post-build link target validation; separately verify hash fragment links |
| SEO-102 head | Title, description, Open Graph, Twitter, robots, icons in global layout | Post-build check enforces no missing title/description and unique titles |
| SEO-103 JSON-LD | Person/WebSite/ProfilePage and per-article BlogPosting/BreadcrumbList exist | Post-build JSON validation; test actual Google rich-results eligibility separately |
| SEO-401 images | Hero has width/height and eager fetch priority; offscreen photos generally lazy | Post-build warnings for missing dimensions, then investigate actual LCP |
| SEO-503 analytics | Optional GA measurement ID, data-track click hooks | Events only if configured; do not record form contents or health data |

## Technical acceptance
`npm run build` now runs `npm run verify:seo-output`. Its report is `site/dist/seo-audit.json`. Build failures and warnings must be investigated; do not suppress legitimate failures or substitute source assertions for rendered validation.

## Known visibility limitation
Public web retrieval showed an older cached homepage; live Cloudflare deployment is verified independently by GitHub production workflows. Indexing is not established by sitemaps.

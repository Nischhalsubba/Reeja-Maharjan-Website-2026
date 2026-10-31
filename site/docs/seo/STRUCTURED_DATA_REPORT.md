# JSON-LD audit

| Type | Implementation source | Findings |
|---|---|---|
| WebSite | `src/layouts/BaseLayout.astro` | Stable `#website`, English language, named website |
| Person | `src/layouts/BaseLayout.astro` | Stable `#person`, name, URL, image, job title, sameAs and location |
| ProfilePage | Global layout on home, CV and hiring routes | Links to Person as mainEntity; dateModified from site copy |
| BlogPosting | `src/pages/blog/[slug].astro` | Title, description, canonical URL, dates, image, author and publisher |
| BreadcrumbList | Article pages | Home, writing, article URL, matching visible navigation back to writing |

No aggregate ratings, fake FAQ rich results, fabricated published research results or unsupported health-provider credentials should be added.

Post-build audit parses all `application/ld+json` blocks to ensure valid JSON. This does NOT guarantee Google feature eligibility. Verify actual production HTML at https://search.google.com/test/rich-results and https://validator.schema.org/ when possible.

**Pending manual check:** The hiring page may have an additional ProfilePage graph; deduplicate only if semantic content differs or validator reports an issue. Dates and work status need owner confirmation; avoid mismatching visible text and schema.

# SEO route inventory — source-code provisional

Compiled from `site/src/pages` on 2026-10-31; check compiled output and each route before treating this as exhaustive.

| Page | URL | Intended index policy | Notes |
|---|---|---|---|
| Homepage | / | index | Site identity and professional overview |
| CV | /cv/ | index | Verify credential claims, print mode |
| Clinical research | /clinical-research/ | index | Source-grounded MOM-HD responsibilities |
| Nursing practice | /nursing-practice/ | index | Professional practice scope |
| Maternal health | /maternal-health/ | index | Educational and professional pages |
| Hire Reeja | /hire-reeja/ | index | Recruiter-oriented page |
| Contact | /contact/ | index | Working form, no sensitive submission analytics |
| Blog archive | /blog/ | index | Article discovery |
| Article detail | /blog/[slug]/ | index conditionally | Generated from blog content; enumerate at build |
| Topic archives | /blog/topics/[slug]/ | index conditionally | Generated from topic list; inspect thin/empty topics |
| Design system lab | /design-system/ | noindex | Exclude from XML sitemap |
| Palette studio | /palette-studio/ | noindex | Exclude from XML sitemap |
| Custom not-found | /404/ | noindex,nofollow | Exclude from XML sitemap and serve real HTTP 404 |

The common layout creates canonical URLs, titles, descriptions, social images and Person/WebSite schema. Their rendered correctness and consistency must be confirmed separately.

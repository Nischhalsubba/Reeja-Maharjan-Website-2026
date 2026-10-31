# Internal navigation and contextual-link contract

## Verified existing user paths
- Homepage: direct `/cv/`, `/contact/`, `/clinical-research/`, nursing/maternal-health focus links and article highlights.
- Research: article links for diabetes in pregnancy and pre-eclampsia, employer enquiry action.
- Nursing and maternal-health: relevant educational articles, blog archive and career/CV actions.
- CV: `/contact/` and `/hire-reeja/`.
- Hire Reeja: contact, CV, research/nursing evidence via content cards.
- Blog detail: visible "All articles by Reeja" link, author profile, CV, related articles and chosen professional hub.
- Topic archive: links back to full writing archive, professional pages and included articles.
- Common header/footer: top-level routes accessible sitewide.

## Recommended semantic routing enhancements
- Keep primary professional and educational pages separate to avoid duplicate intent.
- Link from relevant article topics to `/blog/topics/<slug>/` when a generated topic page contains meaningful articles.
- Use plain, descriptive anchor labels (e.g., "View clinical research" rather than "Click here").
- Prefer explicit local href values with valid target pages; do not create backlinks solely to influence ranking.
- Do not link private credential proof documents publicly.

## Automated verification
`site/scripts/verify-seo-output.mjs` checks built route targets; hash-fragment and cross-origin links require supplementary live checks. Do not declare a site "no broken links" from source-only review.

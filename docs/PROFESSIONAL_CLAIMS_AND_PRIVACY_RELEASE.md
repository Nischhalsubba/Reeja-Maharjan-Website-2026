# Professional claims, privacy and publication review

## Context and owners
This repository contains an Astro portfolio under `site/`. Its package scripts include `verify:facts`, `verify:expiry`, `verify:editorial`, `verify:contact-handler`, `verify:seo-output`, and `verify`. Those checks protect implementation contracts; they cannot independently authenticate real-world licenses, employment, qualifications, or consent.

## Source hierarchy
For biographies and career facts, prefer records the individual is authorized to publish. A proposed claim needs: wording, evidence reference, approval owner, review date, and expiry/recheck date. Keep original employment records, contact details, certificates and identification documents outside this public GitHub repository.

| Content | Human publication gate |
| --- | --- |
| Professional titles / license language | Confirm accurate jurisdiction, current status and authorized wording |
| Education and training | Verify certificate/date and allowed public disclosure |
| Employment dates, departments and responsibilities | Owner-approved wording; do not infer outcomes or credentials |
| Testimonials and photographs | Explicit permission, credit and context; remove on withdrawal |
| Clinical experience or cases | No patient-identifiable data, dates, workplace internals or invented outcomes |
| Contact form and public links | Confirm consent/retention notice, destination and abuse protection |
| Publication dates / article facts | Author review and sources; update claims when guidance changes |

## Review and verification steps
1. Record the exact source file(s), public URL(s) and reason for the content change.
2. Confirm factual and privacy decisions with the profile owner; keep evidence references private.
3. Review `Person`/article structured data, page title, image alternatives and social previews for consistency.
4. In `site/`, run `npm ci`, `npm run verify:facts`, `npm run verify:expiry`, `npm run verify:editorial`, and `npm run verify` in a supported Node 22 environment.
5. For a contact change, inspect `verify:contact-handler` output and manually verify real deployment behavior without exposing messages.
6. Review responsive/keyboard behavior, accurate form feedback and mobile legibility.
7. Deploy only through the configured Cloudflare Pages pipeline; the repository-root build bridge is **not** proof of live publication.
8. Check the published URL, release fingerprint, key routes, metadata and contact path after Cloudflare reports success.

## Reviewer evidence template
```text
PR, commit and public routes:
Content owner, approval date:
Claim / internal evidence reference / expiry:
Photograph or testimonial permission:
Privacy-sensitive details removed:
Node/npm and validation command results:
Accessibility and mobile review:
Cloudflare deployment URL and fingerprint check:
Exceptions, blockers, responsible owner:
Rollback reference:
```

## Blocking defects
Do not approve misleading professional scope, unsupported credentials, patient information, private certificate identifiers, broken contact delivery, or an unverified production deployment claim. If a claim loses authorization, remove it and invalidate previews before republishing.

## Scope
A documentation-only release gate: it does not add credentials or consent data, change the site, run the published validation suite, or certify live deployment.

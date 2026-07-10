# Reeja Maharjan Website 2026 — Product and Engineering Case Study

> A comprehensive product, content, privacy, SEO, architecture, recruiter UX, clinical credibility, deployment, and maintenance case study for the Reeja Maharjan Website 2026 repository. This document is intentionally detailed so future maintainers, recruiters, collaborators, designers, engineers, and AI coding agents can understand the site without treating a healthcare portfolio like a generic landing page with a stethoscope emoji taped on. Healthcare credibility deserves better than decorative nonsense.

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Repository Snapshot](#repository-snapshot)
3. [Product Context](#product-context)
4. [Problem Statement](#problem-statement)
5. [Target Audiences](#target-audiences)
6. [Core Product Promise](#core-product-promise)
7. [Recruiter-First Information Architecture](#recruiter-first-information-architecture)
8. [Homepage Section Strategy](#homepage-section-strategy)
9. [Clinical Credibility Strategy](#clinical-credibility-strategy)
10. [Credential Privacy Strategy](#credential-privacy-strategy)
11. [Content Model](#content-model)
12. [Astro Architecture](#astro-architecture)
13. [Layout and Metadata Strategy](#layout-and-metadata-strategy)
14. [SEO and Structured Data Strategy](#seo-and-structured-data-strategy)
15. [Blog and Health Content Strategy](#blog-and-health-content-strategy)
16. [Design System Direction](#design-system-direction)
17. [Accessibility Strategy](#accessibility-strategy)
18. [Responsive and Mobile Strategy](#responsive-and-mobile-strategy)
19. [Motion and Interaction Strategy](#motion-and-interaction-strategy)
20. [Contact and Conversion Strategy](#contact-and-conversion-strategy)
21. [Cloudflare Pages Deployment](#cloudflare-pages-deployment)
22. [Build Check and Branch Safety](#build-check-and-branch-safety)
23. [Testing and QA Strategy](#testing-and-qa-strategy)
24. [Security and Privacy Notes](#security-and-privacy-notes)
25. [Maintenance Playbook](#maintenance-playbook)
26. [Risk Register](#risk-register)
27. [Roadmap](#roadmap)
28. [Portfolio Review Notes](#portfolio-review-notes)
29. [AI Coding Agent Notes](#ai-coding-agent-notes)
30. [Appendix A: Suggested Content Contract](#appendix-a-suggested-content-contract)
31. [Appendix B: Recruiter QA Matrix](#appendix-b-recruiter-qa-matrix)
32. [Appendix C: Privacy Redaction Checklist](#appendix-c-privacy-redaction-checklist)
33. [Appendix D: Suggested AGENTS.md](#appendix-d-suggested-agentsmd)
34. [Appendix E: Glossary](#appendix-e-glossary)
35. [Disclaimer](#disclaimer)

---

## Executive Summary

**Reeja Maharjan Website 2026** is a static, SEO-focused professional nurse portfolio for Reeja Maharjan. It is built with Astro, Tailwind CSS, TypeScript, structured profile content, Person schema metadata, privacy-safe credential summaries, recruiter-first homepage architecture, blog credibility notes, and Cloudflare Pages deployment.

The site is not a generic creative portfolio. It is a professional healthcare and research profile designed to answer recruiter questions quickly:

1. Who is Reeja?
2. What license and clinical credibility does she have?
3. What roles is she suitable for?
4. What evidence can be shown publicly without exposing sensitive documents?
5. How can a recruiter contact her?

The current site focuses on NNC RN status, Texas RN status, NCLEX-RN readiness, hospital experience, maternal-newborn care, IISH MOM-HD research assistant work, BP/BG telemonitoring, REDCap-style data quality, participant education, and safe clinical coordination.

The product challenge is unusually sensitive because a nurse portfolio must balance visibility and privacy. Recruiters need proof. The public web should not expose license reports, transcripts, full letters, signatures, stamps, addresses, or personal identifiers. The site therefore uses public summaries and request-based proof language rather than dumping raw credential documents onto the internet like civilization has learned nothing.

This case study documents product strategy, recruiter UX, information architecture, content models, Astro architecture, metadata strategy, privacy guardrails, accessibility, QA, deployment safety, and maintenance rules.

---

## Repository Snapshot

| Attribute | Value |
|---|---|
| Repository | `Nischhalsubba/Reeja-Maharjan-Website-2026` |
| Product type | Professional nurse portfolio / healthcare career site |
| Framework | Astro `5.17.1` |
| Styling | Tailwind CSS `4.2.0` plus custom CSS layers |
| Language | TypeScript |
| Motion | GSAP and SplitType |
| Metadata | Astro layout-level metadata, Open Graph, Twitter cards, Person schema |
| Deployment | Cloudflare Pages from `main` |
| CI workflow | GitHub Build Check |
| Content source | `src/content/profile.ts` |
| Homepage entry | `src/pages/index.astro` |
| Layout | `src/layouts/BaseLayout.astro` |
| License metadata | UNLICENSED |
| Maintainer | Nischhal Raj Subba |

---

## Product Context

Healthcare portfolios are different from design portfolios, developer portfolios, or marketing pages. A recruiter does not need theatrical effects. A recruiter needs credibility, role fit, proof, and a safe contact path.

For a nurse portfolio, credibility comes from:

- license status
- current role
- clinical experience
- role-specific skills
- education
- certifications
- patient-care exposure
- research experience
- communication ability
- professional references or recommendations
- privacy-safe proof summaries

The site’s goal is not to make every section visually loud. It is to help a recruiter or hiring manager make a fast, confident decision.

### Product positioning

The site positions Reeja as:

- NNC Licensed Registered Nurse
- Texas RN
- NCLEX-RN cleared
- Research Assistant at IISH on MOM-HD
- maternal health telemonitoring support professional
- hospital-experienced nurse
- BP/BG monitoring and participant education support
- documentation and data-quality contributor

### Why this matters

The portfolio communicates both clinical readiness and research-program fit. That means the site must support hospital, research, NGO/INGO, maternal health, care-coordination, and international-nursing screening contexts.

---

## Problem Statement

### User problem

Recruiters and programme teams need to evaluate Reeja’s role fit quickly without requesting documents at the first step.

### Candidate problem

Reeja needs a credible public profile that highlights licenses, hospital experience, research role, and strengths while protecting sensitive documents.

### Content problem

Healthcare credentials often require proof, but proof materials may contain personal information, stamps, signatures, addresses, license identifiers, or private institutional details.

### Technical problem

The site must remain fast, static, SEO-friendly, deployable through Cloudflare Pages, and safe to update through a Build Check workflow.

### Trust problem

Unsupported claims, fake metrics, exaggerated role descriptions, or public credential dumps would reduce trust. The site must be evidence-based without oversharing.

---

## Target Audiences

### 1. Hospital recruiters

They need to see clinical readiness, license status, ward experience, patient monitoring, documentation, and handover strength.

### 2. Research coordinators

They need evidence of study support, participant screening, consent support, BP/BG monitoring, follow-up calls, data quality, and protocol awareness.

### 3. NGO / INGO programme teams

They need communication skills, participant education, safeguarding awareness, field coordination, reporting, and confidentiality.

### 4. International nursing reviewers

They need Texas RN and NCLEX-RN status, English clinical communication, and credible education/experience signals.

### 5. Reeja herself

She needs a maintainable public profile that does not leak sensitive information and can evolve with new roles.

### 6. Future maintainers and AI agents

They need to know where content lives, what should not be exposed, and how to verify changes before deployment.

---

## Core Product Promise

The site promises to be:

1. **Recruiter-first**
   - The homepage should answer credibility and contact questions quickly.

2. **Privacy-safe**
   - Sensitive documents stay private by default.

3. **Clinically credible**
   - Claims should be evidence-based and specific.

4. **Calm and professional**
   - The design should feel trustworthy, not flashy.

5. **SEO-aware**
   - Metadata should help the profile appear for relevant professional searches.

6. **Maintainable**
   - Structured content should allow safe updates without rewriting every component.

7. **Deployment-safe**
   - Production changes should pass Build Check before being treated as stable.

---

## Recruiter-First Information Architecture

The homepage order is deliberate:

1. Hero
2. Profile
3. Role fit
4. Experience
5. Credentials
6. Skills
7. Education
8. Languages
9. Awards
10. Recommendations
11. Evidence
12. Blog highlights
13. Contact

### Why this order works

Recruiters scan for:

- immediate identity and role
- license credibility
- current work status
- relevant experience
- proof and verification language
- contact path

The site puts those answers before secondary storytelling.

### IA rule

Do not add sections simply because content exists. A healthcare portfolio should reduce screening friction, not become a scrapbook with deployment automation.

---

## Homepage Section Strategy

### Hero

Purpose:

- establish identity
- show role and license signals
- make contact obvious
- state current research/hospital relevance

### Profile

Purpose:

- summarize clinical and research profile
- present a concise professional paragraph
- reinforce license and research context

### Role Fit

Purpose:

- translate experience into recruiter categories
- help different hiring teams see fit quickly

### Experience

Purpose:

- show timeline and responsibilities
- avoid bloated job descriptions
- highlight evidence-based bullets

### Certifications

Purpose:

- summarize verified status without publishing sensitive full documents

### Skills

Purpose:

- make competencies scannable
- align with clinical, research, documentation, and care-coordination contexts

### Evidence

Purpose:

- explain what proof exists
- keep full proof private unless requested

### Contact

Purpose:

- make recruiter action easy
- provide email, phone, location, LinkedIn, CV link, and relevant channels

---

## Clinical Credibility Strategy

Clinical credibility depends on specificity.

### Strong signals

- NNC Licensed RN
- Texas RN active status
- NCLEX-RN cleared
- current IISH MOM-HD role
- TUTH experience
- MMTH experience
- Sindhuli Hospital role
- maternal/newborn care
- BP/BG monitoring
- HDP/GDM workflow support
- REDCap-style data quality
- participant counselling
- tele-follow-up

### Weak signals to avoid

- vague “passionate nurse” claims
- unsupported excellence language
- fake statistics
- generic compassion paragraphs without evidence
- overly broad claims about specialist capability

### Content rule

Every major claim should either be supported by structured profile data, public summary evidence, or request-based private verification wording.

---

## Credential Privacy Strategy

This is one of the most important parts of the project.

### Never publish publicly by default

- unredacted license reports
- full transcripts
- signatures
- stamps
- addresses
- personal identifiers
- full experience letters
- private recommendation letters
- passport or citizenship information
- phone numbers not intended for public use
- document numbers unless intentionally safe

### Public-safe alternatives

- license status summary
- issuer name
- date/month/year when safe
- credential category
- request-based proof wording
- redacted preview image if safe
- statement that full documents are available privately

### Why this matters

Recruiters need confidence. The public internet does not need every private document. This distinction is somehow still not obvious to the species that invented upload buttons.

---

## Content Model

The main content source is `src/content/profile.ts`.

### Content types include

- `HeroData`
- `SectionIntro`
- `CredentialPreview`
- `ExperienceItem`
- `EducationItem`
- `CertificationItem`
- `SkillGroup`
- `SkillDetail`
- `RoleFitItem`
- `Recommendation`
- `PersonalDetail`
- `ContactData`
- `EvidenceItem`
- `ProfileContent`

### Content-model strengths

- structured and typed
- one source of truth for homepage content
- section intros are reusable
- credential previews are explicit
- role-fit cards separate audience intent from raw CV chronology
- contact data is centralized

### Content-model risk

Because profile data is centralized, accidental exposure can spread quickly. Always review `profile.ts` before pushing production changes.

---

## Astro Architecture

The app uses Astro pages and components.

### Main homepage composition

`src/pages/index.astro` imports:

- `BaseLayout`
- `Hero`
- `ProfileSection`
- `RoleFitSection`
- `ExperienceSection`
- `CertificationsSection`
- `SkillsSection`
- `EducationSection`
- `LanguagesSection`
- `AwardsSection`
- `RecommendationsSection`
- `EvidenceSection`
- `BlogHighlightsSection`
- `ContactSection`
- `ImageLightbox`
- `profile`

### Architecture principle

The page is component-composed and data-driven. Components should render structured content, not hardcode sensitive professional data in scattered files.

### Recommended folder responsibilities

| Path | Purpose |
|---|---|
| `src/pages/` | Astro routes |
| `src/layouts/` | shared layout and metadata |
| `src/components/` | homepage/blog UI components |
| `src/content/` | structured profile and content data |
| `src/styles/` | token, base, layout, component, and page CSS |
| `.github/workflows/` | CI build checks |
| `public/` | public assets only after privacy review |

---

## Layout and Metadata Strategy

`BaseLayout.astro` owns global metadata concerns.

### Current metadata behavior

- title
- description
- canonical URL
- Open Graph metadata
- Twitter card metadata
- robots tag
- favicon
- Person JSON-LD schema
- social image
- Google font preconnects

### Person schema

The Person schema includes:

- name
- jobTitle
- description
- email
- address locality
- knowsAbout keywords
- sameAs links

### Metadata rule

Metadata must remain truthful and privacy-safe. Do not put sensitive identifiers, private addresses, document numbers, or exaggerated credentials into structured data.

---

## SEO and Structured Data Strategy

The site is SEO-focused, but healthcare SEO must be careful.

### Good SEO targets

- Reeja Maharjan nurse
- Reeja Maharjan RN
- Reeja Maharjan Texas RN
- NNC licensed nurse Nepal
- maternal health research assistant Nepal
- MOM-HD research assistant
- BP BG telemonitoring research support

### SEO rules

- Use real credentials only.
- Avoid fake authority claims.
- Avoid medical advice positioning unless content is reviewed and safety-labeled.
- Keep blog pages credible and scoped.
- Make contact and professional identity indexable.
- Use schema responsibly.

### Social previews

The README backlog includes testing social previews on LinkedIn, WhatsApp, Facebook, and X/Twitter. This matters because recruiter sharing often happens through messaging apps.

---

## Blog and Health Content Strategy

Blog pages can support credibility, but they must be handled carefully.

### Blog goals

- explain clinical topics in plain language
- show communication ability
- demonstrate maternal health awareness
- support recruiter trust
- avoid unsafe medical advice claims

### Blog safety rules

- include review notes where relevant
- include FAQ schema only when content visibly supports it
- keep emergency/safety language clear
- avoid diagnosing readers
- advise consultation with qualified professionals where appropriate
- avoid pretending blog content replaces care

### Blog content categories

Possible safe categories:

- maternal health education
- BP/BG monitoring basics
- nursing communication
- telemonitoring participant support
- documentation and data-quality lessons
- NCLEX/international nursing preparation experience

---

## Design System Direction

The design direction is calm, trustworthy, clinical, and recruiter-ready.

### Desired qualities

- clean hierarchy
- restrained color
- readable type
- obvious contact path
- privacy-safe proof presentation
- mobile-friendly scanning
- minimal motion
- no decorative clutter

### Visual tokens and layout

The layout uses clinical surface colors, restrained borders, accessible focus states, rounded cards, and clear section rhythm.

### Avoid

- fake hospital visuals
- stock-medical overdesign
- noisy animations
- unsupported claims
- too many repetitive cards
- overly creative portfolio tone

### Design principle

The site should make Reeja look credible, not make the designer look desperate for applause. Tragic distinction, frequently ignored.

---

## Accessibility Strategy

Healthcare-related professional sites should be accessible by default.

### Accessibility priorities

- clear focus states
- readable contrast
- proper heading order
- meaningful link text
- mobile tap targets
- keyboard-accessible navigation
- accessible image alt text
- reduced-motion respect
- form/contact accessibility

### Specific checks

- hero CTAs reachable by keyboard
- mobile navigation works without hover
- credential previews have useful alt text
- blog cards have meaningful labels
- contact links are clear
- lightbox behavior is keyboard safe

### Rule

Do not let motion or visual polish reduce readability. Recruiters should not need to fight the interface to confirm a nursing license.

---

## Responsive and Mobile Strategy

Recruiters may open the site from phones, messaging apps, or LinkedIn.

### Mobile requirements

- hero must explain role quickly
- contact CTA must remain visible
- section spacing must not bury credentials
- cards must stack cleanly
- text must remain readable
- document previews must not reveal sensitive details
- navigation must be simple

### Manual mobile QA

The README explicitly lists real-device mobile QA as remaining backlog. This should stay a priority before major promotion.

---

## Motion and Interaction Strategy

The site includes GSAP and SplitType.

### Motion rules

- keep motion restrained
- avoid delaying recruiter scanning
- respect reduced motion
- do not animate critical credential text in a way that hides it
- use motion only to support hierarchy

### Interaction rules

- image lightbox must be privacy-reviewed
- credential previews must be safe before enlargement
- contact actions must work on mobile
- cards with links must have focus states

---

## Contact and Conversion Strategy

The primary conversion is recruiter contact.

### Contact channels

- email
- phone
- location
- LinkedIn
- resume URL
- optional WhatsApp/Instagram where appropriate

### CTA strategy

The hero CTA should route to contact. A secondary CTA can route to credentials.

### Contact rules

- make contact obvious
- do not bury email below too many sections
- keep CV download updated
- avoid exposing unnecessary personal details
- test phone/mail links on mobile

---

## Cloudflare Pages Deployment

The README states production deploys from `main` through Cloudflare Pages.

### Deployment implications

Every push to `main` is user-facing. Dependency, config, and privacy changes require extra caution.

### Safe deployment workflow

1. Make small commits.
2. Keep dependency changes isolated.
3. Run `npm run verify` locally where possible.
4. Ensure GitHub Build Check passes.
5. Confirm Cloudflare production deployment is green.
6. Inspect live site after major content or metadata changes.

---

## Build Check and Branch Safety

The GitHub workflow runs on pull requests and pushes to `main` and `portfolio-priority-roadmap`.

### Build Check steps

- checkout
- setup Node 22
- install dependencies
- run `npm run check`
- run `npm run build`

### Recommendation

Protect `main` and require Build Check before merging. The workflow exists, but branch protection must be enabled manually in GitHub settings.

### Why this matters

A broken healthcare portfolio in production is not just embarrassing. It can cost real opportunities. Naturally, computers choose the worst time to fail, because they learned drama from humans.

---

## Testing and QA Strategy

### Commands

```bash
npm install
npm run check
npm run lint
npm run build
npm run verify
```

### QA categories

- content accuracy
- credential privacy
- recruiter scanning
- accessibility
- mobile layout
- social preview
- SEO metadata
- build workflow
- Cloudflare deployment

### Before every public update

- confirm no sensitive files were added
- confirm contact links work
- confirm profile claims are accurate
- confirm build passes
- confirm mobile layout still works
- confirm social image is appropriate

---

## Security and Privacy Notes

### Public assets are public

Anything placed in public assets can be downloaded by visitors. Do not place sensitive documents there unless deliberately public and redacted.

### Structured data is public

Person schema can be extracted by search engines. Keep it minimal and safe.

### Git history is not private

If sensitive files are committed and later deleted, they may still exist in repository history. Avoid committing them in the first place.

### Contact data

Only include contact details Reeja intentionally wants public.

---

## Maintenance Playbook

### Updating profile content

1. Open `src/content/profile.ts`.
2. Update structured fields.
3. Check claims against available evidence.
4. Remove or summarize sensitive proof.
5. Run `npm run verify`.
6. Review homepage and mobile layout.

### Updating credentials

1. Do not upload full unredacted documents.
2. Add public-safe summary.
3. Add request-based proof wording.
4. Add redacted preview only if necessary.
5. Check alt text.
6. Review public assets.

### Updating design

1. Modify component or CSS layer intentionally.
2. Preserve calm clinical tone.
3. Preserve focus states and readability.
4. Test mobile.
5. Avoid animation-heavy changes.

### Updating dependencies

1. Make dependency update alone.
2. Run Build Check.
3. Do not combine with layout/content changes.
4. Confirm Cloudflare deployment.

---

## Risk Register

| Risk | Severity | Why it matters | Mitigation |
|---|---:|---|---|
| sensitive credential exposure | High | privacy and identity risk | redaction checklist and public summaries |
| unsupported clinical claims | High | credibility risk | evidence-based content only |
| broken production deploy | High | recruiter access fails | Build Check and branch protection |
| stale CV download | Medium | profile mismatch | update CV alongside positioning |
| poor mobile layout | High | recruiters often use mobile | real-device QA |
| over-designed visuals | Medium | reduces clinical trust | restrained design system |
| weak contact path | High | lost opportunities | primary CTA and contact QA |
| stale license status | High | credibility issue | scheduled content review |
| schema overexposure | Medium | public data extraction | safe structured data only |
| blog medical advice risk | Medium/High | user safety and liability | safety notes and review language |

---

## Roadmap

### Near term

- Replace or recreate downloadable PDF CV.
- Complete real-device mobile QA.
- Test social previews across major platforms.
- Review public asset folder for sensitive files.
- Add a privacy-safe credential proof policy page or note.

### Mid term

- Add changelog for credential/profile updates.
- Add stronger blog review metadata.
- Add preview checklist for social cards.
- Add visible last-updated date for profile or credentials.
- Add safer document-request workflow.

### Long term

- Add multilingual support if target recruiters need it.
- Add structured case-study pages for research work.
- Add private recruiter packet workflow outside public repo.
- Add automated link/social metadata checks.

---

## Portfolio Review Notes

This project is strong because it demonstrates:

- healthcare-specific UX judgment
- privacy-first credential design
- recruiter-first information architecture
- Astro content architecture
- structured data and SEO awareness
- CI/deployment safety
- calm, clinically credible visual direction

### Strong summary

> Built an Astro-powered professional nurse portfolio for Reeja Maharjan focused on recruiter-first scanning, clinical credibility, NNC/Texas RN positioning, MOM-HD research experience, privacy-safe credential summaries, structured Person metadata, blog credibility notes, accessible design, and Cloudflare Pages deployment.

### What not to overclaim

Do not claim:

- private documents are publicly verified unless they are
- clinical specialist status beyond evidence
- active license details beyond confirmed status
- medical advice authority through blog content
- metrics without documentation

---

## AI Coding Agent Notes

Future AI agents should treat this as a privacy-sensitive healthcare portfolio.

### Inspect first

1. `README.md`
2. `package.json`
3. `src/content/profile.ts`
4. `src/pages/index.astro`
5. `src/layouts/BaseLayout.astro`
6. `src/components/`
7. `src/styles/`
8. blog content/pages
9. `.github/workflows/build-check.yml`
10. public assets

### Do not

- Do not upload unredacted credentials.
- Do not add unsupported medical or licensing claims.
- Do not expose private addresses or identifiers.
- Do not add noisy animations.
- Do not break Build Check.
- Do not combine dependency upgrades with big UI rewrites.

### Prefer

- structured content updates
- small commits
- privacy-safe summaries
- recruiter-first wording
- accessible, calm UI
- evidence-based claims
- clear contact paths

---

## Appendix A: Suggested Content Contract

```ts
type PublicCredentialSummary = {
  title: string;
  issuer: string;
  publicStatus: string;
  safeDate?: string;
  proofAvailability: 'public_summary' | 'available_on_request' | 'redacted_preview';
  publicNotes: string;
  sensitiveFieldsExcluded: string[];
};
```

---

## Appendix B: Recruiter QA Matrix

| Question | Where answered | Pass condition |
|---|---|---|
| Who is Reeja? | Hero/Profile | Name and role visible quickly |
| Is she licensed? | Hero/Credentials | NNC/Texas RN status summarized safely |
| What is her current role? | Hero/Profile/Experience | IISH MOM-HD role visible |
| What roles fit her? | Role Fit | recruiter categories are clear |
| What clinical experience exists? | Experience | timeline is readable |
| How can I contact her? | Hero/Contact | email/contact CTA works |
| Can I verify documents privately? | Credentials/Evidence | request-based proof wording exists |
| Is the site mobile usable? | whole site | real-device QA passes |

---

## Appendix C: Privacy Redaction Checklist

Before uploading or linking any document, confirm:

- [ ] no full address
- [ ] no signature unless intentionally public
- [ ] no stamp/seal exposure unless safe
- [ ] no private license number unless safe
- [ ] no transcript details beyond needed summary
- [ ] no passport/citizenship data
- [ ] no phone numbers not intended for public use
- [ ] no third-party personal data
- [ ] no hidden metadata in exported files
- [ ] public summary is enough for first-stage recruiter screening

---

## Appendix D: Suggested AGENTS.md

```md
# Repository Instructions

## Setup

Use Node.js 22 or newer. Install dependencies with `npm install`.

## Commands

- `npm run dev`: start local Astro dev server.
- `npm run check`: run Astro type/content checks.
- `npm run lint`: run ESLint.
- `npm run build`: build the production site.
- `npm run verify`: run check, lint, and build.

## Content rules

- Main profile content lives in `src/content/profile.ts`.
- Keep recruiter-first section order unless there is a strong product reason.
- Use public summaries for credentials.
- Full sensitive documents should be shared privately, not committed publicly.

## Privacy rules

Do not commit unredacted license reports, transcripts, signatures, stamps, addresses, document IDs, private letters, or personal identifiers.

## Deployment rules

Production deploys from `main` through Cloudflare Pages. Keep changes small and wait for Build Check.

## Do not

- Do not add unsupported clinical claims.
- Do not add noisy animation that hurts recruiter scanning.
- Do not combine dependency changes with large UI/content changes.
```

---

## Appendix E: Glossary

| Term | Meaning |
|---|---|
| NNC | Nepal Nursing Council |
| RN | Registered Nurse |
| NCLEX-RN | US nursing licensure examination |
| MOM-HD | Maternal health telemonitoring research project referenced in the profile |
| HDP | Hypertensive disorder of pregnancy |
| GDM | Gestational diabetes mellitus |
| REDCap-style data quality | Structured research-data entry and review practices |
| Credential preview | Public-safe summary or redacted visual proof |
| Person schema | Structured data describing a person for search engines |
| Recruiter-first UX | Page structure optimized for hiring/review decisions |
| Build Check | GitHub Actions workflow that runs checks/build before stability |

---

## Disclaimer

This repository is a professional portfolio website and documentation artifact. It should not expose private medical, licensing, educational, employment, or identity documents publicly unless intentionally redacted and approved. Professional, licensing, and employment claims should be kept accurate, current, and evidence-based.

Blog or educational content on the site should not be treated as personal medical advice. Healthcare questions should be directed to qualified clinical professionals or appropriate services.

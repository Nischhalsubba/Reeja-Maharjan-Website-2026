# Reeja Maharjan Website 2026

> A static, SEO-focused professional nurse portfolio for **Reeja Maharjan**, built with Astro, Tailwind CSS, TypeScript, structured content, privacy-safe credential summaries, and recruiter-first UX.

## Production Status

The production site deploys from `main` through Cloudflare Pages. Every production change should be treated as user-facing and must pass the GitHub **Build Check** workflow before being considered stable.

## Design Direction

This website should feel calm, trustworthy, clinically credible, and recruiter-ready. It should not feel like a generic creative portfolio, a hospital brochure, or a noisy animation demo. The first screen should answer three questions quickly:

1. Who is Reeja?
2. Why is she credible?
3. How can a recruiter contact her?

### Design Principles

- Lead with license status, clinical experience, and role fit.
- Keep sensitive documents private and summarize evidence publicly.
- Use restrained motion, clear hierarchy, and readable typography.
- Make the primary contact path obvious on desktop and mobile.
- Prefer fewer stronger sections over many repetitive sections.
- Avoid unsupported claims, fake metrics, decorative clutter, and vague calls to action.

## Current Site Focus

- Sharper hero positioning around NNC RN, Texas RN, NCLEX-RN, and hospital experience.
- Recruiter-first homepage order: profile, role fit, experience, credentials, strengths, education, recommendations, verification, blog, contact.
- Privacy-safe credential handling: sensitive reports, transcripts, signatures, stamps, and full letters are not publicly exposed by default.
- Stronger experience scanning with tags, checklists, and private verification wording.
- Safer certification cards with public summaries and request-based proof language.
- Blog pages include author credibility, review notes, FAQ schema, and safety language.

## Local Development

```bash
npm install
npm run dev
```

## Quality Commands

```bash
npm run check
npm run lint
npm run build
```

## Safe Deployment Workflow

Use this workflow for future changes:

1. Make small, reviewable commits.
2. Avoid changing dependencies and UI layout in the same commit.
3. For dependency/config changes, wait for GitHub **Build Check** before making more changes.
4. Confirm Cloudflare production deployment is green after each main push.
5. If a deployment fails, inspect logs before pushing another fix.

## Manual Branch Protection Recommendation

In GitHub settings, protect `main` and require the **Build Check** workflow before merging. This prevents broken dependency/config changes from going directly into production. The workflow exists in `.github/workflows/build-check.yml`, but branch protection must be enabled manually in GitHub.

## Privacy Note

Do not upload unredacted license reports, transcripts, experience letters, certificates, signatures, stamps, addresses, or personal identifiers to the public site. Use public summaries and share full documents privately only when needed.

## Remaining Product Backlog

- Replace or recreate the downloadable PDF CV so it matches the updated website positioning.
- Continue improving the credentials section visually, while keeping sensitive verification documents private.
- Run manual mobile QA on real devices.
- Test social previews on LinkedIn, WhatsApp, Facebook, and X/Twitter.
- Keep dependency changes isolated and verified before additional production changes.

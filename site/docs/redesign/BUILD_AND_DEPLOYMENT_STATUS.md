# Build and Deployment Status

## Repository build contract

The repository build workflow is defined in `.github/workflows/build-check.yml`. It runs on pushes to `main` and executes the deployment checks, production contract checks, final acceptance checks, professional fact checks, expiry checks, editorial checks, accessibility contract checks, source ownership checks, Astro type checking, linting, and production build.

The package-level full verification command is:

```bash
npm run verify
```

The minimum direct commands are:

```bash
npm run verify:deployment
npm run verify:production-contract
npm run verify:final-acceptance
npm run verify:facts
npm run verify:expiry
npm run verify:editorial
npm run verify:a11y
npm run verify:source
npm run check
npm run lint
npm run build
```

## Current code status

The redesign work has been committed directly to `main` as requested. The latest committed redesign work covers:

- Blog index and article reading experience
- Contact form states and fallback flow
- Clinical editorial homepage, CV, shell, supporting pages, motion, and design system
- Public-safe credential and verification handling
- Supporting QA and task documentation

## Build evidence status

Local build verification could not be completed in this runtime because DNS resolution for `github.com` is unavailable, preventing a dependency install or repository checkout.

The GitHub commit status API exposed only two Vercel contexts, both failing due to Vercel build-rate limits rather than a code-level build error:

- `Vercel - reeja-maharjan-website-2026`
- `Vercel - reeja-maharjan-website-2026-dj9r`

The active production notes in the repository identify Cloudflare Pages as the production deployment platform. Cloudflare deployment status is not available through the connected GitHub tool in this session.

## Release requirement still outstanding

Before declaring final production success, one of the following must be captured:

1. A successful GitHub Actions Build Check run for the current `main` commit, or
2. A successful Cloudflare Pages deployment for the current `main` commit plus production smoke verification, or
3. A local checkout with dependencies installed and all `npm run verify` checks passing.

Until that evidence exists, the redesign can be described as implemented in code, but not fully verified as successfully built and deployed.

# In-progress blocker completion plan

This document defines the remaining evidence required before RW-3, RW-4, RW-11, RW-12, RW-13 and RW-14 can move to Done.

## RW-3: Cloudflare production integrity

Repository controls are complete when:

- `main` builds successfully.
- `/build.json` identifies the expected commit.
- the public homepage contains `Clinical care with research discipline.`
- the public homepage does not contain retired location, availability or contact copy.
- retired document routes do not return `200`.

Account-level completion still requires the custom domain to serve the current Cloudflare Pages production deployment. Worker routes, legacy Pages bindings, redirect rules and cache rules must be checked in Cloudflare if the custom domain and the project `pages.dev` origin disagree.

## RW-4: professional facts

The canonical source is `src/content/professional-facts.ts`. Public profiles should match these approved facts:

- current role: Research Assistant
- employer: Institute for Implementation Science and Health (IISH)
- project: MOM-HD maternal health telemonitoring trial
- location: Biratnagar, Nepal
- availability: open to discussing suitable future opportunities
- public phone: available on request

LinkedIn and any other manually managed public profile require a final owner review because repository automation cannot edit or verify private account content.

## RW-11: mobile accessibility

Automated browser checks cover focus entry, focus trapping, Escape closure, inert content and console errors. Final completion requires one live-domain screen-reader pass using NVDA, VoiceOver or an equivalent tool.

Minimum manual checks:

1. Announce the menu button name and expanded state.
2. Open the menu and confirm focus enters the panel.
3. Navigate every item in a logical order.
4. Close with Escape and confirm focus returns to the trigger.
5. Confirm background content is not reachable while the menu is open.

## RW-12: CI and production smoke

The `Production Smoke` workflow can now be run manually against any deployed origin with an optional expected commit SHA. Before marking Done:

- run it against `https://reejamaharjan.com.np` after the Cloudflare cutover;
- run Browser Quality against the same origin;
- disconnect or delete both obsolete Vercel Git integrations so duplicate deployment statuses stop appearing on commits.

## RW-13: CSP and external requests

Browser Quality must pass against the corrected production domain. It checks:

- browser console errors;
- failed network requests;
- approved FormSubmit configuration;
- CSP, Referrer-Policy, X-Frame-Options, Permissions-Policy and X-Content-Type-Options.

## RW-14: source and style ownership

The repository now includes source-ownership guards and visual-regression checks. The task can move to Done after the branch CI passes and the visual evidence artifact is produced successfully.

## Release decision

Do not mark a task Done based only on a merged commit. Mark it Done when its acceptance evidence above exists. This keeps the backlog tied to observable behaviour rather than optimistic button-clicking.

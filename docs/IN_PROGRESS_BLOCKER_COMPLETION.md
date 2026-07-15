# Cloudflare production completion and evidence plan

This document defines the final evidence required for the remaining delivery stories. Repository automation now verifies every condition that can be evaluated safely from code. Cloudflare account routing, a real screen-reader review, and owner approval of externally managed professional profiles remain explicit human responsibilities.

## Automated Cloudflare production gate

After a successful `Build Check` on `main`, the `Production Smoke` workflow:

1. checks out the exact commit that triggered the build;
2. waits for `https://reejamaharjan.com.np/build.json` to report that commit;
3. verifies every priority route and approved homepage statement;
4. verifies the approved public professional facts;
5. rejects retired location, availability, CV, and credential-document content;
6. requires retired document routes and an unknown route to return real HTTP 404 responses;
7. verifies `noindex, nofollow` on the 404 page;
8. verifies the Cloudflare security-header contract and no-store build fingerprint;
9. runs the full Playwright browser-quality suite against the live custom domain;
10. uploads a machine-readable smoke report and browser evidence for 30 days.

A merged commit is not production evidence. The production workflow must pass against the custom domain.

## RW-3: Cloudflare production integrity

Repository controls are complete when:

- `main` builds successfully;
- `/build.json` identifies the expected commit and branch;
- all priority routes return successful HTML responses;
- the public homepage contains the approved recruiter journey and facts;
- retired copy and document routes are absent;
- the unknown-route contract returns a real 404.

Account-level completion requires the custom domain to serve the current Cloudflare Pages deployment. When the `pages.dev` deployment and custom domain disagree, inspect Cloudflare Worker routes, legacy Pages domain bindings, redirects, DNS records, and cache rules. These settings cannot be corrected safely from repository code without authenticated Cloudflare account access.

## RW-4: professional facts

The canonical repository source is `src/content/professional-facts.ts`. Automated checks protect the public website values for:

- current role: Research Assistant;
- employer: Institute for Implementation Science and Health (IISH);
- project: MOM-HD maternal health telemonitoring trial;
- location: Biratnagar, Nepal;
- availability: open to discussing suitable future opportunities;
- public phone: available on request.

LinkedIn and other externally managed profiles require final approval by Reeja Maharjan. Automation must not claim access to, modify, or approve private account content on her behalf.

## RW-11: mobile accessibility

Automated browser checks cover focus entry, focus trapping, Escape closure, focus restoration, inert background content, reduced-motion behavior, and browser console errors.

Final completion requires one live-domain screen-reader pass using NVDA, VoiceOver, or an equivalent tool:

1. announce the menu button name and expanded state;
2. open the menu and confirm focus enters the panel;
3. navigate every item in logical order;
4. close with Escape and confirm focus returns to the trigger;
5. confirm background content is unavailable while the menu is open.

Record the assistive technology, browser, operating system, date, and result in the backlog.

## RW-12: CI and production smoke

The automated Cloudflare production gate completes the repository-controlled portion of this story. Mark it Done only when the workflow passes for the expected `main` commit and its evidence artifact is retained.

Obsolete Vercel integrations are outside the Cloudflare delivery path. Their removal is optional account cleanup and must not block Cloudflare production acceptance.

## RW-13: CSP and external requests

The live browser suite verifies:

- browser console errors;
- failed network requests;
- approved FormSubmit configuration;
- CSP;
- Referrer-Policy;
- X-Frame-Options;
- Permissions-Policy;
- X-Content-Type-Options.

Mark the story Done only after the custom-domain run passes.

## RW-14: source and style ownership

Source-ownership guards and visual-regression checks are complete. This story is Done when Build Check, Browser Quality, and Visual Regression pass on the merged implementation. The final successful evidence is retained in GitHub Actions.

## Release decision

The release is technically accepted when Build Check, Browser Quality, Visual Regression, and the Cloudflare production gate all pass for the expected commit. Human-only approvals remain separately tracked and must never be fabricated by automation.

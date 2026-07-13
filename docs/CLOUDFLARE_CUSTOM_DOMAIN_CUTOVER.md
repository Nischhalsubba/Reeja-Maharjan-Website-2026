# Cloudflare custom-domain cutover runbook

## Purpose

Move `reejamaharjan.com.np` from the legacy deployment to the Cloudflare Pages project `reeja-maharjan-website-2026`, while preserving a clear rollback path and collecting evidence for RW-3, RW-11, RW-12 and RW-13.

## Preconditions

- `main` has passed Build Check and Browser Quality.
- The current production SHA is recorded.
- The latest Cloudflare Pages preview for that SHA loads successfully.
- A maintainer has access to the Cloudflare account that owns the `reejamaharjan.com.np` zone and Pages project.
- No content or DNS changes are made outside the maintenance window.

## Current known state

- Cloudflare Pages builds the repository successfully.
- Pages previews serve the current recruiter-focused site.
- `reejamaharjan.com.np` still serves the retired portfolio.
- Repository diagnostics, production smoke tests and deployed-origin browser checks are already available.

## 1. Capture the rollback state

Before changing anything, record screenshots or exported values for:

- DNS records for `@` and `www`.
- Pages project custom domains.
- Every Worker under **Workers & Pages > Settings > Domains & Routes** that references:
  - `reejamaharjan.com.np`
  - `reejamaharjan.com.np/*`
  - `*.reejamaharjan.com.np/*`
- Redirect Rules, Origin Rules and Bulk Redirects affecting the hostname.
- The legacy destination currently serving the domain.

Do not delete the rollback evidence.

## 2. Remove conflicting Worker routing

A Worker route on the same hostname can intercept requests before the Pages deployment. Inspect every Worker in the account.

For each matching route or Worker custom domain:

1. Open **Workers & Pages**.
2. Select the Worker.
3. Open **Settings > Domains & Routes**.
4. Remove or disable only the route/custom domain that targets `reejamaharjan.com.np` or its wildcard paths.
5. Preserve unrelated routes.

Stop and investigate if a route is intentionally providing authentication, redirects, analytics or another required function.

## 3. Remove the domain from any legacy Pages project

If the hostname appears under another Pages project:

1. Open that legacy Pages project.
2. Open **Custom domains**.
3. Remove `reejamaharjan.com.np` and `www.reejamaharjan.com.np` from the legacy project.
4. Confirm the old project remains reachable through its `pages.dev` hostname for rollback.

Cloudflare documents custom-domain removal as a DNS-record removal followed by removing the domain from the Pages project. Do not leave duplicate project associations.

## 4. Attach the domain to the correct Pages project

1. Open **Workers & Pages**.
2. Select `reeja-maharjan-website-2026`.
3. Open **Custom domains**.
4. Select **Set up a domain**.
5. Add `reejamaharjan.com.np`.
6. Add `www.reejamaharjan.com.np` only if the project will serve it directly.
7. Allow Cloudflare to create or validate the required DNS record.
8. Wait until the custom-domain status is **Active** and the certificate is issued.

Do not create a CNAME manually without first associating the hostname through the Pages custom-domain flow. Cloudflare warns that doing so can produce a 522 response.

## 5. Confirm DNS and redirect policy

- Apex traffic must resolve through the Cloudflare zone attached to the correct Pages project.
- `www` must either be attached to Pages or redirect once to the canonical apex domain.
- Remove stale A, AAAA or CNAME records that still target the legacy origin, but only after the rollback values are recorded.
- Confirm there is no redirect loop between apex and `www`.

## 6. Purge stale cache only when needed

First purge the affected URLs or hostname. Use **Purge Everything** only when targeted purging does not remove the retired response. A complete purge clears cached resources across Cloudflare data centers and can increase origin traffic.

Recommended verification URLs:

- `https://reejamaharjan.com.np/`
- `https://reejamaharjan.com.np/build.json`
- `https://reejamaharjan.com.np/cv/`
- `https://reejamaharjan.com.np/resume.pdf`

## 7. Required acceptance checks

The cutover is accepted only when all checks pass.

### Deployment identity

- `/build.json` reports the expected `main` commit.
- Homepage contains `Clinical care with research discipline.`
- Homepage contains `Discuss an opportunity` and `View CV`.
- Retired copy such as `Download CV`, Lalitpur and immediate availability is absent.

### Privacy and retired assets

- `/resume.pdf` is not publicly available.
- Retired credential-image paths are not publicly available.
- No street-level address, private phone number or full licence number is exposed.

### Accessibility

- At 320px, opening the navigation moves focus to the close control.
- Tab and Shift+Tab remain inside the menu.
- Escape closes the menu and restores focus to the trigger.
- Main content and footer are inert while the menu is open.
- Reduced-motion mode has no meaningful transition delay.
- Complete one NVDA or equivalent screen-reader pass.

### Security and browser behavior

- No browser-console errors during homepage, CV and opportunity flows.
- No failed or CSP-blocked approved requests.
- Security headers include CSP, `nosniff`, restrictive referrer policy, frame denial and permissions policy.
- FormSubmit is the only approved external form destination.

## 8. Automated verification

After the hostname becomes active:

1. Run the **Production Smoke** workflow against `main`.
2. Run **Browser Quality** manually with origin:
   `https://reejamaharjan.com.np`
3. Run **Production Diagnostics** and retain its JSON artifact.
4. Record workflow URLs, the deployed SHA and completion time in Notion.

## 9. Rollback

Rollback only when the correct Pages project cannot serve the domain and the failure is user-visible.

1. Restore the recorded DNS values or legacy project domain association.
2. Restore only the Worker route that was confirmed to be part of the old delivery path.
3. Wait for the legacy hostname to become active.
4. Verify the rollback response.
5. Document the reason, timestamps and failed acceptance check.

Never roll back application code merely to compensate for an incorrect domain binding.

## 10. Post-cutover cleanup

- Remove the obsolete Vercel project or disconnect its GitHub integration so failed Vercel deployment statuses stop appearing on pull requests.
- Keep Cloudflare Pages as the only production deployment integration.
- Mark RW-3 complete only after the custom domain serves the expected SHA.
- Mark RW-11 complete after live keyboard and screen-reader checks.
- Mark RW-12 complete after production smoke and deployed-origin browser checks pass.
- Mark RW-13 complete after the live CSP/header and core-flow network checks pass.

## Official references

- Cloudflare Pages custom domains: `https://developers.cloudflare.com/pages/configuration/custom-domains/`
- Cloudflare Workers routes: `https://developers.cloudflare.com/workers/configuration/routing/routes/`
- Cloudflare DNS record management: `https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/`
- Cloudflare cache purge: `https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/`

# Final acceptance evidence

This record closes the remaining delivery stories only when each section contains real evidence. Automated systems must not fabricate human approval or claim Cloudflare account changes they did not perform.

## RW-3: Cloudflare production integrity

Required evidence:

- Cloudflare Account Audit workflow result: pending
- Custom domain: `reejamaharjan.com.np`
- Expected Pages project: `reeja-maharjan-website-2026`
- Expected production branch: `main`
- `/build.json` commit: pending
- Production Smoke workflow result: pending

## RW-4: professional facts approval

Canonical source: `src/content/professional-facts.ts`

Owner approval must be recorded by Reeja Maharjan:

- Approver: pending
- Approval date: pending
- LinkedIn reviewed: pending
- Public contact/profile links reviewed: pending
- Result: pending

## RW-11: live screen-reader review

Automated browser coverage is enforced in `tests/browser/mobile-navigation.spec.mjs`. A human review remains required:

- Assistive technology: pending
- Browser and version: pending
- Operating system: pending
- Review date: pending
- Menu name and expanded state announced: pending
- Focus enters dialog: pending
- Navigation order is logical: pending
- Escape closes and restores focus: pending
- Background content is unavailable while open: pending
- Result: pending

## RW-12: production smoke and browser quality

- Production Smoke workflow run: pending
- Expected commit: pending
- Browser Quality against custom domain: pending
- Evidence artifact: pending

## RW-13: CSP and external requests

- CSP verified on custom domain: pending
- Referrer-Policy verified: pending
- X-Frame-Options verified: pending
- Permissions-Policy verified: pending
- X-Content-Type-Options verified: pending
- Browser console errors: pending
- Failed external requests: pending
- Result: pending

## Closure rule

A story moves to Done only after its corresponding evidence is recorded. A passing repository build proves implementation quality; it does not substitute for account-level routing, human assistive-technology testing, or owner approval.

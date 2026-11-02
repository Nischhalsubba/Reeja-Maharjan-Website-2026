# Priority 1 — secure contact and regulated content acceptance

Status: **implementation staged; secret-dependent activation and independent evidence remain outstanding**. This document is an operational checklist, not a clinical or regulatory approval.

## Secure contact integration

An optional same-origin POST endpoint lives at repository-root `functions/api/contact.js`, with its Astro form in `site/src/components/ProfessionalContactForm.astro`. The site defaults to the existing FormSubmit AJAX contact path unless the build-time `PUBLIC_TURNSTILE_SITE_KEY` is set. No secret is required by or embedded in the static build.

The protected endpoint does all of the following before contacting the email provider:

- Requires the correct same-origin POST and JSON body with a bounded payload.
- Validates name, email, and message; rejects honeypot submissions.
- Calls Cloudflare Siteverify using the **secret on the server**.
- Requires `success=true`, the production hostname `reejamaharjan.com.np`, and Turnstile action `professional_contact`. Expired, duplicated, forged or missing tokens fail closed.
- Sends only to an allowlisted server-configured mailbox through the Resend API.
- Treats a provider-generated message ID as **accepted for delivery**, not proof of inbox receipt.
- Never logs the sender's private message or API keys.
- Returns an error with a direct-email fallback if the provider, validation, or secret configuration fails.

## Owner-controlled production activation

This needs the account owner. Do not commit or paste private secrets into the repository, issues, ChatGPT, or client code.

1. In Cloudflare Turnstile, create a widget for `reejamaharjan.com.np` and restrict the allowed hostname. Keep its **sitekey** and **secret** separate. Use an appropriate non-production widget for previews.
2. In Resend, verify an authorized sending domain and sender address. Create a least-privileged sending API key. The receiving address must be Reeja's approved professional inbox.
3. In the Cloudflare Pages project for this repository, under **Settings → Variables and Secrets**, set:
   - Build-time public variable `PUBLIC_TURNSTILE_SITE_KEY`: public Cloudflare sitekey.
   - Encrypted runtime secret `TURNSTILE_SECRET_KEY`: Cloudflare private verification secret.
   - Encrypted runtime secret `RESEND_API_KEY`: mail provider API key.
   - Runtime `CONTACT_FROM_EMAIL`: verified sending address.
   - Runtime `CONTACT_TO_EMAIL`: approved receiving inbox.
4. Verify the project root is the repository root so Pages detects `/functions/api/contact.js`. Rebuild/deploy after all bindings are configured; a new build must embed the public sitekey.
5. Configure Cloudflare WAF endpoint-specific rate limits on `POST /api/contact` (limits and exceptions require review of real traffic). Turnstile alone is not an absolute abuse safeguard.
6. Confirm the `/contact/` page renders the Turnstile challenge, posts to `/api/contact`, keeps data on provider failure, and shows accessible status messages. Test valid, expired, replayed and invalid challenge tokens.
7. With Reeja's explicit authorization, perform one controlled, nonsensitive test submission and confirm the exact message arrives in the destination inbox. Record date, sender, provider message ID, mailbox receipt, headers and any spam-folder behavior **privately**. Do not publish inquiry contents.
8. Disable or decommission the old FormSubmit form address where feasible, otherwise direct requests to its public endpoint may bypass the new site form protection. Confirm its activation/verification state and review any forwarding settings.
9. Repeat GitHub Build Check, Browser Quality and exact-commit Production Smoke, check CSP and direct email fallback. Mark `RW-SEC-01` complete only after delivery and abuse-prevention proof.

### Operational warning

If the sitekey is configured without all runtime bindings, the secure handler returns HTTP 503 and visitors need the mailto fallback. Configure and test the full pair before production activation. A passing unit test or a Resend provider response alone does not verify delivery to Reeja.

## Credential and trust requirements

- **Texas RN**: source expiry 2026-10-31, renewal not verified. Keep neutral public wording. Reeja should obtain a current report using the [Texas Board of Nursing](https://nursing.texas.gov/licensure_verification.asp) or [Nursys QuickConfirm](https://www.nursys.com/LQC/LQCTerms.aspx). The reviewer must match identity and jurisdiction; do not guess status from name search or public snapshots. Keep private identifiers out of public GitHub.
- **Nepal RN and B.Sc.**: owner-reviewed professional evidence and credential consistency must be confirmed. Existing repo validators check consistency, not regulator authenticity.
- **IISH MOM-HD**: current contract recorded through 2026-11-30. Reconfirm role/contract status with owner before that date, and never invent clinical outcomes or participant-level information.
- **Public links/CV**: Reeja should approve public credentials, dates, contact details, LinkedIn and CV wording. Record approver, approval date, evidence location, and any corrections in a private or appropriately access-controlled system.

## All 17 healthcare articles

Automated source, metadata, dates, and cross-link integrity checks are **passing** for 17 articles. **None has an authenticated clinical-review signature in the current evidence.** Do not label all articles medically verified from software checks.

Priority manual review: postpartum haemorrhage, pre-eclampsia, postpartum infection, gestational diabetes, maternal/newborn red flags, and HPV vaccination. These contain potentially time-sensitive clinical or public-health facts. The remaining articles also need review of accuracy, professional scope, and changing links.

For each of the 17 rows in `site/docs/seo/ACCEPTANCE_2026-11-02.md`, obtain reviewer name and clinical qualification, date, precise claims checked, reference source/version/date, correction or approval decision, and next review-due date. Avoid inventing sign-off or changing source `updatedAt` unless material content actually changes.

### Official source cross-checks obtained November 2, 2026

| Topic | Confirmed official background source | Scope of this check |
|---|---|---|
| PPH | [WHO 2025 consolidated recommendations](https://www.who.int/publications/i/item/9789240115637) and [WHO February 2026 implementation guide](https://www.who.int/publications/i/item/9789240116115/) | Publication existence and subject verified; not a complete dose/threshold review |
| Pre-eclampsia | [WHO October 2026 global roadmap](https://www.who.int/publications/i/item/9789240125483) and [WHO October 2026 fact sheet](https://www.who.int/news-room/fact-sheets/detail/pre-eclampsia) | Publication existence and scope verified; not individual treatment approval |
| Gestational diabetes | [WHO November 2025 guideline](https://www.who.int/publications/i/item/9789240117044) | Publication exists; individual clinical recommendations need reviewer assessment |
| Nepal HPV | [UNICEF Nepal February 2026 story](https://www.unicef.org/nepal/stories/protecting-girls-against-cancer) | UNICEF reports campaign coverage of 94%, reaching approximately 1.46 million girls; changing national schedule must be independently confirmed |

Do not infer that all remaining article references have been checked, that WHO guidelines are equivalent to Nepal facility protocols, or that the author's clinical practice has been approved by a regulator.

## Acceptance

Engineering implementation and unit tests are not clinical/editorial approval. This workstream remains **PARTIAL / BLOCKED ON OWNER-CONTROLLED EVIDENCE** until: live inbox receipt, active server-side Turnstile and email provider configuration, verified regulator status, public-facts owner approval, and qualified clinical review for all 17 articles.

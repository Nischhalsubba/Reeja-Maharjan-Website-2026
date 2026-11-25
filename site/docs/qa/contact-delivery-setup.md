# Website email delivery setup

All contact and call forms POST JSON to the same-origin Cloudflare Pages Function `/api/contact`. FormSubmit is not used. Resend accepts plain-text messages addressed to Reeja's mailbox and sets Reply-To to the visitor. Turnstile is verified server-side before any message is dispatched. An unconfigured service fails closed with a direct email alternative.

## One-time production configuration

1. In Resend, verify a sending subdomain (e.g. `mail.reejamaharjan.com.np`) using the exact DNS records shown in its dashboard. Do not change existing inbound MX records for the root domain. Create a sending-only API key limited to that verified domain.
2. In Cloudflare Turnstile, create a managed widget limited to `reejamaharjan.com.np`.
3. In the existing Cloudflare Pages project, configure the following production build/runtime variables. Enter secrets into encrypted dashboard fields, not Git, source files, or chat.

| Name | Value |
| --- | --- |
| `PUBLIC_TURNSTILE_SITE_KEY` | Public widget site key, build-time |
| `TURNSTILE_SECRET_KEY` | Encrypted widget secret, runtime |
| `RESEND_API_KEY` | Encrypted sending-only key, runtime |
| `CONTACT_FROM_EMAIL` | Sender on verified Resend domain, e.g. `Reeja website <forms@mail.reejamaharjan.com.np>` |
| `CONTACT_TO_EMAIL` | `maharjanreeja88@gmail.com` |

4. Redeploy `main` after saving the variables. Both supported Pages root layouts have a contact function entry point. Confirm that GET `/api/contact` responds 405 JSON, not a static 404 page.
5. Submit a clearly marked synthetic enquiry through the deployed contact page, a footer and the call-request form. Confirm the progress label, same-page success, Resend acceptance/delivery log and actual Gmail inbox receipt. Check spam if needed. Do not claim live delivery verified without this step.

Resend's idempotency key prevents duplicate sends during a retry of the same request. Provider acceptance does not guarantee inbox placement or perfect uptime. No real patient information belongs in these forms.

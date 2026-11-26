# Website email delivery setup — FormSubmit

The live enquiry and call-request forms use FormSubmit, as requested. No Cloudflare login, Resend API key or Turnstile configuration is required for this frontend workflow. The dormant server-side Resend function is not called by the forms.

- Standard HTML POST is the no-JavaScript fallback; the normal interactive flow uses FormSubmit's AJAX endpoint with URL-encoded data and a basic email template.
- All forms route to Reeja's existing professional Gmail address. The email includes the visitor's details and message or preferred Nepal-time appointment.
- Submissions show Sending… while pending. Positive provider JSON is required before success is shown. On timeouts or rejection, values remain in the form and a direct-email link is populated with the completed message.
- No automatic retries after an ambiguous outcome: this avoids sending duplicate enquiries. FormSubmit service availability and inbox delivery are outside the site's control.
- If FormSubmit requests activation, the recipient must complete the activation email. Verify actual receipt after deployment, not merely provider acceptance.
- Do not submit real patient information through professional contact forms.

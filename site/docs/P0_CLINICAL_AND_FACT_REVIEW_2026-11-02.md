# P0 clinical and professional-facts sign-off register
Date: 2026-11-02

## Scope and evidence standard

This is a work queue, **not** a medical, legal, or regulatory approval. The 17 website articles have passed automated metadata, source-URL syntax and internal-reference checks; those checks cannot establish clinical accuracy. No article below has a documented qualified-clinician sign-off. Do not set `reviewed` or claim licensed practice based on automation.

For each article, a qualified reviewer must record: full name and qualification; date; local Nepal practice scope/protocol where applicable; reviewed version/commit; source URL and edition/access date; high-stakes claims and any corrections; final disposition (approve, revise, hold); and next review date. Store signed evidence privately; only a non-sensitive completion summary belongs in GitHub.

## Clinical article queue (17)

| Priority | Slug | Review focus | Clinical sign-off |
|---|---|---|---|
| P0-A | `postpartum-haemorrhage-2026-nursing-recognition-response` | PPH recognition, quantitative thresholds, MOTIVE, urgency; reconcile with 2025 WHO/FIGO/ICM consolidated recommendations and facility protocol | Pending |
| P0-A | `pre-eclampsia-pregnancy-warning-signs-monitoring-2026` | Emergency warning signs, home BP monitoring, urgent referral; distinguish 2026 WHO *roadmap* from clinical treatment guideline | Pending |
| P0-A | `postpartum-infection-warning-signs-nursing-guide-2026` | Temperature guidance, infection/sepsis red flags, timing, urgent referral | Pending |
| P0-A | `gestational-diabetes-in-pregnancy-2026-monitoring-care` | GDM versus pre-existing diabetes, diagnosis, home monitoring, hypoglycaemia red flags, postpartum follow-up | Pending |
| P0-A | `essential-maternal-newborn-care-guide-2026` | Maternal and newborn danger signs, feeding, infection, escalation | Pending |
| P0-A | `hpv-vaccine-nepal-2026-cervical-cancer-prevention` | Distinguish February 2025 campaign eligibility from current 2026 routine vaccination policy | Pending |
| P0-B | `kangaroo-mother-care-who-2025-guide-parents-nurses` | KMC start, clinical stability, positioning, respiration and feeding safety, discharge decisions | Pending |
| P0-B | `top-10-postpartum-counselling-tips-new-nurses` | Home advice, maternal mental health, urgency, medication or treatment scope | Pending |
| P0-B | `mental-health-maternal-care-supporting-mothers-beyond-delivery` | Suicide risk, postpartum psychosis, red flags, escalation, confidentiality | Pending |
| P0-B | `comprehensive-newborn-care-level-ii-what-nurses-learn` | Neonatal care boundaries, newborn deterioration, clinical training claims | Pending |
| P0-B | `general-care-nursing-common-challenges` | Clinical scope, medication safety and handover examples | Pending |
| P0-B | `mastering-nursing-documentation-sbar-handover` | SBAR documentation, confidentiality, professional scope | Pending |
| P0-B | `safeguarding-confidentiality-healthcare-nurses-protect-patient-rights` | Nepal privacy law, clinical records and research participant confidentiality | Pending |
| P0-B | `navigating-nurse-licensure-continuing-education-nepal` | Current NNC licensing and renewal process; distinguish Nepal from Texas rules | Pending |
| P0-B | `nursing-careers-2026-who-workforce-report-nepal` | WHO 2025 workforce figures and Nepal-specific interpretation | Pending |
| P0-B | `future-of-nursing-in-nepal-telehealth-community-care-post-covid` | Telemonitoring limitations, referral, current Nepal practice assumptions | Pending |
| P0-B | `from-nursing-student-to-registered-nurse-my-journey` | Historical employment and license details; confirm with owner; not a clinical treatment guide | Pending |

## Initial official-source spot-checks — not clinical sign-off

As of November 2, 2026, official sources provide evidence for the listed **publications or specific background data**, but do not validate every clinical claim in the article:

- PPH: WHO/FIGO/ICM consolidated recommendations published October 5, 2025, [official guideline](https://www.who.int/publications/i/item/9789240115637), and [February 22, 2026 implementation guide](https://www.who.int/publications/i/item/9789240116115/).
- Hypertensive disorders: WHO [global roadmap published October 7, 2026](https://www.who.int/publications/i/item/9789240125483). This is a health-system roadmap, not a substitute for a locally approved emergency obstetric protocol.
- Diabetes in pregnancy: WHO [2025 guidance](https://www.who.int/publications/i/item/9789240117044); check actual recommendations against the relevant article, not merely URL validity.
- KMC: WHO [2025 clinical practice guide](https://www.who.int/publications/i/item/9789240115910).
- HPV: [UNICEF Nepal report (February 25, 2026)](https://www.unicef.org/nepal/stories/protecting-girls-against-cancer) reports 94% campaign coverage and 1.46 million girls reached in 2025. It does **not** establish one individual's present eligibility under all 2026 local programmes.

No clinical dose, treatment threshold, or personal-care advice has been approved by this spot-check.

## Owner-specific professional facts / identity checklist

| Claim or record | Current public state | Evidence required | Approval |
|---|---|---|---|
| Texas single-state RN | Historical issue and expiration 2026-10-31; **renewal unverified**; avoid active-status claim | Verified official status report through Texas BON or [Nursys QuickConfirm](https://www.nursys.com/LQC/LQCTerms.aspx), with identity matched in private | Pending |
| Nepal Nursing Council registration | Shown on portfolio; no independent fresh verification from a regulator in this execution | NNC registration validation and owner's consent | Pending |
| B.Sc. Nursing | Shown on portfolio | Owner review of academic credentials/identity | Pending |
| IISH MOM-HD Research Assistant | Current-role narrative; recorded contract through 2026-11-30 | Reeja's confirmation of role, project scope and contract dates | Pending |
| Public email, LinkedIn and CV | Published in source; owner approval record not current | Reeja's review of links, role dates, contact permissions and privacy | Pending |
| Research integrity | No participant-level disclosure authorized | Owner confirms no identifiers, confidential participant data or unpublished research outcomes appear | Pending |

**Important:** The last historical evidence dates in source are 2026-07-12. Updating those dates without actual rechecking would be misleading. A new `checkedAt` must only be recorded after documented evidence review.

## Final P0 release gate

- [ ] Secure form has active server-side Turnstile and email provider bindings.
- [ ] Cloudflare WAF abuse rate limit configured and verified.
- [ ] Real non-sensitive test email is authorized by Reeja and verified in her inbox. No patient details.
- [ ] FormSubmit legacy route is disabled or a documented bypass/risk decision approved.
- [ ] Texas RN and Nepal nursing credentials rechecked where current status is claimed.
- [ ] Reeja reviews and approves professional facts and link destinations.
- [ ] All 17 articles receive signed qualified review, with publication of necessary corrections.
- [ ] Current `main` receives Build, Browser, Visual, Dependency Security and exact-SHA Production Smoke PASS.

Until those checks are documented, status remains **P0 PARTIAL: source improvements and preliminary verification, not full acceptance**.

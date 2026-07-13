# Editorial governance

## Purpose

The website publishes nurse-led educational content grounded in documented hospital, maternal-health research, patient-education, telemonitoring, documentation, and care-coordination experience. It does not present generic summaries as clinical review or personal medical advice.

## Required article record

Every article must have:

- a primary audience and user need
- one original nurse-led practice lens, checklist, example, or teaching point
- a publication date and material-update date
- a source-access date and review-due date
- visible author identity and qualification
- a medical safety limitation where health decisions are discussed
- a correction contact
- related internal links that support a real topic journey

## Clinical review

"Clinically reviewed" may appear only when a named reviewer, qualification, role, and review date are recorded. An update date alone is never described as clinical review.

## Review cycle

Content is checked at least every 12 months and sooner when guidance, source material, emergency advice, professional facts, or linked services materially change. CI fails when the shared review-due date has expired.

## Publication workflow

1. Define the audience and the decision or task the article supports.
2. Draft original examples, counselling language, checklists, or practice observations.
3. Verify sources and record the access date.
4. Confirm the safety note and escalation language.
5. Add related links based on the reader journey, not repeated keywords.
6. Run `npm run verify` before merge.
7. Publish through a pull request after the production build passes.

## Content roadmap

Priority topics:

1. Teaching home blood-pressure monitoring in pregnancy and common measurement mistakes.
2. Explaining blood-glucose monitoring to pregnant patients and families.
3. Maternal and general-ward SBAR handover examples.
4. What maternal tele-follow-up can and cannot safely do.
5. Nepali-language pregnancy warning signs and urgent escalation.
6. Patient and family counselling using teach-back.
7. Nepal-focused nursing licensure and continuing-education workflows.

Publication is deliberately paced. Articles should reflect real review dates and original practice value rather than batch volume, artificial year-stamping, or unsupported superlatives.

## Ownership

Reeja Maharjan owns article accuracy and updates. Corrections are received through the professional email stored in `professional-facts.ts`. Engineering owns the automated metadata and expiry checks.

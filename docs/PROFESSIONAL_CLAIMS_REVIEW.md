# Clinical portfolio professional-facts review

> Status: contributor review checklist, not a claim that the product has passed an audit. This document introduces review expectations; it does not change application behavior.

## Why this exists

Ensure a nurse's professional portfolio presents verifiable experience and research responsibilities without patient details or misleading clinical advice.

## Review rules

1. Review employer, title, dates, qualification, certification and project role against source records. Distinguish current from previous positions and authored work from team contributions.
2. Avoid implying clinical licensure, specialist certification, publication, protocol authorship or outcome validation without corresponding evidence and appropriate permission.
3. Do not publish identifiable patient, participant or study data in case studies, screenshots, downloads, source maps or image metadata.
4. Clearly distinguish professional experience from healthcare guidance. Educational content should identify reference date, qualified reviewer and uncertainty; emergency advice belongs to local clinical services.
5. Confirm image ownership/consent; check accessibility of diagrams, headings, forms and contact routes on mobile and keyboard navigation.

## Verification

From `site/` run `npm run verify:facts`, `npm run verify:editorial`, `npm run verify:a11y`, `npm run check`, and `npm run build`. A successful script run does not validate a person's credentials or participant consent: check these with the owner offline.

## Required evidence in a change request

PR: changed claims and URLs, source record type (without publishing private documents), approval of identifiable imagery, reviewer and date, executed commands, manual browser/metadata checks and residual risks.

## Rollback and incident response

Remove or qualify unsupported assertions immediately; purge affected public assets and caches if sensitive material was published, and preserve an incident record without personal data.

## Acceptance criteria

- [ ] The change addresses a stated user or maintainer risk.
- [ ] Evidence and source-of-truth references are attached or explicitly marked unavailable.
- [ ] Relevant automated checks are reported with actual outcomes; unrun checks are not marked passing.
- [ ] Negative, failure and recovery states are accounted for.
- [ ] A reviewer can understand what changed, remaining risk and how to revert it.

Document owner: repository maintainers. Review this checklist when workflows, dependencies or public claims materially change.

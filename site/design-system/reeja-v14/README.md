# Reeja Cinematic Nursing v14

## Single stylesheet contract

`src/styles/reeja-cinematic.css` is the sole global stylesheet imported by `src/layouts/BaseLayout.astro`. All prior stylesheet imports were consolidated into this canonical file, then the superseded stylesheet files were deleted. Do not reintroduce versioned CSS imports or route-specific global cascades.

## Visual direction

- Primary accent: #D5A82F. The earlier v13 yellow token remains only as a legacy component compatibility alias until all consumers are explicitly migrated.

- Warm clinical editorial palette: pale cream, deep warm charcoal, muted stone and a restrained ochre accent.
- Public Sans for readable UI and body copy, with the existing editorial display treatment retained from the approved cinematic direction.
- Spacious layouts, clear content measure and consistent section rhythm.
- Nursing and research imagery must be real editorial photography or approved photographs. Never present stock imagery as Reeja or as her patients.

## Motion contract

- GSAP + ScrollTrigger is used for meaningful scroll reveals and controlled parallax.
- Existing hero video scrubbing remains on the homepage.
- Hover, focus, active and pressed states are available across navigation, buttons, links and cards.
- Motion must not hide content from users who prefer reduced motion.
- Animate transforms and opacity; avoid scroll handlers that continuously force layout.

## Accessibility

- Semantic landmarks, visible focus rings and descriptive link labels.
- Touch targets should remain comfortably operable.
- Reduced-motion preference disables non-essential animation.
- Search controls announce result counts using an aria-live region.

## SEO and editorial rules

- One canonical URL per indexable page, unique title and description, one primary H1.
- Person and ProfilePage schema must reflect visible, confirmed professional information.
- BlogPosting and BreadcrumbList schema must reflect actual article content.
- Articles identify their author, publication/update dates, sources, editorial governance and medical disclaimer.
- No keyword stuffing, fabricated patient stories, invented credentials, unsupported outcomes or unverified regulatory claims.
- NNC status is recorded as confirmed by Reeja on 24 November 2026; it is not represented as an independent database verification.
- Texas RN renewal remains unverified and must not be described as active.

## Editorial cadence

The intended cadence is two evidence-based articles per week. The cadence is an editorial target, not an automated promise to publish without human review. Medical content must be reviewed before publication and rechecked on its stated review date.

## Verification

Run from site/: `npm run verify:design-system`, `npm run verify:editorial`, `npm run check`, `npm run lint`, `npm run build`, and `npm run verify`.

The build and browser workflows remain the release gate. Do not merge or deploy on the basis of source inspection alone.

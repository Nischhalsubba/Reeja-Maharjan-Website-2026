# Zero-Base Redesign V2

## Status

Implemented on `main` as a global visual reset layer.

## Reason for reset

The prior clinical-editorial direction was rejected by the stakeholder. The new direction starts from a brighter, more spacious, contemporary portfolio system while preserving the professional facts, route structure, content governance, accessibility contracts, and privacy rules.

## New visual thesis

A bright, modern nursing portfolio with calm medical credibility, recruiter clarity, and warmer human presence.

## Primary implementation files

- `src/styles/zero-redesign.css` owns the V2 visual reset layer.
- `src/layouts/BaseLayout.astro` imports the V2 layer and scopes it through `body.zero-redesign`.
- Existing route files remain content-stable and continue to consume the same professional content modules.

## What changed visually

- Replaced document-dossier density with an airy modern portfolio feel.
- Replaced muted clinical green dominance with teal, soft aqua, and restrained coral signal accents.
- Replaced rectangular-only controls with pill-shaped recruiter actions.
- Added a floating glass header treatment.
- Added softer rounded cards, elevated panels, and modern hero gradients.
- Kept evidence cards, CV structure, blog reading aids, contact states, and privacy warnings.

## What did not change

- No professional facts were rewritten.
- No credential claims were added.
- No sensitive documents were exposed.
- No new third-party visual dependencies were added.
- No Three.js or heavy decorative dependency was added.
- Mobile navigation accessibility contracts remain intact.
- Reduced-motion behaviour remains required.

## Accessibility commitments

- The existing skip link, focus ring, modal mobile navigation, reduced-motion handling, form status roles, and privacy-safe contact flow remain part of the release contract.
- V2 uses high-contrast ink, accent, and white surfaces to keep text legible.
- The design still requires live browser verification at 375px, 768px, 1024px, and 1440px before final release sign-off.

## Build and deployment note

The design is implemented in code, but a successful build and deployment still require either a visible GitHub Actions Build Check, Cloudflare Pages deployment evidence, or a local `npm run verify` execution in an environment that can install dependencies.

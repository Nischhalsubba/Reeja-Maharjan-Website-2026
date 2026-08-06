# Accessibility and Responsive QA Report

## Scope

This report covers the redesign work committed to `main` for the professional nursing portfolio. It records the intended accessibility and responsive acceptance checks for the shared shell, homepage, CV, supporting pages, blog pages, and contact flow.

## Accessibility contracts preserved in code

- A skip link remains available before the header.
- The mobile navigation remains a dialog with `aria-modal="true"`, `aria-labelledby="mobile-nav-title"`, and a trigger with `aria-haspopup="dialog"`.
- The mobile navigation focus flow remains handled by `src/lib/mobileNavA11y.ts`: focus enters the panel, wraps inside it, closes on Escape, restores to the trigger, and makes the page behind inert.
- Reduced-motion handling remains in global CSS and GSAP reveal logic.
- Contact form statuses use `role="status"` for loading/success and `role="alert"` for error.
- The contact submit button exposes `aria-busy="true"` while a submission is in progress.
- Blog article pages include semantic article, header, aside, navigation, sections, sources, safety note, and JSON-LD.
- CV print CSS removes navigation and preserves document structure.

## Manual responsive checkpoints

Required viewport widths from the brief:

| Width | Expected result | Status |
|---:|---|---|
| 375px | Single-column layout, full-width touch targets, no horizontal overflow | Ready for live browser verification |
| 768px | Tablet layouts collapse without crowding; mobile nav available when needed | Ready for live browser verification |
| 1024px | Two-column reading layouts and sticky article TOC remain usable | Ready for live browser verification |
| 1440px | Editorial grid holds line length and alignment rails | Ready for live browser verification |

## Page-specific checks

| Area | Acceptance criteria | Code evidence |
|---|---|---|
| Header | Sticky header, accessible desktop and mobile navigation, visible focus | `src/components/Header.astro`, `src/styles/shell.css`, `src/lib/mobileNavA11y.ts` |
| Homepage | Recruiter journey remains readable without motion | `src/styles/home-recruiter.css`, `src/lib/motion.ts` |
| CV | Screen and print hierarchy complete; no private documents exposed | `src/pages/cv.astro`, `src/styles/cv.css` |
| Blog index | Topic browsing and article cards work without hover dependency | `src/pages/blog/index.astro`, `src/styles/blog.css` |
| Blog article | TOC, key points, FAQ, sources, safety note, author block and related links are semantic | `src/pages/blog/[slug].astro`, `src/styles/blog.css` |
| Contact | Validation, loading, success, error, email fallback and privacy warning visible | `src/components/ContactSection.astro`, `src/styles/contact-flow.css` |

## Current limitation

This runtime cannot install dependencies or run a browser against the built Astro site because DNS resolution for `github.com` is unavailable. The code contracts are recorded here, but final proof still requires the repository Build Check or an equivalent live browser QA run. Charming that networking is still the villain in a web project.

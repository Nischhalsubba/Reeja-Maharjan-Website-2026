# Reeja Maharjan Website 2026

> A static, SEO-focused professional nurse portfolio for **Reeja Maharjan**, built with Astro, React, Tailwind CSS, TypeScript, structured content, motion libraries, and a privacy-conscious document gallery.

[![Astro](https://img.shields.io/badge/Astro-5.x-FF5D01?style=for-the-badge&logo=astro&logoColor=white)](https://astro.build/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=111111)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.x-38BDF8?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Static Site](https://img.shields.io/badge/Output-Static%20Site-111827?style=for-the-badge)](#deployment)

---

## Table of Contents

- [Overview](#overview)
- [Purpose](#purpose)
- [Designer's Perspective](#designers-perspective)
- [Codebase Summary](#codebase-summary)
- [Tech Stack](#tech-stack)
- [Site Architecture](#site-architecture)
- [Content Model](#content-model)
- [Document Gallery Policy](#document-gallery-policy)
- [SEO System](#seo-system)
- [Motion and Interaction Direction](#motion-and-interaction-direction)
- [Accessibility Direction](#accessibility-direction)
- [Privacy Notes](#privacy-notes)
- [Local Development](#local-development)
- [Available Scripts](#available-scripts)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Quality Checklist](#quality-checklist)
- [Future Improvements](#future-improvements)
- [Maintainer Notes](#maintainer-notes)

---

## Overview

**Reeja Maharjan Website 2026** is a professional portfolio website for Reeja Maharjan, designed around her identity as a registered nurse with experience in maternal and newborn care, general ward nursing, clinical documentation, patient education, infection prevention, OT readiness, and public-health-adjacent nursing work.

The project is built as a static Astro website. It uses a content-driven structure so professional information can be managed in a central source rather than being scattered across many page files. This makes the project easier to maintain, safer to audit, and better prepared for SEO-focused landing pages.

From a design perspective, this site is not meant to feel like a flashy creative portfolio. It is meant to feel calm, trustworthy, professional, readable, and respectful of healthcare context. The visual direction should support credibility first: clear hierarchy, calm spacing, readable typography, structured timelines, careful document presentation, and privacy-aware content decisions.

---

## Purpose

The website serves several practical goals:

1. Present Reeja Maharjan's professional nursing profile online.
2. Make her clinical experience easy to scan for hospitals, clinics, NGOs, INGOs, research teams, or healthcare recruiters.
3. Provide a structured document gallery for relevant professional records.
4. Support search visibility for nursing-related keywords in Nepal.
5. Maintain a privacy-safe public profile by avoiding unnecessary exposure of sensitive identity information.
6. Offer a static, low-maintenance deployment workflow suitable for Cloudflare Pages.

The website is built with a professional portfolio mindset, but the audience is healthcare-focused. This means the experience should feel credible, simple, and human.

---

## Designer's Perspective

This project is documented from the view of a designer who understands enough front-end code to care about both the interface and the implementation.

The design priorities are:

- make the profile feel trustworthy within a healthcare context
- keep the content readable and scannable
- avoid overdesigned interactions that distract from professional credibility
- use motion only where it improves flow or attention
- keep document presentation organized and privacy-conscious
- make SEO landing pages useful instead of keyword-stuffed
- structure content in a way that can be updated safely later

The codebase reflects that mindset. It uses Astro for static performance, React where component interactivity may be useful, Tailwind CSS for scalable styling, and structured profile data for consistency across pages and schema output.

---

## Codebase Summary

This repository is an Astro project with TypeScript support and multiple frontend/design dependencies.

The `package.json` shows the site uses:

- Astro `5.x`
- React `19.x`
- Tailwind CSS `4.x`
- TypeScript `5.x`
- Astro sitemap integration
- Astro check tooling
- ESLint and Prettier
- accessibility linting support through `eslint-plugin-jsx-a11y`
- several animation and interaction libraries, including GSAP, Lenis, Motion, React Spring, Anime.js, Lottie, Rive, Three.js, Popmotion, Mo.js, and Velocity Animate

This means the repository is prepared for a polished interactive portfolio, but the final experience should still stay restrained because the subject is a healthcare professional profile.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| Framework | Astro | Static site generation and page routing |
| UI Library | React | Interactive components where needed |
| Styling | Tailwind CSS | Utility-first styling and responsive design |
| Language | TypeScript | Safer project structure and typed content/helpers |
| SEO | `@astrojs/sitemap` | Sitemap generation for indexing |
| Fonts | Public Sans, Source Serif 4 | Professional sans + editorial serif pairing |
| Motion | GSAP, Motion, Lenis, Anime.js, React Spring, Lottie, Rive, etc. | Motion experiments and refined interactions |
| Linting | ESLint + Astro plugin + JSX a11y plugin | Code quality and accessibility-oriented checks |
| Formatting | Prettier + Astro/Tailwind plugins | Consistent formatting |
| Deployment Target | Cloudflare Pages | Static hosting workflow |

---

## Site Architecture

The current README and codebase indicate a single-page primary portfolio with additional SEO landing pages.

Primary homepage sections are intended around:

- `#hero`
- `#about`
- `#experience`
- `#credentials`
- `#documents`
- `#skills`
- `#contact`

This structure is practical for a nursing portfolio because most visitors need a fast, direct understanding of:

- who Reeja is
- what experience she has
- what clinical areas she has worked in
- what credentials support her profile
- how to contact her

### Intended Page Flow

| Section | Purpose | UX Priority |
|---|---|---|
| Hero | Introduce identity, role, location, and professional focus | Immediate clarity |
| About | Explain professional summary and goals | Human trust |
| Experience | Show work history and clinical exposure | Recruiter scanning |
| Credentials | Show education, registration, and training | Proof and credibility |
| Documents | Present selected records | Verification support |
| Skills | Summarize clinical and professional strengths | Keyword and recruiter support |
| Contact | Provide safe contact path | Conversion |

---

## Content Model

The project centralizes profile information in:

```text
src/content/profile.ts
```

This is a strong architectural choice because it keeps identity, experience, credentials, document metadata, SEO page data, privacy notes, and professional copy in one controlled source.

A structured content source is better than hardcoding the same details repeatedly across many pages. It reduces mistakes and makes future edits safer.

### Content Areas Likely Managed in `profile.ts`

- profile identity
- professional headline
- summary
- goals
- experience timeline
- education
- credentials
- certificates
- document gallery metadata
- skills
- languages
- references
- SEO landing page definitions
- privacy notes

### Why This Matters

For a healthcare portfolio, accuracy is extremely important. A central content file makes it easier to audit what is public, what is sensitive, and what should be hidden.

---

## Document Gallery Policy

The site includes a professional document gallery concept. This is useful for showing credibility, but it must be handled carefully.

### Public Gallery Should Include

- experience letters
- professional training certificates
- nursing-related certificates
- education certificates and transcripts where appropriate
- conference or participation certificates if professionally relevant

### Public Gallery Should Exclude

- citizenship documents
- national ID documents
- full registration numbers unless explicitly intended for public use
- private contact numbers
- family identity details
- sensitive addresses
- any document that exposes personal IDs unnecessarily

### Recommended Rule

Only publish documents that help professional verification and do not create privacy risk.

A strong healthcare portfolio should prove credibility without oversharing private identity data.

---

## SEO System

The project has a clear SEO direction. It uses Astro's static-generation strengths and structured content to create multiple intent-targeted pages.

The existing README references generated SEO landing pages such as:

- `/registered-nurse-nepal/`
- `/maternal-newborn-nurse-nepal/`
- `/general-ward-nurse-nepal/`
- `/nursing-officer-nepal/`
- `/nurse-biratnagar-nepal-relocation/`
- `/nurse-for-ngo-ingo-nepal/`

These pages should be useful, specific, and truthful. They should not be thin keyword pages. Each page should explain a real area of Reeja's experience and connect that experience to the right audience.

### SEO Helper Areas

The project references helper utilities such as:

```text
src/lib/seo/schema.ts
src/lib/seo/meta.ts
src/lib/seo/keywords.ts
```

This is a good separation of concern. It keeps page layout separate from metadata, schemas, and keyword support.

### SEO Checklist

- [ ] Every page has a unique title.
- [ ] Every page has a unique meta description.
- [ ] Canonical URLs are correct.
- [ ] Sitemap is generated and submitted.
- [ ] Robots file points to the correct sitemap.
- [ ] JSON-LD schema matches public page content.
- [ ] No fake claims or keyword stuffing.
- [ ] Location keywords are used only where truthful.
- [ ] Medical/nursing terms are accurate.

---

## Motion and Interaction Direction

The dependency list includes many motion libraries. That gives room for expressive interaction, but the design should remain calm because this is a professional healthcare portfolio.

### Suitable Motion Style

- subtle section reveal
- gentle hero entrance
- small hover feedback on cards
- smooth anchor scrolling
- timeline progress animation
- document gallery microinteractions
- reduced-motion fallback

### Motion to Avoid

- excessive 3D effects
- flashy page transitions
- distracting cursor effects
- aggressive scroll hijacking
- animation that slows down scanning
- animation that makes documents hard to read

For this project, motion should support confidence and clarity. It should not make the site feel like a creative agency landing page.

---

## Accessibility Direction

Accessibility is especially important for healthcare-related websites.

The project already includes signals of accessibility awareness through:

- Astro static output
- semantic section structure
- skip-link support mentioned in prior README
- reduced-motion consideration
- keyboard-friendly anchors and form goals
- JSX accessibility lint plugin

### Accessibility Checklist

- [ ] All headings follow a logical order.
- [ ] All images have meaningful alt text.
- [ ] Document thumbnails have descriptive labels.
- [ ] The contact form is keyboard accessible.
- [ ] Form errors are announced clearly.
- [ ] Color contrast is checked.
- [ ] Motion respects `prefers-reduced-motion`.
- [ ] Links are visually distinct from text.
- [ ] Buttons and links have visible focus states.
- [ ] The site remains readable without JavaScript.

---

## Privacy Notes

This project handles a real person's professional identity. Privacy must be treated as a product requirement, not an afterthought.

### Do Not Publicly Expose

- full citizenship details
- full registration/license number unless explicitly approved
- private home address
- sensitive phone numbers
- private family details
- private document IDs
- raw scans that reveal unnecessary personal data

### Safe Public Information

- name
- role/title
- professional summary
- general location
- work experience
- education
- professional certifications
- selected public-facing documents
- contact method intended for public use

The site should remain useful for career and professional visibility while protecting personal safety and privacy.

---

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Run Astro checks:

```bash
npm run check
```

Run linting:

```bash
npm run lint
```

Format the project:

```bash
npm run format
```

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Starts Astro development server |
| `npm run build` | Builds the static site into `dist` |
| `npm run preview` | Previews the production build locally |
| `npm run check` | Runs Astro project checks |
| `npm run lint` | Runs ESLint |
| `npm run format` | Formats files with Prettier |
| `npm run astro` | Runs Astro CLI commands |

---

## Environment Variables

Recommended production environment variables:

```text
SITE_URL=https://reejamaharjan.com.np
PUBLIC_FORMSPREE_ENDPOINT=https://formspree.io/f/your-id
NODE_VERSION=22
```

### Notes

- `SITE_URL` should always match the production domain.
- `PUBLIC_FORMSPREE_ENDPOINT` should be configured only with the intended public form endpoint.
- `NODE_VERSION=22` is useful for consistent Cloudflare Pages builds.

---

## Deployment

The repository is designed for static deployment.

### Cloudflare Pages Settings

```text
Build command: npm run build
Output directory: dist
Node version: 22
```

### Deployment Checklist

- [ ] Production domain is connected.
- [ ] `SITE_URL` is configured.
- [ ] Contact form endpoint is configured.
- [ ] Build succeeds.
- [ ] `/robots.txt` works.
- [ ] `/sitemap-index.xml` works.
- [ ] Homepage loads correct metadata.
- [ ] SEO landing pages are accessible.
- [ ] Cloudflare cache is purged after major metadata changes.

---

## Quality Checklist

### Content QA

- [ ] Experience dates are accurate.
- [ ] Nursing role titles are consistent.
- [ ] Education entries match certificates.
- [ ] Certificate names are accurate.
- [ ] No sensitive IDs are exposed.
- [ ] Public documents are intentionally selected.
- [ ] Contact details are safe for public use.

### Design QA

- [ ] Hero communicates role within five seconds.
- [ ] Timeline is easy to scan.
- [ ] Document gallery is clear and not overwhelming.
- [ ] Mobile layout feels calm and readable.
- [ ] Typography supports trust and clarity.
- [ ] Motion feels subtle and professional.

### Technical QA

- [ ] `npm install` works.
- [ ] `npm run dev` works.
- [ ] `npm run check` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` succeeds.
- [ ] `npm run preview` works.
- [ ] No console errors appear.
- [ ] Sitemap is generated correctly.

---

## Future Improvements

- Add stronger visual documentation for the design system.
- Add a `/docs` folder for SEO, privacy, and content maintenance notes.
- Add image optimization workflow for document thumbnails.
- Add a document redaction checklist before publishing new files.
- Add structured changelog for profile updates.
- Improve schema testing with Google Rich Results Test.
- Add analytics in a privacy-respecting way.
- Add stronger print/resume view support.
- Add a small admin-friendly content editing workflow in the future if needed.

---

## Maintainer Notes

This repository is owned and maintained under the GitHub account:

**Nischhalsubba**

The project supports Reeja Maharjan's professional web presence and should be maintained with extra care around accuracy, privacy, and public credibility.

---

## License and Usage

This repository contains a personal professional portfolio. The content, document structure, copy, and identity-specific assets should not be reused without permission.

The technical structure may be used for learning, but the personal data, professional records, and visual identity should remain private to this project unless explicit permission is given.

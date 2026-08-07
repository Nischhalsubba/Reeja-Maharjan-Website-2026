# Reeja Maharjan Website — Care Practice Design System

Status: approved for implementation
Version: 2.0.0
Direction: 60% premium modern healthcare, 40% warm clinical editorial

## Visual thesis

The website should feel like a contemporary professional healthcare portfolio built for recruiters, hospitals, research teams, NGOs, and public-health organisations. It must communicate clinical trust first and editorial personality second.

The interface should be calm, readable, warm, and specific to Reeja. It should not resemble a generic healthcare SaaS landing page, a fashion magazine, or an AI-generated portfolio template.

### Required qualities

- Professional healthcare clarity and scanability.
- Human photography with the subject fully visible and never treated as decorative crop material.
- Warm editorial detail through restrained serif typography, captions, and evidence-led storytelling.
- Generous, deliberate whitespace with a consistent 8px spacing rhythm.
- Strong recruiter journeys to CV, experience, research, articles, and contact.
- Accessible contrast, focus, form states, and reduced-motion behavior.

### Forbidden patterns

- No decorative hero line, thread, mesh, node network, glow, particles, or abstract WebGL flourish.
- No gradients, glassmorphism, bento dashboards, pill clouds, fake metrics, or medical-icon wallpaper.
- No oversized multi-line serif headline that dominates the viewport.
- No animation that exists only to prove a library is installed.
- No hover-only information.
- No card shadows strong enough to make content appear detached from the page.

## Interaction thesis

Motion personality: Premium, calm, controlled, and brief.

Emotional intent: confidence and ease.
Visual narrative: identity first, evidence second, action third.
Motion craft: transform and opacity only for routine transitions, no overshoot, no bounce.

### Motion tokens

- `--motion-fast`: 140ms
- `--motion-normal`: 320ms
- `--motion-slow`: 520ms
- CSS easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- GSAP entrance easing: `power3.out`
- GSAP exit easing: `power2.in`
- Standard entrance offset: 14–18px
- Standard stagger: 40ms
- Hero sequence budget: under 700ms total

Reduced motion removes spatial choreography and continuous effects. Content must remain fully visible without JavaScript.

## Color tokens

All normal text/background pairs must meet WCAG AA.

- `--cp-bg`: `#F6F5F1` — warm ivory page background
- `--cp-surface`: `#FFFFFF` — primary surface
- `--cp-surface-soft`: `#EEF4F2` — calm teal-tinted surface
- `--cp-surface-warm`: `#F5EBE6` — warm editorial accent surface
- `--cp-ink`: `#14252A` — primary text and high-contrast controls
- `--cp-muted`: `#5B696D` — secondary text
- `--cp-line`: `#D7DEDC` — borders and dividers
- `--cp-line-strong`: `#B9C5C2` — stronger separators
- `--cp-primary`: `#0C6A63` — clinical teal
- `--cp-primary-dark`: `#084E49` — hover / pressed teal
- `--cp-primary-soft`: `#E5F1EF` — teal emphasis surface
- `--cp-warm`: `#A6533F` — restrained terracotta editorial accent
- `--cp-success`: `#1D6B4C`
- `--cp-error`: `#A9362D`

Contrast reference:

- ink on warm ivory: ~14.5:1
- muted on warm ivory: ~5.2:1
- primary teal on warm ivory: ~5.9:1
- white on primary teal: ~6.45:1
- warm terracotta on warm ivory: ~4.9:1

## Typography

Existing local font packages are retained to avoid new dependencies.

- Display / editorial: Source Serif 4
- Body / UI: Public Sans
- Monospace only for machine-readable references when necessary; not a primary visual voice.

### Scale

- Display: `clamp(3rem, 5.4vw, 5.8rem)`, Source Serif 4 500, 0.98 line-height
- H1 supporting pages: `clamp(2.6rem, 4.7vw, 4.9rem)`, Source Serif 4 500
- H2: `clamp(2rem, 3.4vw, 3.5rem)`, Source Serif 4 500
- H3: `clamp(1.25rem, 1.7vw, 1.6rem)`, Public Sans 600
- Body lead: `clamp(1.05rem, 1.25vw, 1.18rem)`, Public Sans 400, 1.7 line-height
- Body: `1rem`, Public Sans 400, 1.7 line-height
- Small: `0.875rem`, Public Sans 400
- Label: `0.75rem`, Public Sans 700, 0.08em tracking

Long-form copy must remain between roughly 60 and 75 characters per line on desktop.

## Spacing

Base unit: 8px.

- 4px micro
- 8px xs
- 12px compact
- 16px sm
- 24px md
- 32px lg
- 48px xl
- 64px 2xl
- 80px 3xl
- 96px 4xl
- 128px major section gap

Responsive horizontal gutters:

- mobile: 20px
- tablet: 32px
- desktop: `clamp(36px, 5vw, 72px)`

Primary content maximum: 1240px.
Readable text maximum: 68ch.

## Shapes and elevation

- Base radius: 10px
- Compact radius: 6px
- Large media radius: 18px
- Pill radius is reserved for true statuses only.
- Standard border: 1px solid `--cp-line`
- Standard surface shadow: `0 12px 36px rgba(20, 37, 42, 0.07)`
- Most content sections should use borders and whitespace instead of shadows.

## Navigation

Desktop navigation is simple text navigation with a single high-emphasis Contact action. Numbered editorial indexing is removed from the primary navigation.

Mobile navigation is a full-height accessible dialog with clear labels, 44px+ targets, focus trapping, Escape support, and a visible close control.

Primary destinations:

1. Experience
2. Maternal health
3. Nursing practice
4. Research
5. Articles
6. CV
7. Contact

## Homepage architecture

1. Hero: Reeja's identity, role positioning, portrait, CV/contact actions, concise proof.
2. Professional focus: three recruiter-relevant practice areas.
3. Selected experience: clean chronological summaries.
4. Credentials: compact verification-friendly registry.
5. Writing: editorial article highlights.
6. Contact invitation: short CTA leading to the dedicated contact page.

The hero contains no Three.js canvas and no decorative line. The portrait is the visual anchor.

## Forms

The dedicated `/contact/` page is the canonical contact form.

Fields:

- Name — required
- Email — required
- Organisation / hospital — optional
- Role / opportunity type — optional
- Location — optional
- Message — required

Requirements:

- Visible labels, not placeholder-only.
- Input height at least 48px.
- Inline validation after submit / blur, with accessible error text.
- Submit button disabled while sending and labeled with loading state.
- Success and failure states announced with `aria-live`.
- Focus moves to the status message or first invalid field as appropriate.
- Honeypot field for basic spam resistance.
- Public-form privacy warning: do not send patient information, private health information, identity documents, license scans, transcripts, or confidential records.
- Direct email fallback to `maharjanreeja88@gmail.com`.
- Form delivery uses FormSubmit's AJAX endpoint unless `PUBLIC_FORMSPREE_ENDPOINT` or the configured profile endpoint overrides it.

## GSAP

GSAP is reserved for authored entrance choreography and section reveals.

Hero order:

1. eyebrow / role
2. name
3. professional statement
4. supporting copy and actions
5. portrait
6. proof row

Section reveal:

- 14–18px y-offset
- 320–420ms
- `power3.out`
- 40ms group stagger
- one-shot where possible
- never hide SEO-critical content without a no-JS visible fallback

## Three.js decision

The previous hero WebGL thread is removed. It competed with Reeja's portrait, added a large client bundle, and did not improve comprehension or conversion.

Three.js remains an available project dependency, but the public redesign does not render a Three.js scene unless a future page has a concrete data-visualisation or spatial storytelling requirement. This follows the performance-first rule that simple 2D/UI work should use CSS/SVG rather than a WebGL context.

## Responsive rules

Required verification widths: 375, 768, 1024, 1440px.

- Mobile starts as a single-column reading order.
- Portrait follows the identity copy before proof content.
- Major CTAs become full-width or two-up only when space permits.
- No horizontal scrolling.
- No body copy below 16px.
- Touch targets at least 44x44px with at least 8px separation.

## Accessibility

- WCAG AA text contrast minimum.
- Visible `:focus-visible` treatment on every interactive control.
- Semantic headings and landmarks.
- Skip link retained.
- All meaningful images have descriptive alt text.
- Decorative media is `aria-hidden`.
- Mobile navigation retains dialog semantics and focus management.
- `prefers-reduced-motion` produces a stable, non-animated layout.

## Delivery gates

A release is accepted only after:

- repository verification contracts pass;
- Astro type check passes;
- ESLint passes;
- production build passes;
- browser quality passes at 375 / 768 / 1024 / 1440;
- contact form regression tests pass;
- homepage and contact-page screenshots are reviewed;
- production smoke passes on the deployed domain.
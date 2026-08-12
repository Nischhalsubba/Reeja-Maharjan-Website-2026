# Motion Specification

## Purpose

Motion supports orientation, hierarchy, feedback, and continuity. It must not delay reading, imply clinical meaning, or turn a professional portfolio into an animation demonstration.

## Emotional intent

The motion should communicate calm confidence and careful organisation. Elements arrive with controlled deceleration, settle without bounce, and remain stable while the user reads.

## Motion personality

**Clinical editorial**: a restrained blend of corporate decisiveness and editorial composure.

- No overshoot
- No bounce
- No continuous decorative loops
- No scroll hijacking
- No large parallax movement
- No animation of layout properties
- No animation required to understand content

## Core tokens

| Token | Value | Use |
|---|---:|---|
| Quick | 160ms | Hover, press, focus-adjacent feedback |
| Standard | 260ms | Navigation and component state changes |
| Slow | 420ms | Hero and section entrance |
| Easing | `cubic-bezier(0.16, 1, 0.3, 1)` | Main entrance and state curve |
| Exit easing | `power2.in` | Dialog and overlay exit |
| Maximum stagger | 40ms | Related evidence items |

## Hero sequence

### Purpose

Establish identity, role, evidence, and primary actions in the intended reading order.

### Sequence

1. Kicker and name: opacity 0 to 1, translate Y 10px to 0, 260ms.
2. H1: opacity 0 to 1, translate Y 14px to 0, 420ms, begins 80ms after the kicker.
3. Intro and proof: opacity 0 to 1, translate Y 12px to 0, 320ms, 40ms stagger.
4. Primary actions: opacity 0 to 1, translate Y 8px to 0, 260ms, 40ms stagger.
5. Summary or portrait field: opacity 0 to 1, translate Y 12px to 0, 420ms, overlaps the final action by 160ms.

The total visible sequence should finish within roughly 650ms.

## Section entrances

### Purpose

Confirm that a new evidence group has entered the viewport without forcing the user to wait.

- Trigger once when approximately 8% to 14% of the group enters the viewport.
- Translate Y 16px to 0.
- Opacity 0 to 1.
- Duration 420ms.
- Easing `power3.out`.
- Related rows or cards may stagger by 40ms.
- Do not animate more than the visible first group of a long list.

## Navigation

### Desktop

- Hover and active changes use CSS colour and background transitions at 160ms.
- No spatial movement is required.

### Mobile dialog

- Backdrop opacity: 160ms.
- Panel translate X 16px to 0: 260ms.
- Closing reverses promptly.
- Focus movement is immediate and never delayed by animation.
- Escape closes the dialog.
- Focus returns to the menu trigger after close.

## Buttons and links

- Hover begins within 100ms.
- Maximum vertical movement: 1px.
- Press may use scale 0.99 for 120ms when added later.
- Focus is represented by a persistent outline, not motion.
- Text links use underline changes rather than sliding icons.

## Cards and evidence rows

- Default state remains still.
- Hover may change border and tonal background at 160ms.
- Do not lift every card with shadow and translation.
- Numbered evidence cards should feel document-like, not playful.

## Lightbox

### Entrance

- Backdrop opacity: 220ms.
- Dialog opacity and translate Y 22px to 0: 300ms.
- Scale 0.985 to 1 may be retained.
- Easing `power2.out`.

### Exit

- Backdrop opacity: 180ms.
- Dialog translate Y 14px and fade: 220ms.
- Easing `power2.in`.
- Competing tweens must be killed before a new transition starts.

## Form feedback

When a form state is implemented:

- Success: direct status reveal with a 160ms fade and optional 0.99 to 1 scale.
- Error: clear text and colour first; optional two restrained horizontal movements within 320ms.
- Never rely on motion alone.
- Move focus to the error summary when submission fails.

## Reduced motion

For `prefers-reduced-motion: reduce`:

- Hero and section content is visible immediately.
- No spatial entrance, parallax, or scale animation.
- Navigation and lightbox state changes remain immediate.
- Scroll behaviour is automatic rather than smooth.
- Status and focus information remains unchanged.

## Performance and lifecycle

- Animate transforms and opacity only.
- Use selector scoping and `overwrite: "auto"` for competing interaction tweens.
- Prevent duplicate initialisation.
- Disconnect observers after their target has animated.
- Kill lightbox tweens before opening or closing again.
- Avoid ScrollTrigger unless a future interaction genuinely requires scroll-linked progress.
- Do not add animation dependencies beyond the existing GSAP package.

## Three.js decision

Three.js remains rejected. The portfolio has no information or interaction requirement that needs a 3D scene, and its bundle, maintenance, device, and reduced-motion costs exceed any plausible visual benefit.

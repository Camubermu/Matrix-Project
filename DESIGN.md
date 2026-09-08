# Design

Visual system for Matrix Project team 2 ("dossier" redesign, 2026-09). Source
of truth is `assets/styles.css`; this file explains the *why* behind the
tokens so future edits stay consistent instead of drifting back toward the
old pill/card template.

## Concept

Editorial atrevido / fanzine: the site reads like a numbered dossier or a
tutor's field manual, not a SaaS dashboard. Bold color blocks carry meaning
(module identity, pass/fail, done/locked); the reading surface stays a calm
high-contrast paper. Hard corners and offset (zero-blur) shadows everywhere
instead of soft drop shadows — that substitution alone is most of what makes
this stop looking like the copied template.

## Color

Brand tokens are locked — do not change these values, only how they're used:

| Token | Value | Role |
|---|---|---|
| `--lime` / `--lime-d` | `#C4F046` / `#AEDD2E` | success, done, primary accent |
| `--pink` / `--pink-d` | `#F03D9E` / `#D4308A` | attention, wrong, secondary accent |
| `--ink` | `#111111` | primary text/border ink, solid fills |

Module identity colors live in content data (`content-es.js`, `m.color`), not
CSS: attendance `#2B8EF0`, retentions `#22C55E`, cwhw `#F59E0B`, qa `#A855F7`.

System tokens (redesigned, free to evolve):

- `--paper` / `--surface` / `--surface2` — page canvas, card cutout, secondary
  panel. Light theme leans a faint lima tint, never beige/cream.
- `--line` — the one border+shadow color for hard-edge components. Ink in
  light mode, soft off-white in dark mode.
- `--rule` — quiet divider color for table rows and section rules, softer
  than `--line`.

**Text-on-fill rule (do not break this):** bright fills → ink text; dark
fills → white text. Concretely: lime, the four module colors, and bright
`--pink` all take ink text; `--ink` and `--pink-d` take white text. This was
verified by WCAG contrast-ratio calculation for every pairing actually used
in the UI — `--pink-d` (not `--pink`) is what small text sits on.

## Typography

Three roles, never blended:

- **Display — `Archivo Black`.** Reserved for moments that should shout: page
  H1s, the hero headline, the results percentage, section dividers (`.sch`).
  Single weight (900), so size and spacing do the work.
- **Structure — `JetBrains Mono`.** Nav, buttons, badges, tags, quiz meta,
  table headers, form inputs. Uppercase + slight letter-spacing. This is what
  gives the "index card / field manual" feel and replaces what used to be
  Nunito-for-everything.
- **Body — `Source Serif 4`.** Anything meant to be read for more than a
  sentence: card paragraphs, list items, quiz question text. Long-form
  measure is capped at 66ch via a shared selector list at the top of the
  stylesheet.

Display letter-spacing stays at or above `-0.02em` — never tighter.

## Shape & elevation

- `--r: 0` — hard corners everywhere except tiny tag radii (`--rtag: 3px`).
  No pill shapes (`--rpill` was removed entirely; it was the single most
  visible fingerprint of the copied template).
- Elevation is a flat, zero-blur offset shadow (`--shadow-1/2/lift`, e.g.
  `5px 5px 0 var(--line)`), never a soft blurred drop shadow, and never
  paired with just a 1px border (that combination is the generic-template
  "ghost card" look this redesign specifically replaces).
- Interactive elements lift on hover (`translate(-2px,-2px)` + a bigger
  offset shadow) and press on click (`translate(2px,2px)` + a smaller one) —
  a physical, printed-ticket feel instead of a color-fade hover.

## Layout

- Dashboard module list (`.grid`) is a single-column stacked index, not a
  multi-column card grid — it reads as a numbered table of contents and works
  identically whether a tutor has 1 or 4 assigned metrics.
- Each module row (`.mc`) devotes a fixed-width color block to identity (the
  metric's own color, index number, emoji) and gives the rest of the row to
  title/description/status — an asymmetric composition on purpose, not a
  repeated icon+heading+text card.
- Long-form module content stays a single centered column (`.cbody`,
  max-width 760px) — no sidebar, no multi-column reading layout.

## Components worth knowing about

- **`.mobj` (module objective box)** uses the module's own accent color as its
  offset-shadow color via the `--acc` custom property set inline from
  `m.color` — one line of CSS reused across four completely different colors
  with zero extra rules.
- **Callouts (`.callout .cw/.ct/.cg`)** replaced the old colored-left-border
  accent with a solid-color icon tile plus a full ink border — no side-stripe
  borders anywhere in this system (also true of `.mobj`, `.quote`, `.qctx`,
  which all used to have one).
- **Badges (`.bd` "done")** get a small intentional `rotate(-2deg)` — a stamp,
  not a sticker sheet. Used sparingly (done badges, step numbers) so it reads
  as a deliberate touch, not a template default.
- **Login card** builds its lime/pink masthead band out of the real first
  three elements (icon, title, subtitle) sharing one background color and
  meeting at a shared border, with no extra wrapper markup — the band's
  height always matches its real content, so it never mis-aligns.

## Motion

All transitions are short (120–200ms) hover/press feedback on
transform+box-shadow, plus one-shot `fade`/`shake` keyframes (question
reveal, wrong-answer nudge). Nothing loops or auto-plays.
`prefers-reduced-motion: reduce` collapses every animation/transition
duration to effectively zero, globally, in one rule at the top of the
stylesheet.

## Known follow-ups

- Verify the `≤480px` nav-wrap breakpoint (`assets/styles.css`, search
  `max-width:480px`) on an actual phone/browser — the automated browser tool
  used during this redesign became unreliable at narrow viewports mid-session
  (couldn't get a trustworthy screenshot below ~500px after a certain point),
  so this one breakpoint is reasoned-through and code-reviewed but not
  pixel-confirmed the way everything else in this system was.

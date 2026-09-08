# Product

## Register

product

## Users

Kodland tutors on team 2 (LatAm), each flagged by a Team Leader for underperforming
on exactly one operational metric (attendance, retention, classwork/homework, or
AutoQA). They land on this training mid-workday, on a laptop or phone, already a
little defensive about being here — this is corrective, not aspirational. They
need to read a focused module, pass a 70% quiz, and get back to teaching. Nobody
here is a student or a designer; they're working adults being coached on a
specific, measurable gap.

## Product Purpose

Turn a weekly metrics-review flag into a self-serve coaching module: explain how
the metric is actually calculated, give a concrete weekly routine, and confirm
understanding with a short quiz. Success is a tutor who can state exactly what
to do differently this week, not just one who scrolled to the bottom.

## Brand Personality

Confident, direct, a little sharp — "editorial atrevido" (bold editorial /
zine), chosen deliberately over a softer SaaS-dashboard feel because the
audience is professional adults being corrected, not students being onboarded.
Three words: **direct, authored, unapologetic.**

## Anti-references

- The project's own previous look: rounded pill buttons everywhere, Nunito 900
  for every heading regardless of size, a uniform card grid, thick 2px borders
  paired with soft blurred drop shadows. This was flagged as a visible reskin
  of another internal Kodland repo's training template and is explicitly
  off-limits going forward — not just in color, in structure.
- Generic SaaS dashboard cliché: hero-metric-plus-stats blocks, tiny uppercase
  eyebrows stacked above every section, identical icon+heading+text card grids.

## Design Principles

1. **The palette is locked, the language around it is not.** Lima (`#C4F046`),
   rosa (`#F03D9E`) and tinta (`#111111`) stay exactly as they were — changing
   them was never the ask. Everything structural around them (type, shape,
   shadow, layout) was rebuilt from zero so the site reads as its own thing.
2. **Bold color is a signal, not a wash.** Full-strength fills are reserved for
   moments that mean something — module identity, correct/incorrect, done/
   locked, primary actions. The reading surface underneath stays a calm,
   high-contrast paper so long modules stay legible.
3. **Numbers are earned, not decorative.** The 01/02/03/04 index on the
   dashboard is the tutor's real, personal list of assigned metrics — never
   add numbered eyebrows to arbitrary sections that aren't a real sequence.
4. **Hard edges, offset shadows, no soft glow.** Cards get a solid 2–3px ink
   border and a flat, zero-blur offset shadow instead of the old thin-border-
   plus-blurred-shadow combo. This one substitution is what kills the
   "AI dashboard template" read more than any color choice would.
5. **Three type roles, used on purpose.** Archivo Black for the few moments
   that should shout (H1s, big numerals); JetBrains Mono for structure and
   chrome (nav, labels, buttons, badges, quiz meta); Source Serif 4 for
   anything meant to be read at length. Never blend the roles.

## Accessibility & Inclusion

- Body text targets WCAG AA (≥4.5:1); large display numerals/labels target
  ≥3:1. Text-bearing color fills follow one rule throughout the stylesheet:
  bright fills (lime, the four module-identity colors, bright pink) pair with
  ink text; dark fills (ink, `--pink-d`) pair with white text — verified by
  contrast-ratio calculation for every fill/text pairing actually used.
  `--pink` (bright) is reserved for large text, borders and non-text
  decoration; `--pink-d` is what carries small text.
- Both the light and dark themes (existing toggle, unchanged mechanism) were
  redesigned together, not just color-inverted — dark mode swaps solid-ink
  fills for solid-lime fills the same way the original system did.
- `prefers-reduced-motion` disables all transition/animation durations
  site-wide via one rule; nothing depends on motion to reveal content.

# Airbnb Listing Clone — project guide

A pixel-perfect, behavior-perfect clone of a real Airbnb listing page and its two
overlays (Photo Tour, Lightbox). The reference is the single source of truth:
`https://airbnb-clone-playpower-nine.vercel.app/`.

## Stack
- Next.js 15 (App Router) · React 19 · TypeScript (strict)
- Tailwind CSS v4 (tokens declared with `@theme` in `app/globals.css`)
- Lightweight backend via Route Handlers (`app/api/*`)
- Playwright (dev-only) for reference extraction + screenshot diffing

## Layout of the repo
```
app/            layout, page (server), globals.css, api/{listing,photos}
components/
  ListingApp.tsx        client shell — owns overlay state + page composition
  listing/*             one file per section (Header … NearbyStays)
  overlays/             PhotoTour, Lightbox
  ui/                   Icon, Stars, Avatar, Modal (shared primitives)
lib/
  types.ts              domain types
  listing.ts            typed data (single source; derives photos + groups)
  overlay.ts            useScrollLock, useFocusTrap, usePrefersReducedMotion
tools/                  reference extraction + screenshot scripts (not shipped)
reference/              spec.json, groups.json, *.png baselines, clone/ shots
docs/                   production architecture diagram
.claude/                sub-agent + skill configs (see below)
```

## Conventions
- **Design tokens** live in `app/globals.css`. Use `--color-rausch` (#FF385C),
  `--color-rausch-dark` (#E61E4D), `--color-ink` (#222), `--color-muted` (#717171),
  `--color-line` (#DDD) / soft (#EBEBEB), `--color-surface` (#F7F7F7),
  `--color-teal` (#008489). The reserve gradient is `.btn-rausch`; page width is
  `.page-container` (1280 max, responsive padding).
- **Server-first**: components are server components unless they need state/effects/
  handlers — then add `"use client"` (Header, overlays, anything with toggles).
- **Data** is typed in `lib/listing.ts`. Add copy/fields there, not inline in JSX.
  Photos + room groups are derived once so the Lightbox sequence and Photo Tour stay
  in sync.
- **Accessibility is a first-class requirement**: overlays are `role="dialog"`
  `aria-modal`, trap focus, restore focus on close, lock scroll, support Esc and
  (lightbox) arrow keys; icon-only buttons carry `aria-label`; icons are
  `aria-hidden`; `:focus-visible` rings are global; `prefers-reduced-motion` is
  honoured.

## Common commands
```bash
npm run dev                 # local dev at :3000
npm run build               # production build
node tools/shoot-clone.mjs  # screenshot the build into reference/clone/
node tools/a11y-check.mjs   # behavioral + a11y assertions (must all PASS)
```

## AI workflow (`.claude/`)
- `skills/reference-extract` — drive the reference, produce measured tokens + baselines.
- `agents/component-builder` — build one section to those tokens.
- `agents/ui-fidelity-reviewer` — diff a component vs the spec, report pixel deltas.
- `agents/a11y-auditor` — audit + Playwright-verify keyboard/focus/ARIA/contrast.

Typical loop: `reference-extract` → `component-builder` → `ui-fidelity-reviewer` +
`a11y-auditor` → iterate until the diff is clean and `a11y-check` is all-green.

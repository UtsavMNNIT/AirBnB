# Airbnb Listing Page — Pixel-Perfect Clone

A pixel-perfect, behavior-perfect clone of a real Airbnb listing page and its two
overlay views, built with **Next.js 15 · React 19 · TypeScript · Tailwind v4**.

**Reference (source of truth):** https://airbnb-clone-playpower-nine.vercel.app/

## The three views
| View | What it does |
|---|---|
| **Listing page** | Full property page — hero photo grid, title, guest-favourite rating, host highlights, description, sleeping arrangements, amenities (+ modal), stay calendar, reviews with category breakdown, map, host card, things to know, nearby stays, sticky booking card. |
| **Photo Tour** | Full-screen gallery opened from **Show all photos** or any hero image. Photos grouped by room (Living room 1/2, Kitchen, Bedroom, Bathroom, Gym, Exterior, Pool, Additional) with a sticky thumbnail nav. |
| **Lightbox** | Single-photo viewer opened from any gallery photo. Prev/next chevrons, **←/→ keyboard** nav, `n of total` counter, grid-icon back to tour, Esc/✕ to close. |

## Fidelity approach
Rather than eyeballing, the reference is measured. `tools/extract-*.mjs` drive it in
headless Chromium and dump computed styles, DOM text, the photo manifest, and
screenshot baselines into `reference/`. Components are built to those exact tokens
(Airbnb palette #FF385C / #E61E4D / #222 / #717171 / #EBEBEB / #008489, system-sans),
then diffed with `tools/shoot-clone.mjs`.

## Accessibility & motion
- Overlays are `role="dialog"` + `aria-modal`, trap focus, restore focus to the trigger
  on close, lock body scroll, close on Esc; the lightbox adds ←/→ nav and an `aria-live`
  counter (shared logic in `lib/overlay.ts`).
- Icon-only controls are labelled; decorative icons are `aria-hidden`; global
  `:focus-visible` rings; `prefers-reduced-motion` disables non-essential transitions.
- `tools/a11y-check.mjs` asserts the above end-to-end (all green).

## Run locally
```bash
npm install
npx playwright install chromium   # only needed for the extraction/screenshot tools
npm run dev                       # http://localhost:3000
```
Build: `npm run build && npm start`.

## Backend
Lightweight Route Handlers serve the typed data model:
`GET /api/listing` (full payload) and `GET /api/photos` (ordered photo manifest + room
groups). Data lives in `lib/listing.ts`.

## Project layout & AI workflow
See [`CLAUDE.md`](./CLAUDE.md) for conventions and the sub-agent/skill configs under
[`.claude/`](./.claude) (`reference-extract` skill; `component-builder`,
`ui-fidelity-reviewer`, `a11y-auditor` agents).

## Production architecture
See [`docs/architecture.md`](./docs/architecture.md) and `docs/architecture.png`.

---
name: reference-extract
description: >-
  Extract a pixel-perfect spec from the live reference listing. Use when starting a
  new section, when styling drifts, or when photos/content need refreshing. Drives
  the reference in headless Chromium and dumps computed styles, DOM text, the photo
  manifest, and screenshot baselines so the clone is built against measured values
  rather than guesses.
---

# Reference extraction

The reference (`https://airbnb-clone-playpower-nine.vercel.app/`) is the single
source of truth. This skill turns it into machine-readable tokens + baselines.

## When to use
- Bootstrapping a component and you need exact spacing / type / colour.
- A visual diff shows drift and you want to re-measure a node.
- The listing copy, photos, or room grouping changed upstream.

## Tools (in `tools/`)
- `extract-reference.mjs` — visits the listing at 1440/1024/768/375, records
  `getComputedStyle` for tagged nodes, the full DOM text, all rendered image URLs,
  captures `reference/listing-*.png`, downloads photos, writes `reference/spec.json`.
- `extract-overlays.mjs` — opens the Photo Tour, captures its layout + image list.
- `extract-groups.mjs` — maps each room group to its images + amenity subtitle.
- `extract-lightbox.mjs` — opens the single-photo Lightbox, verifies keyboard nav,
  captures `reference/lightbox*.png`.
- `shoot-clone.mjs` — screenshots the local build (`reference/clone/*.png`) for
  side-by-side diffing.

## Run
```bash
npm install
npx playwright install chromium   # first run only
node tools/extract-reference.mjs
node tools/extract-overlays.mjs
node tools/extract-groups.mjs
node tools/extract-lightbox.mjs
# after `npm run dev`:
node tools/shoot-clone.mjs
```

## Output contract
- `reference/spec.json` → `{ viewports: { <name>: { nodes, buttons, headings } }, text, images }`.
- `reference/groups.json` → `[{ title, subtitle, images[] }]` (feeds `lib/listing.ts`).
- `reference/*.png` → baselines; `reference/clone/*.png` → current build.

Then hand the measured tokens to `component-builder` and review with
`ui-fidelity-reviewer`.

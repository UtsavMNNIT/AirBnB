// Reference extraction tool (dev only, not shipped).
// Opens the canonical reference at several viewports, dumps computed styles for
// key nodes, the DOM text, the listing data, and all rendered image URLs, then
// captures screenshot baselines and downloads every unique image.
//
// Usage:  node tools/extract-reference.mjs
// Output: reference/spec.json, reference/*.png, reference/photos/*
import { chromium } from "playwright";
import { mkdirSync, writeFileSync, createWriteStream } from "node:fs";
import { resolve, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";
import { get } from "node:https";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const OUT = resolve(ROOT, "reference");
const PHOTOS = resolve(OUT, "photos");
const URL = process.env.REF_URL || "https://airbnb-clone-playpower-nine.vercel.app/";

mkdirSync(OUT, { recursive: true });
mkdirSync(PHOTOS, { recursive: true });

const VIEWPORTS = [
  { name: "desktop", width: 1440, height: 1024 },
  { name: "laptop", width: 1024, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 375, height: 812 },
];

// CSS properties worth capturing for fidelity.
const PROPS = [
  "font-family", "font-size", "font-weight", "line-height", "letter-spacing",
  "color", "background-color", "background-image",
  "margin-top", "margin-right", "margin-bottom", "margin-left",
  "padding-top", "padding-right", "padding-bottom", "padding-left",
  "gap", "row-gap", "column-gap",
  "border-radius", "border-top-width", "border-color", "border-style",
  "box-shadow", "width", "height", "max-width", "display",
  "flex-direction", "align-items", "justify-content", "grid-template-columns",
];

function download(url, dest) {
  return new Promise((res) => {
    const file = createWriteStream(dest);
    get(url, (r) => {
      if (r.statusCode !== 200) { res(false); return; }
      r.pipe(file);
      file.on("finish", () => file.close(() => res(true)));
    }).on("error", () => res(false));
  });
}

const browser = await chromium.launch();
const spec = { url: URL, capturedAt: null, viewports: {}, images: [], text: {} };

for (const vp of VIEWPORTS) {
  const ctx = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 2,
  });
  const page = await ctx.newPage();
  await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(1500);

  // Screenshot baseline (full page).
  await page.screenshot({ path: resolve(OUT, `listing-${vp.name}.png`), fullPage: true });

  // Computed styles for tagged nodes + full text tree + image urls.
  const data = await page.evaluate((props) => {
    const styleOf = (el) => {
      const cs = getComputedStyle(el);
      const o = {};
      for (const p of props) o[p] = cs.getPropertyValue(p);
      const r = el.getBoundingClientRect();
      o.rect = { w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.x), y: Math.round(r.y) };
      return o;
    };
    // Key selectors to fingerprint. Fall back gracefully if missing.
    const sel = {
      h1: "h1",
      button: "button",
      img: "img",
    };
    const nodes = {};
    for (const [k, s] of Object.entries(sel)) {
      const el = document.querySelector(s);
      if (el) nodes[k] = styleOf(el);
    }
    const buttons = [...document.querySelectorAll("button")].map((b) => b.innerText.trim()).filter(Boolean);
    const headings = [...document.querySelectorAll("h1,h2,h3")].map((h) => ({ tag: h.tagName, text: h.innerText.trim() }));
    const images = [...document.querySelectorAll("img")].map((im) => ({
      src: im.currentSrc || im.src, alt: im.alt, w: im.naturalWidth, h: im.naturalHeight,
    }));
    const bodyText = document.body.innerText;
    return { nodes, buttons, headings, images, bodyText };
  }, PROPS);

  spec.viewports[vp.name] = { size: vp, nodes: data.nodes, buttons: data.buttons, headings: data.headings };
  spec.text[vp.name] = data.bodyText;
  if (vp.name === "desktop") spec.images = data.images;

  await ctx.close();
}

// Download unique images.
const seen = new Set();
let i = 0;
for (const im of spec.images) {
  if (!im.src || seen.has(im.src)) continue;
  seen.add(im.src);
  const ext = extname(new global.URL(im.src).pathname) || ".jpg";
  const name = `photo-${String(i).padStart(2, "0")}${ext}`;
  const ok = await download(im.src, resolve(PHOTOS, name));
  spec.images[i] = { ...im, localName: ok ? name : null };
  i++;
}

writeFileSync(resolve(OUT, "spec.json"), JSON.stringify(spec, null, 2));
await browser.close();
console.log(`Extracted ${spec.images.length} images -> reference/photos, spec -> reference/spec.json`);

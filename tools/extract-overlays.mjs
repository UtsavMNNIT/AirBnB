// Capture the Photo Tour and Lightbox overlays from the reference.
import { chromium } from "playwright";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "reference");
const URL = process.env.REF_URL || "https://airbnb-clone-playpower-nine.vercel.app/";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1200);

const out = {};

// --- Photo Tour ---
await page.getByRole("button", { name: /show all photos/i }).first().click();
await page.waitForTimeout(1000);
await page.screenshot({ path: resolve(OUT, "phototour.png"), fullPage: true });
out.phototour = await page.evaluate(() => {
  const imgs = [...document.querySelectorAll("img")].map(i => ({ src: i.currentSrc || i.src, alt: i.alt }));
  const captions = [...document.querySelectorAll("h1,h2,h3,h4")].map(h => h.innerText.trim()).filter(Boolean);
  return { text: document.body.innerText, imgCount: imgs.length, imgs, captions };
});

// --- Lightbox: click first tour photo ---
try {
  const firstImg = page.locator("img").first();
  await firstImg.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: resolve(OUT, "lightbox.png") });
  out.lightbox = await page.evaluate(() => ({ text: document.body.innerText.slice(0, 500) }));
} catch (e) { out.lightbox = { error: String(e) }; }

writeFileSync(resolve(OUT, "overlays.json"), JSON.stringify(out, null, 2));
await browser.close();
console.log("Photo tour images:", out.phototour?.imgCount, "captions:", JSON.stringify(out.phototour?.captions));

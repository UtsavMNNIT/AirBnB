import { chromium } from "playwright";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "reference", "clone");
const URL = process.env.CLONE_URL || "http://localhost:3000/";

const browser = await chromium.launch();

// Desktop full page
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(600);
// Trigger lazy images for the full-page shot.
await page.evaluate(async () => {
  await new Promise((r) => { window.scrollTo(0, document.body.scrollHeight); setTimeout(r, 500); });
  window.scrollTo(0, 0);
});
await page.waitForTimeout(400);
await page.screenshot({ path: resolve(OUT, "listing.png"), fullPage: true });

// Photo tour (clip to the dialog element)
await page.getByRole("button", { name: /show all photos/i }).first().click();
await page.waitForTimeout(600);
await page.locator('[role="dialog"]').screenshot({ path: resolve(OUT, "phototour.png") });

// Lightbox
await page.getByRole("button", { name: /open .* photo 1/i }).first().click();
await page.waitForTimeout(500);
await page.screenshot({ path: resolve(OUT, "lightbox.png") });
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(400);
await page.screenshot({ path: resolve(OUT, "lightbox-next.png") });
await ctx.close();

// Mobile
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true });
const mp = await mctx.newPage();
await mp.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await mp.waitForTimeout(600);
await mp.screenshot({ path: resolve(OUT, "listing-mobile.png"), fullPage: true });
await mctx.close();

await browser.close();
console.log("clone screenshots ->", OUT);

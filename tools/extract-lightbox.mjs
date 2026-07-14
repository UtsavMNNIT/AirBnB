import { chromium } from "playwright";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "reference");
const URL = process.env.REF_URL || "https://airbnb-clone-playpower-nine.vercel.app/";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);

// Open the photo tour.
await page.getByRole("button", { name: /show all photos/i }).first().click();
await page.waitForTimeout(800);

// Click the big hero mosaic photo (below the thumbnail nav, right column).
await page.mouse.click(1000, 600);
await page.waitForTimeout(800);
await page.screenshot({ path: resolve(OUT, "lightbox-real.png") });

const info = await page.evaluate(() => {
  const btns = [...document.querySelectorAll("button")].map(b => b.getAttribute("aria-label") || b.innerText.trim()).filter(Boolean);
  return { text: document.body.innerText.slice(0, 300), buttons: btns.slice(0, 20) };
});
writeFileSync(resolve(OUT, "lightbox-info.json"), JSON.stringify(info, null, 2));

// Try pressing ArrowRight to confirm keyboard nav, screenshot again.
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(500);
await page.screenshot({ path: resolve(OUT, "lightbox-next.png") });

await browser.close();
console.log("lightbox text:", info.text.replace(/\n/g, " | "));

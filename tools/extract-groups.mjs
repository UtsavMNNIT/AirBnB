import { chromium } from "playwright";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT = resolve(__dirname, "..", "reference");
const URL = process.env.REF_URL || "https://airbnb-clone-playpower-nine.vercel.app/";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1024 }, deviceScaleFactor: 1 });
const page = await ctx.newPage();
await page.goto(URL, { waitUntil: "networkidle", timeout: 60000 });
await page.waitForTimeout(1000);
await page.getByRole("button", { name: /show all photos/i }).first().click();
await page.waitForTimeout(1200);

// Walk the tour body. Each group has a heading with a subtitle and a set of images.
// Strategy: collect, in document order, headings and imgs; assign imgs to the last heading seen.
const groups = await page.evaluate(() => {
  const KNOWN = ["Living room 1","Living room 2","Full kitchen","Bedroom","Full bathroom","Gym","Exterior","Pool","Additional photos"];
  const result = [];
  let current = null;
  const walk = (node) => {
    for (const el of node.children) {
      const txt = (el.innerText || "").trim().split("\n")[0];
      if (el.tagName && /^H[1-6]$/.test(el.tagName) && KNOWN.includes(txt)) {
        current = { title: txt, subtitle: (el.parentElement?.innerText || "").split("\n").slice(1).join(" ").trim(), images: [] };
        result.push(current);
      }
      if (el.tagName === "IMG" && current) {
        const src = el.currentSrc || el.src;
        if (src.includes("/assets/")) current.images.push(src.split("/assets/")[1]);
      }
      if (el.children && el.children.length) walk(el);
    }
  };
  walk(document.body);
  // dedupe images within a group preserving order
  for (const g of result) g.images = [...new Set(g.images)];
  return result;
});

writeFileSync(resolve(OUT, "groups.json"), JSON.stringify(groups, null, 2));
await browser.close();
groups.forEach(g => console.log(`${g.title}: ${g.images.length} imgs`));

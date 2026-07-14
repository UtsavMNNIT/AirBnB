// Behavioral + accessibility assertions driven through a real browser.
import { chromium } from "playwright";

const URL = process.env.CLONE_URL || "http://localhost:3000/";
const results = [];
const assert = (name, cond) => results.push({ name, pass: !!cond });

const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1440, height: 1024 } }).then((c) => c.newPage());
await page.goto(URL, { waitUntil: "networkidle" });

// 1. Show all photos opens the tour (keyboard).
const showAll = page.getByRole("button", { name: /show all photos/i }).first();
await showAll.focus();
await page.keyboard.press("Enter");
await page.waitForTimeout(400);
const tour = page.getByRole("dialog", { name: /photo tour/i });
assert("Photo tour opens from Show all photos", await tour.isVisible());
assert("Tour is aria-modal", (await tour.getAttribute("aria-modal")) === "true");

// 2. Esc closes tour and restores focus to the trigger.
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
assert("Esc closes photo tour", (await page.getByRole("dialog", { name: /photo tour/i }).count()) === 0);
const focusedAfterClose = await page.evaluate(() => document.activeElement?.textContent?.includes("Show all photos"));
assert("Focus restored to Show all photos", focusedAfterClose);

// 3. Grid image opens lightbox at index 1.
await page.getByRole("button", { name: /view photo 1/i }).first().click();
await page.waitForTimeout(400);
let lb = page.getByRole("dialog", { name: /photo 1 of/i });
assert("Lightbox opens from hero image", await lb.isVisible());

// 4. ArrowRight advances the counter.
await page.keyboard.press("ArrowRight");
await page.waitForTimeout(300);
assert("ArrowRight advances to photo 2", (await page.getByText(/^2 of \d+$/).count()) > 0);

// 5. ArrowLeft goes back.
await page.keyboard.press("ArrowLeft");
await page.waitForTimeout(300);
assert("ArrowLeft returns to photo 1", (await page.getByText(/^1 of \d+$/).count()) > 0);

// 6. No left chevron on the first photo.
assert("Prev hidden on first photo", (await page.getByRole("button", { name: /previous photo/i }).count()) === 0);

// 7. Esc closes lightbox.
await page.keyboard.press("Escape");
await page.waitForTimeout(300);
assert("Esc closes lightbox", (await page.getByRole("dialog", { name: /photo 1 of/i }).count()) === 0);

// 8. Reserve buttons exist and h1 present for semantics.
assert("Single h1 present", (await page.locator("h1").count()) === 1);
assert("Reserve control present", (await page.getByRole("button", { name: /^reserve$/i }).count()) > 0);

await browser.close();

let ok = true;
for (const r of results) { if (!r.pass) ok = false; console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}`); }
console.log(ok ? "\nALL PASS" : "\nSOME FAILED");
process.exit(ok ? 0 : 1);

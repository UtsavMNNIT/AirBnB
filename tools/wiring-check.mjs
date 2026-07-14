// End-to-end checks for the wired interactions (dates, guests, reserve, modals, map).
import { chromium } from "playwright";

const URL = process.env.CLONE_URL || "http://localhost:3000/";
const results = [];
const ok = (name, cond) => results.push({ name, pass: !!cond });

const browser = await chromium.launch();
const page = await browser.newContext({ viewport: { width: 1440, height: 1024 } }).then((c) => c.newPage());
await page.goto(URL, { waitUntil: "networkidle" });
const card = page.locator("#booking");

// 1. Default: headline + breakdown total = ₹28,499 (5 nights).
ok("Default headline ₹28,499 for 5 nights", await card.getByText("₹28,499").first().isVisible());
ok("Breakdown total row present", (await card.getByText("Total (INR)").count()) > 0);
ok("Breakdown total = ₹28,499", (await card.getByText("₹28,499").count()) >= 2);

// 2. Clear dates → prompt + nightly rate.
await page.getByRole("button", { name: "Clear dates" }).click();
await page.waitForTimeout(200);
ok("After clear: 'Add dates to see the total price'", await card.getByText(/add dates to see the total price/i).isVisible());
ok("After clear: nightly rate ₹4,999 night", await card.getByText(/₹4,999/).first().isVisible());
ok("After clear: CHECK-IN shows 'Add date'", (await card.getByText("Add date").count()) >= 1);

// 3. Re-select a range on the calendar → price recomputes.
await page.getByRole("button", { name: "20 October 2026" }).click();
await page.getByRole("button", { name: "25 October 2026" }).click();
await page.waitForTimeout(200);
ok("Calendar selection sets 5 nights heading", (await page.getByRole("heading", { name: /5 nights in Candolim/i }).count()) > 0);
ok("Booking card total recomputed to ₹28,499", (await card.getByText("₹28,499").count()) >= 1);

// 4. Guests popover: open, cap at 3.
await card.getByRole("button", { name: /GUESTS/ }).click();
await page.waitForTimeout(200);
ok("Guests popover shows Adults row", await page.getByText("Adults", { exact: true }).isVisible());
await page.getByRole("button", { name: "Increase Adults" }).click(); // 2 -> 3 guests
await page.waitForTimeout(150);
ok("Guests label updates to 3 guests", (await card.getByText(/3 guests/).count()) > 0);
ok("Increase Adults disabled at cap 3", await page.getByRole("button", { name: "Increase Adults" }).isDisabled());
await page.keyboard.press("Escape").catch(() => {});
// close popover by clicking Close
const close = page.getByRole("button", { name: "Close" });
if (await close.count()) await close.first().click();
await page.waitForTimeout(150);

// 5. Reserve → confirmation modal.
await card.getByRole("button", { name: /^Reserve$/ }).click();
await page.waitForTimeout(300);
ok("Reserve opens confirmation dialog", await page.getByRole("dialog", { name: /confirm your stay/i }).isVisible());
ok("Confirmation shows total ₹28,499", (await page.getByText("₹28,499").count()) > 0);
await page.getByRole("button", { name: "Confirm reservation" }).click();
await page.waitForTimeout(250);
ok("Confirmation success state", (await page.getByText(/reservation requested/i).count()) > 0);
await page.keyboard.press("Escape");
await page.waitForTimeout(200);

// 6. Content modals
const openAndCheck = async (trigger, dialogName) => {
  await trigger();
  await page.waitForTimeout(250);
  const vis = await page.getByRole("dialog", { name: dialogName }).isVisible().catch(() => false);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  return vis;
};
ok("How reviews work modal", await openAndCheck(() => page.getByRole("button", { name: /how reviews work/i }).click(), /how reviews work/i));
ok("Report listing modal", await openAndCheck(() => page.getByRole("button", { name: /report this listing/i }).click(), /report this listing/i));
ok("Message host modal", await openAndCheck(() => page.getByRole("button", { name: /message host/i }).click(), /message mirashya/i));
ok("Learn more modal", await openAndCheck(() => page.getByRole("button", { name: /learn more/i }).first().click(), /cancellation policy/i));

// 7. Show all 19 reviews → 19 cards in dialog.
await page.getByRole("button", { name: /show all 19 reviews/i }).click();
await page.waitForTimeout(300);
const dlg = page.getByRole("dialog", { name: /19 reviews/i });
const cardsInModal = await dlg.getByText(/on Airbnb$/).count();
ok("Reviews modal shows 19 reviewers", cardsInModal === 19);
await page.keyboard.press("Escape");
await page.waitForTimeout(200);

// 8. Show original swaps text to French.
await page.getByRole("button", { name: /show original/i }).click();
await page.waitForTimeout(200);
ok("Show original swaps to original-language text", (await page.getByText(/Planifiez vos vacances/i).count()) > 0);

// 9. Map zoom in changes state / disables at max.
const zoomIn = page.getByRole("button", { name: "Zoom in" });
for (let i = 0; i < 3; i++) { await zoomIn.click(); await page.waitForTimeout(120); }
ok("Zoom in disables at max", await zoomIn.isDisabled());

await browser.close();
let allPass = true;
for (const r of results) { if (!r.pass) allPass = false; console.log(`${r.pass ? "PASS" : "FAIL"}  ${r.name}`); }
console.log(allPass ? "\nALL PASS" : "\nSOME FAILED");
process.exit(allPass ? 0 : 1);

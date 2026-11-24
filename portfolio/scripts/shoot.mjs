// npm run shots -- <baseUrl> (default http://localhost:3000): full-page shots of every route at 375 and 1280, plus overflow check.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const appDir = process.cwd();

const SLUGS = ["lantern-tide", "paper-comet", "rust-and-rosemary", "ninth-bell", "pocket-kaiju-office", "salt-letters"];
const POSTS = ["thumbnails-on-the-night-bus", "the-tone-drawer", "a-table-at-comic-harbour", "letters-in-the-margins"];
const ROUTES = ["/", "/works", ...SLUGS.map((s) => `/works/${s}`), "/blog", ...POSTS.map((s) => `/blog/${s}`), "/contact"];
const SHOOT = new Set(["/", "/works", "/works/lantern-tide", "/blog", "/blog/thumbnails-on-the-night-bus", "/contact"]);
const WIDTHS = [375, 1280];
const outDir = join(appDir, ".shots");
mkdirSync(outDir, { recursive: true });

// /contact: answer the three questions, then shoot the sent confirmation.
async function contactFlow(page, width) {
  await page.goto(base + "/contact", { waitUntil: "networkidle" });
  const field = page.getByRole("textbox", { name: "Message" });
  for (const answer of ["Mika Test", "mika@example.com", "Could you draw a ferry for our zine?"]) {
    await field.fill(answer);
    await field.press("Enter");
    await page.waitForTimeout(1200);
  }
  await page.getByRole("status").getByText("SENT", { exact: true }).waitFor();
  await page.waitForTimeout(800);
  const m = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
  const ok = m.scrollWidth <= m.clientWidth;
  results.push({ route: "/contact (sent)", width, ...m, noHorizontalScroll: ok });
  await page.screenshot({ path: join(outDir, `contact-sent-${width}.png`),fullPage: true });
  console.log(width, "/contact (sent)", ok ? "OK" : "OVERFLOW", m.scrollWidth, m.clientWidth);
}

const browser = await chromium.launch();
const results = [];
for (const width of WIDTHS) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  for (const route of ROUTES) {
    await page.goto(base + route, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(1200);
    const m = await page.evaluate(() => {
      const d = document.documentElement;
      const wide = [...document.querySelectorAll("body *")]
        .filter((el) => el.getBoundingClientRect().right > d.clientWidth + 1)
        .slice(0, 5)
        .map((el) => `${el.tagName.toLowerCase()}.${String(el.className).slice(0, 60)}`);
      return { scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, title: document.title, wide };
    });
    const ok = m.scrollWidth <= m.clientWidth;
    results.push({ route, width, ...m, noHorizontalScroll: ok });
    if (SHOOT.has(route)) {
      const name = (route === "/" ? "home" : route.slice(1).replaceAll("/", "-")) + `-${width}.png`;
      await page.screenshot({ path: join(outDir, name), fullPage: true });
    }
    console.log(width, route, ok ? "OK" : "OVERFLOW", m.scrollWidth, m.clientWidth, m.title, ok ? "" : m.wide.join(" | "));
  }
  await contactFlow(page, width);
  if (errors.length) console.log("console errors @", width, errors);
  await page.close();
}
await browser.close();
writeFileSync(join(outDir, "overflow.json"), JSON.stringify(results, null, 2) + "\n");

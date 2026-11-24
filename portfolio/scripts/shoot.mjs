// npm run shots -- <baseUrl> (default http://localhost:3000): full-page shots of every route at 375 and 1280, plus overflow check.
import { chromium } from "playwright";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const base = process.argv[2] ?? "http://localhost:3000";
const appDir = process.cwd();

const SLUGS = ["lantern-tide", "paper-comet", "rust-and-rosemary", "ninth-bell", "pocket-kaiju-office", "salt-letters"];
const ROUTES = ["/", "/works", ...SLUGS.map((s) => `/works/${s}`), "/blog", "/contact"];
const SHOOT = new Set(["/", "/works", "/works/lantern-tide", "/blog", "/contact"]);
const WIDTHS = [375, 1280];
const outDir = join(appDir, ".shots");
mkdirSync(outDir, { recursive: true });

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
  if (errors.length) console.log("console errors @", width, errors);
  await page.close();
}
await browser.close();
writeFileSync(join(outDir, "overflow.json"), JSON.stringify(results, null, 2) + "\n");

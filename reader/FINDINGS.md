# Findings

Issues met while building Inkwell with mangacn items as installed. No registry file was edited;
each workaround lives in site code.

## 1. `library-page` / `series-page` (and `sidebar-07`) install sample routes

- **What happened:** `npx shadcn@latest add @mangacn/library-page @mangacn/series-page` writes
  `app/library/page.tsx` and `app/series/page.tsx`; sidebar-07 (pulled in by library-page) writes
  `app/dashboard/page.tsx`. All three ship as live routes full of sample data ("Hana Mori",
  "Lantern Keepers", `#` links), and `app/series/page.tsx` collides with a real `/series/...` tree.
- **Repro:** `npx shadcn@latest add @mangacn/library-page` in a fresh Next app, `npm run build`:
  `/library` and `/dashboard` appear in the route list.
- **Workaround:** deleted the three sample pages; `app/page.tsx` and `app/series/[slug]/page.tsx`
  compose the blocks' parts (`ContinueReading`, `Shelf`, `SeriesHeader`, `VolumeGrid`,
  `ChapterList`, `CharacterCard`) unchanged.
- **Suggested fix:** install the sample page as an example under `components/` (or behind a flag),
  or document that the page file is meant to be moved/replaced.

## 2. `sidebar-07`'s `AppSidebar` hardcodes a studio's sample data

- **What happened:** library-page imports `AppSidebar`, which has its data (teams, a creator's
  nav, "Projects", user "Hana Mori") as a module constant, takes no data props, and labels its
  landmark `aria-label="Studio"`. A reader site cannot use it as is.
- **Repro:** render `app/library/page.tsx` as installed: the library sits beside "Inkpot Studio",
  "Drafts", "Storyboards", "Billing".
- **Workaround:** `components/reader-sidebar.tsx` rebuilds the nav from the `ui/sidebar`
  primitives (header link, Library, one entry per series with active state). `app-sidebar.tsx`,
  `nav-*.tsx` and `team-switcher.tsx` stay installed but unused.
- **Suggested fix:** have `AppSidebar` take `data` (and `label`) as props, with the sample as a
  default; or give library-page a reader-flavoured sidebar.

## 3. `hooks/use-mobile.ts` fails `next lint` (react-hooks/set-state-in-effect)

- **What happened:** the hook installed with `@mangacn/sidebar` calls `setIsMobile(...)`
  synchronously in `useEffect`; `eslint-config-next` 16 errors on it, so `npm run lint` exits 1.
- **Repro:** fresh create-next-app + `npx shadcn@latest add @mangacn/library-page`, `npm run lint`:
  `hooks/use-mobile.ts 17:5 error ... react-hooks/set-state-in-effect`.
- **Workaround:** `hooks/use-mobile.ts` is in `eslint.config.mjs`'s `globalIgnores`.
- **Suggested fix:** implement it with `useSyncExternalStore` over `matchMedia` (no effect, no
  hydration flash).

## 4. `Series` (series-header) has no genres or tags

- **What happened:** the header takes title, credits, synopsis, status, cover; there is nowhere
  for genres, and nothing like a `children`/`extra` slot to add a row inside the header's text
  column.
- **Workaround:** the series page renders genres as a row of `CaptionBox`es plus a totals line
  ("3 volumes · 12 chapters · 294 pages") directly under `<SeriesHeader>`.
- **Suggested fix:** an optional `genres?: string[]` on `Series`, or a `children` slot rendered
  under the synopsis.

## 5. `Chapter` (chapter-list) has no page count

- **What happened:** a webcomic index usually shows page counts; `Chapter` has number, title,
  href, date, read only.
- **Workaround:** `lib/series.ts` writes the count into `date` ("Jun 29, 2026 · 28 pages"), which
  chapter-list prints as given.
- **Suggested fix:** an optional `pages?: number` (or a free `meta?: ReactNode`) on `Chapter`.

## 6. Stamps sit on the cover's top-right corner, over a cover's own title

- **What happened:** volume-grid's NEW stamp (`absolute -top-3 right-2`) and series-header's status
  stamp (`-top-4 -right-4`) are fixed to the top-right; there is no prop to move them. A cover with
  its title across the top (the usual manga layout) has the stamp covering the title's end.
- **Workaround:** Inkwell's generated covers set the title left-aligned and narrow
  (`lib/covers.ts`). On the narrowest phone covers the NEW seal still touches the last letters.
- **Suggested fix:** a `stampSide` / `stampClassName` prop on both.

---

Items installed and where they are used:

| Item | Used in |
|---|---|
| theme, theme-sepia | `app/globals.css` (site theme), fonts in `app/layout.tsx` |
| library-page (`ContinueReading`, `Shelf`) | `/` |
| series-page (`SeriesHeader`) | `/series/[slug]` |
| chapter-list | `/series/[slug]` Chapters tab |
| volume-grid | `/` shelves (via `Shelf`), `/series/[slug]` Volumes tab |
| character-card (via series-page) | `/series/[slug]` Cast tab |
| sidebar, breadcrumb, separator (via sidebar-07) | every page's shell (`components/reader-shell.tsx`) |
| tabs (via series-page) | `/series/[slug]` |
| panel | 404 and chapter coming-soon pages |
| caption-box | genres row on `/series/[slug]`; 404 and coming-soon pages |
| speech-bubble | `/` intro; 404 and coming-soon pages |
| button, empty, progress, card, manga-frame, stamp, item, ink-mark, page-number, panel-grid, aspect-ratio | inside the blocks above |
| sidebar-07 (`app-sidebar`, `nav-*`, `team-switcher`) | installed, unused (see 2) |

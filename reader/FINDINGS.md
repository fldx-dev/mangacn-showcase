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
- **Workaround:** Inkwell's generated covers put the title in a bottom band and the folio top-left
  (`lib/covers.ts`), leaving the top-right corner to the stamps.
- **Suggested fix:** a `stampSide` / `stampClassName` prop on both.

## 7. Blocks render plain `<a href>`; no way to use `next/link`

- **What happened:** `Shelf`/`VolumeGrid` covers, `ContinueReading`'s Resume, `ChapterList` rows
  and `SeriesHeader`'s Start reading are plain anchors (some via Button `render={<a />}`), with
  no `linkComponent`/`renderLink` prop. In a Next app every one of those clicks is a full page
  load with no prefetch, while the site's own sidebar and breadcrumbs (`next/link`) navigate
  client-side.
- **Repro:** `/` → click a cover: the network panel shows a document request, not an RSC fetch.
- **Workaround:** none; accepted the full loads.
- **Suggested fix:** a `linkAs`/`render` prop for the link element on each block (Base UI style).

## 8. `shadcn add` stops on an overwrite prompt after `shadcn init`

- **What happened:** `shadcn init` installs stock `components/ui/button.tsx`; the first
  `npx shadcn@latest add @mangacn/library-page ... -y` then asks "button.tsx already exists.
  Would you like to overwrite?" (`-y` does not answer it). Non-interactive, it declines and keeps
  stock button.
- **Repro:** `create-next-app` → `shadcn init -d` → `shadcn add @mangacn/library-page -y`.
- **Workaround:** re-ran with `--overwrite` so mangacn's inked button replaced stock's.
- **Suggested fix:** document `--overwrite` in the install instructions.

## 9. `use-spread.ts` (spread-viewer) fails `next lint` (react-hooks/preserve-manual-memoization)

- **What happened:** `npx shadcn@latest add @mangacn/reader` installs spread-viewer's
  `use-spread.ts`, whose `useCallback`s (`goToSpread` and the ones built on it) trip the React
  Compiler rule in `eslint-config-next` 16: two errors, `npm run lint` exits 1.
- **Repro:** fresh create-next-app + `npx shadcn@latest add @mangacn/spread-viewer`, `npm run lint`:
  `use-spread.ts 195:5 error Compilation Skipped: Existing memoization could not be preserved`.
- **Workaround:** the file is in `eslint.config.mjs`'s `globalIgnores`, beside `use-mobile.ts` (3).
- **Suggested fix:** drop the manual `useCallback`s (the compiler memoizes), or shape them so the
  compiler can preserve them.

## 10. `Reader` is a `main` with an h1, or a `section` with an h2; nothing in between

- **What happened:** `Reader` defaults to `as="main"` and an h1. Inside the sidebar shell
  (`SidebarInset` already renders the page's `<main>`) it has to be `as="section"`, which also
  demotes its title to an h2, so the page is left without an h1.
- **Workaround:** `components/chapter-reader.tsx` renders a visually hidden h1 (series, chapter
  and title) before `<Reader as="section">`.
- **Suggested fix:** a `headingLevel` prop independent of `as`.

## 11. Arrow keys only work once the pages have focus

- **What happened:** spread-viewer handles its keys on its own focusable region ("nothing else
  takes the arrow keys"). On a fresh page load nothing is focused, so Left/Right/Home/End do
  nothing until the reader clicks or tabs into the pages.
- **Repro:** open `/series/the-saltglass-keeper/3`, press Left without clicking: no turn.
- **Workaround:** a window `keydown` listener in `chapter-reader.tsx` turns the page when the key
  lands on `body` (or a non-interactive part of the reader) and the viewer has not already
  handled it (`defaultPrevented`). It turns with the exported `spreadStarts` / `spreadIndexOf`.
- **Suggested fix:** a `globalKeys` (or `keyTarget="document"`) option on spread-viewer / `Reader`.

## 12. No tap zones on the pages, and no slot to add them

- **What happened:** spread-viewer turns with its buttons, the keys and a swipe; tapping the left
  or right of a page (what most web readers do) does nothing, and neither `Reader` nor
  `SpreadViewer` takes children or an overlay to put zones over the pages.
- **Workaround:** `chapter-reader.tsx` delegates `click` on its wrapper, finds
  `[data-slot="spread-viewer-pages"]` and turns by which half was hit (left reads on, right to
  left). A swipe also ends in a click, so a press that moved more than 10px is ignored, or a swipe
  would turn twice.
- **Suggested fix:** a `tapToTurn` option on spread-viewer, next to its swipe handler.

## 13. A page can only be an image (`SpreadPage` is `{ src, alt }`)

- **What happened:** manga-frame takes a lettered scene as `children` (real text, theme fonts),
  but spread-viewer passes only `src`/`alt` to it. Pages built from mangacn's own `panel`,
  `speech-bubble` and `sfx-text` cannot go in the reader; dialogue has to be drawn into the image,
  so it is not selectable or translatable, and screen readers get only the alt text.
- **Workaround:** `lib/pages.ts` draws each page as SVG (panels, screentone, figures, lettered
  bubbles and sound effects), served by `app/art/[slug]/[chapter]/[page]/route.ts`; each page's
  alt text lists its dialogue. `panel`, `speech-bubble` and `sfx-text` are used as real
  components in the end-of-chapter card instead.
- **Suggested fix:** `SpreadPage` as `{ src, alt } | { content: ReactNode; label: string }`,
  rendered through manga-frame's scene mode.

## 14. `Reader` has no chapter-to-chapter navigation and does not forward inner-block options

- **What happened:** at the last page `Next` just disables; there is no next/previous chapter link
  or end-of-chapter slot. `Reader` also does not pass through spread-viewer's `blank` (a lone first
  or last page faces plain paper) or chapter-list's `latest`, and the drawer's list does not mark
  the open chapter: a finished series' last chapter is stamped NEW in the drawer.
- **Workaround:** `chapter-reader.tsx` puts a "Chapters" nav (next / previous chapter) under the
  reader, and an end card (panel, sfx-text, speech-bubble, button) once the last page is open.
  The drawer is left as is.
- **Suggested fix:** `previousChapter` / `nextChapter` props (or an `end` slot), and pass-through
  props for the inner blocks (`blank`, `latest`, a current chapter).

## 15. `single` needs JavaScript, so the server renders the wrong layout for half the readers

- **What happened:** one page vs. a spread is a `single` prop "from a media query"; the server
  cannot know the width. Whatever it renders, phones or desktops see the other layout until
  hydration, then the reader re-lays out. The `?page=` address (`useReader`'s `url`) is also read
  only after mount, so a deep link renders page 1 and then plays a page turn to the asked page.
- **Workaround:** `useSyncExternalStore` over `matchMedia("(max-width: 767px)")` with the single
  page as the server snapshot. Accepted the switch and the turn.
- **Suggested fix:** a CSS-driven `single="auto"` (container query: one page below a width), and
  no page-turn animation for the first sync from the address.

---

Items installed and where they are used:

| Item | Used in |
|---|---|
| theme, theme-sepia | `app/globals.css` (site theme), fonts in `app/layout.tsx` |
| library-page (`ContinueReading`, `Shelf`) | `/` |
| series-page (`SeriesHeader`) | `/series/[slug]` |
| chapter-list | `/series/[slug]` Chapters tab; the reader's chapter drawer |
| volume-grid | `/` shelves (via `Shelf`), `/series/[slug]` Volumes tab |
| character-card (via series-page) | `/series/[slug]` Cast tab |
| sidebar, breadcrumb, separator (via sidebar-07) | every page's shell (`components/reader-shell.tsx`) |
| tabs (via series-page) | `/series/[slug]` |
| reader (`Reader`, `useReader`) | `/series/[slug]/[chapter]` (`components/chapter-reader.tsx`) |
| spread-viewer, page-turn, page-number (via reader) | `/series/[slug]/[chapter]`: the pages, the turn, the folios |
| drawer, kbd (via reader) | `/series/[slug]/[chapter]`: chapter drawer, key help |
| panel | 404 page; end-of-chapter card |
| caption-box | genres row on `/series/[slug]`; 404 page |
| speech-bubble | `/` intro; 404 page; end-of-chapter card |
| sfx-text | end-of-chapter card |
| button, empty, progress, card, manga-frame, stamp, item, ink-mark, page-number, panel-grid, aspect-ratio, ink-frame | inside the blocks above |
| sheet, tooltip, input, skeleton, use-mobile (via sidebar) | inside the sidebar (sheet on phones, tooltips when collapsed) |
| sidebar-07 (`app-sidebar`, `nav-*`, `team-switcher`) with avatar, dropdown-menu, collapsible | installed, unused (see 2) |
| power-gauge, power-gauge-burst, emanata | pulled in as dependencies, not used by Inkwell pages |

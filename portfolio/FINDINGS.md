# Findings

Problems met while using mangacn items as installed. No registry file was edited; each
workaround lives in site code.

## 1. character-card: `href` renders a plain `<a>`, so every card click is a full page load

- **What happened:** the card's link is a hard-coded `<a href>`. In a Next.js app, clicking a
  card on `/works` reloads the whole document instead of a client-side navigation (fonts,
  layout and state all reload). There is no prop to pass a framework link (`next/link`).
- **Repro:** `/works`, set `window.__marker = 1` in the console, click any card. On the detail
  page `window.__marker` is `undefined` (checked with Playwright).
- **Workaround:** none in site code short of not using `href`; kept `href` for the hit area.
- **Suggested fix:** accept a `linkAs`/`render` prop (or `asChild`-style slot) for the name
  link, defaulting to `<a>`.

## 2. character-card: the status stamp is fixed at `size="sm"`, horizontal, so most words are illegible

- **What happened:** `status` is pressed with `<Stamp size="sm">` (56 px) and the card exposes
  neither the stamp's `size` nor its `vertical` option. Words longer than about five Latin
  letters ("ONGOING") shrink to unreadable text inside the ring, and kanji words (連載, 完結),
  which Stamp would set as a vertical hanko with `vertical`, are set horizontally at text-xs and
  become a blur at both 375px and 1280px.
- **Repro:** `<CharacterCard status="ONGOING" ... />` or `status="連載"` and view the card.
- **Workaround:** site data uses short Latin words (NOW, NEW, END, ONE, PRIZE); checked legible
  in zoomed crops at 375px and 1280px.
- **Suggested fix:** pass through stamp props (`statusProps`, or `statusSize` and
  `statusVertical`), or turn on `vertical` automatically for one to three CJK characters.

## 3. character-card: `portrait` must be an image URL, unlike manga-frame

- **What happened:** `portrait: { src, alt }` is required and goes to an `<img>`. manga-frame
  itself accepts a drawn scene as `children`, but the card cannot pass one through, so a site
  with drawn (SVG/CSS) art has to ship it as static files.
- **Repro:** try to give the card an inline SVG or a lettered scene; there is no prop for it.
- **Workaround:** six SVG files in `public/works/`, referenced by URL.
- **Suggested fix:** let `portrait` also take a `ReactNode` that is passed to manga-frame as
  its scene.

## Not mangacn (scaffold)

- `shadcn init` writes `--font-sans: var(--font-sans)` into `globals.css` while the
  create-next-app layout sets Geist on `--font-geist-sans`, so the body font falls back.
  Fixed in `app/layout.tsx` by naming the Geist variable `--font-sans`, as the reference app does.

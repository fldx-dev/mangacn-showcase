# Inkwell

A webcomic reading site for three original series, built with [mangacn](https://www.mangacn.com)
components from the public `@mangacn` shadcn registry. Next 16, React 19, Tailwind 4.

## Routes

| Route | What it shows |
|---|---|
| `/` | Library: chapters in progress, a shelf of volumes per series, an empty "Saved for later" shelf |
| `/series/[slug]` | Series page: cover, credits, synopsis, genres, then Chapters / Volumes / Cast tabs |
| `/series/[slug]/[chapter]` | Chapter reader: a right-to-left spread on desktop, one page on phones; arrow keys, Home/End, tap the left/right half, swipe; `?page=` in the address; next/previous chapter links and an end card. An unknown chapter is a real 404 (`proxy.ts`) |
| `/art/[slug]/[chapter]/[page]` | One chapter page as a generated SVG (`lib/pages.ts`) |

## mangacn items

Installed with `npx shadcn@latest add @mangacn/<item>`:
`theme`, `theme-sepia` (site theme), `library-page`, `series-page`, `chapter-list`,
`volume-grid`, `panel`, `caption-box`, `speech-bubble`, `reader`, `spread-viewer`, `page-turn`,
`page-number`, plus what they pull in (sidebar-07 and sidebar, character-card, manga-frame, stamp,
tabs, item, progress, card, empty, breadcrumb, button, drawer, kbd, sfx-text, ink-frame, ink-mark,
panel-grid, aspect-ratio and others).

Where each is used, and what had to be worked around, is in [FINDINGS.md](./FINDINGS.md).
Design brief: [DESIGN.md](./DESIGN.md). Series data and cover art: `lib/series.ts`, `lib/covers.ts`;
chapter page art: `lib/pages.ts`.

## Run

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Screenshots at 375px and 1280px are in `.shots/`.

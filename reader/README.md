# Inkwell

A webcomic reading site for three original series, built with [mangacn](https://www.mangacn.com)
components from the public `@mangacn` shadcn registry. Next 16, React 19, Tailwind 4.

## Routes

| Route | What it shows |
|---|---|
| `/` | Library: chapters in progress, a shelf of volumes per series, an empty "Saved for later" shelf |
| `/series/[slug]` | Series page: cover, credits, synopsis, genres, then Chapters / Volumes / Cast tabs |
| `/series/[slug]/[chapter]` | Placeholder "chapter reader coming soon" (the reader is a later task) |

## mangacn items

Installed with `npx shadcn@latest add @mangacn/<item>`:
`theme`, `theme-sepia` (site theme), `library-page`, `series-page`, `chapter-list`,
`volume-grid`, `panel`, `caption-box`, `speech-bubble`, plus what they pull in (sidebar-07 and
sidebar, character-card, manga-frame, stamp, tabs, item, progress, card, empty, breadcrumb,
button, ink-frame, ink-mark, page-number, panel-grid, aspect-ratio and others).

Where each is used, and what had to be worked around, is in [FINDINGS.md](./FINDINGS.md).
Design brief: [DESIGN.md](./DESIGN.md). Series data and cover art: `lib/series.ts`, `lib/covers.ts`.

## Run

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

Screenshots at 375px and 1280px are in `.shots/`.

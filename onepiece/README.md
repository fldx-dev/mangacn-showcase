# One Piece fan page

A landing page for *One Piece* built as a showcase of [mangacn](https://www.mangacn.com) components:
a hero spread, a wanted-poster crew wall, a page per Straw Hat (`/crew/[slug]`) and a saga chart (`/story`).

**Unofficial fan page.** Not affiliated with or endorsed by Eiichiro Oda, Shueisha or Toei Animation.
*One Piece* and its characters belong to their owners.

## Artwork is not in this repo

This repository is public, so the series artwork (wanted posters, character forms, story stills) is
not committed. `public/posters/`, `public/forms/` and `public/story/` are git-ignored and ship empty.
Without them the site renders typeset stand-ins (e.g. `components/poster-fallback.tsx`),
so it builds and runs as-is. The live demo adds the files locally: `.vercelignore` replaces
`.gitignore` for `vercel deploy`, so a deploy from a machine that has the artwork uploads it.

## mangacn items used

Installed from the `@mangacn` registry (see `components.json`):
`theme`, `ink-frame`, `button`, `badge`, `card`, `panel`, `panel-grid`, `speech-bubble`, `sfx-text`,
`sfx-ticker`, `vertical-text`, `speed-lines`, `focus-lines`, `halftone-background`, `emanata`,
`stamp`, `ink-splatter`, `caption-box`, `power-gauge`.

Design notes: [`DESIGN.md`](./DESIGN.md).

## Run

```bash
npm ci
npm run dev     # http://localhost:3000
npm run build   # production build
```

Next.js 16, React 19, Tailwind CSS 4.

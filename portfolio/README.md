# Oriha Sumi: manga artist portfolio

A personal site for Oriha Sumi (織羽すみ), a made-up manga artist, built with
[mangacn](https://www.mangacn.com) components from the `@mangacn` shadcn registry. Every artist,
series, character and line of text is original; the portraits are hand-written SVG.

## Routes

| Route | What it shows |
|---|---|
| `/` | Hero splash panel, intro thought bubble, highlights pointed at with ink arrows and marks |
| `/works` | Six series, each as a character card for its lead |
| `/works/[slug]` | One series: portrait, logline, synopsis, facts, the lead's card and an artist's note |
| `/blog`, `/contact` | Placeholders, built in a later task |

## mangacn items

| Item | Used on |
|---|---|
| `theme`, `theme-weekly` | Site theme (weekly magazine palette), every page |
| `manga-frame` | `/` hero scene, highlights, desk panel; `/works/[slug]` portrait |
| `thought-bubble` | `/` intro; `/works/[slug]` artist's note; `/blog`, `/contact` |
| `ink-arrow` | `/` hero and highlight callouts; `/works/[slug]` note callout |
| `ink-mark` | `/` headings and copy; `/works` intro |
| `character-card` | `/works` grid; `/works/[slug]` lead |
| `caption-box` | `/` intro and desk panel; `/works/[slug]` logline; `/blog`, `/contact` |

Dependencies pulled in by those items (`ink-frame`, `card`, `speech-bubble`, `power-gauge`,
`stamp`, fonts) are installed as-is. Problems found while using them are in
[FINDINGS.md](./FINDINGS.md); the concept is in [DESIGN.md](./DESIGN.md).

## Run

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

QA screenshots at 375px and 1280px, and the horizontal-scroll check, are in `.shots/`; regenerate
them with `npm run build && npm start`, then `npm run shots` in a second terminal.

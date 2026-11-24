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
| `/blog` | Studio diary: four posts, each with its Japanese title as a vertical spine |
| `/blog/[slug]` | One post: vertical title down the right edge, caption-box pull lines, thought-bubble margin notes |
| `/contact` | A contact form told as a chat: name, email, message, then a SENT stamp (client-side only, nothing is sent) |

## mangacn items

| Item | Used on |
|---|---|
| `theme`, `theme-weekly` | Site theme (weekly magazine palette), every page |
| `manga-frame` | `/` hero scene, highlights, desk panel; `/works/[slug]` portrait |
| `thought-bubble` | `/` intro; `/works/[slug]` artist's note; `/blog`, `/blog/[slug]` margin notes; `/contact` |
| `ink-arrow` | `/` hero and highlight callouts; `/works/[slug]` note callout; `/blog/[slug]` margin notes |
| `ink-mark` | `/` headings and copy; `/works` intro; `/blog` intro |
| `character-card` | `/works` grid; `/works/[slug]` lead |
| `caption-box` | `/` intro and desk panel; `/works/[slug]` logline; `/blog` excerpts; `/blog/[slug]` pull lines; `/contact` confirmation |
| `vertical-text` | `/blog` post spines; `/blog/[slug]` title; `/contact` heading |
| `chat-thread` | `/contact` conversation (with `useChatThread`) |

Dependencies pulled in by those items (`ink-frame`, `card`, `speech-bubble`, `power-gauge`,
`stamp`, `emanata`, and for chat-thread `message-scroller`, `message`, `bubble`, `marker`,
`attachment`, `avatar`, `input-group`, `input`, `textarea`, `empty`, `button`, fonts) are installed
as-is; `stamp` and `button` are also used directly on `/contact`. Problems found while using them are in
[FINDINGS.md](./FINDINGS.md); the concept is in [DESIGN.md](./DESIGN.md).

## Run

```bash
npm ci
npm run dev     # http://localhost:3000
npm run lint
npm run build
```

QA screenshots at 375px and 1280px (including `/contact` after a message is sent), and the
horizontal-scroll check, are in `.shots/`; regenerate
them with `npm run build && npm start`, then `npm run shots` in a second terminal.

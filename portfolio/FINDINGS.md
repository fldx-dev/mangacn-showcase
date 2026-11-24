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

## 4. chat-thread: `shadcn add --yes` stops on the `button.tsx` overwrite prompt

- **What happened:** chat-thread pulls in mangacn's restyled `button` (via input-group,
  attachment, message-scroller). With a stock shadcn `components/ui/button.tsx` already
  present, `npx shadcn@latest add @mangacn/chat-thread --yes` still asks "button.tsx already
  exists. Overwrite?"; non-interactive, the install ends there with only part of the files
  written (vertical-text, message, emanata) and no chat-thread block.
- **Repro:** a project from `shadcn init` with `ui/button`, then the command above without a TTY.
- **Workaround:** re-ran with `--overwrite`. Nothing else in the site used the stock button, so
  taking mangacn's version (InkFrame outline) was safe.
- **Suggested fix:** document that mangacn replaces `ui/button`, or ship it under its own name
  so it never collides with the stock file.

## 5. chat-thread: avatar initials take punctuation

- **What happened:** the fallback avatar shows the first character of the first two words of
  `author.name`, punctuation included. An author named "Oriha (studio inbox)" got the
  initials "O(".
- **Repro:** `<ChatThread messages={[{ author: { id: "a", name: "Oriha (studio inbox)" }, ... }]} />`.
- **Workaround:** named the author "Oriha Sumi" (initials OS).
- **Suggested fix:** take initials from letter characters only (`/p{L}/u`), or accept an
  `initials` field on `ChatAuthor`.

## 6. chat-thread: seed messages need a fixed date, so a demo thread shows two days

- **What happened:** `at` is required and must be fixed for hydration, while messages sent
  with `useChatThread().send` get the browser's current time. A scripted greeting therefore
  sits under its own date line, and the reader's first reply opens another one on any other day.
- **Repro:** `/contact` on any day but 24 November 2026: the greeting's date line, then today's.
- **Workaround:** accepted; the greeting reads as an earlier auto-reply.
- **Suggested fix:** let `at` be optional (no date line or time for that message), or add a
  `hideDates` prop for scripted threads.

## 7. character-card: the ruby reading falls back to a system font

- **What happened:** the reading over the name is set `font-sans` (Geist, Latin only), so its
  kana render in whatever Japanese system font the reader has (Yu Gothic on Windows, checked
  with CDP `CSS.getPlatformFontsForNode`), not in the theme's Japanese face.
- **Repro:** `/works`, inspect the `rt` of any card.
- **Workaround:** none from site code without overriding the card's internals; left as is.
- **Suggested fix:** set the `rt` in `font-dialogue` (which falls through to
  `--font-dialogue-ja`) or a dedicated `--font-ruby` token.

## Review fixes (PR #3)

- **Same portrait twice at 375px on `/works/[slug]`:** the hero manga-frame is now
  `hidden md:block`; below `md` only the lead's character card shows the portrait (it carries
  the status stamp too). At `md` and up the two sit in different rows of the layout.
- **Japanese titles in Dela Gothic One:** next/font has no `japanese` subset for Dela Gothic One
  or Yusei Magic (its `subsets` only choose what is preloaded; the Japanese glyphs come from
  Google's unicode-range slices on demand). Japanese text is now set in `font-dialogue`, which
  falls through to Yusei Magic (`--font-dialogue-ja`), as DESIGN.md intends: the
  `/works` series titles and the footer name. CDP confirms Yusei Magic (custom font) renders
  them, and the vertical titles on `/blog`.

## Not mangacn (scaffold)

- `shadcn init` writes `--font-sans: var(--font-sans)` into `globals.css` while the
  create-next-app layout sets Geist on `--font-geist-sans`, so the body font falls back.
  Fixed in `app/layout.tsx` by naming the Geist variable `--font-sans`, as the reference app does.

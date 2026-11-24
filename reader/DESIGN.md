# Design notes

Inkwell: a reading site for three original webcomics, built as a showcase of mangacn's reader
blocks.

## Brief

- Subject: three made-up series (The Saltglass Keeper, Paper Kite Courier, Ninth Floor
  Orchestra). All titles, names, text and art are original.
- Audience: readers picking up a chapter, and developers looking at mangacn's library and series
  blocks in a real app.
- Job: get a reader from "what was I reading?" to the next page in one click.
- Constraint: mangacn components are used as installed; site code composes them.

## Concept card

```
Idea:        A well-thumbed paperback shelf.
Metaphor:    Old tankōbon on a shelf: cream paper gone warm, brown-black ink, one vermilion spot.
Signature:   Every cover is a screentone print with one inked motif (lighthouse, kite, tower)
             and a single vermilion accent.
Emotion:     Quiet, cosy, lamplit. The opposite of a loud launch page.
Motion verb: Turn. A page turns like paper between spreads; everything else sits still.
Screenshot:  The library at desktop width: Continue reading cards over shelves of covers.
```

## System

- Palette: `theme-sepia` (aged cream paper, brown-black ink, vermilion spot, warm greys). Covers
  are SVG data URIs and cannot read CSS variables, so `lib/covers.ts` writes the same values out.
- Type: the theme's Dela Gothic One for display, Shantell Sans for dialogue, Geist for body.
- Shell: sidebar-07's layout (collapsible icon rail, a sheet on phones), with Inkwell's own nav.
- Pages: `/` is library-page (Continue reading, a shelf per series, an empty shelf);
  `/series/[slug]` is series-page (header, genres row, tabs of chapter-list, volume-grid and
  character-card); `/series/[slug]/[chapter]` is reader (spread-viewer, page-turn, page-number,
  a chapter drawer), read right to left like a tankōbon: a spread on desktop, one page on phones.
- Chapter pages are generated SVG: inked panel grids on the covers' screentones, the series'
  motif, plain round-headed figures, lettered bubbles and sound effects, one vermilion accent.
  The last page ends on "To be continued" (or "The end"), then an end card with the next chapter.
- Covers keep their top-right corner clear-ish: volume-grid and series-header stamp there.

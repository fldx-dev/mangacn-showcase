# Design notes

Portfolio for Oriha Sumi, a made-up manga artist, built as a showcase of the mangacn component
library.

## Brief

- Subject: one artist and six original series (all invented for this demo).
- Audience: editors, readers and fans looking the artist up; developers looking at mangacn.
- Job: in one scroll, say who the artist is, what they draw and what is new.
- Constraint: mangacn components are used as installed; site code composes them.

## Concept card

```
Idea:        The site is the artist's own weekly-magazine page.
Metaphor:    A title splash, margin scribbles, the editor's red pen pointing at what's new.
Signature:   The artist's name lettered as a splash panel, with a hand-drawn arrow
             from the intro bubble: "that's me, in ink".
Emotion:     Friendly, a bit self-deprecating. A creator talking in the margins.
Screenshot:  The hero: splash panel on speed lines, thought bubble beside it.
```

Anchor: the artist annotates their own site. Arrows and marks are the margin notes, so they
only appear where the artist would point something out (new volume, prize, first chapter).

## System

- Palette: `theme-weekly`. Green-grey newsprint, slate ink, one magenta spot. The spot is kept
  for things being pointed at: callout arrows, marks, the name's second half.
- Type: Dela Gothic One for display, Shantell Sans for thought and narration, Yusei Magic for
  Japanese, Geist for body.
- Shape: square corners, hand-drawn frames, offset ink shadow on the one call to action.
- Rhythm (home): splash + bubble, three-up highlights each led by an arrow, text + panel split.
- Works: one character card per series, the lead standing in for the book.
- Art: six bust portraits in SVG (`public/works/`), flat ink and tone in the weekly palette,
  each with one prop that tells you the series (lantern, paper helmet, rosemary, charm, mug,
  letter).

- Blog: the studio diary. Each post's Japanese title runs top to bottom as its spine
  (vertical-text), pull lines are narration boxes and asides are thought bubbles with a margin
  arrow, so a post reads like a page with the artist's notes on it.
- Contact: the form is a conversation with the studio inbox (chat-thread). Three questions,
  then a red SENT hanko. Client-side only.

## Responsive

One column at 375px; arrows switch direction with the layout (the hero arrow points up at the
panel on mobile, left at it on desktop). No element is allowed to cross the page edge;
`.shots/overflow.json` records the check for every route at both widths.

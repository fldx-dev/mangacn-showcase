# Design notes

Fan landing page for One Piece, built as a showcase of the mangacn component library.

## Brief

- Subject: One Piece (manga by Eiichiro Oda). Unofficial fan page.
- Audience: fans, and developers looking at what mangacn can do.
- Job: make someone want to start reading, and show the library at full stretch.
- Constraint: mangacn components are used as installed; site code composes them.

## Concept card

```
Idea:        The page is a chapter of manga you sail through.
Metaphor:    A manga spread: inked panels, screentone, sound effects, wanted posters on a wall.
Signature:   A ship sails the saga route with the scroll and changes hull halfway
             (Going Merry to Thousand Sunny, after Water 7).
Emotion:     Loud, fast, a bit silly. The opening spread of a chapter.
Motion verb: Ink going down: cut, wipe, slam. Rubber only where you press (buttons).
Screenshot:  The hero: the title, the shout bubble and the captain's poster hanging off the frame.
```

Anchor: the story is one voyage on two ships, and the crew is a wall of wanted posters. Neither
carries over to another series.

History: a first pass made all display type stretch like rubber with the scroll. The owner found
it overused, so headings now wipe in once and the rubber is kept to buttons.

## System

- Palette: the mangacn theme. Paper, ink, four greys and one spot red. No other colour;
  the posters bring their own.
- Type: Dela Gothic One for display, Shantell Sans for dialogue, Yusei Magic for Japanese,
  Geist for body.
- Shape: square corners, hand-drawn ink outlines (InkFrame), hatched shadows.
- Rhythm: hero panel, tilted ticker, panel grid, one inverted band cut on the diagonal
  (the poster wall), split numbers, closing panel. No two neighbours share a layout.
- Depth comes from breaking frames: the hero poster hangs below its panel, bubbles and
  sound effects cross panel borders, posters hang crooked.

## Motion

One clock (GSAP ticker), one client module: `components/home-motion.tsx`.

| Role | Treatment |
|---|---|
| Hero title (`data-title`) | Lands with one cut in scale, then its two words slide apart as the hero scrolls away |
| Section headings (`data-wipe`) | Wiped in from the left, once, like a loaded brush |
| Panels and props (`data-reveal`) | Settle in, in reading order: a short ease-out, no overshoot |
| Hero props (`data-depth`) | Drift at their own rates as the hero scrolls away |
| Buttons, logo | Ink flood or underline on hover and focus, a slight squash, no bounce |
| Posters | Hang crooked, straighten and lift when picked |
| Voyage timeline (`data-voyage`) | A ship sails the route with the scroll; Going Merry hands over to Thousand Sunny after Water 7; the route inks in behind it |
| Page change | A wave of ink rises over the screen with the Thousand Sunny on its crest, then drops away on the new page (`components/page-wipe.tsx`) |
| Figures (`data-count`) | Count up once |
| Idle | Hero focus lines breathe; the ship bobs |

Reduced motion: the `motion` class is never set, so nothing is hidden and nothing moves.
Hover states stay as colour and outline changes.

Reduced motion also swaps the sailing ship for two still ones, moored where each joins the voyage.

No element on the site overshoots or bounces: every ease is an ease-out. Smooth scrolling is off, so header links cut straight to their section and keyboard focus never lands mid-glide.

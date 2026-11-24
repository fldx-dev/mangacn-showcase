# Design notes

Studio: a demo SaaS dashboard for a made-up manga creator, built as a showcase of mangacn.

## Brief

- Subject: Hollow Kite Studio, the desk of creator Noa Kirishima, who draws the weekly serial
  *Lantern Tide*. All three are invented for this demo.
- Audience: developers judging whether mangacn holds up in product UI, not just splash pages.
- Job: show that auth screens and an app shell can wear ink and screentone and still read as a
  calm, usable tool.
- Constraint: mangacn items are used as installed; site code composes them (see FINDINGS.md).

## Concept card

```
Idea:        The dashboard is the creator's drafting desk.
Metaphor:    Blueline pencils before inking: cool paper, blue-black lines, one blue spot.
Signature:   Empty sections are blank manga panels, toned and framed, waiting to be drawn.
Emotion:     Quiet and organised; loud only at the door (the landing's "Don!").
Motion verb: Hardly any. The one sound effect slams in once; the app itself stays still.
Screenshot:  The landing hero: the display headline beside a focus-line panel.
```

## System

- Palette: `theme-blueline` (installed over `theme`). Paper, blue-black ink, cool greys and one
  blue spot, used for the landing's kicker line and focus rings.
- Type: Dela Gothic One for headings, Shantell Sans for captions and the kicker, Geist for body.
- Shape: hand-drawn ink frames (InkFrame via Panel, MangaFrame, Button), square-ish corners.
- Layout: landing is header, split hero, three captioned panels, footer. Auth is login-02's and
  signup-02's split screen (the art panel drops below `lg`). The app is sidebar-08's inset shell;
  it collapses to icons on desktop and turns into a sheet on phones.

## Auth (fake)

Any input logs in: a server action sets one httpOnly flag cookie (`studio_session`) and
redirects to `/app`. `proxy.ts` sends `/app/*` to `/login` without it. Log out deletes it.
Form values are never read or stored.

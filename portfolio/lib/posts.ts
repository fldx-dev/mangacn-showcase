// Studio diary posts. Every name, series and event here is made up for this demo.

/** One piece of a post body, in reading order. */
export type PostBlock =
  | { kind: "p"; text: string }
  | { kind: "h"; text: string }
  /** Narration in a caption box: the post's pull line. */
  | { kind: "caption"; text: string }
  /** An aside in the artist's head, in a thought bubble. */
  | { kind: "thought"; text: string };

export interface Post {
  slug: string;
  title: string;
  /** Japanese title, set vertically as the post's spine. */
  titleJa: string;
  /** ISO date. */
  date: string;
  /** One short tag: Process, Diary, Event, Tools. */
  tag: string;
  excerpt: string;
  body: PostBlock[];
}

export const POSTS: Post[] = [
  {
    slug: "thumbnails-on-the-night-bus",
    title: "Thumbnails on the night bus",
    titleJa: "夜行バスの下描き",
    date: "2026-11-02",
    tag: "Process",
    excerpt: "Every chapter of Lantern Tide starts as forty tiny boxes drawn on a moving bus.",
    body: [
      { kind: "p", text: "I thumbnail every chapter on the 23:40 bus home from the editorial office. The bus shakes, so the boxes stay small and the lines stay loose, which is exactly what thumbnails should be." },
      { kind: "caption", text: "Forty boxes, one ride, no eraser." },
      { kind: "h", text: "Why small" },
      { kind: "p", text: "A thumbnail the size of a stamp can only hold one idea: who is looking at whom, and where the reader's eye goes next. If a page works at that size, it will work at full size. If it needs detail to read, the page is wrong, not the drawing." },
      { kind: "thought", text: "The driver has seen me draw the same ferry for three years. He has opinions about the lanterns." },
      { kind: "h", text: "What survives" },
      { kind: "p", text: "Maybe half of the bus boxes make it to the name pages. The ones that survive are usually the quiet panels: a hand on a railing, a lantern swinging after someone has left. The loud ones I can always redraw." },
    ],
  },
  {
    slug: "the-tone-drawer",
    title: "The tone drawer",
    titleJa: "トーンの引き出し",
    date: "2026-10-14",
    tag: "Tools",
    excerpt: "A drawer of screentone scraps, sorted by how they feel instead of by number.",
    body: [
      { kind: "p", text: "Most of my screentone is digital now, but I keep one drawer of real sheets from my first job as an assistant. They are sorted by mood: rain, fever, evening, kitchen, and one folder labelled simply “no”." },
      { kind: "caption", text: "Dot 60, ten percent: the colour of a kitchen at 6 a.m." },
      { kind: "h", text: "Sorting by feeling" },
      { kind: "p", text: "Tone numbers tell you the dot size and density. They do not tell you that a fine gradient makes a corridor feel longer, or that a coarse dot makes a sunny page feel hotter. After enough years you stop reading the numbers and start reading the drawer." },
      { kind: "thought", text: "The “no” folder is the biggest one. I keep adding to it." },
      { kind: "p", text: "When I set up a digital brush now, I name it after the drawer it came from. My assistant thinks this is ridiculous. My assistant also asks for “kitchen” by name." },
    ],
  },
  {
    slug: "a-table-at-comic-harbour",
    title: "A table at Comic Harbour",
    titleJa: "即売会の机",
    date: "2026-09-21",
    tag: "Event",
    excerpt: "Two days, one folding table, three hundred sketch cards and a lot of rosemary.",
    body: [
      { kind: "p", text: "Comic Harbour is a small fair held in a ferry terminal, which felt right for the Lantern Tide booth. I brought a folding table, a box of sketch cards and a pot of rosemary for the Rust and Rosemary readers." },
      { kind: "caption", text: "Day one: the rosemary ran out before noon." },
      { kind: "h", text: "What people asked" },
      { kind: "p", text: "Almost everyone asked the same question: does the ferryman ever get home? I will not answer it here either. The second most common question was whether the robot in Rust and Rosemary is going to be okay. Also not answering." },
      { kind: "thought", text: "Someone brought a hand-sewn Pocket Kaiju plush. I may have cried a little behind the table." },
      { kind: "p", text: "The best part of a fair is watching someone read a page in front of you and turn it at exactly the beat you drew for. You never see that from the desk." },
    ],
  },
  {
    slug: "letters-in-the-margins",
    title: "Letters in the margins",
    titleJa: "余白の手紙",
    date: "2026-08-30",
    tag: "Diary",
    excerpt: "Why I letter the sound effects by hand, and why the margins keep filling with notes.",
    body: [
      { kind: "p", text: "The magazine offered me a font for sound effects. I said no, politely, then less politely. A hand-lettered sound has a weight and a direction that a typed one cannot fake." },
      { kind: "caption", text: "Every SFX is drawn once, never pasted." },
      { kind: "h", text: "The margins" },
      { kind: "p", text: "In the original pages the margins are full of notes to myself and my editor: arrows, circles, “fix the hand”, “too many lanterns?”. This site borrows that habit. The arrows and circles you see here are where I would point at something on the page." },
      { kind: "thought", text: "My editor answers in red pen. We have never had an argument that did not end in a better page." },
      { kind: "p", text: "Salt Letters, the one-shot, came straight out of those margins: a girl who writes back to a lighthouse that writes to her. I just wrote down what the notes had been doing for years." },
    ],
  },
];

/** "2026-11-02" → "2 November 2026", the same on server and browser. */
export function formatPostDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  return `${day} ${months[month - 1]} ${year}`;
}

import { escape, INK, type Motif, motif, PAPER, SPOT, tones } from "@/lib/covers";
import type { InkChapter, InkSeries } from "@/lib/series";

// Chapter pages, drawn as SVG: inked panel grids on screentone, with the series' motif, simple
// figures, speed lines, lettered speech bubbles and sound effects. Every page is generated from
// (series, chapter, page), so the same page always comes out the same. Served one file per page by
// app/art/[slug]/[chapter]/[page]/route.ts; the reader gets URLs and alt text only.

const W = 600;
const H = 800;
const MARGIN = 28;
const GUTTER = 14;
const FILLS = ["paper", "fine", "dots", "lines", "cross"] as const;
type Fill = (typeof FILLS)[number];

/** Short lines of dialogue per series; a page draws a few of them, in order. */
const SCRIPT: Record<Motif, { lines: string[]; sfx: string[] }> = {
  lighthouse: {
    lines: [
      "The lamp only turns for ships that need it.",
      "There's nothing out there. Is there?",
      "Write it in the log. Every one.",
      "Fog's coming in thick tonight.",
      "Who keeps a light for a ghost?",
      "Aunt Mira did. Forty years.",
      "Don't answer the grey one.",
      "It answered me first.",
      "Ring the bell. Three times.",
      "Salt in the lens again...",
      "Bring her in slow.",
      "I'm the keeper now.",
    ],
    sfx: ["DONG", "FWASH", "KRSSH", "WHUMM", "SHHH"],
  },
  kite: {
    lines: [
      "Letter for the fourth roof!",
      "Wind's turning. Hold the line!",
      "No streets, no stamps. Just sky.",
      "Who sends a letter with no name?",
      "Catch it before the gulls do!",
      "That's the courier's knot.",
      "Read it out loud. Please.",
      "The east wind never lies.",
      "Paper tears. Promises don't.",
      "One more delivery tonight.",
      "Look up. It's coming in!",
      "Signed, someone you know.",
    ],
    sfx: ["FLAP", "WHIP", "FWOOSH", "TUG", "SNAP"],
  },
  tower: {
    lines: [
      "Rehearsal's on the ninth floor.",
      "The lift doesn't stop there.",
      "Then we take the stairs.",
      "Hear that? A cello. At 3 a.m.",
      "Nobody lives up there anymore.",
      "Someone's still tuning.",
      "From the top. Again!",
      "That's not on the score.",
      "Your bow arm is shaking.",
      "We play until the lights come on.",
      "Count us in, maestro.",
      "One more bar. Just one.",
    ],
    sfx: ["TMMM", "CREAK", "VRRRN", "TAP TAP", "DOOM"],
  },
};

/** A row of panels: its height weight and its columns' width weights. */
type Row = [number, number[]];

const LAYOUTS: Row[][] = [
  [[1, [1]], [1.2, [1, 1]], [1, [1]]],
  [[1.3, [2, 1]], [1, [1]], [1, [1, 1, 1]]],
  [[1, [1, 1]], [1.4, [1]], [1, [1, 2]]],
  [[1, [1]], [1, [1, 1]], [1, [1, 1]], [0.8, [1]]],
  [[1.6, [1, 1]], [1, [1]]],
];

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A small seeded PRNG (mulberry32) so a page is drawn the same way every time. */
function random(seed: string): () => number {
  let h = 1779033703;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 3432918353);
  let a = h >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function pick<T>(rand: () => number, list: readonly T[]): T {
  return list[Math.floor(rand() * list.length)];
}

function panels(layout: Row[]): Box[] {
  const total = layout.reduce((sum, [weight]) => sum + weight, 0);
  const usable = H - 2 * MARGIN - GUTTER * (layout.length - 1);
  const boxes: Box[] = [];
  let y = MARGIN;
  for (const [weight, cols] of layout) {
    const h = (usable * weight) / total;
    const across = cols.reduce((sum, c) => sum + c, 0);
    const width = W - 2 * MARGIN - GUTTER * (cols.length - 1);
    let x = MARGIN;
    for (const col of cols) {
      const w = (width * col) / across;
      boxes.push({ x, y, w, h });
      x += w + GUTTER;
    }
    y += h + GUTTER;
  }
  return boxes;
}

/** Words wrapped to lines of about `max` characters. */
function wrap(text: string, max: number): string[] {
  const lines: string[] = [];
  for (const word of text.split(" ")) {
    const last = lines.at(-1);
    if (last !== undefined && `${last} ${word}`.length <= max) lines[lines.length - 1] = `${last} ${word}`;
    else lines.push(word);
  }
  return lines;
}

function bubble(box: Box, text: string, rand: () => number): string {
  const lines = wrap(text, box.w > 260 ? 18 : 12);
  const size = 17;
  const longest = Math.max(...lines.map((line) => line.length));
  const rx = Math.min(box.w / 2 - 10, longest * size * 0.31 + 22);
  const ry = lines.length * size * 0.62 + 16;
  const left = rand() < 0.5;
  const cx = left ? box.x + rx + 10 : box.x + box.w - rx - 10;
  const cy = box.y + ry + 10;
  const tx = cx + (left ? rx * 0.4 : -rx * 0.4);
  const tail = `M${cx - 10} ${cy + ry - 6} L${tx} ${cy + ry + 26} L${cx + 12} ${cy + ry - 4}`;
  const text0 = cy - ((lines.length - 1) * size * 1.1) / 2 + size * 0.35;
  const tspans = lines
    .map((line, i) => `<tspan x="${cx}" y="${text0 + i * size * 1.1}">${escape(line)}</tspan>`)
    .join("");
  return `<path d="${tail}" fill="${PAPER}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${PAPER}" stroke="${INK}" stroke-width="3"/>
<rect x="${cx - 14}" y="${cy + ry - 8}" width="28" height="6" fill="${PAPER}"/>
<text font-family="'Comic Sans MS', 'Chalkboard SE', cursive" font-size="${size}" fill="${INK}" text-anchor="middle">${tspans}</text>`;
}

function sfx(box: Box, word: string, rand: () => number): string {
  // Impact runs about 0.6em a letter, plus spacing: keep the word inside the panel.
  const size = Math.min(64, (box.w - 36) / (word.length * 0.66));
  const x = box.x + box.w * (0.45 + rand() * 0.1);
  const y = box.y + box.h - 18;
  const angle = Math.round(-14 + rand() * 10);
  return `<text x="${x}" y="${y}" transform="rotate(${angle} ${x} ${y})" font-family="Impact, 'Arial Black', sans-serif" font-size="${size}" text-anchor="middle" fill="${PAPER}" stroke="${INK}" stroke-width="5" paint-order="stroke" letter-spacing="2">${escape(word)}</text>`;
}

/** Speed lines bursting from a point in the box. */
function burst(box: Box, rand: () => number): string {
  const cx = box.x + box.w * (0.3 + rand() * 0.4);
  const cy = box.y + box.h * (0.35 + rand() * 0.3);
  const reach = Math.hypot(box.w, box.h);
  const lines = Array.from({ length: 36 }, (_, i) => {
    const a = (i / 36) * Math.PI * 2 + rand() * 0.08;
    const inner = 40 + rand() * 40;
    return `M${cx + Math.cos(a) * inner} ${cy + Math.sin(a) * inner} L${cx + Math.cos(a) * reach} ${cy + Math.sin(a) * reach}`;
  }).join(" ");
  return `<path d="${lines}" stroke="${INK}" stroke-width="2" opacity=".7"/>`;
}

/** A simple inked figure (head and shoulders) standing in the box. */
function figure(box: Box, rand: () => number, accent: boolean): string {
  const scale = Math.min(box.w, box.h) / 300;
  const x = box.x + box.w * (0.25 + rand() * 0.5);
  const y = box.y + box.h;
  const turn = rand() < 0.5 ? -1 : 1;
  return `<g transform="translate(${x} ${y}) scale(${scale})">
<path d="M-110 0 C-110 -90 -60 -120 0 -120 C60 -120 110 -90 110 0 Z" fill="${accent ? SPOT : PAPER}" stroke="${INK}" stroke-width="6"/>
<circle cx="0" cy="-190" r="66" fill="${PAPER}" stroke="${INK}" stroke-width="6"/>
<path d="M-66 -196 C-70 -270 70 -270 66 -196 C40 -236 -30 -240 -66 -196 Z" fill="${INK}"/>
<circle cx="${turn * 12 - 20}" cy="-186" r="6" fill="${INK}"/><circle cx="${turn * 12 + 22}" cy="-186" r="6" fill="${INK}"/>
<path d="M${turn * 8 - 12} -150 Q${turn * 8} -144 ${turn * 8 + 12} -150" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/></g>`;
}

/** The series' motif (drawn on a 200×300 card) fitted into the box. */
function scene(kind: Motif, box: Box, n: number, id: string): string {
  const scale = Math.max(box.w / 200, box.h / 260);
  const dx = box.x + (box.w - 200 * scale) / 2;
  const dy = box.y + box.h - 300 * scale + 40 * scale;
  return `<g transform="translate(${dx} ${dy}) scale(${scale})">${motif(kind, n, id)}</g>`;
}

function fill(id: string, kind: Fill): string {
  return kind === "paper" ? PAPER : `url(#${id}-${kind})`;
}

function frame(box: Box): string {
  return `<rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" fill="none" stroke="${INK}" stroke-width="4"/>`;
}

function svg(body: string, id: string): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}">${tones(id)}<rect width="${W}" height="${H}" fill="${PAPER}"/>${body}</svg>`;
}

interface PageInput {
  series: InkSeries;
  chapter: InkChapter;
  /** The page's index in the chapter, from 0. */
  page: number;
}

interface PagePlan {
  kind: "title" | "story" | "end";
  boxes: Box[];
  /** Per box: what it holds. */
  cells: { fill: Fill; content: "scene" | "figure" | "burst" | "empty"; line?: string; sfx?: string }[];
}

function plan({ series, chapter, page }: PageInput): PagePlan {
  const last = page === chapter.pages - 1;
  if (page === 0) return { kind: "title", boxes: [], cells: [] };
  const rand = random(`${series.slug}/${chapter.number}/${page}`);
  const layout = last ? LAYOUTS[0] : pick(rand, LAYOUTS);
  const boxes = panels(layout);
  const script = SCRIPT[series.motif];
  // Five lines a page at most, so facing pages do not repeat each other.
  let line = (chapter.number * 7 + page * 5) % script.lines.length;
  const cells: PagePlan["cells"] = boxes.map((box, i) => {
    const content = pick(rand, ["scene", "figure", "figure", "burst", "empty"] as const);
    const talk = content !== "burst" && box.h > 150 && rand() < 0.7;
    const noise = !talk && (content === "burst" || rand() < 0.35);
    const cell: PagePlan["cells"][number] = {
      fill: i === 0 && content === "scene" ? "dots" : pick(rand, FILLS),
      content,
      line: talk ? script.lines[line++ % script.lines.length] : undefined,
      sfx: noise ? pick(rand, script.sfx) : undefined,
    };
    return cell;
  });
  if (last) cells[cells.length - 1] = { fill: "paper", content: "empty" };
  return { kind: last ? "end" : "story", boxes, cells };
}

function titlePage({ series, chapter }: PageInput): string {
  const id = "t";
  const box = { x: 0, y: 0, w: W, h: 560 };
  const words = wrap(chapter.title.toUpperCase(), 16);
  const title = words
    .map(
      (line, i) =>
        `<text x="${W / 2}" y="${672 + i * 46 - (words.length - 1) * 23}" font-family="Impact, 'Arial Black', sans-serif" font-size="42" fill="${INK}" text-anchor="middle" letter-spacing="1">${escape(line)}</text>`,
    )
    .join("");
  return svg(
    `<rect width="${W}" height="560" fill="url(#${id}-dots)"/>${scene(series.motif, box, chapter.number, id)}
<rect x="0" y="560" width="${W}" height="240" fill="${PAPER}"/><path d="M0 560 H${W}" stroke="${INK}" stroke-width="6"/>
<rect x="28" y="28" width="132" height="56" fill="${INK}"/><text x="94" y="68" font-family="Impact, 'Arial Black', sans-serif" font-size="30" fill="${PAPER}" text-anchor="middle">CH. ${chapter.number}</text>
<text x="${W / 2}" y="604" font-family="Georgia, serif" font-size="20" font-style="italic" fill="${SPOT}" text-anchor="middle">${escape(series.title)}</text>${title}
<text x="${W / 2}" y="774" font-family="Georgia, serif" font-size="16" fill="${INK}" text-anchor="middle">${escape(series.artist ? `${series.author} · ${series.artist}` : series.author)}</text>`,
    id,
  );
}

/** What the chapter's last panel says. */
function ending({ series, chapter }: PageInput): string {
  const done = series.status === "completed" && chapter.number === series.chapters.length;
  return done ? "The end" : "To be continued";
}

/** The page as an SVG document. */
export function pageArt(input: PageInput): string {
  const { series, chapter, page } = input;
  const p = plan(input);
  if (p.kind === "title") return titlePage(input);
  const id = "s";
  const rand = random(`${series.slug}/${chapter.number}/${page}/draw`);
  const body = p.boxes
    .map((box, i) => {
      const cell = p.cells[i];
      const clip = `k${i}`;
      const content =
        cell.content === "scene"
          ? scene(series.motif, box, chapter.number + page + i, id)
          : cell.content === "figure"
            ? figure(box, rand, i % 3 === 0)
            : cell.content === "burst"
              ? burst(box, rand)
              : "";
      const inner = `<clipPath id="${clip}"><rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}"/></clipPath>
<g clip-path="url(#${clip})"><rect x="${box.x}" y="${box.y}" width="${box.w}" height="${box.h}" fill="${fill(id, cell.fill)}"/>${content}${cell.line ? bubble(box, cell.line, rand) : ""}${cell.sfx ? sfx(box, cell.sfx, rand) : ""}</g>${frame(box)}`;
      return inner;
    })
    .join("");
  const end =
    p.kind === "end"
      ? (() => {
          const box = p.boxes[p.boxes.length - 1];
          return `<text x="${box.x + box.w / 2}" y="${box.y + box.h / 2 + 18}" font-family="Impact, 'Arial Black', sans-serif" font-size="52" fill="${INK}" text-anchor="middle" letter-spacing="4">${ending(input).toUpperCase()}</text>`;
        })()
      : "";
  return svg(body + end, id);
}

/** What the page shows, for the image's alt text. */
export function pageAlt(input: PageInput): string {
  const { series, chapter } = input;
  const p = plan(input);
  if (p.kind === "title") {
    return `Title page: ${series.title}, chapter ${chapter.number}, "${chapter.title}", over a screentone ${series.motif}.`;
  }
  const said = p.cells.flatMap((cell) => (cell.line ? [`"${cell.line}"`] : []));
  const sounds = p.cells.flatMap((cell) => (cell.sfx ? [cell.sfx] : []));
  const parts = [`${p.boxes.length} panels`];
  if (said.length) parts.push(`speech: ${said.join(" ")}`);
  if (sounds.length) parts.push(`sound effects: ${sounds.join(", ")}`);
  if (p.kind === "end") parts.push(`the last panel reads ${ending(input)}`);
  return `${parts.join("; ")}.`;
}

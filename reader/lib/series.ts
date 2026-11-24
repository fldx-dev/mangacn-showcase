import type { Chapter } from "@/components/blocks/chapter-list/chapter-list";
import type { Volume } from "@/components/blocks/volume-grid/volume-grid";
import type { ReadingProgress } from "@/components/continue-reading";
import type { Series as HeaderSeries, SeriesStatus } from "@/components/series-header";
import { coverArt, type Motif, portraitArt } from "@/lib/covers";

// Inkwell's catalogue: three made-up series. Everything here is original. The shapes are this
// site's own; `toHeaderSeries`, `toVolumes`, `toChapters` and `continueReading` map them onto the
// shapes mangacn's blocks take.

export interface InkChapter {
  number: number;
  title: string;
  /** Release date, ISO. */
  date: string;
  pages: number;
}

export interface InkVolume {
  number: number;
  title: string;
  /** Release month, as printed ("Oct 2026"). */
  date: string;
  /** The chapters it collects, by number. */
  chapters: number[];
}

export interface InkCastMember {
  name: string;
  reading?: string;
  castRole: string;
  quote?: string;
  status?: string;
  portrait: { src: string; alt: string };
}

export interface InkSeries {
  slug: string;
  title: string;
  originalTitle?: string;
  reading?: string;
  author: string;
  artist?: string;
  synopsis: string;
  /** One line for cards and metadata. */
  tagline: string;
  genres: string[];
  status: SeriesStatus;
  motif: Motif;
  volumes: InkVolume[];
  chapters: InkChapter[];
  cast: InkCastMember[];
}

/** Chapters from a list of titles, released weekly from `start`, with their page counts. */
function chapters(start: string, titles: [string, number][]): InkChapter[] {
  const first = new Date(`${start}T00:00:00Z`).getTime();
  return titles.map(([title, pages], i) => ({
    number: i + 1,
    title,
    pages,
    date: new Date(first + i * 7 * 86_400_000).toISOString().slice(0, 10),
  }));
}

/** Volumes that collect consecutive chapters, `per` at a time. */
function volumes(per: number, list: [string, string][]): InkVolume[] {
  return list.map(([title, date], i) => ({
    number: i + 1,
    title,
    date,
    chapters: Array.from({ length: per }, (_, j) => i * per + j + 1),
  }));
}

export const SERIES: InkSeries[] = [
  {
    slug: "the-saltglass-keeper",
    title: "The Saltglass Keeper",
    originalTitle: "塩硝子の灯台守",
    reading: "しおがらすのとうだいもり",
    author: "Wren Isoda",
    artist: "Pell Marrow",
    tagline: "A lighthouse that answers ships nobody else can see.",
    synopsis:
      "On the island of Kesh the lighthouse is made of salt-glass, and once a month its beam lands on a ship that is not on any chart. Nineteen-year-old Ada Brine inherits the lamp from an aunt she never met, along with a logbook of every ghost vessel it has guided home and a warning written on the last page: do not answer the grey one.",
    genres: ["Mystery", "Supernatural", "Slice of life"],
    status: "ongoing",
    motif: "lighthouse",
    chapters: chapters("2026-05-04", [
      ["The Lamp Is Lit", 32],
      ["Logbook, Page One", 22],
      ["A Ship With No Name", 24],
      ["Salt in the Lens", 20],
      ["The Harbourmaster's Daughter", 22],
      ["Fog Bell", 24],
      ["What the Tide Took", 26],
      ["Mending Glass", 20],
      ["The Grey One", 28],
      ["Two Lights on the Water", 22],
      ["Low Water Mark", 24],
      ["Keeper's Oath", 30],
    ]),
    volumes: volumes(4, [
      ["The Lamp Is Lit", "Jul 2026"],
      ["Fog Bell", "Sep 2026"],
      ["The Grey One", "Nov 2026"],
    ]),
    cast: [
      {
        name: "Ada Brine",
        castRole: "Lead · New keeper",
        quote: "If it's on the water, the lamp finds it. Even if I'd rather it didn't.",
        status: "MAIN",
        portrait: {
          src: portraitArt("M78 190 C70 96 230 96 222 190 C206 146 112 136 78 190 Z", "dots", true),
          alt: "Ada Brine, short dark hair cut straight across, a red oilskin coat",
        },
      },
      {
        name: "Tobiah Fenn",
        castRole: "Harbourmaster",
        quote: "Nothing comes in past the breakwater without my say.",
        portrait: {
          src: portraitArt("M90 150 C110 128 190 128 210 150 C190 142 110 142 90 150 Z", "lines"),
          alt: "Tobiah Fenn, nearly bald with a thin fringe of hair",
        },
      },
      {
        name: "The Grey Captain",
        castRole: "Unknown · Ghost ship",
        quote: "You left the light on for us. That was kind.",
        portrait: {
          src: portraitArt(
            "M74 200 L90 110 L120 140 L150 96 L180 140 L210 110 L226 200 C200 160 100 160 74 200 Z",
            "cross",
          ),
          alt: "The Grey Captain, spiked dark hair, face half in crosshatched shadow",
        },
      },
    ],
  },
  {
    slug: "paper-kite-courier",
    title: "Paper Kite Courier",
    originalTitle: "紙凧便",
    reading: "かみだこびん",
    author: "Tamsin Okafor-Hale",
    tagline: "Letters delivered by kite across a city with no streets.",
    synopsis:
      "Lowmarket is a city built on rooftops, and the fastest way to send a letter is to fly it. Pip Tanager is the worst kite courier on the Fourth Terrace, until she catches a letter that was never meant to land and finds herself carrying it to every address it names, one roof at a time.",
    genres: ["Adventure", "Comedy", "Found family"],
    status: "completed",
    motif: "kite",
    chapters: chapters("2025-09-01", [
      ["Strings Attached", 28],
      ["Fourth Terrace", 20],
      ["Return to Sender", 22],
      ["Crosswind", 20],
      ["The Chimney Sweeps' Union", 24],
      ["Postage Due", 18],
      ["Over the Old Wall", 26],
      ["Every Address", 34],
    ]),
    volumes: volumes(4, [
      ["Strings Attached", "Dec 2025"],
      ["Every Address", "Feb 2026"],
    ]),
    cast: [
      {
        name: "Pip Tanager",
        castRole: "Lead · Courier, fourth class",
        quote: "Technically it landed. Technically that's a delivery.",
        status: "MAIN",
        portrait: {
          src: portraitArt(
            "M72 196 C60 110 120 92 150 110 C180 92 240 110 228 196 C210 150 180 140 150 150 C120 140 90 150 72 196 Z",
            "fine",
            true,
          ),
          alt: "Pip Tanager, messy hair in two tufts, a red courier's scarf",
        },
      },
      {
        name: "Mister Quill",
        castRole: "Postmaster",
        quote: "A letter is a promise with a stamp on it.",
        portrait: {
          src: portraitArt("M84 168 C100 112 200 112 216 168 L200 150 L150 140 L100 150 Z", "dots"),
          alt: "Mister Quill, neatly combed hair with a side parting",
        },
      },
    ],
  },
  {
    slug: "ninth-floor-orchestra",
    title: "Ninth Floor Orchestra",
    originalTitle: "九階の楽団",
    reading: "きゅうかいのがくだん",
    author: "Ilse Marrow-Ueno",
    artist: "Dov Castellan",
    tagline: "An apartment block where every tenant plays one note.",
    synopsis:
      "The tenants of the Halberd Building have never met, but every night at nine they play together through the walls: a cello on the third floor, a trumpet on the sixth, a piano no one can find. When the ninth floor goes quiet, music student Juno Arkwright starts knocking on doors.",
    genres: ["Drama", "Music", "Mystery"],
    status: "hiatus",
    motif: "tower",
    chapters: chapters("2026-02-02", [
      ["Nine O'Clock", 26],
      ["Through the Wall", 20],
      ["Third Floor, Cello", 22],
      ["Rest", 18],
      ["Sixth Floor, Brass", 24],
      ["The Piano Nobody Owns", 28],
    ]),
    volumes: volumes(3, [
      ["Nine O'Clock", "Apr 2026"],
      ["The Piano Nobody Owns", "Jun 2026"],
    ]),
    cast: [
      {
        name: "Juno Arkwright",
        castRole: "Lead · Music student",
        quote: "A building can't hum. So who's humming?",
        status: "MAIN",
        portrait: {
          src: portraitArt(
            "M70 210 C62 110 238 110 230 210 L214 160 C190 140 110 140 86 160 Z",
            "lines",
            true,
          ),
          alt: "Juno Arkwright, long straight hair to the shoulders",
        },
      },
      {
        name: "Mrs Okonedo",
        castRole: "Third floor · Cello",
        quote: "I play for the people who used to live here.",
        portrait: {
          src: portraitArt(
            "M96 140 C96 90 204 90 204 140 C230 150 236 120 226 104 C200 70 100 70 74 104 C64 120 70 150 96 140 Z",
            "cross",
          ),
          alt: "Mrs Okonedo, hair wound up in a tall bun",
        },
      },
      {
        name: "Ninth Floor",
        castRole: "Unknown · Piano",
        portrait: {
          src: portraitArt("M78 160 L222 160 L222 150 L78 150 Z", "dots"),
          alt: "A blank face under a flat dark brim, features left uninked",
        },
      },
    ],
  },
];

export function getSeries(slug: string): InkSeries | undefined {
  return SERIES.find((series) => series.slug === slug);
}

export function chapterHref(series: InkSeries, chapter: number): string {
  return `/series/${series.slug}/${chapter}`;
}

export function seriesHref(series: InkSeries): string {
  return `/series/${series.slug}`;
}

export function seriesCover(series: InkSeries): { src: string; alt: string } {
  return { src: coverArt(series.title, series.motif), alt: `${series.title} cover` };
}

export function totalPages(series: InkSeries): number {
  return series.chapters.reduce((sum, chapter) => sum + chapter.pages, 0);
}

// The sample reader's state: how far they have read in each series, and where they stopped.
// There are no accounts; this stands in for one reader's library.
export const READER = {
  name: "Guest reader",
  /** Chapters read in full, per series. */
  readThrough: {
    "the-saltglass-keeper": 8,
    "paper-kite-courier": 8,
    "ninth-floor-orchestra": 2,
  } as Record<string, number>,
  /** Open chapters, most recent first: the next chapter after `readThrough`, at a page. */
  open: [
    { slug: "the-saltglass-keeper", chapter: 9, page: 11 },
    { slug: "ninth-floor-orchestra", chapter: 3, page: 4 },
  ],
};

export function toHeaderSeries(series: InkSeries): Omit<HeaderSeries, "volumes" | "chapters" | "cast"> {
  const read = READER.readThrough[series.slug] ?? 0;
  const next = Math.min(read + 1, series.chapters.length);
  return {
    title: series.title,
    originalTitle: series.originalTitle,
    reading: series.reading,
    author: series.author,
    artist: series.artist,
    synopsis: series.synopsis,
    status: series.status,
    cover: seriesCover(series),
    startHref: chapterHref(series, read > 0 ? next : 1),
  };
}

/**
 * The volumes as volume-grid takes them; each links to `href(volume)`. The latest volume of an
 * ongoing series is stamped NEW.
 */
export function toVolumes(series: InkSeries, href: (volume: InkVolume) => string): Volume[] {
  return series.volumes.map((volume, i) => ({
    number: volume.number,
    title: volume.title,
    date: volume.date,
    href: href(volume),
    isNew: series.status === "ongoing" && i === series.volumes.length - 1,
    cover: {
      src: coverArt(series.title, series.motif, volume.number),
      alt: `${series.title}, volume ${volume.number}: ${volume.title}`,
    },
  }));
}

function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

/** The chapters as chapter-list takes them. Chapter has no page count, so it rides in `date`. */
export function toChapters(series: InkSeries): Chapter[] {
  const read = READER.readThrough[series.slug] ?? 0;
  return series.chapters.map((chapter) => ({
    number: chapter.number,
    title: chapter.title,
    href: chapterHref(series, chapter.number),
    date: `${formatDate(chapter.date)} · ${chapter.pages} pages`,
    read: chapter.number <= read,
  }));
}

/** The reader's open chapters as continue-reading takes them, page counts from the data. */
export function continueReading(): ReadingProgress[] {
  return READER.open.flatMap(({ slug, chapter, page }) => {
    const series = getSeries(slug);
    const found = series?.chapters.find((item) => item.number === chapter);
    if (!series || !found) return [];
    return [
      {
        series: series.title,
        chapter,
        chapterTitle: found.title,
        page,
        pages: found.pages,
        cover: { src: coverArt(series.title, series.motif), alt: "" },
        // The reader opens at ?page= (from 1).
        href: `${chapterHref(series, chapter)}?page=${page}`,
      },
    ];
  });
}

/** The chapter a URL segment names, matched exactly ("3", not "03" or "3.0"). */
export function findChapter(series: InkSeries, segment: string): InkChapter | undefined {
  return series.chapters.find((chapter) => String(chapter.number) === segment);
}

/** A chapter page's image URL; `page` is its index, from 0. */
export function pageSrc(series: InkSeries, chapter: number, page: number): string {
  return `/art/${series.slug}/${chapter}/${page + 1}`;
}

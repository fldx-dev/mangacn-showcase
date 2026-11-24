import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { InkArrow } from "@/components/ink-arrow";
import { InkMark } from "@/components/ink-mark";
import { MangaFrame } from "@/components/manga-frame";
import { HEADING, PAGE_COLUMN } from "@/components/site-chrome";
import { ThoughtBubble } from "@/components/thought-bubble";
import { ARTIST, WORKS, portraitFor } from "@/lib/works";

const HIGHLIGHTS = [
  { slug: "lantern-tide", callout: "Vol. 3 out now", detail: "The harbour lights go out." },
  { slug: "salt-letters", callout: "Newcomer prize", detail: "The one that started it all." },
  { slug: "paper-comet", callout: "Brand new", detail: "Chapter 1 free to read." },
].map((item) => ({ ...item, work: WORKS.find((work) => work.slug === item.slug)! }));

export default function Home() {
  return (
    <div className={`${PAGE_COLUMN} gap-16 pt-8 pb-20 sm:gap-24 sm:pt-12`}>
      {/* Hero: the artist's name lettered as a splash panel, the intro thought beside it. */}
      <section aria-labelledby="hero-title" className="grid items-center gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
        <MangaFrame aspect="4/3" caption="Self-portrait as a title page. Ink and tone on newsprint.">
          <div aria-hidden className="speed-lines absolute inset-0 -z-1 opacity-60" />
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="bg-paper px-2 font-dialogue text-sm sm:text-base">manga artist</p>
            <h1 id="hero-title" className="bg-paper px-3 font-display text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.9] uppercase">
              Oriha <span className="text-spot">Sumi</span>
            </h1>
            <p lang="ja" className="bg-paper px-2 font-dialogue text-lg sm:text-2xl">
              {ARTIST.nameJa}
            </p>
          </div>
        </MangaFrame>

        <div className="flex flex-col items-start gap-6">
          <div className="md:hidden">
            <InkArrow direction="up" length="sm" curve="left" label="that's me, in ink" />
          </div>
          <div className="hidden md:block">
            <InkArrow direction="left" length="md" curve="right" label="that's me, in ink" />
          </div>
          <ThoughtBubble dots={3} tailSide="left" className="max-w-[32ch] text-base sm:text-lg">
            Hi! I draw ferries for ghosts, rockets made of exam paper and one very small monster with a
            day job.
          </ThoughtBubble>
          <CaptionBox font="body" className="text-base">
            Six series, ten volumes and one one-shot. Serialised in {ARTIST.magazine} since 2019.
          </CaptionBox>
          <Link
            href="/works"
            className="border-2 border-ink bg-ink px-5 py-2 font-display text-paper uppercase ink-shadow-spot hover:bg-spot focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            See the works
          </Link>
        </div>
      </section>

      {/* Highlights: each one pointed at by an inked arrow with its callout. */}
      <section aria-labelledby="highlights" className="flex flex-col gap-10">
        <div className="flex flex-col gap-4 sm:gap-10">
          <h2 id="highlights" className={HEADING}>
            This <InkMark kind="circle" color="spot">season</InkMark>
          </h2>
          <p className="max-w-prose text-base sm:text-lg">
            What I am working on, what just shipped and the story that got me{" "}
            <InkMark kind="underline" color="spot">my first serialisation</InkMark>.
          </p>
        </div>
        <ul className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
          {HIGHLIGHTS.map(({ work, callout, detail }, index) => (
            <li key={work.slug} className="flex flex-col gap-3">
              <InkArrow
                direction="down"
                length="sm"
                curve={index % 2 === 0 ? "left" : "right"}
                color="spot"
                label={callout}
                className="self-start"
              />
              <MangaFrame
                src={portraitFor(work.slug)}
                alt={work.lead.portraitAlt}
                aspect="4/3"
                matte={index === 1}
              />
              <h3 className="font-display text-2xl uppercase">
                <Link href={`/works/${work.slug}`} className="hover:text-spot">
                  {work.title}
                </Link>
              </h3>
              <p>
                {work.logline}{" "}
                <InkMark kind="highlight" color="spot">{detail}</InkMark>
              </p>
            </li>
          ))}
        </ul>
      </section>

      {/* Process: a short note on how the pages are made. */}
      <section aria-labelledby="process" className="grid gap-8 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-4">
          <h2 id="process" className={HEADING}>
            How a page <InkMark kind="box">happens</InkMark>
          </h2>
          <ol className="flex list-decimal flex-col gap-2 pl-5 text-base sm:text-lg">
            <li>Thumbnails on the back of receipts.</li>
            <li>
              Pencils, then ink with a <InkMark kind="underline">G-pen</InkMark>.
            </li>
            <li>
              Screentone last, and <InkMark kind="strike" color="spot">never</InkMark> only on the sky.
            </li>
          </ol>
        </div>
        <MangaFrame aspect="16/9" caption="The desk, most Tuesdays.">
          <div aria-hidden className="halftone-light absolute inset-0 -z-1" />
          <CaptionBox tone="tone" className="text-base">
            Deadline is Friday. It is always Friday.
          </CaptionBox>
        </MangaFrame>
      </section>
    </div>
  );
}

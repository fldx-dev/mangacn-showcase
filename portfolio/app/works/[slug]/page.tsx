import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaptionBox } from "@/components/caption-box";
import { CharacterCard } from "@/components/blocks/character-card/character-card";
import { InkArrow } from "@/components/ink-arrow";
import { MangaFrame } from "@/components/manga-frame";
import { HEADING, PAGE_COLUMN } from "@/components/site-chrome";
import { ThoughtBubble } from "@/components/thought-bubble";
import { WORKS, portraitFor } from "@/lib/works";

// Every work is prerendered and the route blocks on its params, as in the reference app.
export const instant = false;

export function generateStaticParams() {
  return WORKS.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const work = WORKS.find((item) => item.slug === slug);
  if (!work) return {};
  return { title: work.title, description: work.logline };
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const index = WORKS.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const work = WORKS[index];
  const previous = WORKS[(index - 1 + WORKS.length) % WORKS.length];
  const next = WORKS[(index + 1) % WORKS.length];
  const facts = [
    { label: "Run", value: work.years },
    { label: "Length", value: work.volumes },
    { label: "Genre", value: work.genre },
  ];

  return (
    <div className={`${PAGE_COLUMN} gap-12 pt-8 pb-20 sm:pt-12`}>
      <Link href="/works" className="self-start text-sm underline underline-offset-4 hover:text-spot">
        &larr; All works
      </Link>

      <section aria-labelledby="work-title" className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
        <MangaFrame
          src={portraitFor(work.slug)}
          alt={work.lead.portraitAlt}
          aspect="3/4"
          matte
          caption={`${work.lead.name}, lead of ${work.title}.`}
          // Below md the lead card further down shows the same portrait, so the hero frame is hidden.
          className="mx-auto hidden w-full max-w-sm md:block"
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <p lang="ja" className="font-dialogue text-xl">{work.titleJa}</p>
            <h1 id="work-title" className={HEADING}>{work.title}</h1>
          </div>
          <CaptionBox className="text-base sm:text-lg">{work.logline}</CaptionBox>
          {work.synopsis.map((paragraph) => (
            <p key={paragraph} className="max-w-prose text-base sm:text-lg">{paragraph}</p>
          ))}
          <dl className="grid grid-cols-1 gap-3 border-t-2 border-ink pt-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="font-display text-xs uppercase text-muted-foreground">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="lead" className="grid gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center">
        <div className="flex flex-col gap-4">
          <h2 id="lead" className={HEADING}>The lead</h2>
          <CharacterCard
            className="max-w-xl"
            name={work.lead.name}
            reading={work.lead.reading}
            castRole={work.lead.role}
            portrait={{ src: portraitFor(work.slug), alt: work.lead.portraitAlt }}
            quote={work.lead.quote}
            stats={work.lead.stats}
            status={work.status}
          />
        </div>
        <div className="flex flex-col items-start gap-3">
          <InkArrow direction="down" length="sm" curve="right" label="Artist's note" />
          <ThoughtBubble tailSide="right" className="text-base sm:text-lg">
            {work.note}
          </ThoughtBubble>
        </div>
      </section>

      <nav aria-label="More works" className="flex flex-col gap-3 border-t-2 border-ink pt-6 sm:flex-row sm:justify-between">
        <Link href={`/works/${previous.slug}`} className="hover:text-spot">
          &larr; <span className="font-display uppercase">{previous.title}</span>
        </Link>
        <Link href={`/works/${next.slug}`} className="hover:text-spot sm:text-right">
          <span className="font-display uppercase">{next.title}</span> &rarr;
        </Link>
      </nav>
    </div>
  );
}

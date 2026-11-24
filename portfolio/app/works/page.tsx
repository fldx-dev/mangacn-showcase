import type { Metadata } from "next";
import { CharacterCard } from "@/components/blocks/character-card/character-card";
import { InkMark } from "@/components/ink-mark";
import { HEADING, PAGE_COLUMN } from "@/components/site-chrome";
import { WORKS, portraitFor } from "@/lib/works";

export const metadata: Metadata = {
  title: "Works",
  description: "Every series by Oriha Sumi, introduced by its lead character.",
};

export default function WorksPage() {
  return (
    <div className={`${PAGE_COLUMN} gap-10 pt-8 pb-20 sm:pt-12`}>
      <header className="flex flex-col gap-3">
        <h1 className={HEADING}>Works</h1>
        <p className="max-w-prose text-base sm:text-lg">
          Six series, each introduced by the person it is <InkMark kind="underline" color="spot">really</InkMark>{" "}
          about. Pick one to read more.
        </p>
      </header>
      <ul className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {WORKS.map((work) => (
          <li key={work.slug} className="flex flex-col gap-2">
            <p className="font-display text-sm uppercase text-muted-foreground">
              {work.title} <span lang="ja">{work.titleJa}</span>
            </p>
            <CharacterCard
              className="max-w-none flex-1"
              name={work.lead.name}
              reading={work.lead.reading}
              castRole={work.lead.role}
              portrait={{ src: portraitFor(work.slug), alt: work.lead.portraitAlt }}
              quote={work.lead.quote}
              stats={work.lead.stats}
              status={work.status}
              href={`/works/${work.slug}`}
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

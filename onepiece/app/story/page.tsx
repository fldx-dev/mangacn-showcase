import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { FocusLines } from "@/components/focus-lines";
import { HomeMotion } from "@/components/home-motion";
import { Panel } from "@/components/panel";
import { SfxText } from "@/components/sfx-text";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { type ChartStop, StoryChart } from "@/components/story-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hasPublicFile } from "@/lib/crew";
import { STORY, STORY_UP_TO } from "@/lib/story";
import "./chart.css";

export const metadata: Metadata = {
  title: "The story, saga by saga | One Piece fan page",
  description:
    "Every saga and arc of One Piece in order: where it happens, what happens, who joins the crew and which chapters to read.",
};

const HEADING = "font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight uppercase";

function chapters([first, last]: readonly [number | null, number | null], ongoing?: boolean) {
  if (first == null) return "Chapters not listed";
  if (ongoing || last == null) return `Ch. ${first} onward`;
  return first === last ? `Ch. ${first}` : `Ch. ${first} to ${last}`;
}

export default function StoryPage() {
  const arcCount = STORY.reduce((sum, saga) => sum + saga.arcs.length, 0);
  let imagesSeen = 0;

  // The sea chart: every arc is a stop, in three seas, on two ships.
  const stops: ChartStop[] = STORY.flatMap((saga) =>
    saga.arcs.map((arc, index) => ({
      slug: arc.slug,
      name: arc.name,
      chapters: chapters(arc.chapters, arc.ongoing),
      saga: saga.name,
      sagaStart: index === 0,
    })),
  );
  const stopIndex = (slug: string) => stops.findIndex((stop) => stop.slug === slug);
  const seas = [
    { name: "East Blue", from: 0 },
    { name: "Grand Line: Paradise", from: stopIndex("reverse-mountain") },
    { name: "New World", from: stopIndex("fish-man-island") },
  ];
  // The Thousand Sunny is launched at the end of Post-Enies Lobby.
  const sunnyFrom = stopIndex("thriller-bark");

  return (
    <div className="paper-grain flex flex-1 flex-col overflow-x-clip">
      <SiteHeader />
      <HomeMotion />

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 pt-6 pb-20 outline-none sm:gap-24 sm:px-6 sm:pt-10 sm:pb-28"
      >
        <Panel shadow caption="The whole voyage" className="gap-6 p-5 sm:p-10">
          <FocusLines
            color="tone"
            length="long"
            center={[80, 40]}
            className="inset-(--outline-width-heavy)"
          />
          <h1 className="pt-4">
            <SfxText
              size="xl"
              color="spot"
              rotate={-3}
              className="text-[clamp(2.75rem,11vw,7rem)] leading-none sm:text-[clamp(2.75rem,11vw,7rem)] sm:leading-none"
            >
              The story so far
            </SfxText>
          </h1>
          <CaptionBox className="text-base sm:text-lg">
            {STORY.length} sagas and {arcCount} arcs, from chapter 1 to chapter{" "}
            {STORY_UP_TO.toLocaleString("en-US")} and counting. Here is every stop on the route, in
            the order it was sailed. Spoilers all the way down.
          </CaptionBox>
          <nav aria-label="Sagas">
            <ol className="flex flex-wrap gap-2">
              {STORY.map((saga, index) => (
                <li key={saga.slug}>
                  <Button
                    variant="outline"
                    nativeButton={false}
                    render={<a href={`#${saga.slug}`} />}
                  >
                    <span className="font-display text-spot">{index + 1}</span> {saga.name}
                  </Button>
                </li>
              ))}
            </ol>
          </nav>
        </Panel>

        <div className="grid gap-x-10 lg:grid-cols-[11rem_minmax(0,1fr)]">
          <StoryChart stops={stops} seas={seas} sunnyFrom={sunnyFrom} />
          <div className="flex min-w-0 flex-col gap-16 pt-8 sm:gap-24 lg:pt-0">
        {STORY.map((saga, sagaIndex) => (
          <section
            key={saga.slug}
            id={saga.slug}
            aria-labelledby={`${saga.slug}-title`}
            className="flex scroll-mt-40 flex-col gap-8 lg:scroll-mt-20"
          >
            <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
              <h2 id={`${saga.slug}-title`} data-wipe className={HEADING}>
                <span className="text-spot">{sagaIndex + 1}.</span> {saga.name}
              </h2>
              <p className="font-display text-sm tracking-widest text-muted-foreground uppercase">
                {chapters(saga.chapters, saga.arcs.some((arc) => arc.ongoing))} &middot;{" "}
                {saga.arcs.length} {saga.arcs.length === 1 ? "arc" : "arcs"}
              </p>
            </div>

            <ol className="relative flex flex-col gap-8 pl-10 sm:pl-14">
              <span aria-hidden="true" className="growth-line growth-line--route" />
              <span aria-hidden="true" data-ink-line className="growth-line growth-line--inked" />
              {saga.arcs.map((arc, arcIndex) => {
                // Artwork is optional: an arc reads as text alone when its files are absent.
                const images = arc.images.filter((image) => hasPublicFile(image.src));
                return (
                <li key={arc.slug} id={arc.slug} data-reveal className="relative scroll-mt-40 lg:scroll-mt-24">
                  <span aria-hidden="true" className="growth-node">
                    {arcIndex + 1}
                  </span>
                  <Panel
                    as="article"
                    caption={chapters(arc.chapters, arc.ongoing)}
                    captionFont="body"
                    className={
                      images.length > 0
                        ? "gap-6 pt-14 xl:grid xl:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] xl:items-start"
                        : "gap-4 pt-14"
                    }
                  >
                    <div className="flex min-w-0 flex-col gap-4">
                      <div className="flex flex-col gap-1">
                        <h3 className="font-display text-2xl leading-tight uppercase sm:text-4xl">
                          {arc.name}
                        </h3>
                        <p className="font-dialogue text-base text-muted-foreground">
                          {arc.setting}
                          {arc.ongoing ? " · still running" : ""}
                        </p>
                      </div>
                      <p className="max-w-prose text-base leading-relaxed">{arc.summary}</p>
                      <ul className="flex max-w-prose list-disc flex-col gap-1.5 pl-5 text-base leading-relaxed marker:text-spot">
                        {arc.events.map((event) => (
                          <li key={event}>{event}</li>
                        ))}
                      </ul>
                      <dl className="flex flex-col gap-2 text-sm">
                        {arc.villain && (
                          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                              Up against
                            </dt>
                            <dd className="font-dialogue text-base">{arc.villain}</dd>
                          </div>
                        )}
                        {arc.joins.length > 0 && (
                          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                              Joins the crew
                            </dt>
                            <dd className="flex flex-wrap gap-2">
                              {arc.joins.map((member) =>
                                member.slug ? (
                                  <Badge
                                    key={member.name}
                                    variant="spot"
                                    render={<Link href={`/crew/${member.slug}`} />}
                                  >
                                    {member.name}
                                  </Badge>
                                ) : (
                                  <Badge key={member.name} variant="spot">
                                    {member.name}
                                  </Badge>
                                ),
                              )}
                            </dd>
                          </div>
                        )}
                      </dl>
                    </div>
                    {images.length > 0 && (
                      <div className="flex min-w-0 flex-col gap-4">
                        {images.map((image) => {
                          const eager = imagesSeen++ === 0;
                          return (
                            <figure key={image.src} className="flex flex-col gap-2">
                              <span className="halftone-light relative block aspect-[4/3] w-full overflow-clip border-2 border-ink bg-paper">
                                <Image
                                  src={image.src}
                                  alt={image.alt}
                                  fill
                                  priority={eager}
                                  sizes="(min-width: 1024px) 28rem, 85vw"
                                  className="object-contain"
                                />
                              </span>
                              <figcaption className="text-xs text-muted-foreground">
                                {image.alt} ({image.kind})
                              </figcaption>
                            </figure>
                          );
                        })}
                      </div>
                    )}
                  </Panel>
                </li>
                );
              })}
            </ol>
          </section>
        ))}
          </div>
        </div>

        <p className="text-sm text-muted-foreground">
          Chapter numbers and arc names follow the One Piece Wiki. All artwork &copy; Eiichiro Oda
          / Shueisha.
        </p>
      </main>

      <SiteFooter />
    </div>
  );
}

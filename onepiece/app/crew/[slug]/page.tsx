import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CaptionBox } from "@/components/caption-box";
import { AuthoredHero, hasAuthoredHero } from "@/components/crew/crew-hero";
import { HeroDefault } from "@/components/crew/hero-default";
import { HomeMotion } from "@/components/home-motion";
import { Panel } from "@/components/panel";
import { PowerGauge } from "@/components/power-gauge";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CREW, formFor, posterFor } from "@/lib/crew";
import { CREW_DETAILS } from "@/lib/crew-details";
import { STORY } from "@/lib/story";
import "../crew.css";
import "../heroes-a.css";
import "../heroes-b.css";

// Every crew page is prerendered and tiny, so the route blocks on its params: an unknown slug
// gets a real 404 status instead of a streamed not-found.
export const instant = false;

const HEADING = "font-display text-[clamp(2rem,6vw,4.5rem)] leading-[0.95] tracking-tight uppercase";

export function generateStaticParams() {
  return CREW.map((member) => ({ slug: member.slug }));
}

export async function generateMetadata({ params }: PageProps<"/crew/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const member = CREW.find((item) => item.slug === slug);
  if (!member) return {};
  return {
    title: `${member.name} | Straw Hat Pirates`,
    description: `${member.name}, "${member.epithet}": ${member.role} of the Straw Hat Pirates. ${member.dream}`,
    // No `openGraph` here: the root layout's is inherited, and it takes this title and description.
    alternates: { canonical: `/crew/${member.slug}` },
  };
}

/** Every arc of the story by slug, for the links from a growth stage to /story. */
const ARCS = new Map(STORY.flatMap((saga) => saga.arcs).map((arc) => [arc.slug, arc]));

const PAGE_COLUMN =
  "mx-auto flex w-full max-w-6xl flex-col gap-8 px-4 pt-6 pb-16 sm:gap-10 sm:px-6 sm:pt-10 sm:pb-24";

function CrewDetail({ index }: { index: number }) {
  const member = CREW[index];
  const previous = CREW[(index - 1 + CREW.length) % CREW.length];
  const next = CREW[(index + 1) % CREW.length];
  const details = CREW_DETAILS[member.slug];
  const poster = posterFor(member.slug);
  // The credit is printed once, and only when the page shows any of the series' artwork.
  const hasArtwork =
    poster != null || details.growth.some((stage) => formFor(member.slug, stage.key) != null);
  const berries = (amount: number) => `\u0e3f ${amount.toLocaleString("en-US")}`;
  const top = details.bounties[details.bounties.length - 1].amount;
  const arsenal = [
    { label: "Fighting style", value: details.style },
    { label: "Weapon", value: details.weapon },
    {
      label: "Haki",
      value: details.haki.length > 0 ? details.haki.join(", ") : "None shown so far",
    },
  ];

  return (
    <>
      {/* Arsenal: what they fight with. */}
      <section aria-labelledby="arsenal" className="flex flex-col gap-8">
        <h2 id="arsenal" data-wipe className={HEADING}>
          Arsenal
        </h2>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)]">
          <Panel
            as="div"
            shadow
            tone={details.devilFruit ? "halftone" : "lines"}
            caption="Devil fruit"
            captionFont="body"
            data-reveal
            className="justify-end gap-3 pt-14"
          >
            {details.devilFruit ? (
              <CaptionBox className="max-w-none text-base">
                <p className="font-display text-xl leading-tight uppercase sm:text-2xl">
                  {details.devilFruit.name}
                </p>
                <p className="mt-1 font-display text-xs tracking-widest text-spot uppercase">
                  {details.devilFruit.type}
                </p>
                <p className="mt-2">{details.devilFruit.text}</p>
              </CaptionBox>
            ) : (
              <CaptionBox className="max-w-none text-base">
                <p className="font-display text-xl leading-tight uppercase sm:text-2xl">
                  None
                </p>
                <p className="mt-2">
                  Never ate one. Everything here is training, and {member.name.split(" ")[0]} can
                  still swim.
                </p>
              </CaptionBox>
            )}
          </Panel>
          <dl className="flex flex-col">
            {arsenal.map((item) => (
              <div
                key={item.label}
                data-reveal
                className="grid gap-1 border-b-2 border-ink py-4 first:border-t-2 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
              >
                <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                  {item.label}
                </dt>
                <dd className="font-dialogue text-lg leading-snug">{item.value}</dd>
              </div>
            ))}
            <div
              data-reveal
              className="grid gap-2 py-4 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6"
            >
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Signature moves
              </dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {details.moves.map((move) => (
                    <li key={move}>
                      <Badge variant="outline" className="h-auto py-1.5 text-xs whitespace-normal">
                        {move}
                      </Badge>
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </section>

      {/* Growth: the stages of the character, in story order, on a line that inks in. */}
      <section aria-labelledby="growth" className="flex flex-col gap-8">
        <h2 id="growth" data-wipe className={HEADING}>
          Growth
        </h2>
        <ol className="relative flex flex-col gap-8 pl-10 sm:pl-14">
          <span aria-hidden="true" className="growth-line growth-line--route" />
          <span aria-hidden="true" data-ink-line className="growth-line growth-line--inked" />
          {details.growth.map((stage, order) => {
            const image = formFor(member.slug, stage.key);
            const arc = stage.arc ? ARCS.get(stage.arc) : undefined;
            return (
              <li key={stage.key} data-reveal className="relative">
                <span aria-hidden="true" className="growth-node">
                  {order + 1}
                </span>
                <Panel
                  as="article"
                  caption={stage.when}
                  captionFont="body"
                  className={
                    image
                      ? "gap-5 pt-14 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center"
                      : "gap-2 pt-14"
                  }
                >
                  <div className="flex flex-col gap-2">
                    <h3 className="font-display text-2xl leading-tight uppercase sm:text-4xl">
                      {stage.title}
                    </h3>
                    <p className="max-w-prose text-base leading-relaxed">{stage.text}</p>
                    {arc && (
                      <p className="mt-1 text-sm">
                        <Link href={`/story#${arc.slug}`} className="ink-link">
                          Read the {arc.name} arc
                        </Link>
                      </p>
                    )}
                  </div>
                  {image && (
                    <figure className="flex flex-col gap-2">
                      <span className="halftone-light relative block aspect-[4/3] w-full overflow-clip border-2 border-ink bg-paper">
                        <Image
                          src={image}
                          alt={`${member.name}: ${stage.title}`}
                          fill
                          sizes="(min-width: 1024px) 32rem, 90vw"
                          className="object-contain"
                        />
                      </span>
                      <figcaption className="text-xs text-muted-foreground">
                        {stage.imageSource ?? "Manga"}
                      </figcaption>
                    </figure>
                  )}
                </Panel>
              </li>
            );
          })}
        </ol>
      </section>

      {/* Bounty history: real figures, each bar measured against today's. */}
      <section aria-labelledby="bounties" className="flex flex-col gap-8">
        <h2 id="bounties" data-wipe className={HEADING}>
          The price on {member.name.split(" ").pop()}
        </h2>
        <Panel as="div" shadow data-reveal className="gap-6 p-5 sm:p-8">
          {details.bounties.map((bounty, order) => (
            <PowerGauge
              key={bounty.after}
              label={`After ${bounty.after}`}
              value={bounty.amount}
              max={top}
              color={order === details.bounties.length - 1 ? "spot" : "ink"}
              format={berries}
            />
          ))}
        </Panel>
      </section>

      {hasArtwork && (
        <p className="text-xs text-muted-foreground">
          Artwork &copy; Eiichiro Oda / Shueisha, Toei Animation
        </p>
      )}

      <nav aria-label="Crew members" className="flex flex-wrap justify-between gap-3">
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={<Link href={`/crew/${previous.slug}`} />}
        >
          &larr; {previous.name}
        </Button>
        <Button
          variant="outline"
          size="lg"
          nativeButton={false}
          render={<Link href={`/crew/${next.slug}`} />}
        >
          {next.name} &rarr;
        </Button>
      </nav>
    </>
  );
}

export default async function CrewMemberPage({ params }: PageProps<"/crew/[slug]">) {
  const { slug } = await params;
  const index = CREW.findIndex((item) => item.slug === slug);
  if (index === -1) notFound();
  const member = CREW[index];
  const poster = posterFor(member.slug);
  // A hero authored for this member runs edge to edge and opens the page, so it sits outside the
  // page column and places the link back itself; everyone else gets the shared hero inside it.
  const authored = hasAuthoredHero(member.slug);
  const back = (
    <Button
      variant="ghost"
      className="self-start"
      nativeButton={false}
      render={<Link href="/#crew" />}
    >
      &larr; All crew
    </Button>
  );

  return (
    <div className="paper-grain flex flex-1 flex-col overflow-x-clip">
      <SiteHeader />
      <HomeMotion key={slug} />

      <main id="main" tabIndex={-1} className="flex flex-1 flex-col outline-none">
        {authored && <AuthoredHero member={member} poster={poster} back={back} />}
        <div className={PAGE_COLUMN}>
          {!authored && back}
          {!authored && <HeroDefault member={member} poster={poster} />}
          <CrewDetail index={index} />
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}

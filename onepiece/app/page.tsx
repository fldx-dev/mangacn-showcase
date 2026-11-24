import Image from "next/image";
import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { Emanata } from "@/components/emanata";
import { FocusLines } from "@/components/focus-lines";
import { CrewWall } from "@/components/home/crew-wall";
import { MangaShelf } from "@/components/home/manga-shelf";
import { HomeMotion } from "@/components/home-motion";
import { InkSplatter } from "@/components/ink-splatter";
import { Panel } from "@/components/panel";
import { PosterFallback } from "@/components/poster-fallback";
import { SfxText } from "@/components/sfx-text";
import { SfxTicker } from "@/components/sfx-ticker";
import { GoingMerry, ThousandSunny } from "@/components/ship-icons";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SpeechBubble } from "@/components/speech-bubble";
import { Stamp } from "@/components/stamp";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { VerticalText } from "@/components/vertical-text";
import { CREW, posterFor } from "@/lib/crew";
import { sagaChapterLabel } from "@/lib/story";
import "./home.css";

const SAGAS = [
  {
    name: "East Blue",
    chapters: sagaChapterLabel("east-blue-saga"),
    sfx: "ドン!",
    tone: "halftone",
    wide: true,
    text: "A rubber boy in a straw hat leaves a tiny village in a tiny boat. One by one, a swordsman, a navigator, a liar and a cook climb aboard.",
  },
  {
    name: "Alabasta",
    chapters: sagaChapterLabel("alabasta-saga"),
    sfx: "ザァァ",
    tone: "cross",
    wide: false,
    text: "A desert kingdom, a princess in disguise, and a warlord pulling the strings.",
  },
  {
    name: "Sky Island",
    chapters: sagaChapterLabel("sky-island-saga"),
    sfx: "ゴロゴロ",
    tone: "lines",
    wide: false,
    text: "Up the Knock-Up Stream to a city of gold above the clouds.",
  },
  {
    name: "Water 7",
    chapters: sagaChapterLabel("water-7-saga"),
    sfx: "ザバァン",
    tone: "halftone",
    wide: false,
    text: "A broken ship, a broken crew, and a declaration of war on the world.",
  },
  {
    name: "Summit War",
    chapters: sagaChapterLabel("summit-war-saga"),
    sfx: "グラグラ",
    tone: "lines",
    wide: false,
    text: "Marineford. Every great power on one battlefield, and a price nobody was ready to pay.",
  },
  {
    name: "Wano Country",
    chapters: sagaChapterLabel("wano-country-saga"),
    sfx: "べべん!",
    tone: "cross",
    wide: true,
    text: "Samurai, a closed nation, and an emperor called the strongest creature alive. Twenty years of waiting end in one night on Onigashima.",
  },
] as const;

/** The route down the timeline: through the node of every saga, swinging wide between them. */
const ROUTE =
  "M50 0V50Q95 100 50 150Q5 200 50 250Q95 300 50 350Q5 400 50 450Q95 500 50 550V600";

/** What happens to the ship at a saga, by index; shown beside the route on wide screens. */
const SHIP_NOTES: Record<number, string> = {
  0: "The Going Merry, a gift from Syrup Village.",
  3: "The Going Merry sails her last voyage.",
  4: "Built in Water 7: the Thousand Sunny takes the helm.",
};

const NUMBERS = [
  { value: "1,100+", label: "Chapters and counting" },
  { value: "110+", label: "Collected volumes" },
  { value: "500M+", label: "Copies in circulation" },
];

const HEADING =
  "font-display text-[clamp(2.25rem,7vw,5.5rem)] leading-[0.95] tracking-tight text-balance uppercase";

// The size override resets the line height, so `leading-none` is restated after it.
const TITLE_SIZE =
  "text-[clamp(4.25rem,17vw,8.75rem)] leading-none sm:text-[clamp(4.25rem,17vw,8.75rem)] sm:leading-none";

/** Twelve crests across, drawn twice as wide as its box so it can drift by half and loop. */
const WAVE_CREST = `M0 30${"q25 -26 50 0t50 0".repeat(12)}`;
const WAVE_PATH = `${WAVE_CREST}V60H0Z`;

function Wave({ className }: { className: string }) {
  return (
    <svg
      viewBox="0 0 1200 60"
      preserveAspectRatio="none"
      className={`sea-wave absolute left-0 w-[200%] min-w-[80rem] ${className}`}
    >
      <path d={WAVE_PATH} fill="currentColor" />
      <path
        d={WAVE_CREST}
        fill="none"
        stroke="var(--ink)"
        strokeWidth={2}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

export default function Home() {
  const luffyPoster = posterFor("luffy");
  return (
    <div className="paper-grain flex flex-1 flex-col overflow-x-clip">
      <SiteHeader />
      <HomeMotion />

      <main id="main" tabIndex={-1} className="flex flex-col outline-none">
        {/* Hero */}
        <div data-hero className="mx-auto w-full max-w-6xl px-4 pt-6 pb-24 sm:px-6 sm:pt-10 sm:pb-32">
          <Panel
            shadow
            caption="Chapter 1: Romance Dawn"
            className="p-5 sm:p-10 lg:min-h-[calc(100svh-9rem)] lg:justify-center"
          >
            <FocusLines
              color="tone"
              length="long"
              count={96}
              center={[30, 45]}
              className="inset-(--outline-width-heavy)"
            />
            <VerticalText
              lang="ja"
              aria-hidden="true"
              className="absolute top-6 right-4 hidden font-dialogue text-lg tracking-[0.3em] text-ink lg:block"
            >
              富・名声・力
            </VerticalText>
            <div className="grid items-center gap-10 py-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:py-10">
              <div className="relative flex flex-col items-start gap-6">
                <InkSplatter
                  kind="splat"
                  size="lg"
                  color="spot"
                  seed={7}
                  aria-hidden="true"
                  className="absolute -top-10 -left-8 -z-1 sm:-left-12"
                />
                <div data-reveal>
                  <Badge variant="outline">Story &amp; art by Eiichiro Oda</Badge>
                </div>
                <h1 className="flex flex-col items-start gap-1 sm:gap-2">
                  <span data-title="-1" className="inline-block">
                    <SfxText size="xl" color="paper" rotate={-4} className={TITLE_SIZE}>
                      One
                    </SfxText>
                  </span>{" "}
                  <span data-title="1" className="inline-block">
                    <SfxText size="xl" color="spot" rotate={-4} className={TITLE_SIZE}>
                      Piece
                    </SfxText>
                  </span>
                </h1>
                <div data-reveal>
                  <CaptionBox className="text-base sm:text-lg">
                    Wealth, fame, power. One man had it all, and his last words sent the whole
                    world out to sea.
                  </CaptionBox>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    size="lg"
                    className="h-12 px-6 text-base"
                    nativeButton={false}
                    render={<a href="#story" />}
                  >
                    Start the voyage
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="h-12 px-6 text-base"
                    nativeButton={false}
                    render={<a href="#crew" />}
                  >
                    Meet the crew
                  </Button>
                </div>
              </div>

              {/* The poster hangs off the panel's lower edge: it breaks the frame on purpose. */}
              <div className="relative mx-auto mt-32 w-full max-w-[17rem] sm:max-w-xs lg:top-28 lg:mt-0 lg:-mb-16 lg:max-w-sm">
                <div data-depth="-0.12" className="absolute -top-32 -left-8 z-2 sm:-left-28 lg:-top-24 lg:-left-36">
                  <SpeechBubble
                    shape="shout"
                    tail="bottom-right"
                    aria-label="Luffy"
                    data-reveal
                    className="max-w-[11rem] text-base sm:max-w-[14rem] sm:text-xl"
                  >
                    I&apos;m gonna be King of the Pirates!
                  </SpeechBubble>
                </div>
                <div data-depth="0.1" className="lg:mt-10">
                  <Link
                    href="/crew/luffy"
                    className="poster block"
                    style={{ "--tilt": "4deg" } as React.CSSProperties}
                  >
                    <Panel as="div" shadow className="p-2">
                      {luffyPoster ? (
                        <span className="relative block aspect-[2/3] w-full overflow-clip">
                          <Image
                            src={luffyPoster}
                            alt="Wanted poster of Monkey D. Luffy, bounty 3,000,000,000 berries"
                            fill
                            priority
                            sizes="(min-width: 1024px) 24rem, 20rem"
                            className="object-cover"
                          />
                        </span>
                      ) : (
                        <PosterFallback
                          epithet={CREW[0].epithet}
                          name={CREW[0].name}
                          className="text-sm sm:text-xl"
                        />
                      )}
                    </Panel>
                  </Link>
                </div>
                <div data-depth="0.22" className="absolute -bottom-20 -left-8 z-2 sm:-left-20 lg:-bottom-14">
                  <Stamp size="lg" vertical lang="ja" aria-label="Pirate King" data-reveal>
                    海賊王
                  </Stamp>
                </div>
                <Emanata
                  kind="surprise"
                  size="lg"
                  color="spot"
                  aria-hidden="true"
                  className="absolute top-8 -right-6 rotate-12 lg:top-2"
                />
              </div>
            </div>
          </Panel>
        </div>

        <div className="-mx-4 -rotate-1 border-y-2 border-ink bg-paper">
          <SfxTicker
            size="lg"
            speed="fast"
            label="Sound effects"
            words={[
              { text: "ドン！", color: "spot", lang: "ja" },
              "Gomu Gomu!",
              { text: "ゴゴゴ", lang: "ja" },
              { text: "Shishishi!", color: "spot" },
              { text: "ドドド", lang: "ja" },
              "Yohoho!",
            ]}
          />
        </div>

        {/* Story */}
        <section
          id="story"
          className="mx-auto flex w-full max-w-6xl scroll-mt-28 sm:scroll-mt-20 flex-col gap-10 px-4 py-20 sm:px-6 sm:py-28"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2 data-wipe className={`${HEADING} max-w-[14ch]`}>
              From one barrel to the <span className="text-spot">New World</span>
            </h2>
            <div data-reveal className="flex max-w-xs flex-col items-start gap-3">
              <p className="font-dialogue text-base">Six sagas out of many, sailed on two ships.</p>
              <Button variant="outline" nativeButton={false} render={<Link href="/story" />}>
                Every saga and arc &rarr;
              </Button>
            </div>
          </div>
          {/* The voyage: a route down the page, sailed by the two ships of the crew. */}
          <div
            data-voyage
            className="relative grid auto-rows-fr grid-cols-[3.5rem_minmax(0,1fr)] gap-y-10 lg:grid-cols-[minmax(0,1fr)_9rem_minmax(0,1fr)] lg:gap-y-6"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 100 600"
              preserveAspectRatio="none"
              className="voyage-route text-tone-3"
            >
              <path data-voyage-path d={ROUTE} strokeDasharray="2 10" />
            </svg>
            <svg
              aria-hidden="true"
              data-voyage-sailed
              viewBox="0 0 100 600"
              preserveAspectRatio="none"
              className="voyage-route voyage-route--sailed text-ink"
            >
              <path d={ROUTE} />
            </svg>
            <div data-voyage-ship data-ship="merry" aria-hidden="true" className="voyage-ship">
              <span className="voyage-ship__hull">
                <GoingMerry data-ship="merry" />
                <ThousandSunny data-ship="sunny" />
              </span>
            </div>

            {SAGAS.map((saga, index) => {
              const left = index % 2 === 0;
              const note = SHIP_NOTES[index];
              return (
                <div key={saga.name} className="contents">
                  <div
                    style={{ gridRow: index + 1 }}
                    className="col-start-1 flex items-center justify-center lg:col-start-2"
                  >
                    {/* Without motion the two ships sit where each one joins the voyage. */}
                    {index === 0 && <GoingMerry className="voyage-static size-14" />}
                    {index === 4 && <ThousandSunny className="voyage-static size-14" />}
                    <span aria-hidden="true" className="voyage-node" />
                  </div>
                  <div
                    data-reveal
                    style={{ gridRow: index + 1 }}
                    className={`col-start-2 grid ${left ? "lg:col-start-1" : "lg:col-start-3"}`}
                  >
                    <Panel
                      as="article"
                      tone={saga.tone}
                      caption={saga.chapters}
                      captionFont="body"
                      className="min-h-56 justify-end lg:min-h-64"
                    >
                      <SfxText
                        size="md"
                        color={index % 3 === 0 ? "spot" : "paper"}
                        rotate={index % 2 ? 7 : -8}
                        lang="ja"
                        aria-hidden="true"
                        className="absolute -top-5 right-2 z-2 sm:-right-3"
                      >
                        {saga.sfx}
                      </SfxText>
                      <CaptionBox tone="paper" className="mt-auto max-w-none">
                        <h3 className="font-display text-xl uppercase sm:text-2xl">{saga.name}</h3>
                        <p className="mt-1">{saga.text}</p>
                      </CaptionBox>
                    </Panel>
                  </div>
                  {note && (
                    <div
                      data-reveal
                      style={{ gridRow: index + 1 }}
                      className={`hidden items-center lg:flex ${left ? "lg:col-start-3" : "lg:col-start-1 lg:justify-end"}`}
                    >
                      <SpeechBubble shape="square" tail={left ? "left" : "right"} tone="light">
                        {note}
                      </SpeechBubble>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Crew: the one inverted band, a wall of pinned posters cut on the diagonal. */}
        <section
          id="crew"
          className="dark scroll-mt-10 bg-paper pt-28 pb-20 text-ink [clip-path:polygon(0_3vw,100%_0,100%_calc(100%-3vw),0_100%)] sm:pt-36 sm:pb-24"
        >
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-6">
              <h2 data-wipe className={HEADING}>
                Wanted: the <span className="text-spot">Straw Hat</span> Pirates
              </h2>
              <SpeechBubble shape="whisper" tail="bottom-right" data-reveal>
                Ten dreams. One ship.
              </SpeechBubble>
            </div>
            <CrewWall />
          </div>
        </section>

        {/* Numbers */}
        <section
          id="numbers"
          className="mx-auto flex w-full max-w-6xl scroll-mt-28 sm:scroll-mt-20 flex-col gap-10 px-4 py-20 sm:gap-14 sm:px-6 sm:py-28"
        >
          <h2 data-wipe className={`${HEADING} max-w-[16ch]`}>
            A voyage nearly 30 years long
          </h2>
          <MangaShelf figures={NUMBERS} />
        </section>

        {/* CTA */}
        <section
          id="set-sail"
          className="mx-auto w-full max-w-6xl scroll-mt-28 sm:scroll-mt-20 px-4 pb-24 sm:px-6 sm:pb-32"
        >
          <Panel
            shadow
            as="div"
            data-reveal
            caption="Next chapter"
            className="items-center gap-6 px-5 pt-20 pb-72 text-center sm:pt-24 sm:pb-[26rem]"
          >
            {/* The scene: a red sun coming up over three bands of ink sea, and the ship on it. */}
            <div
              aria-hidden="true"
              data-sea
              className="pointer-events-none absolute inset-(--outline-width-heavy) isolate -z-1 overflow-clip"
            >
              <FocusLines color="tone" length="long" count={72} center={[50, 70]} />
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 sm:bottom-36">
                <div
                  data-sun
                  className="size-44 rounded-full border-2 border-ink bg-spot sm:size-64"
                />
              </div>
              <Wave className="bottom-14 h-20 text-tone-2 [animation-duration:38s] sm:bottom-24 sm:h-28" />
              <Wave className="bottom-9 h-16 text-paper [animation-duration:24s] [animation-direction:reverse] sm:bottom-14 sm:h-24" />
              <div className="sea-ship absolute bottom-12 left-[8%] size-28 sm:bottom-20 sm:left-[16%] sm:size-48">
                <ThousandSunny className="size-full" />
              </div>
              <Wave className="bottom-0 h-16 text-ink [animation-duration:15s] sm:h-24" />
              <VerticalText
                lang="ja"
                className="absolute top-6 right-4 hidden font-dialogue text-lg tracking-[0.3em] text-ink lg:block"
              >
                出航だ！
              </VerticalText>
            </div>
            <div className="absolute bottom-36 left-[36%] z-2 sm:bottom-64 sm:left-[30%]">
              <SpeechBubble tail="bottom-left" className="text-sm sm:text-lg">
                Next island, here we come!
              </SpeechBubble>
            </div>
            <span className="inline-block">
              <SfxText
                size="xl"
                color="spot"
                rotate={-3}
                className="text-[clamp(3.25rem,13vw,8rem)] leading-none sm:text-[clamp(3.25rem,13vw,8rem)] sm:leading-none"
              >
                Set sail!
              </SfxText>
            </span>
            <CaptionBox className="text-base sm:text-lg">
              The treasure is still out there. Start at chapter one and catch up with the crew.
            </CaptionBox>
            <div className="flex flex-wrap justify-center gap-3">
              <Button
                size="lg"
                className="h-12 px-6 text-base"
                nativeButton={false}
                render={
                  <a
                    href="https://mangaplus.shueisha.co.jp/"
                    target="_blank"
                    rel="noreferrer noopener"
                  />
                }
              >
                Read on MANGA Plus
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 px-6 text-base"
                nativeButton={false}
                render={<a href="https://one-piece.com/" target="_blank" rel="noreferrer noopener" />}
              >
                Official site
              </Button>
            </div>
          </Panel>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}

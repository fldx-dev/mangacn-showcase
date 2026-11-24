import Image from "next/image";
import Link from "next/link";
import { Panel } from "@/components/panel";
import { PosterFallback } from "@/components/poster-fallback";
import { Badge } from "@/components/ui/badge";
import { CREW, posterFor } from "@/lib/crew";

/** Where a poster hangs: left, top and width in hundredths of the wall's width, and its lean. */
interface Hang {
  x: number;
  y: number;
  w: number;
  r: number;
  /** Stacking order where posters overlap; higher lies on top. */
  z?: number;
}

/** What holds a poster up. `single` has lost a pin and swings from the one that is left. */
type Fix = "pin" | "tape" | "corners" | "single";

interface Placement {
  /** The wide wall (from 1024 px): the captain on the left, two uneven rows beside him. */
  lg: Hang;
  /** The middle wall (704 to 1023 px): the captain and four officers, then a row of five. */
  md: Hang;
  /** The lean on a phone, where the posters hang in two staggered columns. */
  sm: number;
  fix: Fix;
}

/** The wall is authored, poster by poster. Document order stays the crew's order of joining. */
const PLACEMENTS: Record<string, Placement> = {
  luffy: {
    lg: { x: 1.5, y: 3, w: 26, r: -3, z: 4 },
    md: { x: 2.5, y: 4, w: 42, r: -3, z: 4 },
    sm: -2,
    fix: "corners",
  },
  zoro: {
    lg: { x: 30, y: 0, w: 17, r: 2, z: 1 },
    md: { x: 47, y: 0, w: 27, r: 2.5, z: 1 },
    sm: 2,
    fix: "pin",
  },
  nami: {
    lg: { x: 46, y: 3.5, w: 15, r: -2.5, z: 2 },
    md: { x: 72.5, y: 7, w: 26, r: -2, z: 2 },
    sm: -1.5,
    fix: "tape",
  },
  usopp: {
    lg: { x: 63, y: 0.5, w: 16.5, r: 1.5, z: 1 },
    md: { x: 45.5, y: 56, w: 25, r: -2, z: 2 },
    sm: 1.5,
    fix: "pin",
  },
  sanji: {
    lg: { x: 81.5, y: 1.5, w: 17.5, r: -2, z: 2 },
    md: { x: 71, y: 62, w: 28, r: 2, z: 3 },
    sm: -2,
    fix: "corners",
  },
  chopper: {
    lg: { x: 30.5, y: 38, w: 12, r: 8, z: 3 },
    md: { x: 2.5, y: 114, w: 16, r: 7, z: 3 },
    sm: 3,
    fix: "single",
  },
  robin: {
    lg: { x: 43.5, y: 36.5, w: 15.5, r: -1.5, z: 2 },
    md: { x: 19.5, y: 108, w: 23, r: -2, z: 2 },
    sm: -1.5,
    fix: "tape",
  },
  franky: {
    lg: { x: 59.5, y: 38.5, w: 14.5, r: 2.5, z: 1 },
    md: { x: 43.5, y: 119, w: 18.5, r: 2, z: 1 },
    sm: 2,
    fix: "pin",
  },
  brook: {
    lg: { x: 73.5, y: 36.5, w: 12.5, r: -3, z: 2 },
    md: { x: 62.5, y: 123, w: 16.5, r: -2.5, z: 2 },
    sm: -2.5,
    fix: "tape",
  },
  jinbe: {
    lg: { x: 86, y: 39.5, w: 14, r: 2, z: 1 },
    md: { x: 80, y: 119, w: 19.5, r: 1.5, z: 1 },
    sm: 1.5,
    fix: "corners",
  },
};

/** The wide wall's greatest width in px (`80rem`, set in app/home.css). */
const WALL_MAX = 1280;

/** What the browser should fetch for a poster: its authored share of the wall at each size. */
function sizesFor(slug: string, { lg, md }: Placement): string {
  const phone = slug === "luffy" ? "72vw" : "46vw";
  return `(min-width: 1328px) ${Math.round((lg.w / 100) * WALL_MAX)}px, (min-width: 1024px) ${lg.w}vw, (min-width: 704px) ${md.w}vw, ${phone}`;
}

/** The ten current bounties added up, from the crew data. */
const TOTAL = CREW.reduce((sum, member) => sum + Number(member.bounty.replaceAll(",", "")), 0);

/**
 * The crew as a marine notice board: ten wanted posters pinned at their own sizes and angles,
 * the captain's largest. Each poster's name is a link whose target covers the whole poster.
 */
export function CrewWall() {
  return (
    <div className="wall">
      <ul className="wall__list">
        {CREW.map((member) => {
          const place = PLACEMENTS[member.slug];
          const poster = posterFor(member.slug);
          const captain = member.slug === "luffy";
          return (
            <li
              key={member.slug}
              data-reveal
              className="wall__slot"
              data-captain={captain || undefined}
              style={
                {
                  "--lx": place.lg.x,
                  "--ly": place.lg.y,
                  "--lw": place.lg.w,
                  "--lr": `${place.lg.r}deg`,
                  "--lz": place.lg.z ?? 1,
                  "--mx": place.md.x,
                  "--my": place.md.y,
                  "--mw": place.md.w,
                  "--mr": `${place.md.r}deg`,
                  "--mz": place.md.z ?? 1,
                  "--sr": `${place.sm}deg`,
                } as React.CSSProperties
              }
            >
              {place.fix === "single" && <span aria-hidden="true" className="wall__lost-pin" />}
              <div className="wall-card" data-fix={place.fix}>
                <div className="wall-card__sheet wall-paper">
                  <Panel as="div" className="p-[4.5cqw]">
                    {poster ? (
                      <span className="relative block aspect-[2/3] w-full overflow-clip">
                        <Image
                          src={poster}
                          alt=""
                          fill
                          sizes={sizesFor(member.slug, place)}
                          className="object-cover"
                        />
                      </span>
                    ) : (
                      <span aria-hidden="true" className="block">
                        <PosterFallback
                          epithet={member.epithet}
                          name={member.name}
                          className="text-[length:5.4cqw]"
                        />
                      </span>
                    )}
                  </Panel>
                  {member.posterBounty && (
                    <span aria-hidden="true" className="wall-stamp" data-typeset={!poster || undefined}>
                      {"Bounty\nupdated"}
                    </span>
                  )}
                </div>
                {place.fix === "tape" ? (
                  <span aria-hidden="true" className="wall-tape" />
                ) : place.fix === "corners" ? (
                  <>
                    <span aria-hidden="true" className="wall-tape wall-tape--left" />
                    <span aria-hidden="true" className="wall-tape wall-tape--right" />
                  </>
                ) : (
                  <span aria-hidden="true" className="wall-pin" />
                )}
                <div className="wall-card__label">
                  <Badge variant={captain ? "spot" : "outline"}>{member.role}</Badge>
                  <Link href={`/crew/${member.slug}`} className="wall-card__name">
                    {member.name}
                  </Link>
                  <p className="wall-card__bounty">
                    <span className="text-spot">฿</span> {member.bounty}
                  </p>
                  {member.posterBounty && (
                    <p className="wall-card__was">
                      Was <s>฿ {member.posterBounty}</s>
                    </p>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      {/* An old sheet left under the captain's. */}
      <span aria-hidden="true" className="wall-scrap wall-scrap--a" />

      <div data-reveal className="wall__tally">
        <div className="wall-tally wall-paper">
          <span aria-hidden="true" className="wall-pin" />
          <p className="wall-tally__head">Crew total</p>
          <p className="wall-tally__sum">
            <span className="text-spot">฿</span> {TOTAL.toLocaleString("en-US")}
          </p>
          <p className="wall-tally__note">The last 1,000 is the doctor&apos;s.</p>
        </div>
      </div>
    </div>
  );
}

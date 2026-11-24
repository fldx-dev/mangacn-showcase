import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { ThousandSunny } from "@/components/ship-icons";
import { Badge } from "@/components/ui/badge";

const WRAP = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** The eight spokes of the wheel, in degrees. */
const SPOKES = [0, 45, 90, 135, 180, 225, 270, 315];
/** Strokes of a tally, the way you count on a wall: one for each thing he still has. */
function Tally({ count }: { count: number }) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox={`0 0 ${4 + count * 8} 24`}
      className="jinbe-count__tally"
      fill="none"
      stroke="var(--spot)"
      strokeWidth="3"
      strokeLinecap="round"
    >
      {Array.from({ length: count }, (_, stroke) => (
        <path key={stroke} d={`M${6 + stroke * 8} 3l-2.5 18`} />
      ))}
    </svg>
  );
}

/**
 * The sea in section. A strip of sky, the waterline with the Sunny on it, and everything about
 * him sunk underneath: the helm he holds, drawn round his poster, and the rings of one strike
 * of Fish-Man Karate going out from it through the water to the sea floor.
 */
export function HeroJinbe({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  const facts = [
    { label: "The dream", value: member.dream, kind: "dream" },
    { label: "Bounty", value: `฿ ${member.bounty}`, kind: "figure" },
    { label: "Joined", value: member.joined, kind: "figure" },
  ];
  return (
    <section aria-labelledby="crew-name" className="jinbe relative isolate">
      <div className="jinbe-sky">
        <div className={`${WRAP} relative pt-6 sm:pt-10`}>
          {back}
          <ThousandSunny className="jinbe-ship" />
        </div>
      </div>

      <div className="jinbe-sea dark relative isolate text-ink">
        <svg aria-hidden="true" focusable="false" className="jinbe-surface">
          <defs>
            <pattern id="jinbe-swell" width="40" height="10" patternUnits="userSpaceOnUse">
              <path d="M0 5q10-9 20 0t20 0V10H0z" fill="var(--tone-2)" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#jinbe-swell)" />
        </svg>
        <span aria-hidden="true" className="jinbe-shallows" />

        <div aria-hidden="true" className="jinbe-water">
          <span className="jinbe-rings" />
          <svg focusable="false" className="jinbe-strike" width="1" height="1">
            <g className="jinbe-wheel">
              {SPOKES.map((turn) => (
                <g key={turn} transform={`rotate(${turn})`}>
                  <path d="M0 0V-196" stroke="var(--ink)" strokeWidth="13" />
                  <path d="M0 0V-196" stroke="var(--tone-1)" strokeWidth="8" />
                  <path
                    d="M-7 -208h14l2 -34a9 9 0 0 0 -18 0z"
                    fill="var(--tone-1)"
                    stroke="var(--ink)"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                </g>
              ))}
              <circle r="202" fill="none" stroke="var(--ink)" strokeWidth="23" />
              <circle r="202" fill="none" stroke="var(--tone-1)" strokeWidth="18" />
              <circle r="202" fill="none" stroke="var(--tone-3)" strokeWidth="1" strokeDasharray="2 9" />
            </g>
          </svg>
        </div>

        <div className="jinbe-poster">
          <HeroPoster
            member={member}
            poster={poster}
            sizes="(min-width: 640px) 13rem, 9.4rem"
            fallbackClassName="text-[0.45rem] sm:text-[0.62rem]"
          />
        </div>

        <div className={`${WRAP} jinbe-body`}>
          <div className="jinbe-name flex min-w-0 flex-col items-start gap-3">
            <Badge variant="outline">{member.role}</Badge>
            <h1 id="crew-name" className="jinbe-name__title font-display uppercase">
              {member.name}
            </h1>
            <p className="font-dialogue text-lg text-muted-foreground sm:text-xl">
              &ldquo;{member.epithet}&rdquo;
            </p>
          </div>

          <div className="jinbe-words flex min-w-0 flex-col gap-5">
            <p className="jinbe-words__quote font-dialogue">
              <span className="sr-only">{member.name}: </span>
              &ldquo;{member.quote}&rdquo;
            </p>
            <p className="max-w-[40ch] text-base leading-relaxed sm:text-lg">{member.about}</p>
            {note && <p className="text-xs text-muted-foreground">{note}</p>}
          </div>

          <dl className="jinbe-count">
            {facts.map((fact, order) => (
              <div key={fact.label} className={`jinbe-count__item jinbe-count__item--${fact.kind}`}>
                <dt className="flex items-center gap-2 font-display text-xs tracking-widest text-muted-foreground uppercase">
                  <Tally count={order + 1} />
                  {fact.label}
                </dt>
                <dd
                  className={
                    fact.kind === "dream"
                      ? "font-dialogue text-lg leading-snug sm:text-xl"
                      : "font-display text-lg whitespace-nowrap uppercase sm:text-xl"
                  }
                >
                  {fact.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="jinbe-floor">
          <p className={`${WRAP} jinbe-floor__mark font-display text-xs tracking-widest uppercase`}>
            Fish-Man Island, 10,000 metres down
          </p>
          <span aria-hidden="true" className="jinbe-floor__bed" />
        </div>
      </div>
    </section>
  );
}

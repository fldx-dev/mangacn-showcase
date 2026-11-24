import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { Badge } from "@/components/ui/badge";

/** The fire round the foot: one body, its tongues trailing back down the leg. */
const FIRE =
  "M0 -30 C24 -30 38 -10 34 14 C31 36 50 46 46 86 C36 66 26 64 26 84 C26 108 36 118 31 156 " +
  "C22 134 12 128 10 108 L-9 112 C-13 134 -22 142 -29 172 C-34 144 -27 126 -27 104 " +
  "C-27 82 -38 76 -48 102 C-52 66 -33 44 -36 14 C-40 -12 -24 -30 0 -30 Z";

/** Sparks thrown off behind it. */
const SPARKS = [
  { x: 52, y: 118, size: 1 },
  { x: -54, y: 142, size: 0.85 },
  { x: 40, y: 190, size: 0.6 },
];

/**
 * A restaurant, then a kick. The page is a menu set from the middle out, under the rail of a
 * kitchen pass; the poster and an order ticket hang from that rail, so nothing here is held in
 * a hand. One black leg comes up from the floor on fire and sends the ticket swinging.
 */
export function HeroSanji({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  return (
    <section aria-labelledby="crew-name" className="sanji relative isolate">
      <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">{back}</div>

      <div className="sanji-pass">
        <div className="sanji-sign">
          <Badge variant="outline">{member.role}</Badge>
          <h1 id="crew-name" className="sanji-sign__name font-display uppercase">
            {member.name}
          </h1>
          <p className="font-dialogue text-xl text-muted-foreground sm:text-2xl">
            &ldquo;{member.epithet}&rdquo;
          </p>
        </div>

        <span aria-hidden="true" className="sanji-rail" />

        <div className="sanji-hang sanji-hang--poster">
          <HeroPoster
            member={member}
            poster={poster}
            sizes="(min-width: 1024px) 17rem, (min-width: 640px) 15rem, 44vw"
            fallbackClassName="text-[0.5rem] sm:text-[0.68rem]"
          />
          {note && <p className="mt-3 text-xs text-muted-foreground">{note}</p>}
        </div>

        <div className="sanji-side">
          <div className="sanji-hang sanji-hang--ticket">
            <span aria-hidden="true" className="sanji-ticket__paper" />
            <p className="sanji-ticket__words font-dialogue">
              <span className="sr-only">{member.name}: </span>
              {member.quote}
            </p>
          </div>
          <svg aria-hidden="true" viewBox="0 0 300 330" className="sanji-kick">
            {/* Drawn pointing straight up from the foot at 0,0, then tipped over to the kick. */}
            <g transform="translate(236 62) rotate(39)">
              <path d={FIRE} className="sanji-kick__fire" />
              {SPARKS.map((spark) => (
                <path
                  key={spark.y}
                  d="M0 0 C7 8 8 18 0 28 C-6 18 -6 8 0 0 Z"
                  transform={`translate(${spark.x} ${spark.y}) scale(${spark.size})`}
                  className="sanji-kick__fire"
                />
              ))}
              <path d="M-17 2 Q0 -18 17 2 L1.5 342 L-1.5 342 Z" className="sanji-kick__leg" />
            </g>
          </svg>
        </div>

        <div className="sanji-menu">
          <span aria-hidden="true" className="sanji-menu__rule" />
          <p className="sanji-menu__about text-base leading-relaxed sm:text-lg">{member.about}</p>
          <dl className="sanji-menu__list">
            <div className="sanji-menu__dish">
              <dt className="font-display text-xs tracking-widest text-spot uppercase">
                The dream
              </dt>
              <dd className="font-dialogue text-xl leading-snug sm:text-2xl">{member.dream}</dd>
            </div>
            <div className="sanji-menu__line">
              <dt className="font-display text-xs tracking-widest uppercase">Bounty</dt>
              <dd className="font-display text-lg whitespace-nowrap sm:text-2xl">
                <span className="text-muted-foreground">฿</span> {member.bounty}
              </dd>
            </div>
            <div className="sanji-menu__line">
              <dt className="font-display text-xs tracking-widest uppercase">Joined</dt>
              <dd className="font-display text-lg whitespace-nowrap uppercase sm:text-2xl">
                {member.joined}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

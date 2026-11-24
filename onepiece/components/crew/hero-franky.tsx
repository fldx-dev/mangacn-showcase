import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { SfxText } from "@/components/sfx-text";
import { Badge } from "@/components/ui/badge";

/** Zone marks round the border of the sheet, as on any drawing big enough to get lost in. */
const ZONES_ACROSS = ["1", "2", "3", "4", "5", "6", "7", "8"];
const ZONES_DOWN = ["A", "B", "C", "D"];

/** A point on a circle round the origin, `turn` fifths of a turn from straight up. */
function onCircle(radius: number, turn: number): string {
  const angle = (turn * 72 - 90) * (Math.PI / 180);
  return `${(Math.cos(angle) * radius).toFixed(2)} ${(Math.sin(angle) * radius).toFixed(2)}`;
}

/** The star on his forearms, with the construction left in: both circles, the axes, one angle. */
const STAR = `M${[0, 1, 2, 3, 4]
  .flatMap((point) => [onCircle(100, point), onCircle(42, point + 0.5)])
  .join("L")}z`;

function Star() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="-124 -124 248 248" className="franky-star">
      <g fill="none" stroke="var(--ink)">
        <circle r="100" strokeWidth="1.25" strokeDasharray="7 5" />
        <circle r="42" strokeWidth="1.25" strokeDasharray="7 5" />
        <path d="M-120 0H120M0-120V120" strokeWidth="1" strokeDasharray="16 4 2 4" />
        <path d={`M0 0L${onCircle(118, 1)}`} strokeWidth="1" />
        <path d={`M${onCircle(64, 0)}A64 64 0 0 1 ${onCircle(64, 1)}`} strokeWidth="1" />
      </g>
      <path d={STAR} fill="var(--paper)" stroke="var(--ink)" strokeWidth="3.5" strokeLinejoin="miter" />
      <text
        x="62"
        y="-52"
        fill="var(--ink)"
        fontSize="13"
        className="font-display"
      >
        72°
      </text>
    </svg>
  );
}

/** Three bottles of cola: what he keeps in the fridge in his stomach, and all the fuel he runs on. */
function Cola() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 82 64" className="franky-fuel__gauge">
      {[0, 30, 60].map((x) => (
        <g key={x} transform={`translate(${x} 0)`}>
          <path d="M8 2h6v5H8z" fill="var(--spot)" stroke="var(--ink)" strokeWidth="1.5" />
          <path
            d="M8 7h6v8q0 4 3 8t3 10v24q0 5-5 5H7q-5 0-5-5V33q0-6 3-10t3-8z"
            fill="var(--ink)"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path d="M3 36h16v10H3z" fill="var(--paper)" />
        </g>
      ))}
    </svg>
  );
}

/**
 * A working drawing. The page is one blueprint, white line on ink (the theme's `dark` class is
 * scoped to the plate), inside a paper drafting border with zone marks; his name is the part
 * being drawn and his bounty is its dimension; the facts are the title block along the foot.
 * Everything is square and ruled except the one thing he shouts, which sits across the lot at
 * an angle.
 */
export function HeroFranky({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  return (
    <section aria-labelledby="crew-name" className="franky relative isolate">
      <div className="franky-sheet mx-auto w-full max-w-6xl">
        <span aria-hidden="true" className="franky-zones franky-zones--top font-display">
          {ZONES_ACROSS.map((zone) => (
            <span key={zone}>{zone}</span>
          ))}
        </span>
        <span aria-hidden="true" className="franky-zones franky-zones--bottom font-display">
          {ZONES_ACROSS.map((zone) => (
            <span key={zone}>{zone}</span>
          ))}
        </span>
        <span aria-hidden="true" className="franky-zones franky-zones--left font-display">
          {ZONES_DOWN.map((zone) => (
            <span key={zone}>{zone}</span>
          ))}
        </span>
        <span aria-hidden="true" className="franky-zones franky-zones--right font-display">
          {ZONES_DOWN.map((zone) => (
            <span key={zone}>{zone}</span>
          ))}
        </span>

        <div className="franky-plate dark text-ink">
          <div className="franky-back">{back}</div>

          <div className="franky-title flex min-w-0 flex-col items-start gap-3">
            <Badge variant="default">{member.role}</Badge>
            <div className="franky-title__part">
              <h1 id="crew-name" className="franky-title__name font-display uppercase">
                {member.name}
              </h1>
              <p className="franky-dim font-display">
                <span aria-hidden="true" className="franky-dim__line franky-dim__line--from" />
                <span className="franky-dim__value">
                  <span className="sr-only">Bounty: </span>฿ {member.bounty}
                </span>
                <span aria-hidden="true" className="franky-dim__line franky-dim__line--to" />
              </p>
            </div>
            <p className="font-dialogue text-lg text-muted-foreground sm:text-xl">
              &ldquo;{member.epithet}&rdquo;
            </p>
          </div>

          <div className="franky-fig">
            <div className="franky-fig__sheet relative isolate">
              <span aria-hidden="true" className="franky-fig__axis franky-fig__axis--across" />
              <span aria-hidden="true" className="franky-fig__axis franky-fig__axis--down" />
              <HeroPoster
                member={member}
                poster={poster}
                sizes="(min-width: 1024px) 16rem, (min-width: 640px) 14rem, 46vw"
                fallbackClassName="text-[0.55rem] sm:text-[0.7rem]"
              />
            </div>
            {note && <p className="mt-4 text-xs text-muted-foreground">{note}</p>}
          </div>

          <div className="franky-shout">
            <Star />
            <p className="franky-shout__word">
              <span className="sr-only">{member.name}: </span>
              <SfxText size="xl" color="spot" rotate={-9} className="franky-shout__sfx">
                {member.quote}
              </SfxText>
            </p>
          </div>

          <p className="franky-about text-base leading-relaxed sm:text-lg">{member.about}</p>

          <dl className="franky-block">
            <div className="franky-block__cell franky-block__cell--dream">
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                The dream
              </dt>
              <dd className="font-dialogue text-lg leading-snug sm:text-xl">{member.dream}</dd>
            </div>
            <div className="franky-block__cell franky-fuel">
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Build
              </dt>
              <dd className="flex items-end gap-3">
                <Cola />
                <span className="font-dialogue text-base leading-snug">{member.style}</span>
              </dd>
            </div>
            <div className="franky-block__cell">
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Joined
              </dt>
              <dd className="font-display text-lg whitespace-nowrap uppercase sm:text-xl">
                {member.joined}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

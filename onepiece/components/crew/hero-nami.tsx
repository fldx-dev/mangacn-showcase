import { CaptionBox } from "@/components/caption-box";
import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { ThousandSunny } from "@/components/ship-icons";
import { SpeechBubble } from "@/components/speech-bubble";
import { Badge } from "@/components/ui/badge";

const WRAP = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** The pressure rings of a storm: centre, radii and tilt, drawn in a 200 by 200 box. */
const ISOBARS = [
  { cx: 96, cy: 104, rx: 14, ry: 10, tilt: -20 },
  { cx: 98, cy: 103, rx: 30, ry: 22, tilt: -18 },
  { cx: 101, cy: 102, rx: 47, ry: 36, tilt: -14 },
  { cx: 104, cy: 100, rx: 65, ry: 52, tilt: -10 },
  { cx: 106, cy: 99, rx: 84, ry: 70, tilt: -6 },
];

/** The teeth of a cold front, set along its line. */
const TEETH =
  "M30 162 l13 -1 -8 -11 z M64 128 l13 1 -6 -12 z M92 97 l13 2 -5 -12 z " +
  "M128 72 l13 -2 -8 -11 z M164 46 l12 -4 -9 -9 z";

/** The sixteen winds, as the far ends of lines drawn from the rose. */
const RHUMBS = Array.from({ length: 16 }, (_, index) => {
  const angle = (index / 16) * Math.PI * 2;
  return {
    x: (Math.sin(angle) * 4000).toFixed(1),
    y: (-Math.cos(angle) * 4000).toFixed(1),
  };
});

/**
 * Her dream, started: a sea chart of the world with most of it still to draw. Rhumb lines run
 * from the compass rose, the Red Line and the Grand Line quarter the sheet, the poster is pinned
 * as an inset to the sea she comes from, and the words are set as a chart sets them, in a title
 * block and a key.
 */
export function HeroNami({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  return (
    <section aria-labelledby="crew-name" className="nami relative isolate">
      <div className={`${WRAP} pt-6 sm:pt-10`}>{back}</div>

      <div className="nami-sheet">
        <span aria-hidden="true" className="nami-edge nami-edge--top" />
        <span aria-hidden="true" className="nami-edge nami-edge--bottom" />
        <span aria-hidden="true" className="nami-edge nami-edge--left" />
        <span aria-hidden="true" className="nami-edge nami-edge--right" />
        {/* Rhumb lines: every bearing from the compass rose, ruled across the whole sheet. */}
        <div aria-hidden="true" className="nami-rhumbs">
          <svg className="nami-rhumbs__lines">
            {RHUMBS.map((line, order) => (
              <line
                key={order}
                x1="0"
                y1="0"
                x2={line.x}
                y2={line.y}
                className={order % 2 ? "nami-rhumbs__half" : undefined}
              />
            ))}
          </svg>
          <svg aria-hidden="true" viewBox="-6 -22 112 134" className="nami-rose">
            <circle cx="50" cy="50" r="36" className="nami-rose__ring nami-rose__ring--fine" />
            <circle cx="50" cy="50" r="36" className="nami-rose__ring nami-rose__ring--fine" />
            <circle cx="50" cy="50" r="30" className="nami-rose__ring" />
            {[45, 135, 225, 315].map((turn) => (
              <g key={turn} transform={`rotate(${turn} 50 50)`}>
                <path d="M50 20 L44.5 50 L50 50 Z" className="nami-rose__light" />
                <path d="M50 20 L55.5 50 L50 50 Z" className="nami-rose__dark" />
              </g>
            ))}
            {[0, 90, 180, 270].map((turn) => (
              <g key={turn} transform={`rotate(${turn} 50 50)`}>
                <path d="M50 2 L42.5 50 L50 50 Z" className="nami-rose__light" />
                <path
                  d="M50 2 L57.5 50 L50 50 Z"
                  className={turn === 0 ? "nami-rose__north" : "nami-rose__dark"}
                />
              </g>
            ))}
            <text x="50" y="-6" textAnchor="middle" className="nami-rose__n font-display">
              N
            </text>
          </svg>
        </div>

        <div className="nami-chart">
          <div aria-hidden="true" className="nami-red">
            <span className="nami-chip nami-red__label font-display">Red Line</span>
          </div>
          <div aria-hidden="true" className="nami-grand">
            <span className="nami-grand__calm nami-grand__calm--north" />
            <span className="nami-grand__route" />
            <span className="nami-grand__calm nami-grand__calm--south" />
            <span className="nami-chip nami-grand__label font-display">Grand Line</span>
            <span className="nami-chip nami-grand__belt font-display">Calm Belt</span>
            <ThousandSunny className="nami-grand__ship" />
          </div>
          <svg aria-hidden="true" viewBox="0 0 200 200" className="nami-weather hidden md:block">
            {ISOBARS.map((ring) => (
              <ellipse
                key={ring.rx}
                cx={ring.cx}
                cy={ring.cy}
                rx={ring.rx}
                ry={ring.ry}
                transform={`rotate(${ring.tilt} ${ring.cx} ${ring.cy})`}
                className="nami-weather__ring"
              />
            ))}
            <path d="M8 176 C52 150 78 96 132 70 S184 34 196 10" className="nami-weather__front" />
            <path
              d={TEETH}
              className="nami-weather__tooth"
            />
          </svg>

          <div className="nami-title">
            <Badge variant="outline">{member.role}</Badge>
            <h1 id="crew-name" className="nami-title__name font-display uppercase">
              {member.name}
            </h1>
            <p className="font-dialogue text-lg text-muted-foreground sm:text-xl">
              &ldquo;{member.epithet}&rdquo;
            </p>
            <CaptionBox aria-label="Dream" className="nami-title__dream text-base sm:text-lg">
              <span className="font-display text-xs tracking-widest text-spot uppercase">
                The dream
              </span>
              <br />
              {member.dream}
            </CaptionBox>
          </div>

          <div className="nami-inset">
            <p className="nami-sea">
              <span className="nami-sea__label font-display text-xs tracking-widest uppercase">
                Joined
              </span>
              <span className="nami-sea__name font-display uppercase">{member.joined}</span>
            </p>
            <div className="nami-inset__sheet">
              <span aria-hidden="true" className="nami-inset__pin" />
              <HeroPoster
                member={member}
                poster={poster}
                sizes="(min-width: 768px) 17rem, 50vw"
                fallbackClassName="text-[0.55rem] md:text-[0.72rem]"
              />
            </div>
            {note && <p className="nami-inset__note text-xs text-ink">{note}</p>}
          </div>

          <div className="nami-key">
            <p className="max-w-[42ch] text-base leading-relaxed sm:text-lg">{member.about}</p>
            <div className="nami-key__bounty">
              <p className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Bounty
              </p>
              <p className="nami-key__sum font-display">
                <span className="text-muted-foreground">฿</span> {member.bounty}
              </p>
              <span aria-hidden="true" className="nami-key__scale" />
            </div>
          </div>

          <div className="nami-call">
            <SpeechBubble
              shape="whisper"
              tail="top-right"
              aria-label={member.name}
              className="nami-call__quote text-lg sm:text-2xl"
            >
              {member.quote}
            </SpeechBubble>
          </div>
        </div>
      </div>
    </section>
  );
}

import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { SfxText } from "@/components/sfx-text";
import { SpeechBubble } from "@/components/speech-bubble";
import { Badge } from "@/components/ui/badge";
import { CREW_DETAILS } from "@/lib/crew-details";

const WRAP = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** The fist at the end of the arm: four knuckles to the right, and the thumb across them. */
const FIST =
  "M34 8 H80 C100 4 114 12 112 27 C121 32 121 46 113 50 C121 54 121 68 112 73 " +
  "C116 82 108 93 90 92 H34 C16 92 6 82 6 64 V36 C6 18 16 8 34 8 Z";
const THUMB =
  "M28 54 C28 44 36 40 46 40 H68 C82 40 88 48 86 57 C84 67 76 70 66 70 H44 " +
  "C34 70 28 64 28 54 Z";

/**
 * The sun behind the hat: rays of uneven length, the same on every render. They fan from below
 * the name round to the left of the hat (32 to 240 degrees, clockwise from due right) and leave
 * the sector the name, the role, the nickname and the link back are set in empty, so no ray
 * strikes through a word.
 */
const RAYS = Array.from({ length: 40 }, (_, index) => {
  const degrees = 32 + ((index + ((index * 7) % 5) * 0.12) / 39.5) * 208;
  const angle = (degrees / 180) * Math.PI;
  const from = 42 + ((index * 5) % 4) * 3;
  const to = 58 + ((index * 37) % 42);
  const at = (radius: number) => ({
    x: (Math.cos(angle) * radius).toFixed(2),
    y: (Math.sin(angle) * radius).toFixed(2),
  });
  return { x1: at(from).x, y1: at(from).y, x2: at(to).x, y2: at(to).y };
});

/**
 * Rubber. The surname is pulled from one edge of the page to the other and wears the hat; one
 * arm leaves the poster and does not stop until it runs out of page. Everything else is paper.
 */
export function HeroLuffy({ member, poster, back }: AuthoredHeroProps) {
  const words = member.name.split(" ");
  const last = words.pop();
  const note = posterNote(member, poster);
  const punch = CREW_DETAILS[member.slug].moves[0];
  return (
    <section aria-labelledby="crew-name" className="luffy relative isolate">
      <div className={`${WRAP} pt-6 sm:pt-10`}>{back}</div>

      <div className="luffy-sky relative isolate">
        <div className="luffy-name">
          <span aria-hidden="true" className="luffy-sun">
            <svg viewBox="-100 -100 200 200" className="luffy-sun__rays">
              {RAYS.map((ray, order) => (
                <line key={order} {...ray} />
              ))}
            </svg>
          </span>
          <svg aria-hidden="true" viewBox="0 0 200 112" className="luffy-hat">
            <ellipse cx="100" cy="84" rx="96" ry="23" className="luffy-hat__straw" />
            <path
              d="M46 80 C46 8 154 8 154 80 A54 13 0 0 1 46 80 Z"
              className="luffy-hat__straw"
            />
            <path
              d="M47 60 A54 13 0 0 0 153 60 L154 80 A54 13 0 0 1 46 80 Z"
              className="luffy-hat__band"
            />
            <path
              d="M20 86 q8 6 20 8 M160 95 q12 -2 20 -8 M82 24 q10 -6 22 -5"
              className="luffy-hat__weave"
            />
          </svg>
          <div className="luffy-name__tag">
            <Badge variant="spot">{member.role}</Badge>
            <p className="font-dialogue text-lg text-ink sm:text-2xl">
              &ldquo;{member.epithet}&rdquo;
            </p>
          </div>
          <h1 id="crew-name" className="luffy-name__title font-display uppercase">
            <span className="luffy-name__first">{words.join(" ")}</span>{" "}
            <span className="luffy-name__last">{last}</span>
          </h1>
        </div>
      </div>

      <div className="luffy-reach">
        <div className="luffy-poster">
          <HeroPoster
            member={member}
            poster={poster}
            sizes="(min-width: 1024px) 17rem, (min-width: 768px) 14rem, 44vw"
            fallbackClassName="text-[0.5rem] md:text-[0.75rem]"
          />
          {note && <p className="mt-4 text-xs text-muted-foreground">{note}</p>}
        </div>

        <SpeechBubble
          shape="shout"
          tail="left"
          aria-label={member.name}
          className="luffy-quote text-base sm:text-2xl lg:text-3xl"
        >
          {member.quote}
        </SpeechBubble>

        <div aria-hidden="true" className="luffy-arm">
          <span className="luffy-arm__label font-display">
            {Array.from(punch).map((letter, order) => (
              <span key={order}>{letter}</span>
            ))}
          </span>
          <span className="luffy-arm__band" />
          <svg viewBox="0 0 164 100" className="luffy-arm__fist">
            <path
              d={FIST}
              className="luffy-arm__skin"
            />
            <path
              d="M112 27 H76 M113 50 H72 M112 73 H76 M78 10 C70 36 70 66 78 90"
              className="luffy-arm__crease"
            />
            <path
              d={THUMB}
              className="luffy-arm__skin"
            />
            <path d="M130 20 L152 6 M136 50 H162 M130 80 L152 94" className="luffy-arm__crease" />
          </svg>
        </div>

        <div className="luffy-words">
          <p className="max-w-[40ch] text-base leading-relaxed sm:text-lg lg:text-xl">
            {member.about}
          </p>
          <dl className="luffy-words__facts">
            <div>
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                The dream
              </dt>
              <dd className="font-dialogue text-xl leading-snug sm:text-2xl">{member.dream}</dd>
            </div>
            <div>
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Joined
              </dt>
              <dd className="font-dialogue text-xl leading-snug sm:text-2xl">{member.joined}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="luffy-bounty">
        <p className="luffy-bounty__label font-display text-xs tracking-widest uppercase">Bounty</p>
        <SfxText
          aria-hidden="true"
          size="lg"
          color="spot"
          rotate={-7}
          className="luffy-bounty__laugh"
        >
          Shishishi!
        </SfxText>
        <p className="luffy-bounty__sum font-display">
          <span className="luffy-bounty__berry">฿</span>
          {member.bounty}
        </p>
      </div>
    </section>
  );
}

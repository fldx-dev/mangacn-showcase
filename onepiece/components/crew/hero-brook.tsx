import type { CSSProperties } from "react";
import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { Badge } from "@/components/ui/badge";

const WRAP = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/** Where the four notes of the laugh sit on the stave, in line spaces from the top line. */
const NOTES = [3, 2, 2.5, 1.5];

/**
 * A black page and one stave. Most of it is a rest: fifty empty bars, written the way a part
 * writes them, then four notes for the laugh. The theme's `dark` class is scoped to this
 * section, so every inked frame inside redraws light on dark.
 */
export function HeroBrook({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  return (
    <section aria-labelledby="crew-name" className="brook dark relative isolate bg-paper text-ink">
      <div className={`${WRAP} pt-6 sm:pt-10`}>{back}</div>

      <div aria-hidden="true" className="brook-stave">
        {[0, 1, 2, 3, 4].map((line) => (
          <span
            key={line}
            className="brook-stave__line"
            style={{ "--i": line } as CSSProperties}
          />
        ))}
        <span className="brook-stave__bar brook-stave__bar--open" />
        <span className="brook-stave__rest">
          <span className="brook-stave__count font-display">50</span>
        </span>
        <span className="brook-stave__bar brook-stave__bar--close" />
        <span className="brook-stave__notes">
          {NOTES.map((pitch, order) => (
            <span
              key={order}
              className="brook-stave__note"
              style={{ "--p": pitch, "--n": order } as CSSProperties}
            />
          ))}
        </span>
        <span className="brook-stave__bar brook-stave__bar--end" />
      </div>
      <p className="brook-laugh font-dialogue text-ink">
        <span className="sr-only">{member.name}: </span>
        {member.quote}
      </p>

      <div className={`${WRAP} brook-body`}>
        <div className="brook-name flex min-w-0 flex-col items-start gap-4">
          <Badge variant="outline">{member.role}</Badge>
          <h1 id="crew-name" className="brook-name__title font-display uppercase">
            {member.name}
          </h1>
          <p className="font-dialogue text-lg text-muted-foreground sm:text-xl">
            &ldquo;{member.epithet}&rdquo;
          </p>
        </div>

        <div className="brook-poster">
          <HeroPoster
            member={member}
            poster={poster}
            sizes="(min-width: 768px) 15rem, 46vw"
            fallbackClassName="text-[0.55rem] sm:text-[0.7rem]"
          />
          {note && <p className="mt-4 text-xs text-muted-foreground">{note}</p>}
        </div>

        <div className="brook-words flex min-w-0 flex-col gap-6">
          <p className="max-w-[44ch] text-base leading-relaxed sm:text-lg">{member.about}</p>
        </div>

        <dl className="brook-facts">
          <div data-reveal className="brook-facts__item brook-facts__item--dream">
            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
              The dream
            </dt>
            <dd className="font-dialogue text-lg leading-snug sm:text-xl">{member.dream}</dd>
          </div>
          <div data-reveal className="brook-facts__item">
            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
              Bounty
            </dt>
            <dd className="font-display text-lg whitespace-nowrap uppercase sm:text-xl">
              ฿ {member.bounty}
            </dd>
          </div>
          <div data-reveal className="brook-facts__item">
            <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
              Joined
            </dt>
            <dd className="font-display text-lg uppercase sm:text-xl">{member.joined}</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

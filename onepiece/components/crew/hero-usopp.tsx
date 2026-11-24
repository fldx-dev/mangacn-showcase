import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { Badge } from "@/components/ui/badge";

/** The quote, cut around its figure so the figure can be set at a different scale. */
function splitBoast(quote: string): [string, string, string] {
  const figure = quote.match(/\d[\d,.]*\d|\d/);
  if (!figure || figure.index === undefined) return ["", quote, ""];
  return [
    quote.slice(0, figure.index).trim(),
    figure[0],
    quote.slice(figure.index + figure[0].length).trim(),
  ];
}

/** The two halves of the profile: what he says about himself, and what he does. */
function splitAbout(about: string): [string, string] {
  const cut = about.indexOf(". ");
  return cut === -1 ? [about, ""] : [about.slice(0, cut + 1), about.slice(cut + 2)];
}

/**
 * A tall tale and a long shot. The boast is set as large as the page allows and is hollow; the
 * truth is the smallest line on the sheet, a whole page away, next to the thing he actually hit.
 */
export function HeroUsopp({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  const [lead, figure, tail] = splitBoast(member.quote);
  const [tale, truth] = splitAbout(member.about);
  return (
    <section aria-labelledby="crew-name" className="usopp relative isolate">
      <div className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 sm:pt-10">{back}</div>

      <p className="usopp-boast">
        <span className="sr-only">{member.name}: </span>
        {lead && <span className="usopp-boast__lead font-dialogue">{lead}</span>}{" "}
        <span className="usopp-boast__figure font-display">{figure}</span>{" "}
        {tail && <span className="usopp-boast__tail font-display uppercase">{tail}</span>}
      </p>

      <div className="usopp-field">
        <div className="usopp-name">
          <Badge variant="spot">{member.role}</Badge>
          <h1 id="crew-name" className="usopp-name__title font-display uppercase">
            {member.name}
          </h1>
          <p className="font-dialogue text-xl text-muted-foreground sm:text-2xl">
            &ldquo;{member.epithet}&rdquo;
          </p>
          <p className="usopp-name__tale text-base leading-relaxed sm:text-lg">{tale}</p>
        </div>

        <div className="usopp-poster">
          <HeroPoster
            member={member}
            poster={poster}
            sizes="(min-width: 768px) 14rem, 40vw"
            fallbackClassName="text-[0.45rem] md:text-[0.62rem]"
          />
          {note && <p className="usopp-poster__note text-xs text-muted-foreground">{note}</p>}
        </div>

        <div aria-hidden="true" className="usopp-shot">
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="usopp-shot__arc">
            <path d="M0 24 Q46 -22 98 50" />
          </svg>
          <svg viewBox="0 0 60 60" className="usopp-shot__target">
            <circle cx="30" cy="30" r="24" className="usopp-shot__ring" />
            <circle cx="30" cy="30" r="15" className="usopp-shot__ring" />
            <path d="M30 0 V14 M30 46 V60 M0 30 H14 M46 30 H60" className="usopp-shot__ring" />
            <circle cx="30" cy="30" r="6" className="usopp-shot__hit" />
          </svg>
        </div>

        {truth && <p className="usopp-truth">{truth}</p>}
      </div>

      <dl className="usopp-card">
        <div className="usopp-card__item usopp-card__item--dream">
          <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            The dream
          </dt>
          <dd className="font-dialogue text-lg leading-snug sm:text-xl">{member.dream}</dd>
        </div>
        <div className="usopp-card__item">
          <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            Bounty
          </dt>
          <dd className="font-display text-xl whitespace-nowrap md:text-2xl lg:text-3xl">
            <span className="text-muted-foreground">฿</span> {member.bounty}
          </dd>
        </div>
        <div className="usopp-card__item">
          <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            Joined
          </dt>
          <dd className="font-display text-xl uppercase md:text-2xl lg:text-3xl">
            {member.joined}
          </dd>
        </div>
      </dl>
    </section>
  );
}

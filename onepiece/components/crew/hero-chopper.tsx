import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { SpeechBubble } from "@/components/speech-bubble";
import { Badge } from "@/components/ui/badge";

const WRAP = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/**
 * A big empty sheet with a very small doctor on it, off to one side. The only thing set loud is
 * the price on his head, which is the smallest on the ship.
 */
export function HeroChopper({ member, poster, back }: AuthoredHeroProps) {
  const note = posterNote(member, poster);
  return (
    <section aria-labelledby="crew-name" className="chopper relative isolate">
      <div className={`${WRAP} pt-6 sm:pt-10`}>{back}</div>

      <div className={`${WRAP} chopper-field`}>
        <div className="chopper-figure">
          <SpeechBubble
            shape="round"
            tail="right"
            aria-label={member.name}
            className="chopper-figure__quote text-xs"
          >
            {member.quote}
          </SpeechBubble>
          <HeroPoster
            member={member}
            poster={poster}
            sizes="9rem"
            className="chopper-figure__poster p-1.5"
            fallbackClassName="text-[0.36rem]"
          />
          <div className="chopper-figure__name flex min-w-0 flex-col items-start gap-1.5">
            <Badge variant="outline">{member.role}</Badge>
            <h1 id="crew-name" className="font-display text-base leading-tight uppercase sm:text-lg">
              {member.name}
            </h1>
            <p className="font-dialogue text-sm text-muted-foreground">
              &ldquo;{member.epithet}&rdquo;
            </p>
          </div>
        </div>

        <div className="chopper-words flex min-w-0 flex-col gap-4 text-sm leading-relaxed">
          <p className="max-w-[34ch]">{member.about}</p>
          <dl className="flex flex-col gap-3">
            <div>
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                The dream
              </dt>
              <dd className="max-w-[34ch] font-dialogue text-base">{member.dream}</dd>
            </div>
            <div>
              <dt className="font-display text-xs tracking-widest text-muted-foreground uppercase">
                Joined
              </dt>
              <dd className="font-dialogue text-base">{member.joined}</dd>
            </div>
          </dl>
        </div>

        <div className="chopper-bounty">
          <p className="font-display text-xs tracking-widest text-muted-foreground uppercase">
            Bounty
          </p>
          <p className="chopper-bounty__sum font-display text-spot">
            <span className="chopper-bounty__berry">฿</span>
            {member.bounty}
          </p>
          {note && <p className="max-w-[34ch] text-xs text-muted-foreground">{note}</p>}
        </div>
      </div>
    </section>
  );
}

import { CaptionBox } from "@/components/caption-box";
import type { AuthoredHeroProps } from "@/components/crew/crew-hero";
import { HeroPoster, posterNote } from "@/components/crew/wanted-poster";
import { SpeechBubble } from "@/components/speech-bubble";
import { Badge } from "@/components/ui/badge";

const WRAP = "mx-auto w-full max-w-6xl px-4 sm:px-6";

/**
 * Three sword strokes cut the page: one under the name, one down the middle, one over the
 * figures. The pieces are the layout. Only the backgrounds are clipped, so no text is ever cut.
 */
export function HeroZoro({ member, poster, back }: AuthoredHeroProps) {
  const [first, ...rest] = member.name.split(" ");
  const note = posterNote(member, poster);
  return (
    <section aria-labelledby="crew-name" className="zoro relative isolate">
      <div className={`${WRAP} pt-6 pb-4 sm:pt-10 sm:pb-6`}>{back}</div>

      {/* First piece: the name, on solid ink. Its lower edge is the first cut. */}
      <div className="zoro-name relative">
        <span aria-hidden="true" className="zoro-name__bg" />
        <div className={`${WRAP} relative flex flex-col items-start gap-4 sm:gap-5`}>
          <Badge variant="spot">{member.role}</Badge>
          <h1
            id="crew-name"
            className="zoro-name__title font-display text-paper uppercase"
          >
            <span className="block">{first}</span>{" "}
            <span className="zoro-name__last block">{rest.join(" ")}</span>
          </h1>
          <p className="font-dialogue text-lg text-tone-2 sm:text-xl">
            &ldquo;{member.epithet}&rdquo;
          </p>
        </div>
        <span aria-hidden="true" className="zoro-blade zoro-blade--one" />
      </div>

      {/* Second and third pieces: the words on paper, the poster on tone, split by a steep cut. */}
      <div className="zoro-mid relative">
        <span aria-hidden="true" className="zoro-mid__clip">
          <span className="zoro-mid__shard halftone" />
        </span>
        <span aria-hidden="true" className="zoro-blade zoro-blade--two" />
        <div className={`${WRAP} zoro-mid__grid relative`}>
          <div className="zoro-poster relative">
            <span aria-hidden="true" className="zoro-poster__bg halftone" />
            <span aria-hidden="true" className="zoro-blade zoro-blade--two-flat" />
            <div className="zoro-poster__sheet relative">
              <HeroPoster
                member={member}
                poster={poster}
                sizes="(min-width: 1024px) 21rem, (min-width: 768px) 18rem, 60vw"
                fallbackClassName="text-[0.65rem] md:text-xs"
              />
            </div>
            {note && <p className="zoro-poster__note relative text-xs text-ink">{note}</p>}
          </div>

          <div className="zoro-words relative flex min-w-0 flex-col items-start gap-6">
            <SpeechBubble
              shape="shout"
              tail="top-left"
              aria-label={member.name}
              className="zoro-words__quote text-base sm:text-xl lg:text-2xl"
            >
              {member.quote}
            </SpeechBubble>
            <p className="max-w-[44ch] text-base leading-relaxed sm:text-lg lg:text-xl">
              {member.about}
            </p>
            <CaptionBox aria-label="Dream" data-reveal className="text-base lg:text-lg">
              <span className="font-display text-xs tracking-widest text-spot uppercase">
                The dream
              </span>
              <br />
              {member.dream}
            </CaptionBox>
          </div>
        </div>
      </div>

      {/* Fourth piece: the figures, on ink again. Its upper edge is the third cut. */}
      <div className="zoro-facts relative">
        <span aria-hidden="true" className="zoro-facts__bg" />
        <span aria-hidden="true" className="zoro-blade zoro-blade--three" />
        <dl className={`${WRAP} relative flex flex-wrap items-end gap-x-14 gap-y-5 text-paper`}>
          <div className="min-w-0">
            <dt className="font-display text-xs tracking-widest text-tone-2 uppercase">Bounty</dt>
            <dd className="zoro-facts__bounty font-display leading-none break-words">
              <span className="text-tone-2">฿</span> {member.bounty}
            </dd>
          </div>
          <div className="min-w-0">
            <dt className="font-display text-xs tracking-widest text-tone-2 uppercase">Joined</dt>
            <dd className="font-display text-xl leading-tight uppercase sm:text-3xl">
              {member.joined}
            </dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

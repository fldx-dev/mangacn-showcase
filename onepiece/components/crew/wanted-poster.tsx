import { cn } from "cn";
import Image from "next/image";
import { FocusLines } from "@/components/focus-lines";
import { HalftoneBackground } from "@/components/halftone-background";
import { Panel } from "@/components/panel";
import { PosterFallback } from "@/components/poster-fallback";
import { SfxText } from "@/components/sfx-text";
import { Stamp } from "@/components/stamp";
import type { CrewMember } from "@/lib/crew";

/** The poster the owner supplied, or a typeset stand-in built from mangacn parts. */
export function WantedPoster({ member, poster }: { member: CrewMember; poster: string | null }) {
  if (poster) {
    return (
      <Panel shadow as="figure" className="mx-auto w-full max-w-sm p-3">
        <div className="relative aspect-[5/7] w-full">
          <Image
            src={poster}
            alt={`Wanted poster of ${member.name}`}
            fill
            priority
            sizes="(min-width: 1024px) 24rem, 100vw"
            className="object-contain"
          />
        </div>
        {member.posterBounty && (
          <figcaption className="text-center text-xs text-muted-foreground">
            Latest released poster, printed at ฿ {member.posterBounty}. Current bounty: ฿{" "}
            {member.bounty}.
          </figcaption>
        )}
      </Panel>
    );
  }
  return (
    <Panel
      shadow
      as="figure"
      aria-label={`Wanted poster of ${member.name}`}
      className="mx-auto w-full max-w-sm items-center gap-3 p-5 text-center"
    >
      <HalftoneBackground tone="light" fade="bottom" className="inset-(--outline-width-heavy)" />
      <p className="font-display text-5xl leading-none tracking-wider uppercase sm:text-6xl">
        Wanted
      </p>
      <Panel as="div" className="aspect-square w-full items-center justify-center">
        <FocusLines color="tone" length="long" className="inset-(--outline-width-heavy)" />
        <SfxText size="md" color="spot" rotate={-8} className="max-w-full text-center text-balance">
          {member.epithet}
        </SfxText>
        <Stamp size="sm" color="ink" className="absolute right-3 bottom-3">
          Marine
        </Stamp>
      </Panel>
      <p className="font-display text-sm tracking-[0.3em] uppercase">Dead or alive</p>
      <p className="font-display text-2xl leading-tight text-balance uppercase sm:text-3xl">
        {member.name}
      </p>
      <p className="font-display text-xl break-words sm:text-2xl">
        <span className="text-spot">฿</span> {member.bounty}
      </p>
    </Panel>
  );
}

/**
 * The poster for an authored hero: one framed sheet that scales with its box. With no artwork
 * file it is the em-scaled typeset poster, sized by `fallbackClassName` (a font size).
 */
export function HeroPoster({
  member,
  poster,
  sizes,
  className,
  fallbackClassName = "text-xs sm:text-sm",
}: {
  member: CrewMember;
  poster: string | null;
  sizes: string;
  className?: string;
  fallbackClassName?: string;
}) {
  return (
    <Panel
      shadow
      as="figure"
      aria-label={poster ? undefined : `Wanted poster of ${member.name}`}
      className={cn("w-full p-2", className)}
    >
      {poster ? (
        <div className="relative aspect-[5/7] w-full">
          <Image
            src={poster}
            alt={`Wanted poster of ${member.name}`}
            fill
            priority
            sizes={sizes}
            className="object-contain"
          />
        </div>
      ) : (
        <PosterFallback epithet={member.epithet} name={member.name} className={fallbackClassName} />
      )}
    </Panel>
  );
}

/** The line that explains a poster printed before the member's current bounty, or nothing. */
export function posterNote(member: CrewMember, poster: string | null): string | null {
  if (!poster || !member.posterBounty) return null;
  return `Latest released poster, printed at ฿ ${member.posterBounty}. Current bounty: ฿ ${member.bounty}.`;
}

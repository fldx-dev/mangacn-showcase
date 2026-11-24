import { CaptionBox } from "@/components/caption-box";
import { WantedPoster } from "@/components/crew/wanted-poster";
import { Panel } from "@/components/panel";
import { PanelGrid, PanelGridItem } from "@/components/panel-grid";
import { SpeechBubble } from "@/components/speech-bubble";
import { Badge } from "@/components/ui/badge";
import type { CrewMember } from "@/lib/crew";

export interface CrewHeroProps {
  member: CrewMember;
  /** The artwork file, or null when the repository ships without it. */
  poster: string | null;
}

/** The hero every member gets unless one is authored for them in `crew-hero.tsx`. */
export function HeroDefault({ member, poster }: CrewHeroProps) {
  const facts = [
    { label: "Bounty", value: `฿ ${member.bounty}` },
    { label: "Joined", value: member.joined },
  ];
  return (
    <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,24rem)_1fr] lg:gap-14">
      <WantedPoster member={member} poster={poster} />

      <div className="flex min-w-0 flex-col items-start gap-6">
        <Badge variant="spot">{member.role}</Badge>
        <h1 className="font-display text-4xl leading-tight text-balance uppercase sm:text-6xl">
          {member.name}
        </h1>
        <p className="font-dialogue text-lg text-muted-foreground">
          &ldquo;{member.epithet}&rdquo;
        </p>
        <SpeechBubble
          shape="shout"
          tail="bottom-left"
          aria-label={member.name}
          className="text-base sm:text-xl"
        >
          {member.quote}
        </SpeechBubble>
        <p className="max-w-prose text-base leading-relaxed">{member.about}</p>
        <CaptionBox aria-label="Dream" className="text-base">
          <span className="font-display text-xs tracking-widest text-spot uppercase">
            The dream
          </span>
          <br />
          {member.dream}
        </CaptionBox>
        <PanelGrid columns={{ base: 1, sm: 2 }}>
          {facts.map((fact) => (
            <PanelGridItem key={fact.label}>
              <Panel as="div" className="gap-1">
                <p className="text-xs tracking-widest text-muted-foreground uppercase">
                  {fact.label}
                </p>
                <p className="font-display text-base break-words uppercase">{fact.value}</p>
              </Panel>
            </PanelGridItem>
          ))}
        </PanelGrid>
      </div>
    </div>
  );
}

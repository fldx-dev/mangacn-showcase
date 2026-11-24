import type { ReactNode } from "react";
import { HeroBrook } from "@/components/crew/hero-brook";
import { HeroChopper } from "@/components/crew/hero-chopper";
import type { CrewHeroProps } from "@/components/crew/hero-default";
import { HeroZoro } from "@/components/crew/hero-zoro";
import { HeroLuffy } from "@/components/crew/hero-luffy";
import { HeroNami } from "@/components/crew/hero-nami";
import { HeroUsopp } from "@/components/crew/hero-usopp";
import { HeroSanji } from "@/components/crew/hero-sanji";
import { HeroRobin } from "@/components/crew/hero-robin";
import { HeroFranky } from "@/components/crew/hero-franky";
import { HeroJinbe } from "@/components/crew/hero-jinbe";

export interface AuthoredHeroProps extends CrewHeroProps {
  /** The "All crew" link. An authored hero runs edge to edge, so it places the link itself. */
  back: ReactNode;
}

/** The members with a hero written for them. Add the slug here and a case below. */
// A slug moves into this set once its hero file returns real markup.
const AUTHORED = new Set(["zoro", "brook", "chopper", "luffy", "nami", "usopp", "sanji", "robin", "franky", "jinbe"]);

export function hasAuthoredHero(slug: string): boolean {
  return AUTHORED.has(slug);
}

/**
 * The hero written for one member: a full-width section that opens the page. Everyone not listed
 * above gets `HeroDefault` inside the page column instead.
 */
export function AuthoredHero(props: AuthoredHeroProps) {
  switch (props.member.slug) {
    case "zoro":
      return <HeroZoro {...props} />;
    case "brook":
      return <HeroBrook {...props} />;
    case "chopper":
      return <HeroChopper {...props} />;
    case "luffy":
      return <HeroLuffy {...props} />;
    case "nami":
      return <HeroNami {...props} />;
    case "usopp":
      return <HeroUsopp {...props} />;
    case "sanji":
      return <HeroSanji {...props} />;
    case "robin":
      return <HeroRobin {...props} />;
    case "franky":
      return <HeroFranky {...props} />;
    case "jinbe":
      return <HeroJinbe {...props} />;
    default:
      return null;
  }
}

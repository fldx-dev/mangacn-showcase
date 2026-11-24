import { existsSync } from "node:fs";
import path from "node:path";

export interface CrewMember {
  slug: string;
  name: string;
  epithet: string;
  role: string;
  bounty: string;
  /** The bounty printed on the poster image, when the latest released poster predates `bounty`. */
  posterBounty?: string;
  /**
   * The saga (named as in `lib/story.ts`) in which the member comes aboard, as each character's
   * wiki page gives it: Robin at the end of Alabasta, Jinbe in Wano Country. The arc that lists
   * them in its `joins` sits in this saga.
   */
  joined: string;
  style: string;
  dream: string;
  quote: string;
  about: string;
}

export const CREW: CrewMember[] = [
  {
    slug: "luffy",
    name: "Monkey D. Luffy",
    epithet: "Straw Hat",
    role: "Captain",
    bounty: "3,000,000,000",
    joined: "Founder",
    style: "Rubber body, Devil Fruit",
    dream: "Become King of the Pirates.",
    quote: "I'm gonna be King of the Pirates!",
    about:
      "A boy who ate a Devil Fruit, turned to rubber and never learned to swim. He picks his crew on instinct, his fights on principle and his meals by size.",
  },
  {
    slug: "zoro",
    name: "Roronoa Zoro",
    epithet: "Pirate Hunter",
    role: "Swordsman",
    bounty: "1,111,000,000",
    posterBounty: "320,000,000",
    joined: "East Blue",
    style: "Three Sword Style",
    dream: "Become the world's greatest swordsman.",
    quote: "Nothing happened.",
    about:
      "The first to join. Fights with three swords, one of them in his teeth, and can get lost on a straight road.",
  },
  {
    slug: "nami",
    name: "Nami",
    epithet: "Cat Burglar",
    role: "Navigator",
    bounty: "366,000,000",
    posterBounty: "66,000,000",
    joined: "East Blue",
    style: "Clima-Tact, weather science",
    dream: "Draw a map of the entire world.",
    quote: "Luffy... help me.",
    about:
      "A navigator who reads the weather by feel and the crew's wallet by heart. Without her the ship would not survive a single day on the Grand Line.",
  },
  {
    slug: "usopp",
    name: "Usopp",
    epithet: "God",
    role: "Sniper",
    bounty: "500,000,000",
    posterBounty: "200,000,000",
    joined: "East Blue",
    style: "Slingshot marksmanship",
    dream: "Become a brave warrior of the sea.",
    quote: "I have 8,000 followers!",
    about:
      "A teller of tall tales with a sniper's eye. Scared of nearly everything, and he takes the shot anyway.",
  },
  {
    slug: "sanji",
    name: "Sanji",
    epithet: "Black Leg",
    role: "Cook",
    bounty: "1,032,000,000",
    joined: "East Blue",
    style: "Black Leg Style kicks",
    dream: "Find the All Blue, the sea where every fish swims.",
    quote: "A cook's hands are for cooking.",
    about:
      "Raised on a floating restaurant. He fights only with his legs, because a cook never risks his hands, and never lets anyone go hungry.",
  },
  {
    slug: "chopper",
    name: "Tony Tony Chopper",
    epithet: "Cotton Candy Lover",
    role: "Doctor",
    bounty: "1,000",
    posterBounty: "100",
    joined: "Alabasta",
    style: "Human-Human Fruit, Rumble Ball",
    dream: "Become a doctor who can cure any disease.",
    quote: "That doesn't make me happy at all, you jerk!",
    about:
      "A reindeer who ate a Devil Fruit and became the crew's doctor. The world's governments keep mistaking him for the pet.",
  },
  {
    slug: "robin",
    name: "Nico Robin",
    epithet: "Devil Child",
    role: "Archaeologist",
    bounty: "930,000,000",
    posterBounty: "130,000,000",
    joined: "Alabasta",
    style: "Flower-Flower Fruit",
    dream: "Learn the true history of the world.",
    quote: "I want to live!",
    about:
      "The last scholar of Ohara and the only person alive who can read the Poneglyphs. Hunted since she was eight years old.",
  },
  {
    slug: "franky",
    name: "Franky",
    epithet: "Iron Man",
    role: "Shipwright",
    bounty: "394,000,000",
    joined: "Water 7",
    style: "Cyborg, runs on cola",
    dream: "Sail the ship he built to the end of the world.",
    quote: "SUPER!",
    about:
      "A cyborg who rebuilt himself from scrap and built the Thousand Sunny from the strongest wood in the world.",
  },
  {
    slug: "brook",
    name: "Brook",
    epithet: "Soul King",
    role: "Musician",
    bounty: "383,000,000",
    posterBounty: "83,000,000",
    joined: "Thriller Bark",
    style: "Fencing, Revive-Revive Fruit",
    dream: "Keep a promise to a whale named Laboon.",
    quote: "Yohohoho!",
    about:
      "A skeleton with an afro, a violin and fifty years of loneliness behind him. Died once, came back, still tells skull jokes.",
  },
  {
    slug: "jinbe",
    name: "Jinbe",
    epithet: "Knight of the Sea",
    role: "Helmsman",
    bounty: "1,100,000,000",
    joined: "Wano Country",
    style: "Fish-Man Karate",
    dream: "See fish-men and humans live side by side.",
    quote: "Count what you still have!",
    about:
      "A whale shark fish-man and former Warlord of the Sea. The steadiest hand ever to hold the Sunny's wheel.",
  },
];

/** Whether a file under `public/` is present; artwork is optional and may not ship. */
export function hasPublicFile(src: string): boolean {
  return existsSync(path.join(process.cwd(), "public", ...src.split("/").filter(Boolean)));
}

/** A poster the site owner dropped into `public/posters/<slug>.<ext>`, or null. */
export function posterFor(slug: string): string | null {
  for (const ext of ["webp", "png", "jpg", "jpeg"]) {
    if (existsSync(path.join(process.cwd(), "public", "posters", `${slug}.${ext}`))) {
      return `/posters/${slug}.${ext}`;
    }
  }
  return null;
}

/** A picture for one growth stage, dropped into `public/forms/<slug>-<key>.<ext>`, or null. */
export function formFor(slug: string, key: string): string | null {
  for (const ext of ["webp", "png", "jpg", "jpeg"]) {
    if (existsSync(path.join(process.cwd(), "public", "forms", `${slug}-${key}.${ext}`))) {
      return `/forms/${slug}-${key}.${ext}`;
    }
  }
  return null;
}

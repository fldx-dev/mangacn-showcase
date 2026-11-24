/**
 * Powers, weapons and growth for each crew member's detail page, keyed by `CrewMember.slug`.
 * Devil fruits, Haki types, weapons, training islands and bounty figures were checked against the
 * One Piece Wiki's character and "Abilities and Powers" pages. Stages name the arc they happen in.
 */

export interface GrowthStage {
  /** Also the file name of an optional picture: `public/forms/<slug>-<key>.<ext>`. */
  key: string;
  title: string;
  /** The arc or saga the stage belongs to. */
  when: string;
  /**
   * The slug of the one arc in `lib/story.ts` the stage happens in, when it is a single arc: the
   * page links the stage to `/story#<arc>`. Left off for stages that span arcs or sit outside them.
   */
  arc?: string;
  text: string;
  /** Where the picture comes from, shown under it; manga unless said otherwise. */
  imageSource?: string;
}

export interface CrewDetails {
  /** Null for the members who never ate one. */
  devilFruit: { name: string; type: string; text: string } | null;
  style: string;
  weapon: string;
  /** The Haki types the member has shown; empty when none. */
  haki: string[];
  moves: string[];
  growth: GrowthStage[];
  /** Every bounty in order, oldest first; the last is the current one. */
  bounties: { amount: number; after: string }[];
}

export const CREW_DETAILS: Record<string, CrewDetails> = {
  luffy: {
    devilFruit: {
      name: "Gomu Gomu no Mi",
      type: "Mythical Zoan",
      text: "Known for years as a rubber Paramecia. Its true name is the Hito Hito no Mi, Model: Nika, the fruit of a laughing sun god.",
    },
    style: "Bare fists, a rubber body and whatever idea he had a second ago",
    weapon: "None. He is the weapon.",
    haki: ["Observation", "Armament", "Supreme King"],
    moves: ["Gomu Gomu no Pistol", "Gatling", "Red Hawk", "Kong Gun", "Bajrang Gun"],
    growth: [
      {
        key: "start",
        title: "A rubber boy",
        when: "East Blue",
        arc: "romance-dawn",
        text: "Eats the fruit as a child, loses the ability to swim and inherits a straw hat. Sets out at seventeen in a rowing boat.",
      },
      {
        key: "gear-2",
        title: "Gear 2",
        when: "Enies Lobby",
        arc: "enies-lobby",
        text: "Pumps blood through his rubber veins until he steams. Faster and stronger, at a price paid by his own body.",
      },
      {
        key: "gear-3",
        title: "Gear 3",
        when: "Enies Lobby",
        arc: "enies-lobby",
        text: "Blows air into his bones. A fist the size of a giant's, enough to fling Rob Lucci onto a warship.",
        imageSource: "Manga, a later Gear 3 punch from Wano Country",
      },
      {
        key: "training",
        title: "Two years with Rayleigh",
        when: "Rusukaina",
        text: "After Marineford he stops running and trains for two years. He comes back with all three kinds of Haki.",
      },
      {
        key: "gear-4",
        title: "Gear 4",
        when: "Dressrosa",
        arc: "dressrosa",
        text: "Inflates his muscles and coats them in Armament Haki. Boundman first, against Doflamingo; Tankman and Snakeman follow on Whole Cake Island.",
        imageSource: "Manga, colour",
      },
      {
        key: "gear-5",
        title: "Gear 5",
        when: "Wano Country",
        arc: "wano-country",
        text: "The fruit awakens in the fight with Kaidou. Hair and clothes turn white, the world turns to rubber, and he fights laughing.",
      },
    ],
    bounties: [
      { amount: 30_000_000, after: "Arlong Park" },
      { amount: 100_000_000, after: "Alabasta" },
      { amount: 300_000_000, after: "Enies Lobby" },
      { amount: 400_000_000, after: "Marineford" },
      { amount: 500_000_000, after: "Dressrosa" },
      { amount: 1_500_000_000, after: "Whole Cake Island" },
      { amount: 3_000_000_000, after: "Wano Country" },
    ],
  },
  zoro: {
    devilFruit: null,
    style: "Three Sword Style, one blade in each hand and one in his teeth",
    weapon: "Wado Ichimonji, Sandai Kitetsu and Enma",
    haki: ["Observation", "Armament", "Supreme King"],
    moves: ["Oni Giri", "Shishi Sonson", "Ashura", "King of Hell Three Sword Style"],
    growth: [
      {
        key: "promise",
        title: "A promise to Kuina",
        when: "Before the voyage",
        text: "Swears to a childhood rival that one of them will be the greatest swordsman in the world. He carries her sword, Wado Ichimonji.",
      },
      {
        key: "mihawk",
        title: "Cut down by Mihawk",
        when: "East Blue",
        arc: "baratie",
        text: "Challenges the world's greatest swordsman at the Baratie and is utterly defeated. He vows never to lose again.",
      },
      {
        key: "nothing",
        title: "Nothing happened",
        when: "Thriller Bark",
        arc: "thriller-bark",
        text: "Takes all of his captain's pain and fatigue into his own body, then tells the crew nothing happened.",
      },
      {
        key: "training",
        title: "Two years under Mihawk",
        when: "Kuraigana Island",
        text: "Sent flying by Kuma, he bows to the man he means to beat and asks to be taught.",
      },
      {
        key: "enma",
        title: "Enma",
        when: "Wano Country",
        arc: "wano-country",
        text: "Trades Shusui for the sword of Kouzuki Oden. On Onigashima he fights as King of Hell and brings down King.",
      },
    ],
    bounties: [
      { amount: 60_000_000, after: "Alabasta" },
      { amount: 120_000_000, after: "Enies Lobby" },
      { amount: 320_000_000, after: "Dressrosa" },
      { amount: 1_111_000_000, after: "Wano Country" },
    ],
  },
  nami: {
    devilFruit: null,
    style: "Weather science: she builds the storm, then aims it",
    weapon: "Clima-Tact, a staff first built for her by Usopp",
    haki: [],
    moves: ["Thunderbolt Tempo", "Mirage Tempo"],
    growth: [
      {
        key: "arlong",
        title: "Free of Arlong",
        when: "East Blue",
        arc: "arlong-park",
        text: "Eight years stealing to buy back her village end when she asks the crew for help. This time she joins for real.",
      },
      {
        key: "clima-tact",
        title: "The first Clima-Tact",
        when: "Alabasta",
        arc: "arabasta",
        text: "Usopp hands her a party trick in three pieces. She works out what it can do in the middle of a fight, and wins.",
      },
      {
        key: "training",
        title: "Two years on Weatheria",
        when: "Weatheria",
        text: "Lands on a sky island of weather scientists and studies there. She leaves with the Sorcery Clima-Tact.",
      },
      {
        key: "zeus",
        title: "Zeus changes sides",
        when: "Whole Cake Island to Wano Country",
        text: "Wins over an emperor's living thundercloud. In Wano it merges with her weapon.",
      },
    ],
    bounties: [
      { amount: 16_000_000, after: "Enies Lobby" },
      { amount: 66_000_000, after: "Dressrosa" },
      { amount: 366_000_000, after: "Wano Country" },
    ],
  },
  usopp: {
    devilFruit: null,
    style: "Sniping from as far away as possible, with tricks and plants for ammunition",
    weapon: "Kuro Kabuto, a giant slingshot, and Pop Greens",
    haki: ["Observation"],
    moves: ["Firebird Star", "Green Star: Devil"],
    growth: [
      {
        key: "village",
        title: "The boy who cried pirate",
        when: "East Blue",
        arc: "syrup-village",
        text: "Lies about pirates every morning until real ones arrive, then stands in their way.",
      },
      {
        key: "sogeking",
        title: "Sogeking",
        when: "Water 7 and Enies Lobby",
        text: "Fights his own captain over the Going Merry, leaves, and returns in a mask. He burns the World Government's flag with a new slingshot, Kabuto.",
      },
      {
        key: "training",
        title: "Two years with Heracles",
        when: "Boin Archipelago",
        text: "Survives an island that eats people and learns to fight with Pop Greens.",
      },
      {
        key: "god",
        title: "God Usopp",
        when: "Dressrosa",
        arc: "dressrosa",
        text: "Knocks out Sugar, and the toys she made turn back into people who start to worship him. Later he awakens Observation Haki and hits her again with an impossible shot.",
      },
    ],
    bounties: [
      { amount: 30_000_000, after: "Enies Lobby, as Sogeking" },
      { amount: 200_000_000, after: "Dressrosa" },
      { amount: 500_000_000, after: "Wano Country" },
    ],
  },
  sanji: {
    devilFruit: null,
    style: "Black Leg Style: kicks only, because a cook never risks his hands",
    weapon: "His legs, and fire",
    haki: ["Observation", "Armament"],
    moves: ["Diable Jambe", "Sky Walk", "Ifrit Jambe"],
    growth: [
      {
        key: "zeff",
        title: "Raised by Zeff",
        when: "East Blue",
        arc: "baratie",
        text: "Starves on a rock with a pirate who gives up his own leg for him. Learns to cook, and to kick, on the floating restaurant Baratie.",
      },
      {
        key: "diable-jambe",
        title: "Diable Jambe",
        when: "Enies Lobby",
        arc: "enies-lobby",
        text: "Spins until his leg burns red hot, then kicks with it.",
      },
      {
        key: "training",
        title: "Two years of running",
        when: "Kamabakka Kingdom",
        text: "Chased across an island for two years. He comes back able to kick off the air itself with Sky Walk.",
      },
      {
        key: "vinsmoke",
        title: "The Vinsmoke name",
        when: "Whole Cake Island",
        arc: "whole-cake-island",
        text: "His family drags him back to marry him off. He chooses the crew over the name he was born with.",
      },
      {
        key: "ifrit-jambe",
        title: "Ifrit Jambe",
        when: "Wano Country",
        arc: "wano-country",
        text: "Destroys his Raid Suit to stay himself. With a body that has finally changed, he burns hotter than ever and knocks out Queen.",
      },
    ],
    bounties: [
      { amount: 77_000_000, after: "Enies Lobby" },
      { amount: 177_000_000, after: "Dressrosa, only alive" },
      { amount: 330_000_000, after: "Whole Cake Island" },
      { amount: 1_032_000_000, after: "Wano Country" },
    ],
  },
  chopper: {
    devilFruit: {
      name: "Hito Hito no Mi",
      type: "Zoan",
      text: "The Human-Human Fruit, eaten by a reindeer. It gave him a human mind, a human voice and a blue nose nobody asked about.",
    },
    style: "Shape-shifting between forms, each built for one job",
    weapon: "The Rumble Ball, a drug of his own invention",
    haki: [],
    moves: ["Kung Fu Point", "Horn Point", "Guard Point", "Monster Point"],
    growth: [
      {
        key: "hiriluk",
        title: "A quack and a flag",
        when: "Drum Island",
        arc: "drum-island",
        text: "Cast out by reindeer and by people, he is taken in by Dr. Hiriluk and trained by Dr. Kureha. He leaves under cherry blossom snow.",
      },
      {
        key: "monster",
        title: "Monster Point",
        when: "Enies Lobby",
        arc: "enies-lobby",
        text: "A third Rumble Ball turns him into a rampaging giant he cannot control.",
      },
      {
        key: "training",
        title: "Two years of study",
        when: "Torino Kingdom",
        text: "Studies in a village library. Afterwards he changes form at will and holds Monster Point for three minutes with his mind intact.",
      },
      {
        key: "wano",
        title: "Thirty minutes",
        when: "Wano Country",
        arc: "wano-country",
        text: "A reworked Rumble Ball stretches Monster Point to thirty minutes. He also cures a plague in the middle of the battle.",
      },
    ],
    bounties: [
      { amount: 50, after: "Enies Lobby, as the pet" },
      { amount: 100, after: "Dressrosa" },
      { amount: 1_000, after: "Wano Country" },
    ],
  },
  robin: {
    devilFruit: {
      name: "Hana Hana no Mi",
      type: "Paramecia",
      text: "The Flower-Flower Fruit. She can sprout copies of her limbs on any surface, including on you.",
    },
    style: "Holds and locks from a distance, with as many arms as it takes",
    weapon: "None",
    haki: ["Armament"],
    moves: ["Cien Fleur", "Clutch", "Gigantesco Mano", "Demonio Fleur"],
    growth: [
      {
        key: "ohara",
        title: "The last of Ohara",
        when: "Before the voyage",
        text: "Her island of scholars is burned for reading the Poneglyphs. She gets a bounty at eight years old and runs for twenty years.",
      },
      {
        key: "alabasta",
        title: "Miss All Sunday",
        when: "Alabasta",
        arc: "arabasta",
        text: "Works for a warlord to reach a Poneglyph. When it fails she asks a rubber boy to take responsibility, and boards his ship.",
      },
      {
        key: "live",
        title: "I want to live",
        when: "Enies Lobby",
        arc: "enies-lobby",
        text: "Gives herself up to save the crew. They declare war on the world to hear her say she wants to stay.",
      },
      {
        key: "training",
        title: "Two years with the Revolutionary Army",
        when: "After Tequila Wolf",
        text: "Freed from a slave bridge by the revolutionaries, she trains with them.",
      },
      {
        key: "demonio",
        title: "Demonio Fleur",
        when: "Wano Country",
        arc: "wano-country",
        text: "The Devil Child takes the name as a weapon: a giant demon of herself, enough to beat Black Maria.",
      },
    ],
    bounties: [
      { amount: 79_000_000, after: "Ohara, aged eight" },
      { amount: 80_000_000, after: "Enies Lobby" },
      { amount: 130_000_000, after: "Dressrosa" },
      { amount: 930_000_000, after: "Wano Country" },
    ],
  },
  franky: {
    devilFruit: null,
    style: "Brawling with a body he built himself, fuelled by cola",
    weapon: "Strong Right, Coup de Vent, Radical Beam and the robot General Franky",
    haki: [],
    moves: ["Strong Right", "Coup de Vent", "Radical Beam"],
    growth: [
      {
        key: "tom",
        title: "Rebuilt from scrap",
        when: "Water 7, years before",
        text: "A shipwright's apprentice run over by a sea train. He rebuilds himself as a cyborg with whatever metal he can reach.",
      },
      {
        key: "sunny",
        title: "The dream ship",
        when: "Enies Lobby and Post-Enies Lobby",
        text: "Burns the blueprints of an ancient weapon in front of the people who wanted them, then builds the Thousand Sunny and joins the crew.",
      },
      {
        key: "training",
        title: "Two years in Vegapunk's lab",
        when: "Baldimore",
        text: "Studies the notes of the world's greatest scientist, blows up the laboratory and rebuilds his body again.",
      },
      {
        key: "general",
        title: "General Franky",
        when: "After the timeskip",
        text: "A thirteen-metre robot that docks from the Sunny's own vehicles. In Wano he brings down Sasaki.",
      },
    ],
    bounties: [
      { amount: 44_000_000, after: "Enies Lobby" },
      { amount: 94_000_000, after: "Dressrosa" },
      { amount: 394_000_000, after: "Wano Country" },
    ],
  },
  brook: {
    devilFruit: {
      name: "Yomi Yomi no Mi",
      type: "Paramecia",
      text: "The Revive-Revive Fruit. It brought his soul back once. It took a year to find his body, and by then only the bones and the afro were left.",
    },
    style: "Fencing at the speed of a quick-draw, and music that reaches the soul",
    weapon: "Soul Solid, a sword hidden in a cane",
    haki: [],
    moves: ["Hanauta Sancho: Yahazu Giri", "Soul Parade"],
    growth: [
      {
        key: "laboon",
        title: "A promise to a whale",
        when: "Before the voyage",
        text: "The Rumbar Pirates leave a young whale named Laboon at the entrance to the Grand Line and promise to come back.",
      },
      {
        key: "alone",
        title: "Fifty years alone",
        when: "Florian Triangle",
        text: "His crew dies singing. He returns as a skeleton and drifts in the fog on a ghost ship.",
      },
      {
        key: "joins",
        title: "A shadow returned",
        when: "Thriller Bark",
        arc: "thriller-bark",
        text: "The crew wins back his stolen shadow. He joins before the captain has finished asking.",
      },
      {
        key: "training",
        title: "Soul King",
        when: "During the timeskip",
        text: "Becomes a rock star, and learns what his fruit really does: his soul can leave his body and chill his blade.",
      },
      {
        key: "bigmom",
        title: "Alone against an emperor",
        when: "Whole Cake Island",
        arc: "whole-cake-island",
        text: "Slips into Big Mom's treasure room to copy her Poneglyphs, and holds out just long enough to get away with the copies.",
      },
    ],
    bounties: [
      { amount: 33_000_000, after: "His days with the Rumbar Pirates" },
      { amount: 83_000_000, after: "Dressrosa" },
      { amount: 383_000_000, after: "Wano Country" },
    ],
  },
  jinbe: {
    devilFruit: null,
    style: "Fish-Man Karate and Fish-Man Jujutsu: he strikes the water in the air and in you",
    weapon: "None",
    haki: ["Observation", "Armament"],
    moves: ["Fish-Man Karate", "Fish-Man Jujutsu"],
    growth: [
      {
        key: "sun",
        title: "The Sun Pirates",
        when: "Before the voyage",
        text: "A soldier of Fish-Man Island who follows Fisher Tiger to sea, and takes over as captain after him.",
      },
      {
        key: "warlord",
        title: "Warlord of the Sea",
        when: "Before the voyage",
        text: "The first fish-man to hold the title. His bounty is frozen while he wears it.",
      },
      {
        key: "marineford",
        title: "Throws the title away",
        when: "Summit War",
        text: "Refuses to fight Whitebeard and is jailed for it. Breaks out beside Luffy, carries him from the war and tells him to count what he still has.",
      },
      {
        key: "bigmom",
        title: "Leaves an emperor",
        when: "Whole Cake Island",
        arc: "whole-cake-island",
        text: "Resigns from Big Mom's fleet to her face, and stays behind so the crew can escape.",
      },
      {
        key: "helm",
        title: "Takes the helm",
        when: "Wano Country",
        arc: "wano-country",
        text: "Arrives at Onigashima as the tenth Straw Hat. He defeats Who's-Who of the Tobiroppo.",
      },
    ],
    bounties: [
      { amount: 76_000_000, after: "Joining the Sun Pirates" },
      { amount: 250_000_000, after: "Becoming their captain" },
      { amount: 438_000_000, after: "Marineford" },
      { amount: 1_100_000_000, after: "Wano Country" },
    ],
  },
};

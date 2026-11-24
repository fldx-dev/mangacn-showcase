// Generated from research against the One Piece Wiki ("Story Arcs" and each arc's page).
// Chapter ranges come from the wiki; summaries and events are written for this site.

export interface StoryImage {
  src: string;
  /** What the picture shows; also its caption. */
  alt: string;
  kind: string;
}

export interface StoryArc {
  name: string;
  slug: string;
  /** First and last manga chapter; the last is null while the arc is running. */
  chapters: [number | null, number | null];
  setting: string;
  summary: string;
  events: string[];
  joins: { name: string; slug: string | null }[];
  villain: string;
  ongoing: boolean;
  images: StoryImage[];
}

export interface StorySaga {
  name: string;
  slug: string;
  chapters: [number | null, number | null];
  arcs: StoryArc[];
}

/** The latest chapter this data knows about. */
export const STORY_UP_TO = 1126;

/** The chapter range of a saga as shown on the home page, e.g. "Ch. 1 to 100". */
export function sagaChapterLabel(slug: string): string {
  const saga = STORY.find((entry) => entry.slug === slug);
  if (!saga) throw new Error(`Unknown saga slug: ${slug}`);
  const [first, last] = saga.chapters;
  return last === null ? `Ch. ${first} onward` : `Ch. ${first} to ${last}`;
}

export const STORY: StorySaga[] = [
  {
    "name": "East Blue",
    "slug": "east-blue-saga",
    "chapters": [
      1,
      100
    ],
    "arcs": [
      {
        "name": "Romance Dawn",
        "slug": "romance-dawn",
        "chapters": [
          1,
          7
        ],
        "setting": "Foosha Village, Alvida's ship and Shells Town (East Blue)",
        "summary": "As a boy, Luffy eats the Gomu Gomu no Mi and promises Shanks he will become a great pirate. Ten years later he sets sail alone, frees the cabin boy Koby from Alvida, and reaches Shells Town, where the Marine captain Morgan rules by fear. Luffy rescues the imprisoned pirate hunter Roronoa Zoro, who becomes his first crewmate.",
        "events": [
          "Shanks loses his arm saving young Luffy and leaves him the straw hat",
          "Luffy sets sail, meets Koby and knocks out Alvida",
          "Luffy and Koby reach Shells Town and find Zoro tied up in the Marine base",
          "Luffy and Zoro defeat Axe-Hand Morgan and Helmeppo",
          "Zoro joins and Koby stays behind to become a Marine"
        ],
        "joins": [
          {
            "name": "Roronoa Zoro",
            "slug": "zoro"
          }
        ],
        "villain": "Axe-Hand Morgan (with Alvida and Helmeppo)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/romance-dawn-1.webp",
            "alt": "Volume 1 cover 'Romance Dawn': Luffy, Nami and a laughing Zoro on a small boat at sea",
            "kind": "volume cover"
          },
          {
            "src": "/story/romance-dawn-2.webp",
            "alt": "Chapter 1 opening colour spread: Luffy cheering with Shanks and the Red Hair Pirates amid treasure (Nami also drawn)",
            "kind": "colour spread"
          }
        ]
      },
      {
        "name": "Orange Town",
        "slug": "orange-town",
        "chapters": [
          8,
          21
        ],
        "setting": "Orange Town (East Blue)",
        "summary": "Lost and starving at sea, Luffy and Zoro land in Orange Town, which Buggy the Clown's crew has taken over. There Luffy meets Nami, a thief who steals only from pirates, and the three end up fighting Buggy together. Luffy defeats Buggy and leaves part of the treasure for the town to rebuild.",
        "events": [
          "Nami tricks Buggy's crew while Luffy is caged",
          "Mayor Boodle stands up for his town against Buggy",
          "Zoro beats Cabaji and Luffy beats Mohji's lion Richie",
          "Luffy defeats Buggy and scatters his body parts",
          "Nami sails on with Luffy and Zoro"
        ],
        "joins": [],
        "villain": "Buggy the Clown and the Buggy Pirates",
        "ongoing": false,
        "images": [
          {
            "src": "/story/orange-town-1.webp",
            "alt": "Volume 2 cover 'Versus!! Buggy Pirates': Buggy front and centre with Mohji, Cabaji and a fierce Luffy",
            "kind": "volume cover"
          },
          {
            "src": "/story/orange-town-2.webp",
            "alt": "Chapter 12 colour spread: Zoro with three swords, Luffy and Nami, the trio that forms in Orange Town",
            "kind": "colour spread"
          }
        ]
      },
      {
        "name": "Syrup Village",
        "slug": "syrup-village",
        "chapters": [
          22,
          41
        ],
        "setting": "Syrup Village, Gecko Islands (East Blue)",
        "summary": "Looking for a ship, the crew arrives at Syrup Village and meets Usopp, a habitual liar with a brave heart. They learn that Kaya's butler Klahadore is really the pirate Captain Kuro, who plans to kill her for her fortune. The Straw Hats and Usopp hold the coast against the Black Cat Pirates, and Kaya gives them the Going Merry.",
        "events": [
          "Luffy and Usopp overhear Klahadore plotting with Jango to murder Kaya",
          "The villagers ignore Usopp's warning because of his lies",
          "The crew holds the hill against the Black Cat Pirates",
          "Luffy defeats Kuro and Usopp, with Zoro's help, beats Jango",
          "Kaya gives the crew the Going Merry and Usopp joins"
        ],
        "joins": [
          {
            "name": "Usopp",
            "slug": "usopp"
          }
        ],
        "villain": "Captain Kuro (Klahadore) and the Black Cat Pirates",
        "ongoing": false,
        "images": [
          {
            "src": "/story/syrup-village-1.webp",
            "alt": "Volume 4 cover 'Crescent Moon': Captain Kuro adjusting his glasses with Jango, Buchi/Sham and Luffy under a crescent moon",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Baratie",
        "slug": "baratie",
        "chapters": [
          42,
          68
        ],
        "setting": "Baratie, a floating restaurant ship (East Blue)",
        "summary": "The crew visits the sea restaurant Baratie, where Luffy works off a debt and tries to recruit the cook Sanji. The starving pirate admiral Don Krieg returns from the Grand Line and attacks the restaurant to take it as his new ship, while Zoro challenges Dracule Mihawk and loses. Luffy beats Krieg and Sanji leaves his mentor Zeff to join the crew.",
        "events": [
          "Sanji feeds the starving Gin, and Don Krieg is fed before he turns on the restaurant",
          "Mihawk wrecks Krieg's fleet and defeats Zoro, who vows never to lose again",
          "Nami runs off with the Going Merry",
          "Luffy defeats Don Krieg to protect the Baratie",
          "Sanji tearfully thanks Zeff and joins the Straw Hats"
        ],
        "joins": [
          {
            "name": "Sanji",
            "slug": "sanji"
          }
        ],
        "villain": "Don Krieg and the Krieg Pirates",
        "ongoing": false,
        "images": [
          {
            "src": "/story/baratie-1.webp",
            "alt": "Chapter 52 colour spread: panels of Nami, Zoro, Luffy, Usopp, Fullbody, Mihawk, Zeff and Sanji around the title",
            "kind": "colour spread"
          },
          {
            "src": "/story/baratie-2.webp",
            "alt": "Volume 7 cover 'The Crap-Geezer': Sanji smoking on the Baratie deck while Luffy eats",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Arlong Park",
        "slug": "arlong-park",
        "chapters": [
          69,
          95
        ],
        "setting": "Cocoyasi Village and Arlong Park, Conomi Islands (East Blue)",
        "summary": "The crew follows Nami to her home, Cocoyasi Village, which the fish-man pirate Arlong has ruled for years. They learn she joined his crew as a child to buy back her village after he killed her adoptive mother Bell-mere. When Arlong betrays the deal, Nami asks Luffy for help, and the Straw Hats tear down Arlong Park.",
        "events": [
          "Nami is revealed as a member of the Arlong Pirates",
          "Flashback to Bell-mere's death and Nami's deal with Arlong",
          "Arlong uses the corrupt Marine Nezumi to seize Nami's savings",
          "Nami asks Luffy for help and he places his hat on her head",
          "Luffy defeats Arlong and destroys Arlong Park"
        ],
        "joins": [
          {
            "name": "Nami",
            "slug": "nami"
          }
        ],
        "villain": "Arlong and the Arlong Pirates (with Captain Nezumi)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/arlong-park-1.webp",
            "alt": "Volume 10 cover 'OK, Let's Stand Up!': Luffy pressing his straw hat down with Arlong and his officers looming behind",
            "kind": "volume cover"
          },
          {
            "src": "/story/arlong-park-2.webp",
            "alt": "Volume 9 cover 'Tears': Nami with a tangerine on her head and staff, panels of Luffy, Zoro, Usopp and Sanji",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Loguetown",
        "slug": "loguetown",
        "chapters": [
          96,
          100
        ],
        "setting": "Loguetown (East Blue)",
        "summary": "With Luffy's first bounty in the news, the crew stops at Loguetown, where Gol D. Roger was born and executed. Zoro buys new swords and meets Tashigi, Buggy and Alvida try to behead Luffy on Roger's scaffold, and Marine captain Smoker hunts the crew. A storm and a mysterious man, Dragon, help them escape to the Grand Line.",
        "events": [
          "Luffy's 30,000,000 Berry wanted poster arrives",
          "Zoro gets Sandai Kitetsu and Yubashiri and meets Tashigi",
          "Buggy tries to execute Luffy on Roger's scaffold, but lightning strikes it",
          "Smoker corners Luffy until Dragon intervenes",
          "The crew vows their dreams over a barrel and heads for the Grand Line"
        ],
        "joins": [],
        "villain": "Smoker (with Buggy and Alvida)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/loguetown-1.webp",
            "alt": "Colour art of Luffy grinning between Buggy and Smoker",
            "kind": "colour spread"
          }
        ]
      }
    ]
  },
  {
    "name": "Alabasta",
    "slug": "alabasta-saga",
    "chapters": [
      101,
      217
    ],
    "arcs": [
      {
        "name": "Reverse Mountain",
        "slug": "reverse-mountain",
        "chapters": [
          101,
          105
        ],
        "setting": "Reverse Mountain and Twin Capes (entrance to the Grand Line)",
        "summary": "The crew sails up Reverse Mountain into the Grand Line and is swallowed by Laboon, a giant whale. Inside they meet Crocus, who explains that Laboon has waited fifty years for a pirate crew that promised to return. Luffy fights Laboon and promises him a rematch, then takes Mr. 9 and Miss Wednesday along toward Whisky Peak.",
        "events": [
          "The Going Merry climbs Reverse Mountain",
          "Laboon swallows the ship and the crew meets Crocus",
          "Mr. 9 and Miss Wednesday fire bazookas at Laboon and Crocus takes the shots",
          "Luffy fights Laboon and paints his Jolly Roger on the whale's forehead as a promise",
          "The crew learns about Log Poses and leaves for Whisky Peak"
        ],
        "joins": [],
        "villain": "Mr. 9 and Miss Wednesday (minor antagonists)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/reverse-mountain-1.webp",
            "alt": "Chapter 103 colour cover: Luffy riding the scarred whale Laboon with Buggy and Smoker behind",
            "kind": "cover page"
          }
        ]
      },
      {
        "name": "Whisky Peak",
        "slug": "whisky-peak",
        "chapters": [
          106,
          114
        ],
        "setting": "Whisky Peak, Cactus Island (Grand Line)",
        "summary": "Whisky Peak greets the Straw Hats with a feast, but the townspeople are Baroque Works bounty hunters planning to capture them. Zoro defeats the whole town alone, and it emerges that Miss Wednesday is Princess Vivi of Alabasta, who infiltrated Baroque Works. The crew agrees to take Vivi home after Mr. 5 and Miss Valentine come to kill her.",
        "events": [
          "The town throws a welcome party for the pirates",
          "Zoro defeats the hundred bounty hunters by himself",
          "Miss Wednesday is revealed as Princess Vivi",
          "Luffy and Zoro beat Mr. 5 and Miss Valentine",
          "The crew sets out to take Vivi to Alabasta; Miss All Sunday appears"
        ],
        "joins": [
          {
            "name": "Vivi and Karoo, as passengers",
            "slug": null
          }
        ],
        "villain": "Baroque Works (Mr. 5 and Miss Valentine)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/whisky-peak-1.webp",
            "alt": "Volume 13 cover: Baroque Works agents (Mr. 5, Miss Valentine, Igaram, Mr. 9 and others) and Vivi around a bloated Luffy",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Little Garden",
        "slug": "little-garden",
        "chapters": [
          115,
          129
        ],
        "setting": "Little Garden (Grand Line)",
        "summary": "On a prehistoric island, the crew meets Dorry and Brogy, two giant warriors who have dueled for a hundred years over a forgotten cause. Baroque Works agents Mr. 3, Miss Goldenweek, Mr. 5 and Miss Valentine interfere and trap the crew in wax. Luffy and Usopp break the trap, and the giants carve a path through a sea monster for the Going Merry.",
        "events": [
          "Dorry and Brogy are introduced and their century-long duel is explained",
          "Mr. 3 sabotages the duel with a spiked bomb drink",
          "Mr. 3 traps Zoro, Nami and Vivi in his Candle Service Set",
          "Usopp and Luffy free them and defeat the agents",
          "Nami falls ill as the crew leaves for Alabasta"
        ],
        "joins": [],
        "villain": "Mr. 3 and Miss Goldenweek (with Mr. 5 and Miss Valentine)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/little-garden-1.webp",
            "alt": "Chapter 117 colour spread: giants Dorry and Brogy sitting before a volcano with the Straw Hats perched on them",
            "kind": "colour spread"
          },
          {
            "src": "/story/little-garden-2.webp",
            "alt": "Volume 15 cover 'Straight Ahead!!!': Dorry and Brogy raising weapons over Usopp and Luffy",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Drum Island",
        "slug": "drum-island",
        "chapters": [
          130,
          154
        ],
        "setting": "Drum Island (Grand Line)",
        "summary": "Nami catches a deadly fever, so the crew stops at the snowy Drum Island, where only the old doctor Kureha remains. Luffy carries Nami up the mountain to her castle and meets Tony Tony Chopper, a reindeer who ate a Human-Human Fruit. When the former tyrant king Wapol returns, Luffy defeats him, and Chopper joins the crew after a sky of pink snow honours his late mentor Hiriluk.",
        "events": [
          "Nami falls sick and the crew lands on Drum Island",
          "Luffy climbs the Drum Rockies carrying Nami and Sanji",
          "Chopper's past with Dr. Hiriluk is revealed",
          "Luffy defeats Wapol and protects Hiriluk's flag",
          "Kureha's pink snow sees Chopper off as he joins the crew"
        ],
        "joins": [
          {
            "name": "Tony Tony Chopper",
            "slug": "chopper"
          }
        ],
        "villain": "Wapol (with Chess and Kuromarimo)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/drum-island-1.webp",
            "alt": "Volume 17 cover 'Hiluluk's Cherry Blossoms': Wapol, Chess and Kuromarimo behind Luffy, Sanji and Chopper in winter clothes",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Alabasta",
        "slug": "arabasta",
        "chapters": [
          155,
          217
        ],
        "setting": "Alabasta Kingdom (Grand Line)",
        "summary": "The crew reaches Alabasta, a desert kingdom on the edge of civil war caused by Crocodile, a Warlord secretly leading Baroque Works. The Straw Hats split up to fight his officers while Vivi races to stop the rebels. Luffy beats Crocodile on his third try, rain returns to the kingdom, and Vivi stays behind as Nico Robin stows away on the ship (she formally joins at the start of the Jaya Arc).",
        "events": [
          "Ace appears and helps the crew escape Smoker in Nanohana",
          "Crocodile traps the crew in Rainbase and beats Luffy in the desert",
          "The Straw Hats defeat the Baroque Works officer agents in Alubarna",
          "Luffy defeats Crocodile and rain falls on Alabasta",
          "Vivi says goodbye with the X mark and Nico Robin turns up aboard the Going Merry"
        ],
        "joins": [
          {
            "name": "Nico Robin",
            "slug": "robin"
          }
        ],
        "villain": "Crocodile (Mr. 0) and Baroque Works",
        "ongoing": false,
        "images": [
          {
            "src": "/story/arabasta-1.webp",
            "alt": "Volume 23 cover 'Vivi's Adventure': smiling Vivi in front of battle-worn panels of Zoro, Luffy, Usopp, Nami and Sanji",
            "kind": "volume cover"
          },
          {
            "src": "/story/arabasta-2.webp",
            "alt": "Volume 22 cover 'Hope!!': the crew, Vivi, Carue and the camel lined up with arms crossed in desert robes",
            "kind": "volume cover"
          }
        ]
      }
    ]
  },
  {
    "name": "Sky Island",
    "slug": "sky-island-saga",
    "chapters": [
      218,
      302
    ],
    "arcs": [
      {
        "name": "Jaya",
        "slug": "jaya",
        "chapters": [
          218,
          236
        ],
        "setting": "Jaya and Mock Town (Grand Line)",
        "summary": "A ship falls from the sky and the Log Pose points upward, so the crew goes to Jaya to learn about sky islands. In Mock Town they are mocked by Bellamy for believing in dreams, and Luffy meets a stranger, later known as Blackbeard. Mont Blanc Cricket helps them prepare to ride the Knock Up Stream, and Luffy knocks out Bellamy with one punch.",
        "events": [
          "Nico Robin joins and a galleon falls from the sky",
          "Luffy and Zoro refuse to fight Bellamy in Mock Town",
          "Luffy meets Teach, who tells him dreams never end",
          "The crew learns the tale of Noland the Liar from Cricket",
          "Luffy beats Bellamy, and the Merry rides the Knock Up Stream to the sky"
        ],
        "joins": [],
        "villain": "Bellamy (with Blackbeard introduced)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/jaya-1.webp",
            "alt": "Black-and-white two-page panel: Blackbeard (Teach) shouting that people's dreams never end while Luffy, Zoro and Nami stand apart",
            "kind": "manga panel"
          },
          {
            "src": "/story/jaya-2.webp",
            "alt": "Volume 25 cover 'The 100 Million Man': Blackbeard, Shanks, Buggy and a goat with Luffy",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Skypiea",
        "slug": "skypiea",
        "chapters": [
          237,
          302
        ],
        "setting": "Skypiea, Angel Island and Upper Yard (White Sea, Grand Line)",
        "summary": "In the sea of clouds the crew reaches Skypiea, ruled by the self-proclaimed god Enel, who controls lightning. They are caught in a long war between the Skypieans and the Shandia over Upper Yard, which is the missing half of Jaya and holds the golden city of Shandora. Luffy, immune to lightning, defeats Enel and rings the golden bell to tell Cricket that the city of gold was real.",
        "events": [
          "The crew reaches the White Sea and is branded criminals on Angel Island",
          "Upper Yard's priests test the crew with ordeals",
          "Enel starts a survival game among the Straw Hats, Shandia and his forces",
          "Luffy defeats Enel and rings the golden bell of Shandora",
          "The crew leaves the sky with a large haul of gold"
        ],
        "joins": [],
        "villain": "Enel (with his priests)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/skypiea-1.webp",
            "alt": "Volume 29 cover 'Oratorio': Luffy charging with Conis, Aisa, Gan Fall, Pierre and the sky serpent Nola",
            "kind": "volume cover"
          },
          {
            "src": "/story/skypiea-2.webp",
            "alt": "Volume 31 cover 'We Are Here': Noland and Calgara (the 400-year-old flashback) with Sanji, Luffy and Chopper reading a picture book",
            "kind": "volume cover"
          }
        ]
      }
    ]
  },
  {
    "name": "Water 7",
    "slug": "water-7-saga",
    "chapters": [
      303,
      441
    ],
    "arcs": [
      {
        "name": "Long Ring Long Land",
        "slug": "long-ring-long-land",
        "chapters": [
          303,
          321
        ],
        "setting": "Long Ring Long Land, a chain of stretched islands in the Grand Line",
        "summary": "Back on the Blue Sea after Skypiea, the Straw Hats land on a strange island where everything is stretched long. Foxy the Silver Fox tricks Luffy into a Davy Back Fight, a pirate game where the winners take crew members from the losers. After Luffy beats Foxy, Admiral Aokiji appears and easily freezes Robin and Luffy.",
        "events": [
          "Foxy shoots Tonjit's horse and goads Luffy into a Davy Back Fight",
          "Chopper is lost to the Foxy Pirates and later won back",
          "Luffy defeats Foxy in the final combat round",
          "Admiral Aokiji arrives, freezes Robin and then beats Luffy one-on-one",
          "The crew decides it needs a shipwright for the damaged Going Merry"
        ],
        "joins": [],
        "villain": "Foxy the Silver Fox (Foxy Pirates); Admiral Aokiji (Kuzan)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/long-ring-long-land-1.webp",
            "alt": "Colour cover illustration: afro Luffy in boxing gloves faces Foxy in the Davy Back Fight ring, with Porche, Hamburg and the Foxy Pirates cheering behind",
            "kind": "volume cover"
          },
          {
            "src": "/story/long-ring-long-land-2.webp",
            "alt": "Black and white panel: Robin collapses in fear as the tall Admiral Aokiji appears on the grass, with Luffy and Usopp watching",
            "kind": "manga panel"
          }
        ]
      },
      {
        "name": "Water 7",
        "slug": "water-7",
        "chapters": [
          322,
          374
        ],
        "setting": "Water 7, the shipbuilding city of canals",
        "summary": "The crew reaches the shipbuilding city of Water 7 hoping to repair the Going Merry, but learns the ship cannot be saved. Their gold is stolen by the Franky Family, Usopp quits after a duel with Luffy, and Robin walks away from the crew. The Straw Hats are framed for an attack on Mayor Iceburg, which turns out to be the work of the government agents of CP9.",
        "events": [
          "Galley-La shipwrights declare the Going Merry beyond repair",
          "The Franky Family steals the crew's gold and beats Usopp",
          "Usopp duels Luffy for the Going Merry and leaves the crew",
          "CP9 reveals itself inside Galley-La headquarters after attacking Iceburg",
          "Robin is taken away on the Puffing Tom sea train and the crew gives chase"
        ],
        "joins": [],
        "villain": "CP9 led by Rob Lucci, under Spandam",
        "ongoing": false,
        "images": [
          {
            "src": "/story/water-7-1.webp",
            "alt": "Black and white splash: the silhouettes of CP9 (Blueno, Lucci, Kaku, Kalifa) stand before Galley-La headquarters as it burns",
            "kind": "manga panel"
          },
          {
            "src": "/story/water-7-2.webp",
            "alt": "Volume 37 cover 'Tom-san': Franky and Iceburg above the Puffing Tom sea train, with Luffy, Nami, Zoro and Chopper running below",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Enies Lobby",
        "slug": "enies-lobby",
        "chapters": [
          375,
          430
        ],
        "setting": "Enies Lobby, the World Government's judicial island",
        "summary": "The Straw Hats, the Franky Family and Galley-La storm the judicial island of Enies Lobby to rescue Robin and Franky from CP9. Robin finally says she wants to live, and Luffy has Sogeking burn the World Government flag, declaring war on the government. Each Straw Hat defeats a CP9 agent, Luffy beats Rob Lucci with his new Gears, and the crew escapes a Buster Call on the Going Merry's last voyage.",
        "events": [
          "The rescue team breaks through the gates of Enies Lobby",
          "Sogeking burns the World Government flag on Luffy's order",
          "Each Straw Hat defeats a CP9 agent; Luffy uses Gear Second and Gear Third against Rob Lucci",
          "Spandam's Buster Call bombards the island",
          "The Going Merry rescues the crew and is given a Viking funeral"
        ],
        "joins": [],
        "villain": "Rob Lucci and CP9; Spandam",
        "ongoing": false,
        "images": [
          {
            "src": "/story/enies-lobby-1.webp",
            "alt": "Colour illustration: Robin stands between a bloodied leopard-form Rob Lucci and Luffy in Gear Second steam, with a Buster Call warship's cannons behind",
            "kind": "colour spread"
          },
          {
            "src": "/story/enies-lobby-2.webp",
            "alt": "Volume 42 cover 'Pirates vs CP9': the CP9 agents led by Rob Lucci, with Kaku, Kalifa, Jabra, Fukurou, Kumadori, Spandam and the sword-elephant Funkfreed",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Post-Enies Lobby",
        "slug": "post-enies-lobby",
        "chapters": [
          431,
          441
        ],
        "setting": "Water 7 (with Banaro Island in a side story)",
        "summary": "Back on Water 7, Vice Admiral Garp visits and reveals that he is Luffy's grandfather and that Luffy's father is the revolutionary Dragon. Franky builds the Thousand Sunny and joins the crew, while Usopp apologizes and rejoins. Far away, Ace fights Blackbeard on Banaro Island.",
        "events": [
          "Garp and Koby visit the resting Straw Hats",
          "Garp reveals that Luffy's father is Monkey D. Dragon",
          "The crew receives new bounties for the Enies Lobby attack",
          "Franky presents the Thousand Sunny and joins; Usopp rejoins after apologizing",
          "Ace and Blackbeard duel on Banaro Island"
        ],
        "joins": [
          {
            "name": "Franky",
            "slug": "franky"
          },
          {
            "name": "Usopp, again",
            "slug": "usopp"
          }
        ],
        "villain": "Marshall D. Teach (Blackbeard), in the Banaro Island duel",
        "ongoing": false,
        "images": [
          {
            "src": "/story/post-enies-lobby-1.webp",
            "alt": "Volume 45 cover: Luffy raises a fist above Garp, with Ace, Whitebeard, Shanks, Koby and Helmeppo framed around them",
            "kind": "volume cover"
          }
        ]
      }
    ]
  },
  {
    "name": "Thriller Bark",
    "slug": "thriller-bark-saga",
    "chapters": [
      442,
      489
    ],
    "arcs": [
      {
        "name": "Thriller Bark",
        "slug": "thriller-bark",
        "chapters": [
          442,
          489
        ],
        "setting": "Thriller Bark, a giant ghost ship-island in the Florian Triangle",
        "summary": "In the foggy Florian Triangle the crew meets Brook, a living skeleton, and drifts into Thriller Bark, the giant ship-island of Warlord Gecko Moria. Moria steals the crew's shadows to power his zombie army, so they must defeat him before sunrise or vanish in the light. Afterward, Bartholomew Kuma attacks, Zoro takes all of Luffy's pain to save him, and Brook joins as the crew's musician.",
        "events": [
          "The crew meets Brook on a ghost ship in the Florian Triangle",
          "Moria cuts away the shadows of Luffy, Zoro and Sanji",
          "Luffy becomes Nightmare Luffy and helps bring down the giant zombie Oars",
          "Luffy defeats Moria and the shadows return before sunrise",
          "Kuma attacks; Zoro takes on Luffy's pain; Brook joins the crew"
        ],
        "joins": [
          {
            "name": "Brook",
            "slug": "brook"
          }
        ],
        "villain": "Gecko Moria (Warlord of the Sea), with Perona, Absalom and Hogback; Bartholomew Kuma at the end",
        "ongoing": false,
        "images": [
          {
            "src": "/story/thriller-bark-1.webp",
            "alt": "Volume 46 cover 'Adventure on Ghost Island': Brook looms over Luffy, Nami, Chopper and Usopp as zombies pour out of Thriller Bark's mansion",
            "kind": "volume cover"
          },
          {
            "src": "/story/thriller-bark-2.webp",
            "alt": "Volume 50 cover: panels of a bloodied Zoro, a bandaged Luffy, Brook and Nami, the aftermath of the Thriller Bark battle",
            "kind": "volume cover"
          }
        ]
      }
    ]
  },
  {
    "name": "Summit War",
    "slug": "summit-war-saga",
    "chapters": [
      490,
      597
    ],
    "arcs": [
      {
        "name": "Sabaody Archipelago",
        "slug": "sabaody-archipelago",
        "chapters": [
          490,
          513
        ],
        "setting": "Sabaody Archipelago, at the foot of the Red Line",
        "summary": "The crew reaches the Sabaody Archipelago to coat their ship for the trip to Fish-Man Island, and meets the mermaid Camie, Hatchan and other Super Rookies. When Camie is put up for auction, Luffy punches the Celestial Dragon Saint Charlos, which brings Admiral Kizaru down on the islands. Silvers Rayleigh agrees to coat the ship, but Bartholomew Kuma scatters the Straw Hats one by one across the world.",
        "events": [
          "The crew meets Camie and Hatchan and hears about the Super Rookies",
          "Luffy punches Saint Charlos at the human auction house",
          "Silvers Rayleigh, Roger's former first mate, agrees to coat the Sunny",
          "Admiral Kizaru and the Pacifista overwhelm the crew",
          "Kuma makes the Straw Hats vanish, sending them to distant islands"
        ],
        "joins": [],
        "villain": "Admiral Kizaru (Borsalino) and Bartholomew Kuma with the Pacifista; Saint Charlos",
        "ongoing": false,
        "images": [
          {
            "src": "/story/sabaody-archipelago-1.webp",
            "alt": "Black and white panel: Luffy smashes his fist into the face of Celestial Dragon Saint Charlos inside the auction house",
            "kind": "manga panel"
          },
          {
            "src": "/story/sabaody-archipelago-2.webp",
            "alt": "Volume 52 cover 'Roger and Rayleigh': Silvers Rayleigh grinning in front of the full nine-member Straw Hat crew",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Amazon Lily",
        "slug": "amazon-lily",
        "chapters": [
          514,
          524
        ],
        "setting": "Amazon Lily, the island of women in the Calm Belt",
        "summary": "Kuma's power drops Luffy on Amazon Lily, an island in the Calm Belt where only women of the Kuja live. Luffy angers Empress Boa Hancock and is forced to fight her sisters in an arena, but he wins her trust by keeping her slave past secret. Learning that Ace will be executed, Luffy gets Hancock to take him to Impel Down.",
        "events": [
          "Luffy lands on Amazon Lily and is hunted as an intruder",
          "Luffy fights Hancock's sisters Sandersonia and Marigold in the arena",
          "Luffy hides the slave mark of the Gorgon sisters, earning Hancock's love",
          "News arrives that Ace is to be executed at Marineford",
          "Hancock agrees to smuggle Luffy into Impel Down"
        ],
        "joins": [],
        "villain": "Boa Hancock and her sisters Sandersonia and Marigold (later allies)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/amazon-lily-1.webp",
            "alt": "Volume 53 cover 'Natural Born King': Boa Hancock on her snake Salome, flanked by her sisters Sandersonia and Marigold, with Luffy and Kuja snakes in front",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Impel Down",
        "slug": "impel-down",
        "chapters": [
          525,
          549
        ],
        "setting": "Impel Down, the World Government's underwater prison",
        "summary": "Luffy sneaks into the great underwater prison Impel Down to free Ace before his execution. He fights down through its levels with old enemies like Buggy, Mr. 3 and Bon Kurei, is nearly killed by the poison of chief warden Magellan, and is saved by Emporio Ivankov. He arrives too late to stop Ace's transfer, and leads a mass breakout with Jinbe and Crocodile.",
        "events": [
          "Luffy enters Impel Down with Hancock's help",
          "Luffy teams up with Buggy, Mr. 3 and Bon Kurei",
          "Magellan's poison defeats Luffy; Ivankov saves his life",
          "Blackbeard arrives to recruit inmates from Level 6",
          "Bon Kurei stays behind so the escapees can leave"
        ],
        "joins": [],
        "villain": "Magellan, chief warden of Impel Down; Blackbeard Pirates",
        "ongoing": false,
        "images": [
          {
            "src": "/story/impel-down-1.webp",
            "alt": "Volume 54 cover 'Unstoppable': Luffy fleeing through Impel Down with chief warden Magellan, the Blugori and the jailer beasts behind him",
            "kind": "volume cover"
          },
          {
            "src": "/story/impel-down-2.webp",
            "alt": "Volume 56 cover 'Thank You': Emporio Ivankov above Luffy, with Crocodile, Jinbe, Inazuma and Mr. 1, the Impel Down breakout allies",
            "kind": "volume cover"
          }
        ]
      },
      {
        "name": "Marineford",
        "slug": "marineford",
        "chapters": [
          550,
          580
        ],
        "setting": "Marineford, the Marine headquarters",
        "summary": "The Whitebeard Pirates and the Marines go to war at Marineford over Ace's public execution, and Luffy breaks in with the Impel Down escapees. Luffy frees Ace, but Ace dies shielding him from Admiral Akainu. Whitebeard dies standing, Blackbeard takes his Devil Fruit power, and Shanks arrives to end the war.",
        "events": [
          "Ace's lineage as Gol D. Roger's son is revealed",
          "Whitebeard's fleet and the Marines clash at the plaza",
          "Luffy and the escapees reach the scaffold and free Ace",
          "Ace dies protecting Luffy from Akainu",
          "Whitebeard dies, Blackbeard steals his power and Shanks ends the war"
        ],
        "joins": [],
        "villain": "Admiral Akainu (Sakazuki) and the Marines; Blackbeard",
        "ongoing": false,
        "images": [
          {
            "src": "/story/marineford-2.webp",
            "alt": "Black and white splash: Whitebeard dead on his feet, covered in wounds, with narration listing the injuries he took",
            "kind": "manga panel"
          }
        ]
      },
      {
        "name": "Post-War",
        "slug": "post-war",
        "chapters": [
          581,
          597
        ],
        "setting": "Amazon Lily and Rusukaina (with flashbacks to the Goa Kingdom and a return to Marineford)",
        "summary": "Grieving after Ace's death, Luffy recovers on Amazon Lily, where Jinbe helps him remember that his crew still needs him. A flashback shows how Luffy, Ace and Sabo grew up as sworn brothers. Rayleigh offers to train Luffy, and Luffy secretly tells his crew to meet again in two years instead of three days.",
        "events": [
          "Luffy breaks down over Ace's death and Jinbe calms him",
          "A flashback shows Luffy, Ace and Sabo becoming sworn brothers",
          "Rayleigh offers to teach Luffy Haki",
          "Luffy returns to Marineford to send his crew a hidden message",
          "The Straw Hats begin two years of training apart"
        ],
        "joins": [],
        "villain": "None as a central antagonist",
        "ongoing": false,
        "images": [
          {
            "src": "/story/post-war-1.webp",
            "alt": "Volume 60 cover 'Little Brother': young Luffy, Ace and Sabo in a tree, with Dragon, Rayleigh, Makino and Dadan around them",
            "kind": "volume cover"
          }
        ]
      }
    ]
  },
  {
    "name": "Fish-Man Island",
    "slug": "fish-man-island-saga",
    "chapters": [
      598,
      653
    ],
    "arcs": [
      {
        "name": "Return to Sabaody",
        "slug": "return-to-sabaody",
        "chapters": [
          598,
          602
        ],
        "setting": "Sabaody Archipelago",
        "summary": "Two years after the crew was scattered, the Straw Hats return one by one to Sabaody Archipelago to regroup. A gang of impostors posing as the Straw Hats draws the Marines in, and the real crew shows off its new strength before setting off underwater.",
        "events": [
          "The Straw Hats arrive on Sabaody separately after two years of training",
          "Fake Straw Hats led by Demaro Black recruit rookie pirates under Luffy's name",
          "Sentomaru and the Pacifista expose the impostor and attack the gathered pirates",
          "The real crew reunites on the Thousand Sunny and dives toward Fish-Man Island"
        ],
        "joins": [],
        "villain": "Demaro Black (fake Luffy); Sentomaru and the Marines",
        "ongoing": false,
        "images": [
          {
            "src": "/story/return-to-sabaody-1.webp",
            "alt": "Zoro, soaked and in his post-timeskip coat, sits on deck with his swords after boarding the wrong ship",
            "kind": "manga panel"
          }
        ]
      },
      {
        "name": "Fish-Man Island",
        "slug": "fish-man-island",
        "chapters": [
          603,
          653
        ],
        "setting": "Fish-Man Island (Ryugu Kingdom), 10,000 meters under the sea",
        "summary": "The crew sails down to Fish-Man Island and is branded as enemies after a fortune teller foresees Luffy destroying it. Hody Jones and Vander Decken IX try to seize the Ryugu Kingdom, and the history of Fisher Tiger and Queen Otohime shows the hatred between humans and fish-men. Luffy and Jinbe stop the coup in front of the whole island.",
        "events": [
          "The crew survives the descent and meets the Flying Dutchman of Vander Decken IX",
          "Shyarly predicts Luffy will destroy Fish-Man Island and the crew is branded as criminals",
          "Jinbe tells the story of Fisher Tiger, the Sun Pirates and Queen Otohime",
          "Hody Jones launches a coup and Decken drives the ark Noah toward the island",
          "Luffy defeats Hody and smashes Noah, then the crew leaves for the New World"
        ],
        "joins": [],
        "villain": "Hody Jones and the New Fish-Man Pirates; Vander Decken IX",
        "ongoing": false,
        "images": [
          {
            "src": "/story/fish-man-island-1.webp",
            "alt": "Vander Decken IX drags the giant ark Noah over Fish-Man Island toward Shirahoshi",
            "kind": "manga panel"
          }
        ]
      }
    ]
  },
  {
    "name": "Dressrosa",
    "slug": "dressrosa-saga",
    "chapters": [
      654,
      801
    ],
    "arcs": [
      {
        "name": "Punk Hazard",
        "slug": "punk-hazard",
        "chapters": [
          654,
          699
        ],
        "setting": "Punk Hazard, a half-burning, half-frozen island in the New World",
        "summary": "A distress call leads the Straw Hats to Punk Hazard, where the scientist Caesar Clown runs secret experiments on kidnapped children. Luffy forms a pirate alliance with Trafalgar Law to take down an Emperor, and the crew works with Smoker's G-5 Marines to free the children and capture Caesar.",
        "events": [
          "The crew enters the New World and answers a distress call from Punk Hazard",
          "They find kidnapped giant children and meet the samurai Kin'emon",
          "Luffy and Law agree to an alliance aimed at Kaidou",
          "Straw Hats and G-5 Marines cooperate against Caesar Clown and Vergo",
          "Caesar is captured and Law challenges Doflamingo to give up his Warlord title"
        ],
        "joins": [],
        "villain": "Caesar Clown; Vergo",
        "ongoing": false,
        "images": [
          {
            "src": "/story/punk-hazard-1.webp",
            "alt": "Double-page spread: Luffy, Law, Kin'emon, Smoker, Tashigi and the crew charge together to escape Punk Hazard with the children",
            "kind": "manga panel"
          },
          {
            "src": "/story/punk-hazard-2.webp",
            "alt": "Double-page spread: the Sunny surfaces in the stormy New World among giant sea monsters, with each Straw Hat reacting",
            "kind": "manga panel"
          }
        ]
      },
      {
        "name": "Dressrosa",
        "slug": "dressrosa",
        "chapters": [
          700,
          801
        ],
        "setting": "Dressrosa, a kingdom of toys and love ruled by Donquixote Doflamingo",
        "summary": "The alliance arrives in Dressrosa to trade Caesar to Doflamingo while secretly planning to destroy the SMILE factory. Luffy enters the Corrida Colosseum for Ace's Mera Mera no Mi while the rest of the group uncovers a toy army of cursed people. When Doflamingo traps the island in his Birdcage, Luffy beats him with Gear 4 and the country is freed.",
        "events": [
          "Luffy enters the Corrida Colosseum to win the Mera Mera no Mi",
          "Sabo appears alive and eats the Mera Mera no Mi",
          "Sugar is knocked out and the toys turn back into people",
          "Doflamingo traps the island inside the Birdcage",
          "Luffy defeats Doflamingo with Gear 4 and the Straw Hat Grand Fleet is formed"
        ],
        "joins": [],
        "villain": "Donquixote Doflamingo and the Donquixote Pirates",
        "ongoing": false,
        "images": [
          {
            "src": "/story/dressrosa-1.webp",
            "alt": "Luffy in Gear 4 hits Doflamingo with the flaming Red Hawk punch",
            "kind": "manga panel"
          },
          {
            "src": "/story/dressrosa-2.webp",
            "alt": "Dressrosa's people and fighters push together against the closing Birdcage strings",
            "kind": "manga panel"
          }
        ]
      }
    ]
  },
  {
    "name": "Whole Cake Island",
    "slug": "whole-cake-island-saga",
    "chapters": [
      802,
      908
    ],
    "arcs": [
      {
        "name": "Zou",
        "slug": "zou",
        "chapters": [
          802,
          824
        ],
        "setting": "Zou, an island on the back of a giant elephant",
        "summary": "The crew reunites on Zou, home of the Mink Tribe, after Jack of the Beasts Pirates attacked it. They learn Sanji has been taken to marry into Big Mom's family, and the samurai reveal their ties to the Minks and to Wano. A new alliance is formed and the crew splits up again.",
        "events": [
          "The crew climbs the giant elephant and finds the Minks wounded by Jack's attack",
          "Sanji is revealed to have left for an arranged marriage with the Big Mom Pirates",
          "The Minks and the samurai reveal their bond and the Kouzuki Clan",
          "The crew sees a Road Poneglyph for the first time",
          "The Ninja-Pirate-Mink-Samurai Alliance forms and a team leaves to rescue Sanji"
        ],
        "joins": [],
        "villain": "Jack of the Beasts Pirates",
        "ongoing": false,
        "images": [
          {
            "src": "/story/zou-1.webp",
            "alt": "Luffy and allies ride into the Whale Forest residential district of Zou, greeted by cheering Minks",
            "kind": "manga panel"
          },
          {
            "src": "/story/zou-2.webp",
            "alt": "The Sanji Retrieval Team (Luffy, Nami, Chopper, Brook, Pedro, Pekoms) poses before leaving Zou",
            "kind": "manga panel"
          }
        ]
      },
      {
        "name": "Whole Cake Island",
        "slug": "whole-cake-island",
        "chapters": [
          825,
          902
        ],
        "setting": "Whole Cake Island and Totto Land, Big Mom's territory",
        "summary": "Luffy leads a small team into Totto Land to bring Sanji back from his political wedding to the Charlotte Family. Big Mom plans to wipe out the Vinsmokes at the ceremony, so the crew allies with Jinbe, Caesar and the Fire Tank Pirates to wreck the wedding. Luffy defeats Katakuri and the crew escapes with Sanji.",
        "events": [
          "The Sanji Retrieval Team enters Totto Land and meets Sanji's Vinsmoke family",
          "Sanji learns that the wedding is a trap to kill the Vinsmokes",
          "The crew allies with the Fire Tank Pirates and crashes the wedding",
          "Pedro sacrifices himself during the escape",
          "Luffy defeats Charlotte Katakuri and the crew flees Big Mom's pursuit"
        ],
        "joins": [],
        "villain": "Charlotte Linlin (Big Mom) and the Big Mom Pirates",
        "ongoing": false,
        "images": [
          {
            "src": "/story/whole-cake-island-1.webp",
            "alt": "Luffy's Snakeman King Cobra punch collides with Katakuri's spiked mochi fist in their final clash",
            "kind": "manga panel"
          },
          {
            "src": "/story/whole-cake-island-2.webp",
            "alt": "Big Mom's fleet storms Cacao Island as Germa and the Big Mom Pirates clash, Big Mom's face filling the bottom panel",
            "kind": "manga panel"
          }
        ]
      },
      {
        "name": "Levely",
        "slug": "levely",
        "chapters": [
          903,
          908
        ],
        "setting": "Mary Geoise, the Holy Land, during the Levely",
        "summary": "News of the Straw Hats' escape from Totto Land spreads and Luffy is now called the fifth Emperor. Kings from around the world gather in Mary Geoise for the Levely, including Vivi and Rebecca, while a World Noble's abuse of Shirahoshi nearly causes an incident. The arc ends with the Five Elders kneeling before the hidden ruler Imu on the Empty Throne.",
        "events": [
          "The world learns of Luffy's new bounty and his Grand Fleet",
          "Big Mom heads for Wano after talking to Kaidou",
          "Royalty from around the world arrive at Mary Geoise",
          "The Revolutionary Army prepares to act",
          "The Five Elders kneel before Imu on the Empty Throne"
        ],
        "joins": [],
        "villain": "World Government and the World Nobles",
        "ongoing": false,
        "images": [
          {
            "src": "/story/levely-1.webp",
            "alt": "Colour cover art: a grinning Luffy in the centre, framed by wedge panels of Vivi, Rebecca, Sabo, Bonney, Wapol, Lucci and other characters active around the Levely",
            "kind": "volume cover"
          }
        ]
      }
    ]
  },
  {
    "name": "Wano Country",
    "slug": "wano-country-saga",
    "chapters": [
      909,
      1057
    ],
    "arcs": [
      {
        "name": "Wano Country",
        "slug": "wano-country",
        "chapters": [
          909,
          1057
        ],
        "setting": "Wano Country and Onigashima",
        "summary": "The alliance sneaks into Wano, a closed samurai country ruled by Shogun Kurozumi Orochi and the Emperor Kaidou. The past of Kouzuki Oden explains Wano's suffering, and the allies raid Onigashima on the night of the fire festival. Luffy awakens Gear 5, defeats Kaidou, and becomes one of the new Four Emperors.",
        "events": [
          "Luffy meets O-Tama and sees how Kaidou and Orochi have ruined Wano",
          "Luffy loses to Kaidou and is thrown into the Prisoner Mine",
          "Oden's journey with Whitebeard and Roger, and his execution, are told in flashback",
          "The alliance raids Onigashima and the Worst Generation fight Kaidou and Big Mom",
          "Luffy awakens Gear 5 and defeats Kaidou, freeing Wano"
        ],
        "joins": [
          {
            "name": "Jinbe",
            "slug": "jinbe"
          }
        ],
        "villain": "Kaidou and the Beasts Pirates; Kurozumi Orochi; Big Mom",
        "ongoing": false,
        "images": [
          {
            "src": "/story/wano-country-1.webp",
            "alt": "The Nine Red Scabbards leap at Kaidou on Onigashima to start the raid",
            "kind": "manga panel"
          },
          {
            "src": "/story/wano-country-2.webp",
            "alt": "Four-panel announcement of the new Four Emperors: Buggy, Shanks, Blackbeard and Luffy",
            "kind": "manga panel"
          }
        ]
      }
    ]
  },
  {
    "name": "Final",
    "slug": "final-saga",
    "chapters": [
      1058,
      null
    ],
    "arcs": [
      {
        "name": "Egghead",
        "slug": "egghead",
        "chapters": [
          1058,
          1125
        ],
        "setting": "Egghead, Dr. Vegapunk's futuristic island",
        "summary": "The crew lands on Egghead and meets Dr. Vegapunk and his satellites while CP0 arrives to assassinate him. The World Government sends Admiral Kizaru and Elder Saturn to besiege the island, and Kuma's past is revealed. Vegapunk's worldwide message about the Void Century airs as the Straw Hats escape with the giants.",
        "events": [
          "The Straw Hats meet Vegapunk and his six satellites on Egghead",
          "CP0 led by Rob Lucci infiltrates the island to kill Vegapunk",
          "Kuma's life story is told and he crosses the sea to save Bonney",
          "Elder Saturn and Kizaru lead a siege of the island",
          "Vegapunk's message reaches the world and the crew flees on the Giant Warrior Pirates' ship"
        ],
        "joins": [],
        "villain": "Jaygarcia Saturn and the Five Elders; Kizaru; CP0 (Rob Lucci)",
        "ongoing": false,
        "images": [
          {
            "src": "/story/egghead-1.webp",
            "alt": "Kuma throws himself over Bonney to shield her from Saturn's attack",
            "kind": "manga panel"
          },
          {
            "src": "/story/egghead-2.webp",
            "alt": "Elder Warcury in his boar form crashes into the ancient Iron Giant during the siege",
            "kind": "manga panel"
          }
        ]
      },
      {
        "name": "Elbaph",
        "slug": "elbaph",
        "chapters": [
          1126,
          null
        ],
        "setting": "Elbaph, the land of giants built around the Adam Tree",
        "summary": "The crew reaches Elbaph with the Giant Warrior Pirates and meets the chained prince Loki, said to have killed his father King Harald. The Knights of God invade to take the giant children and Imu personally attacks the island. Flashbacks show the God Valley Incident and the truth of Harald's death.",
        "events": [
          "The crew lands in Elbaph and meets the chained prince Loki in the Underworld",
          "Robin reunites with Jaguar D. Saul",
          "The Knights of God, led by Gunko and Shamrock, invade to kidnap the giant children",
          "The God Valley Incident and the fall of Rocks D. Xebec are shown in flashback",
          "Loki is freed and fights Imu alongside Luffy"
        ],
        "joins": [],
        "villain": "Imu and the Knights of God (Manmayer Gunko, Figarland Shamrock, Shepherd Sommers, Rimoshifu Killingham)",
        "ongoing": true,
        "images": [
          {
            "src": "/story/elbaph-1.webp",
            "alt": "Colour volume cover: Luffy in Viking gear with Zoro, Sanji, Nami, Usopp and Chopper in front of chained Loki",
            "kind": "volume cover"
          },
          {
            "src": "/story/elbaph-2.webp",
            "alt": "Imu swings a giant blade against the Nidhoggr-form Loki",
            "kind": "manga panel"
          }
        ]
      }
    ]
  }
];

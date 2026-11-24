// Every series, character and line here is made up for this demo.

export const ARTIST = {
  name: "Oriha Sumi",
  nameJa: "織羽すみ",
  magazine: "Weekly Komori",
};

export interface WorkStat {
  label: string;
  value: number;
}

export interface Work {
  slug: string;
  title: string;
  titleJa: string;
  years: string;
  volumes: string;
  genre: string;
  /** Stamp word on the portrait; kept to one to three glyphs so the small stamp stays legible. */
  status: string;
  logline: string;
  synopsis: string[];
  /** One line from the artist about making it. */
  note: string;
  lead: {
    name: string;
    reading: string;
    role: string;
    quote: string;
    portraitAlt: string;
    stats: WorkStat[];
  };
}

export const WORKS: Work[] = [
  {
    slug: "lantern-tide",
    title: "Lantern Tide",
    titleJa: "灯の潮",
    years: "2023 to now",
    volumes: "3 volumes",
    genre: "Supernatural, slice of life",
    status: "連載",
    logline: "A night ferry carries lost spirits across a harbour that is not on any map.",
    synopsis: [
      "Kai Amane pilots the last ferry of the night. His passengers are spirits who forgot where they were going, and the fare is one small memory each.",
      "Volume three opens on the night a passenger refuses to pay, and the harbour lights start going out one by one.",
    ],
    note: "I draw every wave by hand. The screentone only goes on the sky.",
    lead: {
      name: "Kai Amane",
      reading: "あまね かい",
      role: "Protagonist, ferry pilot",
      quote: "Every passenger pays in a memory. I only take the small ones.",
      portraitAlt: "Kai Amane, a young ferry pilot in a peaked cap, holding up a paper lantern.",
      stats: [
        { label: "Calm", value: 80 },
        { label: "Seamanship", value: 90 },
        { label: "Memory", value: 40 },
      ],
    },
  },
  {
    slug: "paper-comet",
    title: "Paper Comet",
    titleJa: "紙の彗星",
    years: "2025 to now",
    volumes: "1 volume",
    genre: "Sci-fi, comedy",
    status: "NEW",
    logline: "A schoolgirl folds a rocket out of exam papers, and it actually flies.",
    synopsis: [
      "Yuzu Hoshimura failed maths, so she folded the paper into a rocket. It took her to low orbit and would not bring her back down.",
      "Now she has to pass the resit from space, with a crew of origami cranes who only speak in fold diagrams.",
    ],
    note: "The cranes are drawn from real folds. My desk is covered in them.",
    lead: {
      name: "Yuzu Hoshimura",
      reading: "ほしむら ゆず",
      role: "Protagonist, accidental astronaut",
      quote: "Gravity is just a suggestion if you fold it right!",
      portraitAlt: "Yuzu Hoshimura with twin bunches and a paper helmet, a comet trail behind her.",
      stats: [
        { label: "Nerve", value: 90 },
        { label: "Maths", value: 20 },
        { label: "Folding", value: 100 },
      ],
    },
  },
  {
    slug: "rust-and-rosemary",
    title: "Rust & Rosemary",
    titleJa: "錆とローズマリー",
    years: "2019 to 2022",
    volumes: "6 volumes, complete",
    genre: "Mecha, drama",
    status: "完結",
    logline: "A retired giant-robot pilot runs a herb shop and tries very hard to stay retired.",
    synopsis: [
      "Tetsu Mogi once piloted the city's last defence robot. Now he grows rosemary in its cockpit, parked behind his shop.",
      "When a new threat climbs out of the bay, the robot still answers to his voice, and his neighbours start asking questions.",
    ],
    note: "My first long series. I learned to draw machines by drawing them rusting.",
    lead: {
      name: "Tetsu Mogi",
      reading: "もぎ てつ",
      role: "Lead, retired pilot",
      quote: "I water the plants, not the past.",
      portraitAlt: "Tetsu Mogi, a broad older man with a beard and an apron, a sprig of rosemary behind his ear.",
      stats: [
        { label: "Grit", value: 90 },
        { label: "Patience", value: 70 },
        { label: "Gardening", value: 60 },
      ],
    },
  },
  {
    slug: "ninth-bell",
    title: "The Ninth Bell",
    titleJa: "九つ目の鐘",
    years: "2024 to now",
    volumes: "2 volumes",
    genre: "Horror, comedy",
    status: "連載",
    logline: "A shrine exorcist who is terrified of the dark has to work the night shift.",
    synopsis: [
      "Shion Kagura can banish any spirit, as long as the lights are on. Her shrine's bell rings eight times at dusk; when it rings a ninth, something has come in.",
      "Each chapter is one night and one visitor, and one more reason to buy a brighter torch.",
    ],
    note: "Horror is all about the page turn. I plan every scare around it.",
    lead: {
      name: "Shion Kagura",
      reading: "かぐら しおん",
      role: "Protagonist, exorcist",
      quote: "I'm not scared. The torch is scared. I'm holding it for moral support.",
      portraitAlt: "Shion Kagura, an exorcist with a long braid, holding a torch and a paper charm.",
      stats: [
        { label: "Exorcism", value: 100 },
        { label: "Courage", value: 30 },
        { label: "Torches", value: 80 },
      ],
    },
  },
  {
    slug: "pocket-kaiju-office",
    title: "Pocket Kaiju Office",
    titleJa: "ポケット怪獣事務所",
    years: "2021",
    volumes: "One-shot",
    genre: "Workplace comedy",
    status: "読切",
    logline: "A kaiju the size of a stapler takes a job in accounts.",
    synopsis: [
      "Gonta was meant to be a city-sized monster. He came out pocket-sized, so he applied for an office job instead.",
      "One long chapter about spreadsheets, a broken printer and the one day a year he is allowed to roar.",
    ],
    note: "Drawn in a week for a contest. It is still the one people ask me about.",
    lead: {
      name: "Gonta",
      reading: "ごんた",
      role: "Lead, junior accountant",
      quote: "Rawr. That means the invoice is late.",
      portraitAlt: "Gonta, a tiny spiky monster in a necktie, standing next to a coffee mug twice his height.",
      stats: [
        { label: "Size", value: 10 },
        { label: "Roar", value: 70 },
        { label: "Punctual", value: 100 },
      ],
    },
  },
  {
    slug: "salt-letters",
    title: "Salt Letters",
    titleJa: "塩の手紙",
    years: "2022",
    volumes: "1 volume, complete",
    genre: "Drama, romance",
    status: "受賞",
    logline: "On a small island, a girl delivers letters that people write to the sea.",
    synopsis: [
      "Nagi Uruma is the island's youngest postal worker. Her round ends at the cliff, where she reads out letters addressed to the sea.",
      "One morning the sea writes back. The story won the magazine's newcomer prize.",
    ],
    note: "Every panel is grey tone on grey tone, except the letters, which stay white.",
    lead: {
      name: "Nagi Uruma",
      reading: "うるま なぎ",
      role: "Protagonist, postal worker",
      quote: "Dear sea, you have mail. Again.",
      portraitAlt: "Nagi Uruma, a girl with short hair and a postal satchel, her hair blowing in sea wind.",
      stats: [
        { label: "Kindness", value: 90 },
        { label: "Speed", value: 60 },
        { label: "Swimming", value: 40 },
      ],
    },
  },
];

export function portraitFor(slug: string) {
  return `/works/${slug}.svg`;
}

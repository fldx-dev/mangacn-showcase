// Studio's sample desk: Hollow Kite Studio's series, files, readers and settings. Every name and
// number is invented. The installed blocks ship their own *-data.ts samples; Studio leaves those
// as shipped and passes this data through the blocks' props instead.
import type { ActivityEvent, ActivityKind, ActivityStat } from "@/components/activity-data";
import type { FileManagerFile, FileManagerFolder } from "@/components/file-manager-data";
import type { Profile } from "@/components/profile-data";
import type { Settings } from "@/components/settings-data";
import type { UploadSeries } from "@/components/upload-data";
import { STUDIO } from "@/lib/site";

// ---------------------------------------------------------------------------------- Overview

export const overviewStats: ActivityStat[] = [
  { label: "Weekly readers", value: "48.2k", change: 6.4, trend: [39, 41, 40, 43, 44, 46, 48] },
  { label: "Pages inked", value: "17 / 20", change: 13.3, trend: [2, 5, 7, 9, 12, 15, 17] },
  { label: "Reader comments", value: "1,284", change: -4.2, trend: [210, 190, 205, 180, 176, 168, 155] },
  { label: "New followers", value: "312", change: 9.1, trend: [30, 38, 41, 44, 47, 52, 60] },
];

/** Readers in the first week of each chapter, in thousands. */
export const chapterReaders = [
  { chapter: "Ch. 34", readers: 38.1 },
  { chapter: "Ch. 35", readers: 39.4 },
  { chapter: "Ch. 36", readers: 41.0 },
  { chapter: "Ch. 37", readers: 40.2 },
  { chapter: "Ch. 38", readers: 43.7 },
  { chapter: "Ch. 39", readers: 44.9 },
  { chapter: "Ch. 40", readers: 46.3 },
  { chapter: "Ch. 41", readers: 48.2 },
];

/** Chapter 42's pages finished per day this week, by stage. */
export const pagesThisWeek = [
  { day: "Mon", pencils: 4, inks: 2, tones: 0 },
  { day: "Tue", pencils: 3, inks: 3, tones: 1 },
  { day: "Wed", pencils: 2, inks: 4, tones: 2 },
  { day: "Thu", pencils: 1, inks: 3, tones: 3 },
  { day: "Fri", pencils: 0, inks: 2, tones: 4 },
  { day: "Sat", pencils: 0, inks: 1, tones: 3 },
  { day: "Sun", pencils: 0, inks: 0, tones: 2 },
];

const event = (
  id: number,
  kind: ActivityKind,
  actor: string,
  action: string,
  title: string | undefined,
  at: string,
): ActivityEvent => ({ id: `ev-${id}`, kind, actor, action, title, at });

// Readers around Lantern Tide this week, newest first. activity-01 fixes the kinds to reading,
// comments and follows (see FINDINGS.md), which fit a creator's audience well enough.
export const overviewEvents: ActivityEvent[] = [
  event(1, "comments", "Tomo Hase", "commented on", "Lantern Tide, Chapter 41", "2026-11-23T22:14"),
  event(2, "reading", "Iris Okada", "finished", "Lantern Tide, Volume 4", "2026-11-23T21:02"),
  event(3, "follows", "Kaya Imura", "followed", STUDIO.name, "2026-11-23T18:40"),
  event(4, "reading", "Ren Marlow", "read", "Lantern Tide, Chapter 41", "2026-11-23T12:31"),
  event(5, "comments", "Suzu Arakawa", "replied to Tomo Hase on", "Lantern Tide, Chapter 41", "2026-11-22T23:55"),
  event(6, "reading", "Pell Juniper", "started", "Lantern Tide", "2026-11-22T20:18"),
  event(7, "follows", "Mika Ostrander", "followed", STUDIO.creator.name, "2026-11-22T09:47"),
  event(8, "comments", "Iris Okada", "commented on", "Lantern Tide, Chapter 40", "2026-11-21T19:26"),
  event(9, "reading", "Kaya Imura", "read", "Saltwind Couriers, Chapter 3", "2026-11-21T08:12"),
  event(10, "follows", "Bram Tessaly", "followed", STUDIO.name, "2026-11-20T17:05"),
  event(11, "reading", "Tomo Hase", "finished", "Ninth Bell (one-shot)", "2026-11-20T13:40"),
  event(12, "comments", "Ren Marlow", "commented on", "Ninth Bell (one-shot)", "2026-11-19T21:09"),
  event(13, "reading", "Suzu Arakawa", "read", "Lantern Tide, Chapter 40", "2026-11-19T07:58"),
  event(14, "follows", "Odette Rain", "followed", STUDIO.creator.name, "2026-11-18T16:33"),
];

// -------------------------------------------------------------------------------------- Files

export const studioFolders: FileManagerFolder[] = [
  {
    id: "lt",
    name: "Lantern Tide",
    children: [
      {
        id: "lt/v5",
        name: "Volume 5",
        children: [
          { id: "lt/v5/c41", name: "Chapter 41" },
          { id: "lt/v5/c42", name: "Chapter 42" },
        ],
      },
    ],
  },
  {
    id: "sc",
    name: "Saltwind Couriers",
    children: [{ id: "sc/c3", name: "Chapter 3" }],
  },
  { id: "nb", name: "Ninth Bell (one-shot)" },
  { id: "covers", name: "Covers" },
  { id: "scripts", name: "Scripts" },
];

export const studioStartFolder = "lt/v5/c42";

const file = (folderId: string, name: string, size: number, modified: string): FileManagerFile => ({
  id: `${folderId}/${name}`,
  folderId,
  name,
  size,
  modified,
});

export const studioFiles: FileManagerFile[] = [
  ...Array.from({ length: 6 }, (_, index) =>
    file(
      "lt/v5/c42",
      `lantern-tide-ch42-p${String(index + 1).padStart(2, "0")}.png`,
      2_400_000 + index * 173_011,
      `2026-11-${17 + index}T10:${String(10 + index * 7).padStart(2, "0")}:00Z`,
    ),
  ),
  file("lt/v5/c42", "ch42-tones.psd", 48_120_330, "2026-11-23T08:30:00Z"),
  file("lt/v5/c42", "ch42-storyboard.pdf", 6_204_118, "2026-11-12T15:00:00Z"),
  ...Array.from({ length: 4 }, (_, index) =>
    file(
      "lt/v5/c41",
      `lantern-tide-ch41-p${String(index + 1).padStart(2, "0")}.png`,
      2_210_000 + index * 151_337,
      `2026-11-0${3 + index}T11:00:00Z`,
    ),
  ),
  file("sc/c3", "saltwind-ch03-p01.png", 2_904_771, "2026-10-28T09:15:00Z"),
  file("sc/c3", "saltwind-ch03-p02.png", 3_118_052, "2026-10-28T10:02:00Z"),
  file("nb", "ninth-bell-final.pdf", 21_550_009, "2026-10-02T18:44:00Z"),
  file("covers", "lantern-tide-vol5-cover.png", 9_870_442, "2026-11-01T12:00:00Z"),
  file("covers", "saltwind-key-art.png", 7_215_006, "2026-10-20T12:00:00Z"),
  file("scripts", "lantern-tide-ch42-script.txt", 18_402, "2026-11-10T21:30:00Z"),
  file("scripts", "lantern-tide-ch43-notes.md", 6_115, "2026-11-22T23:05:00Z"),
];

export const studioUploadSeries: UploadSeries[] = [
  { id: "lantern-tide", title: "Lantern Tide", nextChapter: 42 },
  { id: "saltwind", title: "Saltwind Couriers", nextChapter: 4 },
];

// ----------------------------------------------------------------------------------- Settings

export const studioSettings: Settings = {
  displayName: STUDIO.creator.name,
  email: STUDIO.creator.email,
  language: "en",
  timeZone: "Asia/Tokyo",
  notifications: { newChapters: true, replies: true, weeklyDigest: true },
  emailFrequency: "daily",
  readingDirection: "rtl",
  pageLayout: "spread",
  contentWarnings: false,
};

export const studioProfile: Profile = {
  displayName: STUDIO.creator.name,
  username: "noa_inks",
  bio: "Draws Lantern Tide every week at Hollow Kite Studio.\nLighthouses, ferries and quiet monsters.",
  interests: ["seafaring", "screentone", "slow mysteries"],
  website: "https://hollowkite.example",
};

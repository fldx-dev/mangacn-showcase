import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ChapterList } from "@/components/blocks/chapter-list/chapter-list";
import { CharacterCard } from "@/components/blocks/character-card/character-card";
import { VolumeGrid } from "@/components/blocks/volume-grid/volume-grid";
import { CaptionBox } from "@/components/caption-box";
import { ReaderShell } from "@/components/reader-shell";
import { SeriesHeader } from "@/components/series-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  chapterHref,
  getSeries,
  SERIES,
  toChapters,
  toHeaderSeries,
  totalPages,
  toVolumes,
} from "@/lib/series";

// Every series page is prerendered, so the route opts out of instant-navigation validation and
// blocks on its params. An unknown slug never reaches it: proxy.ts answers it with a real 404.
export const instant = false;

export function generateStaticParams() {
  return SERIES.map((series) => ({ slug: series.slug }));
}

export async function generateMetadata({ params }: PageProps<"/series/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) return {};
  const credits = series.artist ? `${series.author} and ${series.artist}` : series.author;
  return {
    title: series.title,
    description: `${series.tagline} ${series.genres.join(", ")}, by ${credits}.`,
  };
}

// series-page's layout, composed from its parts: SeriesHeader, then tabs of chapter-list,
// volume-grid and character-card. Genres and totals have no slot in SeriesHeader, so they sit in
// a row of caption boxes under it (see FINDINGS.md).
export default async function SeriesPage({ params }: PageProps<"/series/[slug]">) {
  const { slug } = await params;
  const series = getSeries(slug);
  if (!series) notFound();

  // A volume opens at its first chapter.
  const volumes = toVolumes(series, (volume) => chapterHref(series, volume.chapters[0]));
  const chapters = toChapters(series);

  return (
    <ReaderShell crumbs={[{ label: "Library", href: "/" }, { label: series.title }]}>
      <div className="mx-auto flex w-full max-w-5xl min-w-0 flex-col gap-8 px-4 pt-2 pb-12 md:px-8">
        <SeriesHeader series={toHeaderSeries(series)} />
        <section aria-label="About the series" className="flex flex-col gap-3">
          <ul aria-label="Genres" className="flex flex-wrap gap-2">
            {series.genres.map((genre) => (
              <li key={genre}>
                <CaptionBox font="body" tone="tone" className="text-sm">
                  {genre}
                </CaptionBox>
              </li>
            ))}
          </ul>
          <p className="text-sm text-muted-foreground tabular-nums">
            {series.volumes.length} volumes · {series.chapters.length} chapters ·{" "}
            {totalPages(series)} pages
          </p>
        </section>
        {/* Only the open panel is rendered, so the other tabs' pictures load when it opens. */}
        <Tabs defaultValue="chapters" className="gap-6">
          <TabsList>
            <TabsTrigger value="chapters">Chapters</TabsTrigger>
            <TabsTrigger value="volumes">Volumes</TabsTrigger>
            <TabsTrigger value="cast">Cast</TabsTrigger>
          </TabsList>
          <TabsContent value="chapters" className="flex flex-col gap-4">
            <h2 className="font-display text-xl">{`${chapters.length} chapters`}</h2>
            <ChapterList
              chapters={chapters}
              label={`${series.title} chapters`}
              // Only a running series has a NEW chapter.
              latest={series.status === "ongoing"}
            />
          </TabsContent>
          <TabsContent value="volumes" className="flex flex-col gap-4">
            <h2 className="font-display text-xl">{`${volumes.length} volumes`}</h2>
            <VolumeGrid volumes={volumes} label={`${series.title} volumes`} />
          </TabsContent>
          <TabsContent value="cast" className="flex flex-col gap-4">
            <h2 className="font-display text-xl">{`${series.cast.length} characters`}</h2>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {series.cast.map((member) => (
                <li key={member.name} className="flex">
                  <CharacterCard {...member} />
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </div>
    </ReaderShell>
  );
}

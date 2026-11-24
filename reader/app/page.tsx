import type { Metadata } from "next";
import { ContinueReading } from "@/components/continue-reading";
import { ReaderShell } from "@/components/reader-shell";
import { Shelf } from "@/components/shelf";
import { SpeechBubble } from "@/components/speech-bubble";
import { continueReading, SERIES, seriesHref, toVolumes } from "@/lib/series";

export const metadata: Metadata = {
  title: { absolute: "Library | Inkwell" },
  description: "Your Inkwell library: the chapters you have open and every volume on the shelf.",
};

/** Covers in volume-grid's widest row: the first shelf loads that many at once. */
const FIRST_ROW = 4;

// library-page's layout, composed from its parts (ContinueReading, Shelf) in Inkwell's shell:
// the open chapters, then one shelf per series, then an empty shelf.
export default function LibraryPage() {
  const [first] = SERIES;
  return (
    <ReaderShell crumbs={[{ label: "Inkwell", href: "/" }, { label: "Library" }]}>
      <div className="flex min-w-0 flex-1 flex-col gap-10 p-4 pt-0 pb-10">
        <div className="flex flex-col items-start gap-3">
          <h1 className="font-display text-2xl leading-tight uppercase">Library</h1>
          <SpeechBubble tail="bottom-left" className="max-w-md text-sm">
            Three originals, freshly inked. Pick up where you left off, or open a shelf.
          </SpeechBubble>
        </div>
        <ContinueReading items={continueReading()} />
        {SERIES.map((series, index) => (
          <Shelf
            key={series.slug}
            title={series.title}
            // Each cover opens the series' page.
            volumes={toVolumes(series, () => seriesHref(series))}
            count={series.volumes.length}
            // The first shelf's first row is on a phone's first screen.
            eager={index === 0 ? FIRST_ROW : 0}
          />
        ))}
        <Shelf
          title="Saved for later"
          volumes={[]}
          empty={{
            description: "Volumes you want to read next wait here.",
            action: { label: "Browse series", href: seriesHref(first) },
          }}
        />
      </div>
    </ReaderShell>
  );
}

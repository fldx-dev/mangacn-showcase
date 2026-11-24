import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { Panel } from "@/components/panel";
import { ReaderShell } from "@/components/reader-shell";
import { SpeechBubble } from "@/components/speech-bubble";
import { Button } from "@/components/ui/button";

// Shown for every chapter link until the chapter reader is built.
export default function ChapterComingSoon() {
  return (
    <ReaderShell crumbs={[{ label: "Library", href: "/" }, { label: "Coming soon" }]}>
      <title>Chapter reader coming soon | Inkwell</title>
      <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col px-4 pt-2 pb-12">
        <Panel
          shadow
          caption="Next issue"
          className="flex-1 items-center justify-center gap-6 px-5 py-14 text-center"
        >
          <SpeechBubble tail="bottom-right" className="text-base">
            Pages are still drying. Check back soon!
          </SpeechBubble>
          <h1 className="font-display text-3xl leading-tight uppercase md:text-4xl">
            Chapter reader coming soon
          </h1>
          <CaptionBox font="body" className="max-w-md text-sm">
            The reader for this chapter is not ready yet. The series page lists every chapter and
            how many pages it has.
          </CaptionBox>
          <Button size="lg" nativeButton={false} render={<Link href="/" />}>
            Back to the library
          </Button>
        </Panel>
      </div>
    </ReaderShell>
  );
}

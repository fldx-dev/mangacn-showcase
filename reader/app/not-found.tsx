import type { Metadata } from "next";
import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { Panel } from "@/components/panel";
import { ReaderShell } from "@/components/reader-shell";
import { SpeechBubble } from "@/components/speech-bubble";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page is not on any shelf.",
};

export default function NotFound() {
  return (
    <ReaderShell crumbs={[{ label: "Library", href: "/" }, { label: "Not found" }]}>
      <div className="mx-auto flex w-full max-w-3xl min-w-0 flex-1 flex-col px-4 pt-2 pb-12">
        <Panel
          shadow
          caption="Page 404"
          className="flex-1 items-center justify-center gap-6 px-5 py-14 text-center"
        >
          <SpeechBubble shape="shout" tail="bottom-left" className="text-base">
            Missing page!
          </SpeechBubble>
          <h1 className="font-display text-3xl leading-tight uppercase md:text-4xl">
            Not on any shelf
          </h1>
          <CaptionBox font="body" className="max-w-md text-sm">
            This page was torn out, or it never made it to print. Your library is one click away.
          </CaptionBox>
          <Button size="lg" nativeButton={false} render={<Link href="/" />}>
            Back to the library
          </Button>
        </Panel>
      </div>
    </ReaderShell>
  );
}

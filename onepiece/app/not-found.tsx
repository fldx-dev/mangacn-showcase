import type { Metadata } from "next";
import Link from "next/link";
import { CaptionBox } from "@/components/caption-box";
import { FocusLines } from "@/components/focus-lines";
import { Panel } from "@/components/panel";
import { SfxText } from "@/components/sfx-text";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { SpeechBubble } from "@/components/speech-bubble";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Lost at sea | One Piece fan page",
  description: "This page is not on any chart.",
  // One 404 is served for every unknown address, so it cannot be its own canonical.
  alternates: { canonical: "/" },
};

export default function NotFound() {
  return (
    <div className="paper-grain flex flex-1 flex-col overflow-x-clip">
      <SiteHeader />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto flex w-full max-w-6xl flex-1 flex-col px-4 py-10 outline-none sm:px-6 sm:py-16"
      >
        <Panel
          shadow
          caption="Page 404"
          className="flex-1 items-center justify-center gap-8 px-5 py-16 text-center"
        >
          <FocusLines color="tone" length="long" className="inset-(--outline-width-heavy)" />
          <SpeechBubble shape="shout" tail="bottom-left" aria-label="Zoro" className="text-lg">
            Which way was the ship again?
          </SpeechBubble>
          <h1>
            <SfxText
              size="xl"
              color="spot"
              rotate={-4}
              className="text-[clamp(3.5rem,14vw,9rem)] leading-none sm:text-[clamp(3.5rem,14vw,9rem)] sm:leading-none"
            >
              Lost at sea
            </SfxText>
          </h1>
          <CaptionBox className="text-base sm:text-lg">
            This page is not on any chart. Even the crew&apos;s swordsman would have found the
            way back by now.
          </CaptionBox>
          <Button
            size="lg"
            className="h-12 px-6 text-base"
            nativeButton={false}
            render={<Link href="/" />}
          >
            Back to the ship
          </Button>
        </Panel>
      </main>
      <SiteFooter />
    </div>
  );
}

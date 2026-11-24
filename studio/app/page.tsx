import Link from "next/link";
import { FocusLines } from "@/components/focus-lines";
import { HalftoneBackground } from "@/components/halftone-background";
import { MangaFrame } from "@/components/manga-frame";
import { Panel } from "@/components/panel";
import { SfxText } from "@/components/sfx-text";
import { StudioMark } from "@/components/studio/studio-mark";
import { Button } from "@/components/ui/button";
import { STUDIO } from "@/lib/site";

const FEATURES = [
  {
    caption: "Readers",
    title: "Know who turned the page",
    body: "Weekly reads, follows and drop-off per chapter, so you see where the story grips.",
  },
  {
    caption: "Files",
    title: "Every page in one drawer",
    body: "Storyboards, inks, tones and lettering sorted by chapter, ready for your editor.",
  },
  {
    caption: "Deadlines",
    title: "Thursday stops being a surprise",
    body: "Each chapter's pages on one track, from thumbnails to the final file you send in.",
  },
] as const;

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col">
      <header className="flex items-center justify-between gap-4 px-4 py-4 md:px-10">
        <StudioMark />
        <nav aria-label="Account" className="flex items-center gap-2">
          <Button variant="ghost" nativeButton={false} render={<Link href="/login" />}>
            Log in
          </Button>
          <Button nativeButton={false} render={<Link href="/signup" />}>
            Sign up
          </Button>
        </nav>
      </header>

      <main className="flex flex-1 flex-col gap-16 px-4 pt-6 pb-16 md:px-10 md:pt-12">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <p className="font-dialogue text-lg text-spot">For creators on a weekly serial</p>
            <h1 className="font-display text-4xl leading-none uppercase sm:text-5xl lg:text-6xl">
              Every deadline, one desk.
            </h1>
            <p className="max-w-prose text-base text-muted-foreground">
              Studio is the back office for your manga: readers, page files and the week&apos;s
              schedule in one place, so the drawing table stays for drawing.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button size="lg" nativeButton={false} render={<Link href="/signup" />}>
                Open your desk
              </Button>
              <Button
                size="lg"
                variant="outline"
                nativeButton={false}
                render={<Link href="/login" />}
              >
                I have an account
              </Button>
            </div>
          </div>
          <div aria-hidden className="mx-auto w-full max-w-md">
            <MangaFrame aspect="4/3">
              <HalftoneBackground tone="light" fade="radial" />
              <FocusLines length="long" center={[62, 48]} />
              <SfxText size="xl" rotate={-10} enter="slam">
                Don!
              </SfxText>
            </MangaFrame>
          </div>
        </section>

        <section aria-labelledby="desk-title" className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <h2 id="desk-title" className="font-display text-2xl leading-tight uppercase">
            What&apos;s on the desk
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {FEATURES.map((feature) => (
              <Panel
                key={feature.caption}
                as="article"
                caption={feature.caption}
                className="gap-2 p-5 pt-12"
              >
                <h3 className="text-lg leading-snug font-semibold">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.body}</p>
              </Panel>
            ))}
          </div>
        </section>
      </main>

      <footer className="px-4 py-6 text-xs text-muted-foreground md:px-10">
        {STUDIO.name}, its creator and <em>{STUDIO.series}</em> are made up for this demo. Built
        with mangacn components.
      </footer>
    </div>
  );
}

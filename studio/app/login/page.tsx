import type { Metadata } from "next";
import { LoginForm } from "@/components/login-form";
import { FocusLines } from "@/components/focus-lines";
import { HalftoneBackground } from "@/components/halftone-background";
import { MangaFrame } from "@/components/manga-frame";
import { SfxText } from "@/components/sfx-text";
import { StudioMark } from "@/components/studio/studio-mark";
import { signIn } from "@/app/actions";

export const metadata: Metadata = { title: "Log in" };

// login-02's split screen, composed in site code: the block's page renders <LoginForm /> with no
// props, so this route passes the fake sign-in action to the untouched form (see FINDINGS.md).
export default function LoginPage() {
  return (
    <main className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <StudioMark />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm action={signIn} />
            <p className="mt-6 text-center text-xs text-muted-foreground">
              Demo desk: any email and password let you in.
            </p>
          </div>
        </div>
      </div>
      <div aria-hidden className="relative hidden items-center justify-center p-10 lg:flex">
        <MangaFrame aspect="3/4" className="w-full max-w-md">
          <HalftoneBackground tone="light" fade="radial" />
          <FocusLines length="long" />
          <SfxText size="lg" rotate={-8}>
            Kachi!
          </SfxText>
        </MangaFrame>
      </div>
    </main>
  );
}

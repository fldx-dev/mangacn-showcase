import type { Metadata } from "next";
import Link from "next/link";
import { Panel } from "@/components/panel";
import { StudioMark } from "@/components/studio/studio-mark";

export const metadata: Metadata = { title: "Forgot password" };

// login-02's form links here and the route is not part of the block; on a demo desk there is no
// password to forget, so the page says so and points back.
export default function ForgotPasswordPage() {
  return (
    <main className="flex min-h-svh flex-col gap-4 p-6 md:p-10">
      <div className="flex justify-center md:justify-start">
        <StudioMark />
      </div>
      <div className="flex flex-1 items-center justify-center">
        <Panel caption="Memo" className="w-full max-w-sm gap-4 p-6 pt-12">
          <h1 className="font-display text-2xl leading-tight uppercase">No password to forget</h1>
          <p className="text-sm text-muted-foreground">
            This is a demo desk. Any email and password log you in, and nothing is stored.
          </p>
          <Link href="/login" className="text-sm underline underline-offset-4">
            Back to log in
          </Link>
        </Panel>
      </div>
    </main>
  );
}

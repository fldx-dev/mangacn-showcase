import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { StudioMark } from "@/components/studio/studio-mark";
import { WelcomeFlow } from "@/components/studio/welcome-flow";
import { skipOnboarding } from "@/app/actions";

export const metadata: Metadata = { title: "Welcome" };

// First run, shown once after sign-up (proxy.ts sends /app here while the flag cookie is set).
// onboarding-01 has no skip, so the page adds one: it clears the flag and opens the dashboard.
export default function WelcomePage() {
  return (
    <main className="flex min-h-svh flex-col gap-6 p-4 md:p-10">
      <header className="flex flex-wrap items-center justify-between gap-3">
        <StudioMark />
        <form action={skipOnboarding}>
          <Button type="submit" variant="outline" size="sm">
            Skip for now
          </Button>
        </form>
      </header>
      <div className="flex flex-1 flex-col justify-center">
        <WelcomeFlow />
      </div>
      <p className="text-center text-xs text-muted-foreground">
        Demo desk: your answers stay in this tab.
      </p>
    </main>
  );
}

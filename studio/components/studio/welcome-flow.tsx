"use client";

import { OnboardingFlow } from "@/components/onboarding-flow";
import { completeOnboarding } from "@/app/actions";

// onboarding-01 with the first-run flag cleared on Finish. The cookie goes before the summary
// step shows, so a reload after Finish lands on the dashboard; the summary's link goes there too.
export function WelcomeFlow() {
  return <OnboardingFlow libraryHref="/app" onComplete={() => void completeOnboarding()} />;
}

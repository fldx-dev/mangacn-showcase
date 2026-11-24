import type { Metadata } from "next";
import { StudioProfileForm, StudioSettingsForm } from "@/components/studio/desk-forms";

export const metadata: Metadata = { title: "Settings" };

// profile-01 (the public profile and password) above settings-01 (account, notifications,
// reading). Saving shows a toast; nothing leaves the browser.
export default function SettingsPage() {
  return (
    <>
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-2xl leading-tight uppercase">Settings</h1>
        <p className="text-sm text-muted-foreground">
          How readers see you, and how the desk behaves. Saves stay in this tab.
        </p>
      </div>
      {/* The same two columns settings-01 uses at xl (its section nav, then the form), so the
          profile cards line up with the settings cards below them. */}
      <div className="flex flex-col gap-3 xl:grid xl:grid-cols-[12rem_minmax(0,42rem)] xl:gap-10">
        <p className="text-sm font-medium">Profile</p>
        <StudioProfileForm />
      </div>
      <div className="pb-6">
        <StudioSettingsForm />
      </div>
    </>
  );
}

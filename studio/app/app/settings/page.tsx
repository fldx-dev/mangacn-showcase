import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/studio/placeholder-page";

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return (
    <PlaceholderPage
      title="Settings"
      note="Studio profile, team and publishing preferences will live here."
      tones={["cross", "halftone", "none"]}
    />
  );
}

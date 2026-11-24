import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/studio/placeholder-page";

export const metadata: Metadata = { title: "Files" };

export default function FilesPage() {
  return (
    <PlaceholderPage
      title="Files"
      note="Storyboards, inks and tone layers for each chapter will be listed here."
      tones={["lines", "none", "halftone"]}
    />
  );
}

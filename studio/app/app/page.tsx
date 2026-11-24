import type { Metadata } from "next";
import { PlaceholderPage } from "@/components/studio/placeholder-page";

export const metadata: Metadata = { title: "Overview" };

export default function OverviewPage() {
  return (
    <PlaceholderPage
      title="Overview"
      note="Readership, deadlines and chapter progress will land on this page."
      tones={["halftone", "lines", "cross"]}
    />
  );
}

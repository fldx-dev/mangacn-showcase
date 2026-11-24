import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Blog" };

export default function BlogPage() {
  return <ComingSoon title="Blog" thought="Studio diary, process notes and too many photos of pens." />;
}

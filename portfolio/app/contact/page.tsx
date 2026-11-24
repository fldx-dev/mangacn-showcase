import type { Metadata } from "next";
import { ComingSoon } from "@/components/coming-soon";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return <ComingSoon title="Contact" thought="Commissions, events and fan letters, all welcome." />;
}

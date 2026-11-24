import type { Metadata } from "next";
import { Geist, Geist_Mono, Dela_Gothic_One, Shantell_Sans, Yusei_Magic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const yuseiMagicDialogueJa = Yusei_Magic({subsets:['latin'],weight:['400'],variable:'--font-dialogue-ja'});

const shantellSansDialogueLatin = Shantell_Sans({subsets:['latin','latin-ext'],variable:'--font-dialogue-latin'});

const delaGothicOneDisplay = Dela_Gothic_One({subsets:['latin','latin-ext'],weight:['400'],variable:'--font-display'});

// Named --font-sans: globals.css maps Tailwind's sans to that variable.
const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Studio: the creator desk", template: "%s · Studio" },
  description:
    "A demo creator dashboard for a made-up manga studio, built with mangacn components.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, delaGothicOneDisplay.variable, shantellSansDialogueLatin.variable, yuseiMagicDialogueJa.variable)}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

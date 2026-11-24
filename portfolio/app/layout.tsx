import type { Metadata } from "next";
import { Geist, Geist_Mono, Dela_Gothic_One, Shantell_Sans, Yusei_Magic } from "next/font/google";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { cn } from "@/lib/utils";

const yuseiMagicDialogueJa = Yusei_Magic({subsets:['latin'],weight:['400'],variable:'--font-dialogue-ja'});

const shantellSansDialogueLatin = Shantell_Sans({subsets:['latin','latin-ext'],variable:'--font-dialogue-latin'});

const delaGothicOneDisplay = Dela_Gothic_One({subsets:['latin','latin-ext'],weight:['400'],variable:'--font-display'});

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: { default: "Oriha Sumi | Manga artist", template: "%s | Oriha Sumi" },
  description:
    "Portfolio of Oriha Sumi, a made-up manga artist: Lantern Tide, Paper Comet and other original series. A mangacn showcase.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, delaGothicOneDisplay.variable, shantellSansDialogueLatin.variable, yuseiMagicDialogueJa.variable)}
    >
      <body className="paper-grain min-h-full flex flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

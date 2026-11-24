import type { Metadata } from "next";
import { Geist, Geist_Mono, Dela_Gothic_One, Shantell_Sans, Yusei_Magic } from "next/font/google";
import "./globals.css";
import "./motion.css";
import { PageWipe } from "@/components/page-wipe";
import { SITE_URL } from "@/lib/site";
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

// Inherited by every page. `./` makes each page its own canonical; the Open Graph and Twitter
// titles and descriptions are left out so they fall back to the page's own, and the image comes
// from app/opengraph-image.tsx. A page that sets `openGraph` itself would drop all three.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "One Piece: set sail for the Grand Line",
  description: "A manga-style fan landing page for One Piece, built with mangacn components.",
  alternates: { canonical: "./" },
  openGraph: { type: "website", siteName: "One Piece fan page", locale: "en_US" },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, delaGothicOneDisplay.variable, shantellSansDialogueLatin.variable, yuseiMagicDialogueJa.variable)}
    >
      <head>
        {/* Before first paint: reveals are only hidden when motion is welcome and JS runs. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('motion')",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        {children}
        <PageWipe />
      </body>
    </html>
  );
}

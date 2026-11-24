import type { Metadata } from "next";
import { ContactChat } from "@/components/contact-chat";
import { HEADING, PAGE_COLUMN } from "@/components/site-chrome";
import { ThoughtBubble } from "@/components/thought-bubble";
import { VerticalText } from "@/components/vertical-text";

export const metadata: Metadata = {
  title: "Contact",
  description: "Write to Oriha Sumi's studio about commissions, events or fan letters.",
};

export default function ContactPage() {
  return (
    <div className={`${PAGE_COLUMN} gap-10 pt-8 pb-20 sm:pt-12`}>
      <div className="grid gap-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:items-start">
        <header className="flex gap-4">
          <div className="flex min-w-0 flex-col items-start gap-4">
            <h1 className={HEADING}>Contact</h1>
            <p className="max-w-prose text-base sm:text-lg">
              Commissions, events and fan letters. Answer three questions in the chat and your note lands in the
              studio tray.
            </p>
            <ThoughtBubble className="text-base sm:text-lg">
              Fan letters get answered first. Do not tell my editor.
            </ThoughtBubble>
          </div>
          <VerticalText lang="ja" className="ml-auto shrink-0 font-dialogue text-3xl leading-none tracking-[0.2em] text-spot sm:text-4xl">
            お便り待ってます
          </VerticalText>
        </header>
        <ContactChat />
      </div>
    </div>
  );
}

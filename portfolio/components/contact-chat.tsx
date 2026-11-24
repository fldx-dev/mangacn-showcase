"use client";

import * as React from "react";
import {
  ChatThread,
  localChatTimestamp,
  useChatThread,
  type ChatAuthor,
  type ChatMessage,
} from "@/components/blocks/chat-thread/chat-thread";
import { CaptionBox } from "@/components/caption-box";
import { Stamp } from "@/components/stamp";
import { Button } from "@/components/ui/button";

// A contact form told as a conversation. Nothing leaves the browser: there is no backend.

const STUDIO: ChatAuthor = { id: "studio", name: "Oriha Sumi" };
const YOU: ChatAuthor = { id: "you", name: "You" };

// Fixed times, so the server and the browser render the same greeting.
const GREETING: ChatMessage[] = [
  { id: "hello", author: STUDIO, at: "2026-11-24T09:00:00+09:00", text: "Hi! This is the studio inbox. I read everything, usually with coffee." },
  { id: "ask-name", author: STUDIO, at: "2026-11-24T09:00:00+09:00", text: "What should I call you?" },
];

type Step = "name" | "email" | "message" | "sent";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

let replies = 0;

export function ContactChat() {
  const thread = useChatThread({ initial: GREETING, me: YOU });
  const { receive, send, setMessages } = thread;
  const [step, setStep] = React.useState<Step>("name");
  const [typing, setTyping] = React.useState(false);
  const [sender, setSender] = React.useState({ name: "", email: "" });
  const timer = React.useRef<ReturnType<typeof setTimeout>>(undefined);

  React.useEffect(() => () => clearTimeout(timer.current), []);

  /** The studio answers after a short pause, as if typing. */
  const reply = (text: string, next: Step) => {
    setTyping(true);
    timer.current = setTimeout(() => {
      replies += 1;
      receive({ id: `reply-${replies}`, author: STUDIO, at: localChatTimestamp(), text });
      setStep(next);
      setTyping(false);
    }, 700);
  };

  const onSend = (text: string) => {
    send(text);
    if (step === "name") {
      setSender({ name: text, email: "" });
      reply(`Nice to meet you, ${text}. Which email should I write back to?`, "email");
    } else if (step === "email") {
      if (!EMAIL.test(text)) {
        reply("Hmm, that does not look like an email address. One more try?", "email");
        return;
      }
      setSender((current) => ({ ...current, email: text }));
      reply("Got it. What is on your mind? Commissions, events and fan letters are all welcome.", "message");
    } else if (step === "message") {
      reply(`Sent! It is in the tray on my desk. I will write back to ${sender.email} within a week.`, "sent");
    }
  };

  const restart = () => {
    clearTimeout(timer.current);
    setSender({ name: "", email: "" });
    setMessages(GREETING);
    setTyping(false);
    setStep("name");
  };

  const placeholder = { name: "Your name", email: "you@example.com", message: "Your message", sent: "" }[step];

  return (
    <div className="flex flex-col gap-6">
      <div className="h-[26rem] border-2 border-ink bg-paper sm:h-[30rem]">
        <ChatThread
          label="Contact conversation"
          messages={thread.messages}
          me={thread.me}
          onSend={step === "sent" ? undefined : onSend}
          streaming={typing}
          placeholder={placeholder}
          className="p-2"
        />
      </div>
      {step === "sent" && (
        <div role="status" className="flex flex-wrap items-center gap-4">
          <Stamp size="md" rotate={-12}>SENT</Stamp>
          <div className="flex flex-col items-start gap-3">
            <CaptionBox font="body" className="text-base">
              Message sent, {sender.name}. This is a demo: nothing left your browser.
            </CaptionBox>
            <Button variant="outline" onClick={restart}>Write another</Button>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Send, Sparkles, X } from "lucide-react";
import { FormEvent, useState } from "react";
import { cn } from "@/lib/utils";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const CHATBOT_ICON_SRC = "/minubot.png";

export function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro",
      role: "assistant",
      content: "Hey, I'm Andrew! Ask me anything, can be work or hobby related loll",
    },
  ]);

  const submitMessage = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = input.trim();

    if (!trimmed || isLoading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage].map((message) => ({
            role: message.role,
            content: message.content,
          })),
        }),
      });

      const data = (await response.json()) as { message?: string };

      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content:
            data.message ??
            "The assistant endpoint is ready, but no response was returned. Add your OpenAI prompt wiring in /api/chat.",
        },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I could not reach the assistant endpoint. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen ? (
          <motion.section
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.24 }}
            className="mb-3 flex h-[520px] w-[min(92vw,380px)] flex-col overflow-hidden rounded-3xl border border-white/20 bg-bg-panel/95 shadow-2xl shadow-black/30 backdrop-blur-xl"
          >
            <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-medium">
                <img
                  src={CHATBOT_ICON_SRC}
                  alt=""
                  aria-hidden="true"
                  className="h-5 w-5 rounded-full object-cover"
                />
                Minubot (my clone) 
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="rounded-full border border-white/20 p-1.5 text-fg-muted transition hover:text-foreground"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    "flex",
                    message.role === "assistant" ? "justify-start" : "justify-end",
                  )}
                >
                  <article
                    className={cn(
                      "w-fit max-w-[92%] rounded-2xl px-4 py-2 text-sm leading-relaxed",
                      message.role === "assistant"
                        ? "bg-[color-mix(in_srgb,var(--fg-primary)_10%,transparent)] text-foreground"
                        : "bg-accent text-black",
                    )}
                  >
                    {message.content}
                  </article>
                </div>
              ))}
              {isLoading ? <p className="text-xs text-fg-muted">Thinking...</p> : null}
            </div>

            <form onSubmit={submitMessage} className="border-t border-white/10 p-3">
              <div className="flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-3 py-2">
                <input
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder="Ask a question"
                  className="h-9 flex-1 bg-transparent text-sm outline-none placeholder:text-fg-muted"
                />
                <button
                  type="submit"
                  disabled={isLoading}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-black transition hover:brightness-110 disabled:opacity-50"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </form>
          </motion.section>
        ) : null}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.04 }}
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-accent text-black shadow-2xl"
        aria-label="Toggle assistant"
      >
        <img
          src={CHATBOT_ICON_SRC}
          alt=""
          aria-hidden="true"
          className="h-7 w-7 rounded-full object-cover"
        />
      </motion.button>
    </div>
  );
}

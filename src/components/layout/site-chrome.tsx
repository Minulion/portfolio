"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { IntroGate } from "@/components/home/intro-gate";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(123,194,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(254,200,120,0.2),transparent_35%),linear-gradient(to_bottom,var(--bg-primary),var(--bg-secondary))]" />
      </div>

      <IntroGate />
      <Navbar />
      <div className="pt-24">
        <PageTransition pathname={pathname}>{children}</PageTransition>
      </div>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}

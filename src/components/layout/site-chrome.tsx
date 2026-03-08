"use client";

import type { ReactNode } from "react";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChatbotWidget } from "@/components/chatbot/chatbot-widget";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { PageTransition } from "@/components/layout/page-transition";

export function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = window.location.pathname;

    // Always consume the flag immediately so it can't carry over to the next load.
    const wasClientNav = sessionStorage.getItem("client_nav") === "true";
    sessionStorage.removeItem("client_nav");

    if (currentPath === "/") {
      return;
    }

    // If we landed on a non-home page without a client-nav flag, this is either:
    //   - a hard reload on /blog (or any sub-page), or
    //   - a direct URL entry
    // Both should redirect to home, which then plays the intro animation.
    if (!wasClientNav) {
      window.location.replace("/");
    }
  }, [pathname]);

  return (
    <div className="relative min-h-screen overflow-x-clip">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(123,194,255,0.18),transparent_45%),radial-gradient(circle_at_80%_0%,rgba(254,200,120,0.2),transparent_35%),linear-gradient(to_bottom,var(--bg-primary),var(--bg-secondary))]" />
      </div>

      <Navbar />
      <div className="pt-24">
        <PageTransition pathname={pathname}>{children}</PageTransition>
      </div>
      <Footer />
      <ChatbotWidget />
    </div>
  );
}
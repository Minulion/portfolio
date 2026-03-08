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
    const prevPath = sessionStorage.getItem("prev_path");

    // Always record where we are so the next navigation can read it.
    sessionStorage.setItem("prev_path", currentPath);

    if (currentPath === "/") {
      return;
    }

    // If there is no recorded previous path, this is the first page load in
    // this tab session — meaning a hard reload or direct URL entry on a
    // non-home page. Redirect so the intro animation plays from home.
    if (!prevPath) {
      window.location.replace("/");
    }

    // If prevPath exists, we got here via client-side navigation — render normally.
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
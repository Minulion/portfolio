"use client";

import { LazyMotion, MotionConfig, domAnimation } from "framer-motion";
import type { ReactNode } from "react";
import { MusicProvider } from "@/components/providers/music-provider";
import { ThemeProvider } from "@/components/providers/theme-provider";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <LazyMotion features={domAnimation}>
        <MotionConfig reducedMotion="user">
          <MusicProvider>{children}</MusicProvider>
        </MotionConfig>
      </LazyMotion>
    </ThemeProvider>
  );
}

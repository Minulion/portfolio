"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMusic } from "@/components/providers/music-provider";
import { siteConfig } from "@/data/site";

export function IntroGate() {
  const { hasStarted, startMusic } = useMusic();
  const [isVisible, setIsVisible] = useState(!hasStarted);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (hasStarted) {
      setIsVisible(false);
      return;
    }

    const timer = window.setTimeout(() => {
      setIsReady(true);
    }, 1500);

    return () => window.clearTimeout(timer);
  }, [hasStarted]);

  const handleEnter = async () => {
    await startMusic();
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[radial-gradient(circle_at_20%_10%,rgba(255,255,255,0.12),transparent_45%),linear-gradient(130deg,#06121f,#0f1d34_38%,#1a2f4a)] px-6"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full max-w-xl text-center"
          >
            <p className="text-xs uppercase tracking-[0.34em] text-white/60">Minulion's Portfolio</p>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-white md:text-6xl">
              {siteConfig.name}
            </h1>
            <p className="mx-auto mt-5 max-w-md text-sm text-white/70 md:text-base">{siteConfig.title}</p>

            {!isReady ? (
              <div className="mx-auto mt-10 h-1.5 w-56 overflow-hidden rounded-full bg-white/15">
                <motion.div
                  className="h-full rounded-full bg-white"
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ duration: 1.3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </div>
            ) : (
              <motion.button
                type="button"
                onClick={handleEnter}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.98 }}
                  className="mt-10 inline-flex items-center justify-center rounded-full border border-white/25 bg-white/10 px-8 py-3 text-sm font-medium tracking-wide text-white backdrop-blur transition
    hover:shadow-[0_0_15px_rgba(0,200,200,0.8)]
    hover:[text-shadow:0_0_10px_rgba(0,200,200,0.8)]"
              >
                Enter
              </motion.button>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

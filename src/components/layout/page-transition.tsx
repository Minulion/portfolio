"use client";

import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

type PageTransitionProps = {
  pathname: string;
  children: ReactNode;
};

export function PageTransition({ pathname, children }: PageTransitionProps) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
}

"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type PageTransitionProps = {
  pathname: string;
  children: ReactNode;
};

export function PageTransition({ pathname, children }: PageTransitionProps) {
  return (
    <motion.main
      key={pathname}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.main>
  );
}

"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";

const HeroCanvas = dynamic(
  () => import("@/components/home/hero-canvas").then((module) => module.HeroCanvas),
  {
    ssr: false,
  },
);

export function HeroSection() {
  return (
    <section id="home" className="relative scroll-mt-28 px-6 pb-20 pt-28 md:px-10 md:pb-28 md:pt-36">
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-70">
        <HeroCanvas />
      </div>

      <div className="mx-auto w-full max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="glass-panel max-w-3xl rounded-3xl p-8 md:p-10"
        >
          <p className="text-xs uppercase tracking-[0.34em] text-fg-muted">Minulion's Portfolio</p>
          <h1 className="mt-5 text-balance text-4xl font-semibold tracking-tight md:text-6xl">
            Hey, I'm Andrew.
          </h1>
          <p className="mt-5 max-w-2xl text-pretty text-base text-fg-muted md:text-lg">
            Welcome to my space! This is where I'll be sharing everything I've been up to—from work to music, food, and more.
            <br />
            <br />
            If this is your first time here, scroll down to find out who I am. Otherwise, you can jump straight to my projects, or take a look at what I've been writing about.
            <br />
            <br />
            P.S. Try out night mode... 🎷✨
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-black transition hover:brightness-110"
            >
              View Projects
            </Link>
            <Link
              href="/blog"
              className="rounded-full border border-white/20 bg-white/10 px-5 py-2.5 text-sm text-foreground transition hover:border-accent"
            >
              Read My Burger Blog!
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

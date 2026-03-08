"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { experiences } from "@/data/experiences";
import { SectionShell } from "@/components/ui/section-shell";
import { cn } from "@/lib/utils";

export function TimelineSection() {
  const [activeId, setActiveId] = useState(experiences[0]?.id ?? "");

  return (
    <SectionShell
      id="experience"
      title="Experience"
      subtitle="See what I've done so far."
    >
      <div className="relative space-y-5 before:absolute before:left-4 before:top-0 before:h-full before:w-px before:bg-white/20 md:before:left-8">
        {experiences.map((item) => {
          const isActive = item.id === activeId;

          return (
            <motion.article
              key={item.id}
              layout
              className={cn(
                "relative overflow-hidden rounded-2xl border p-5 pl-12 transition md:pl-16",
                isActive
                  ? "border-accent/60 bg-white/10 shadow-xl shadow-accent/10"
                  : "border-white/15 bg-white/5",
              )}
            >
              <button
                type="button"
                onClick={() => setActiveId(item.id)}
                className="w-full text-left"
              >
                <span
                  className={cn(
                    "absolute left-[0.85rem] top-6 h-6 w-6 rounded-full border md:left-[1.45rem]",
                    isActive ? "border-accent bg-accent" : "border-white/40 bg-bg-primary",
                  )}
                />

                <p className="text-xs uppercase tracking-[0.22em] text-fg-muted">{item.date}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight">{item.role}</h3>
                <p className="text-sm text-fg-muted">{item.company}</p>
                <p className="mt-3 text-sm text-fg-muted">{item.summary}</p>
              </button>

              <AnimatePresence initial={false}>
                {isActive ? (
                  <motion.ul
                    initial={{ opacity: 0, height: 0, marginTop: 0 }}
                    animate={{ opacity: 1, height: "auto", marginTop: 14 }}
                    exit={{ opacity: 0, height: 0, marginTop: 0 }}
                    transition={{ duration: 0.28 }}
                    className="space-y-2 overflow-hidden text-sm text-fg-muted"
                  >
                    {item.highlights.map((highlight) => (
                      <li key={highlight} className="relative pl-5 before:absolute before:left-0 before:top-2 before:h-1.5 before:w-1.5 before:rounded-full before:bg-accent">
                        {highlight}
                      </li>
                    ))}
                  </motion.ul>
                ) : null}
              </AnimatePresence>
            </motion.article>
          );
        })}
      </div>
    </SectionShell>
  );
}

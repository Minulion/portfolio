"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { RotatingHeadline } from "@/components/home/rotating-headline";
import { aboutImages, rotatingRoles, siteConfig } from "@/data/site";
import { SectionShell } from "@/components/ui/section-shell";

export function AboutSection() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((prev) => (prev + 1) % aboutImages.length);
    }, 4500);

    return () => window.clearInterval(timer);
  }, [aboutImages.length]);

  return (
    <SectionShell
      id="about"
      title="About"
      subtitle="A little bit about me."
    >
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5 }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-accent/45 to-sky-400/20 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-[2rem]">
            <AnimatePresence mode="wait">
              <motion.div
                key={aboutImages[index]}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={aboutImages[index]}
                  alt="About photo"
                  fill
                  className="object-cover"
                  priority
                />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {aboutImages.map((image, imageIndex) => (
              <button
                key={image}
                type="button"
                onClick={() => setIndex(imageIndex)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  imageIndex === index ? "bg-accent" : "bg-white/30"
                }`}
                aria-label={`Show image ${imageIndex + 1}`}
              />
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="space-y-5"
        >
          <RotatingHeadline prefix="I am a" words={rotatingRoles} />
          <p className="text-pretty text-fg-muted">
            I'm currently a third-year undergraduate studying CS @ UW-Madison, with a certificate in Entrepreneurship.
            Field-wise, I'm most interested in backend engineering, cloud computing, and applied AI. I love the big picture 
            thinking that comes with high level work, but I also enjoy problem solving in any domain.
            <br />
            <br />
            I am experienced with development in Python, Java, and C, alongside frameworks such as React, Tailwind, and more.
            Check my resume at the top for the full list!
          </p>
          <p className="text-pretty text-fg-muted">
            Outside of my career, I play drums in a campus band called Unikists. I'm also a huge fan of soccer (Hala Madrid!),
            and I enjoy playing just as much as watching. My favorite food is burgers, as you'll quickly learn if you read my blog...
          </p>
          <div className="w-fit rounded-2xl border border-white/20 bg-white/5 p-4 text-sm text-fg-muted">
            <p>
              <span className="font-medium text-foreground">Currently based in:</span> {siteConfig.location} 📍
            </p>
          </div>
        </motion.div>
      </div>
    </SectionShell>
  );
}

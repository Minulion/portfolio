"use client";

import { motion } from "framer-motion";
import { FormEvent, useState } from "react";
import { siteConfig } from "@/data/site";
import { FaSpotify, FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";



type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function Footer() {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          message: formData.get("message"),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit");
      }

      setStatus("success");
      event.currentTarget.reset();
    } catch (error) {
      console.error(error);
      setStatus("error");
    }
  };

  return (
    <footer id="contact" className="scroll-mt-28 border-t border-white/15 px-6 py-16 md:px-10">
      <div className="mx-auto grid w-full max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr]">
        <div className="space-y-6">
          <p className="text-xs uppercase tracking-[0.28em] text-fg-muted">Contact</p>
          <h2 className="text-3xl font-semibold tracking-tight md:text-4xl">Get in touch with me!</h2>
          <p className="max-w-xl text-fg-muted">
            I'm currently open to new opportunities and I'm always willing to chat. Shoot me an email and let's see what we can do together.
          </p>

          <div className="flex flex-wrap gap-3 text-sm">
            <a
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-accent hover:text-accent"
              href={siteConfig.social.github}
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="h-6 w-6" /> 
            </a>
            <a
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-accent hover:text-accent"
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="h-6 w-6" />
            </a>
            <a
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-accent hover:text-accent"
              href={siteConfig.social.spotify}
              target="_blank"
              rel="noreferrer"
            >
              <FaSpotify className="h-6 w-6" />
            </a>
            <a
              className="rounded-full border border-white/20 px-4 py-2 transition hover:border-accent hover:text-accent"
              href={`mailto:${siteConfig.email}`}
            >
              <MdEmail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.45 }}
          onSubmit={handleSubmit}
          className="glass-panel space-y-4 rounded-2xl p-6"
        >
          <label className="block space-y-2 text-sm">
            <span>Name</span>
            <input
              required
              name="name"
              type="text"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 outline-none transition focus:border-accent"
              placeholder="Your name"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span>Email</span>
            <input
              required
              name="email"
              type="email"
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 outline-none transition focus:border-accent"
              placeholder="you@example.com"
            />
          </label>

          <label className="block space-y-2 text-sm">
            <span>Message</span>
            <textarea
              required
              name="message"
              rows={4}
              className="w-full rounded-xl border border-white/20 bg-white/5 px-4 py-3 outline-none transition focus:border-accent"
              placeholder="Whatever you'd like to say"
            />
          </label>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="inline-flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-black transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "submitting" ? "Sending..." : "Send message"}
          </button>

          {status === "success" ? (
            <p className="text-sm text-emerald-400">Message sent. Replace /api/contact with your real email workflow.</p>
          ) : null}
          {status === "error" ? (
            <p className="text-sm text-rose-400">Unable to send right now. Try again later.</p>
          ) : null}
        </motion.form>
      </div>
    </footer>
  );
}

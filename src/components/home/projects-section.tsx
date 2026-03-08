"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";
import { SectionShell } from "@/components/ui/section-shell";

export function ProjectsSection() {
  return (
    <SectionShell
      id="projects"
      title="Projects"
      subtitle="What I've been building!"
    >
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project, index) => (
          <motion.article
            key={project.title}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="group flex h-full flex-col rounded-2xl border border-white/15 bg-white/5 p-6 transition hover:-translate-y-1 hover:border-accent/60 hover:shadow-xl hover:shadow-accent/10"
          >
            <h3 className="text-xl font-semibold tracking-tight">{project.title}</h3>
            <p className="mt-3 flex-1 text-sm text-fg-muted">{project.description}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full border border-white/20 bg-white/5 px-2.5 py-1 text-xs text-fg-muted"
                >
                  {skill}
                </span>
              ))}
            </div>

            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-accent"
            >
              View on GitHub <ArrowUpRight className="h-4 w-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </motion.article>
        ))}
      </div>
    </SectionShell>
  );
}

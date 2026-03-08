import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionShellProps = {
  id: string;
  title: string;
  subtitle?: string;
  className?: string;
  children: ReactNode;
};

export function SectionShell({ id, title, subtitle, className, children }: SectionShellProps) {
  return (
    <section id={id} className={cn("scroll-mt-28 py-20 md:py-28", className)}>
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="mb-12 max-w-2xl space-y-4">
          <p className="text-xs uppercase tracking-[0.28em] text-fg-muted">Section</p>
          <h2 className="text-balance text-3xl font-semibold tracking-tight md:text-4xl">{title}</h2>
          {subtitle ? <p className="text-pretty text-base text-fg-muted md:text-lg">{subtitle}</p> : null}
        </div>
        {children}
      </div>
    </section>
  );
}

"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useCallback, useState, type MouseEvent } from "react";
import { homeSectionLinks, pageLinks, siteConfig } from "@/data/site";
import { MusicToggle } from "@/components/ui/music-toggle";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { cn } from "@/lib/utils";

const navItems = [...homeSectionLinks, ...pageLinks];

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const closeMenu = () => setIsOpen(false);
  const handleSectionNavigation = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, href: string) => {
      closeMenu();

      if (!href.startsWith("/#")) {
        return;
      }

      const targetId = href.replace("/#", "");
      event.preventDefault();

      const scrollToTarget = () => {
        const element = document.getElementById(targetId);
        if (!element) {
          return false;
        }

        element.scrollIntoView({ behavior: "smooth", block: "start" });
        window.history.replaceState(null, "", `/#${targetId}`);
        return true;
      };

      if (pathname === "/") {
        scrollToTarget();
        return;
      }

      window.location.assign(href);
    },
    [pathname],
  );

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-8">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between rounded-2xl border border-white/20 bg-bg-panel/80 px-4 py-3 shadow-xl shadow-black/10 backdrop-blur-xl md:px-5">
        <Link
          href="/#home"
          onClick={(event) => handleSectionNavigation(event, "/#home")}
          className="font-semibold tracking-wide"
        >
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-6 text-sm lg:flex">
          {navItems.map((item) => {
            const isActive = item.href === "/blog" && pathname.startsWith("/blog");

            if ("external" in item && item.external) {
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="text-fg-muted transition-colors hover:text-accent"
                >
                  {item.label}
                </a>
              );
            }

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(event) => handleSectionNavigation(event, item.href)}
                className={cn(
                  "transition-colors hover:text-accent",
                  isActive ? "text-accent" : "text-fg-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <MusicToggle />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 lg:hidden"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="mx-auto mt-3 w-full max-w-6xl rounded-2xl border border-white/20 bg-bg-panel/95 px-5 py-4 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-2">
              {navItems.map((item) => (
                <li key={item.label}>
                  {"external" in item && item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      onClick={closeMenu}
                      className="block rounded-xl px-3 py-2 text-sm text-fg-muted transition hover:bg-white/10 hover:text-foreground"
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={(event) => handleSectionNavigation(event, item.href)}
                      className="block rounded-xl px-3 py-2 text-sm text-fg-muted transition hover:bg-white/10 hover:text-foreground"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}

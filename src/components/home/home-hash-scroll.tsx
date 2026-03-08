"use client";

import { useEffect } from "react";

const MAX_SCROLL_ATTEMPTS = 40;
const SCROLL_RETRY_DELAY_MS = 80;

function scrollToHashTarget(hash: string) {
  if (!hash.startsWith("#")) {
    return true;
  }

  const targetId = decodeURIComponent(hash.slice(1));
  if (!targetId) {
    return true;
  }

  const element = document.getElementById(targetId);
  if (!element) {
    return false;
  }

  element.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function HomeHashScroll() {
  useEffect(() => {
    let timeoutId: number | undefined;

    const runScroll = (attempt = 0) => {
      const { hash } = window.location;

      if (!hash || scrollToHashTarget(hash) || attempt >= MAX_SCROLL_ATTEMPTS) {
        return;
      }

      timeoutId = window.setTimeout(() => {
        runScroll(attempt + 1);
      }, SCROLL_RETRY_DELAY_MS);
    };

    runScroll();

    const handleHashChange = () => {
      runScroll();
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  return null;
}

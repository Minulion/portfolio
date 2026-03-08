"use client";

import { useEffect, useMemo, useState } from "react";

type RotatingHeadlineProps = {
  prefix: string;
  words: string[];
};

const TYPING_SPEED = 95;
const DELETING_SPEED = 55;
const HOLD_DELAY = 1300;

export function RotatingHeadline({ prefix, words }: RotatingHeadlineProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const currentWord = useMemo(() => words[wordIndex % words.length], [wordIndex, words]);

  useEffect(() => {
    const finishedTyping = displayed === currentWord;
    const finishedDeleting = displayed.length === 0;

    const timeout = setTimeout(
      () => {
        if (!isDeleting && !finishedTyping) {
          setDisplayed(currentWord.slice(0, displayed.length + 1));
          return;
        }

        if (!isDeleting && finishedTyping) {
          setIsDeleting(true);
          return;
        }

        if (isDeleting && !finishedDeleting) {
          setDisplayed(currentWord.slice(0, displayed.length - 1));
          return;
        }

        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % words.length);
      },
      !isDeleting && finishedTyping ? HOLD_DELAY : isDeleting ? DELETING_SPEED : TYPING_SPEED,
    );

    return () => clearTimeout(timeout);
  }, [currentWord, displayed, isDeleting, words.length]);

  return (
    <p className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
      {prefix} <span className="text-accent">{displayed}</span>
      <span className="ml-1 inline-block h-[1.05em] w-[2px] animate-cursor bg-accent align-middle" aria-hidden />
    </p>
  );
}

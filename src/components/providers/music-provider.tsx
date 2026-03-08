"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useTheme } from "next-themes";

type MusicContextValue = {
  hasStarted: boolean;
  isMuted: boolean;
  startMusic: () => Promise<void>;
  stopMusic: () => void;
  toggleMute: () => void;
};

const MusicContext = createContext<MusicContextValue | undefined>(undefined);

const TRACKS = {
  light: "/audio/lightmode.mp3",
  dark: "/audio/nightmode.mp3",
} as const;
const MUTE_STORAGE_KEY = "portfolio-music-muted";

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { resolvedTheme } = useTheme();
  const [hasStarted, setHasStarted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  useEffect(() => {
    const storedMuteValue = window.localStorage.getItem(MUTE_STORAGE_KEY);
    setIsMuted(storedMuteValue === "true");
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.muted = isMuted;
    window.localStorage.setItem(MUTE_STORAGE_KEY, String(isMuted));
  }, [isMuted]);

  const playCurrentThemeTrack = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    const currentTheme = resolvedTheme === "light" ? "light" : "dark";
    const nextTrack = TRACKS[currentTheme];

    if (!audio.src.endsWith(nextTrack)) {
      audio.src = nextTrack;
      audio.currentTime = 0;
    }
    audio.volume = 0.25;

    try {
      await audio.play();
    } catch (error) {
      console.warn("Background music failed to play. Replace placeholder files in /public/audio.", error);
    }
  }, [resolvedTheme]);

  useEffect(() => {
    if (!hasStarted) {
      return;
    }

    void playCurrentThemeTrack();
  }, [hasStarted, playCurrentThemeTrack]);

  const startMusic = useCallback(async () => {
    setHasStarted(true);
    await playCurrentThemeTrack();
  }, [playCurrentThemeTrack]);

  const stopMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) {
      return;
    }

    audio.pause();
    audio.currentTime = 0;
    setHasStarted(false);
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

  const value = useMemo(
    () => ({
      hasStarted,
      isMuted,
      startMusic,
      stopMusic,
      toggleMute,
    }),
    [hasStarted, isMuted, startMusic, stopMusic, toggleMute],
  );

  return (
    <MusicContext.Provider value={value}>
      {children}
      <audio ref={audioRef} loop preload="auto" aria-hidden />
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);

  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }

  return context;
}

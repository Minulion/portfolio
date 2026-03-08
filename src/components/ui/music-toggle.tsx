"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useMusic } from "@/components/providers/music-provider";

export function MusicToggle() {
  const { isMuted, toggleMute } = useMusic();

  return (
    <button
      type="button"
      onClick={toggleMute}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-current backdrop-blur-xl transition hover:border-accent"
      aria-label={isMuted ? "Unmute music" : "Mute music"}
      title={isMuted ? "Unmute music" : "Mute music"}
    >
      {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
    </button>
  );
}

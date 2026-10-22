"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { playSilverChime, playPaperRustle, playTactileClick } from "@/lib/audio";

interface SoundContextType {
  isMuted: boolean;
  toggleMute: () => void;
  playChime: () => void;
  playRustle: () => void;
  playClick: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

const STORAGE_KEY = "silveram_sound_muted";

export function SoundProvider({ children }: { children: React.ReactNode }) {
  // Default to unmuted (false) so subtle haptic audio is active, but respect user preference
  const [isMuted, setIsMuted] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved !== null) {
        setIsMuted(saved === "true");
      }
    } catch {
      // Ignore localStorage errors
    }
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(STORAGE_KEY, String(next));
      } catch {
        // Ignore
      }
      // If unmuting, give a very subtle pleasant confirmation chime
      if (prev) {
        playSilverChime(false);
      }
      return next;
    });
  }, []);

  const playChime = useCallback(() => {
    if (!isMuted) {
      playSilverChime(false);
    }
  }, [isMuted]);

  const playRustle = useCallback(() => {
    if (!isMuted) {
      playPaperRustle(false);
    }
  }, [isMuted]);

  const playClick = useCallback(() => {
    if (!isMuted) {
      playTactileClick(false);
    }
  }, [isMuted]);

  return (
    <SoundContext.Provider
      value={{
        isMuted: mounted ? isMuted : false,
        toggleMute,
        playChime,
        playRustle,
        playClick,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
}

export function useSound() {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error("useSound must be used within a SoundProvider");
  }
  return context;
}

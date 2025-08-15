"use client";

import { useEffect } from "react";
import { useVideo } from "../contexts/VideoContext";
import { firebaseVideoKeys } from "../lib/videoManifest";

// Kick off video preloading as early as possible (within VideoProvider),
// especially helpful on mobile. This is safe to run alongside LoadPage
// because VideoContext prevents duplicate loads.
export default function EarlyVideoWarmup() {
  const { preloadVideo, preloadVideos } = useVideo();

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth <= 768;
    // Only prewarm on mobile to improve first interaction
    if (!isMobile) return;

    const main = "כיף לתת מקוצר.mp4";
    try {
      // Prioritize the main video
      preloadVideo(main);
      // Preload the rest in the background
      const others = Array.from(new Set(firebaseVideoKeys.filter((k) => k && k !== main)));
      if (others.length > 0) {
        // Fire and forget
        preloadVideos(others);
      }
    } catch {
      // silent
    }
  }, [preloadVideo, preloadVideos]);

  return null;
}

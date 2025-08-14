'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

interface TestimonialVideoContextType {
  currentPlayingVideo: string | null;
  setCurrentPlayingVideo: (videoId: string | null) => void;
  stopAllVideos: () => void;
}

const TestimonialVideoContext = createContext<TestimonialVideoContextType | undefined>(undefined);

export const useTestimonialVideo = () => {
  const context = useContext(TestimonialVideoContext);
  if (!context) {
    throw new Error('useTestimonialVideo must be used within a TestimonialVideoProvider');
  }
  return context;
};

interface TestimonialVideoProviderProps {
  children: React.ReactNode;
}

export const TestimonialVideoProvider = ({ children }: TestimonialVideoProviderProps) => {
  const [currentPlayingVideo, setCurrentPlayingVideoState] = useState<string | null>(null);

  const setCurrentPlayingVideo = useCallback((videoId: string | null) => {
    console.log('🎬 שינוי וידאו נוכחי:', videoId);
    setCurrentPlayingVideoState(videoId);
  }, []);

  const stopAllVideos = useCallback(() => {
    console.log('⏹️ עצירת כל הסרטונים');
    setCurrentPlayingVideoState(null);
    
    // עצירת כל הסרטונים בדף
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
      if (!video.paused) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, []);

  return (
    <TestimonialVideoContext.Provider value={{
      currentPlayingVideo,
      setCurrentPlayingVideo,
      stopAllVideos
    }}>
      {children}
    </TestimonialVideoContext.Provider>
  );
};

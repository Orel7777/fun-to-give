'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { storage } from '../lib/firebase.config';
import { ref, getDownloadURL } from 'firebase/storage';

interface VideoState {
  videoUrl: string;
  loading: boolean;
  error: string | null;
  isReady: boolean;
}

interface VideoContextType {
  mainVideo: VideoState;
  preloadVideo: (videoPath: string) => Promise<void>;
}

const VideoContext = createContext<VideoContextType | undefined>(undefined);

export const useVideo = () => {
  const context = useContext(VideoContext);
  if (!context) {
    throw new Error('useVideo must be used within a VideoProvider');
  }
  return context;
};

interface VideoProviderProps {
  children: React.ReactNode;
}

export const VideoProvider = ({ children }: VideoProviderProps) => {
  const [mainVideo, setMainVideo] = useState<VideoState>({
    videoUrl: '',
    loading: false,
    error: null,
    isReady: false,
  });
  const loadingVideoRef = React.useRef<string | null>(null);

  const preloadVideo = useCallback(async (videoPath: string) => {
    // מניעת טעינה כפולה
    if (loadingVideoRef.current === videoPath || mainVideo.isReady) {
      console.log('⚠️ וידאו כבר נטען או בתהליך טעינה:', videoPath);
      return;
    }
    
    try {
      loadingVideoRef.current = videoPath;
      setMainVideo(prev => ({ ...prev, loading: true, error: null }));
      console.log('🎬 מתחיל טעינה מוקדמת של וידאו:', videoPath);
      
      const videoRef = ref(storage, videoPath);
      const url = await getDownloadURL(videoRef);
      
      // יצירת אלמנט וידאו לטעינה מוקדמת
      const video = document.createElement('video');
      video.preload = 'metadata';
      video.src = url;
      
      // המתנה לטעינת מטאדטה
      await new Promise((resolve, reject) => {
        video.onloadedmetadata = () => {
          console.log('✅ וידאו נטען בהצלחה מראש:', url);
          resolve(undefined);
        };
        video.onerror = () => {
          reject(new Error('שגיאה בטעינת הוידאו'));
        };
        
        // timeout למקרה שהטעינה נתקעת
        setTimeout(() => {
          reject(new Error('זמן הטעינה פג'));
        }, 10000);
      });
      
      setMainVideo({
        videoUrl: url,
        loading: false,
        error: null,
        isReady: true,
      });
      loadingVideoRef.current = null;
      
    } catch (err) {
      console.error('Error preloading video:', err);
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה';
      setMainVideo({
        videoUrl: '',
        loading: false,
        error: `לא ניתן לטעון וידאו מ-Firebase Storage: ${errorMessage}`,
        isReady: false,
      });
      loadingVideoRef.current = null;
    }
  }, [mainVideo.isReady]); // תלוי רק ב-isReady כדי למנוע טעינה כפולה

  return (
    <VideoContext.Provider value={{ mainVideo, preloadVideo }}>
      {children}
    </VideoContext.Provider>
  );
};
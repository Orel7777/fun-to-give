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

interface VideoItemState extends VideoState {
  path: string;
}

type VideosMap = Record<string, VideoItemState>;

interface VideoContextType {
  mainVideo: VideoState;
  preloadVideo: (videoPath: string) => Promise<void>;
  // New aggregate APIs
  videos: VideosMap;
  preloadVideos: (videoPaths: string[], onProgress?: (progress: number) => void) => Promise<void>;
  overallProgress: number; // 0..1 based on count of completed items
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

  // New: track multiple videos and aggregate progress
  const [videos, setVideos] = useState<VideosMap>({});
  const [overallProgress, setOverallProgress] = useState(0);

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

      // הורדה מלאה מראש כדי למנוע תקיעות
      const resp = await fetch(url);
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);

      // יצירת אלמנט וידאו לטעינה מוקדמת מה-blob המלא
      const video = document.createElement('video');
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      video.preload = 'auto';
      video.muted = true; // הגדרת muted למניעת בעיות autoplay
      if (isMobile) {
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
      }
      video.src = objectUrl;
      
      // המתנה לטעינה מלאה של הוידאו
      await new Promise((resolve, reject) => {
        let hasResolved = false;
        
        const resolveOnce = () => {
          if (!hasResolved) {
            hasResolved = true;
            console.log('✅ וידאו נטען בהצלחה מראש:', url);
            resolve(undefined);
          }
        };
        
        const rejectOnce = (error: Error) => {
          if (!hasResolved) {
            hasResolved = true;
            reject(error);
          }
        };
        
        // המתנה לטעינת מטאדטה
        video.onloadedmetadata = () => {
          console.log('📊 מטאדטה של הוידאו נטענה');
        };
        
        // המתנה לטעינת נתונים
        video.onloadeddata = () => {
          console.log('📦 נתוני הוידאו נטענו');
        };
        
        // המתנה לטעינה מלאה
        video.oncanplaythrough = () => {
          console.log('🎬 הוידאו מוכן לנגינה מלאה');
          safeResolveOnce();
        };
        
        // המתנה לטעינה מלאה (גיבוי)
        video.oncanplay = () => {
          console.log('🎬 הוידאו מוכן לנגינה');
          safeResolveOnce();
        };
        
        video.onerror = () => {
          safeRejectOnce(new Error('שגיאה בטעינת הוידאו'));
        };
        
        // timeout מוארך למקרה שהטעינה נתקעת - נותן זמן רב יותר לטעינה
        let timeoutId: NodeJS.Timeout | null = null;
        
        // פונקציה לניקוי timeout
        const clearVideoTimeout = () => {
          if (timeoutId) {
            clearTimeout(timeoutId);
            timeoutId = null;
          }
        };
        
        // שימוש בפונקציות שמנקות timeout ללא reassignment
        const safeResolveOnce = () => {
          clearVideoTimeout();
          resolveOnce();
        };
        
        const safeRejectOnce = (error: Error) => {
          clearVideoTimeout();
          rejectOnce(error);
        };
        
        // הגדרת timeout אחרי שהפונקציות מוכנות
        timeoutId = setTimeout(() => {
          console.warn('⚠️ טעינת וידאו ארוכה - ממשיך ברקע...');
          // לא נכשיל את הטעינה, רק נדפיס אזהרה
        }, 30000);
      });
      
      setMainVideo({
        videoUrl: objectUrl,
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

  // New: preload a single video into videos map and return its URL
  const preloadSingleIntoMap = useCallback(async (videoPath: string) => {
    try {
      setVideos(prev => ({
        ...prev,
        [videoPath]: {
          path: videoPath,
          videoUrl: prev[videoPath]?.videoUrl || '',
          loading: true,
          error: null,
          isReady: false,
        },
      }));

      const videoRef = ref(storage, videoPath);
      const url = await getDownloadURL(videoRef);

      // הורדה מלאה מראש כדי למנוע תקיעות
      const resp = await fetch(url);
      const blob = await resp.blob();
      const objectUrl = URL.createObjectURL(blob);

      const video = document.createElement('video');
      const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
      video.preload = 'auto';
      video.muted = true;
      if (isMobile) {
        video.setAttribute('playsinline', 'true');
        video.setAttribute('webkit-playsinline', 'true');
      }
      video.src = objectUrl;

      await new Promise<void>((resolve) => {
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          resolve();
        };
        video.oncanplaythrough = finish;
        video.oncanplay = () => {
          finish();
        };
        video.onloadedmetadata = () => {};
        setTimeout(finish, 30000); // safety
      });

      setVideos(prev => ({
        ...prev,
        [videoPath]: {
          path: videoPath,
          videoUrl: objectUrl,
          loading: false,
          error: null,
          isReady: true,
        },
      }));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'שגיאה לא ידועה';
      setVideos(prev => ({
        ...prev,
        [videoPath]: {
          path: videoPath,
          videoUrl: '',
          loading: false,
          error: `לא ניתן לטעון וידאו מ-Firebase Storage: ${errorMessage}`,
          isReady: false,
        },
      }));
    }
  }, []);

  // New: preload multiple videos and update overallProgress (based on count completed)
  const preloadVideos = useCallback(async (videoPaths: string[], onProgress?: (progress: number) => void) => {
    if (!videoPaths || videoPaths.length === 0) {
      setOverallProgress(1);
      onProgress?.(1);
      return;
    }
    // Ensure unique paths
    const unique = Array.from(new Set(videoPaths));
    let completed = 0;
    setOverallProgress(0);
    // Initialize map entries
    setVideos(prev => {
      const next = { ...prev } as VideosMap;
      unique.forEach(p => {
        next[p] = next[p] ?? { path: p, videoUrl: '', loading: true, error: null, isReady: false };
      });
      return next;
    });

    await Promise.all(unique.map(async (p) => {
      // Skip if already ready
      if (videos[p]?.isReady) {
        completed += 1;
        const prog = completed / unique.length;
        setOverallProgress(prog);
        onProgress?.(prog);
        return;
      }
      await preloadSingleIntoMap(p);
      completed += 1;
      const prog = completed / unique.length;
      setOverallProgress(prog);
      onProgress?.(prog);
    }));
  }, [preloadSingleIntoMap, videos]);

  return (
    <VideoContext.Provider value={{ mainVideo, preloadVideo, videos, preloadVideos, overallProgress }}>
      {children}
    </VideoContext.Provider>
  );
};
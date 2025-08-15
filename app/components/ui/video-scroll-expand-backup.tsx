'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useVideo } from '../../contexts/VideoContext';

interface VideoScrollExpandProps {
  videoSrc?: string;
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  usePreloadedVideo?: boolean;
}

const VideoScrollExpand = ({ 
  videoSrc, 
  title, 
  subtitle,
  children,
  usePreloadedVideo = true
}: VideoScrollExpandProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { mainVideo } = useVideo();
  
  // בחירה בין וידאו מוקדם לוידאו רגיל
  const shouldUsePreloaded = usePreloadedVideo && mainVideo.isReady;
  const finalVideoUrl = shouldUsePreloaded ? mainVideo.videoUrl : (videoSrc?.startsWith('/') ? videoSrc : '/Families_tell_stories/1 - כמות הדגים הייתה גדולה ובאיכות מאד טובה.mp4');
  const loading = usePreloadedVideo ? mainVideo.loading : false;
  const error = usePreloadedVideo ? mainVideo.error : null;

  // ✅ תיקון: זיהוי מובייל בטוח
  useEffect(() => {
    setIsClient(true);
    
    const checkIfMobile = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth <= 640);
      }
    };
    
    checkIfMobile();
    
    const handleResize = () => {
      checkIfMobile();
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ✅ תיקון: scroll handler מיוחד עם cleanup
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    let progress = 0;
    
    if (rect.top <= windowHeight && rect.bottom >= 0) {
      const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
      progress = Math.min(visibleHeight / (windowHeight * 0.4), 1);
    }
    
    setScrollProgress(progress);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // קריאה ראשונית
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll, isClient]);

  // חישוב גודל הוידאו
  const baseScale = isMobile ? 0.8 : 0.3;
  const videoScale = baseScale + (scrollProgress * (1 - baseScale)); 
  const videoOpacity = 0.85 + (scrollProgress * 0.15);

  // ✅ תיקון: פונקציית ניגון מפושטת עם טיפול טוב יותר בשגיאות
  const togglePlay = useCallback(async () => {
    console.log('🎬 togglePlay - isMobile:', isMobile, 'isPlaying:', isPlaying);
    
    if (!videoRef.current || !finalVideoUrl) {
      console.log('❌ אין וידאו או URL');
      return;
    }
    
    try {
      const video = videoRef.current;
      
      if (isPlaying) {
        console.log('⏸️ עוצר וידאו');
        video.pause();
        setIsPlaying(false);
      } else {
        console.log('▶️ מתחיל וידאו');
        
        // ✅ הגדרות בטוחות למובייל
        if (isMobile) {
          video.muted = true;
          video.playsInline = true;
          // ✅ תיקון: הגדרת attributes נכונה
          video.setAttribute('playsinline', 'true');
          video.setAttribute('webkit-playsinline', 'true');
        }
        
        await video.play();
        setIsPlaying(true);
        console.log('✅ וידאו מתנגן');
      }
    } catch (error) {
      console.error('❌ שגיאה:', error);
      
      // ניסיון עם muted כ-fallback
      try {
        if (videoRef.current) {
          videoRef.current.muted = true;
          await videoRef.current.play();
          setIsPlaying(true);
          console.log('✅ עובד עם muted');
        }
      } catch (fallbackError) {
        console.error('💥 נכשל לגמרי:', fallbackError);
      }
    }
  }, [isMobile, isPlaying, finalVideoUrl]);

  // ✅ תיקון: טיפול בוידאו עם cleanup נכון
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !finalVideoUrl) return;

    const handleCanPlay = () => {
      console.log('וידאו מוכן לניגון');
      if (video.currentTime !== 0) {
        video.currentTime = 0;
      }
    };
    
    const handlePlay = () => {
      console.log('וידאו התחיל לנגן');
      setIsPlaying(true);
    };
    
    const handlePause = () => {
      console.log('וידאו הושהה');
      setIsPlaying(false);
    };
    
    const handleError = (e: Event) => {
      console.error('שגיאה בוידאו:', e);
    };

    // ✅ הוספת event listeners
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('error', handleError);
    
    // ✅ הגדרות בטוחות למובייל
    if (isMobile) {
      video.playsInline = true;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      video.muted = true;
    }
    
    return () => {
      // ✅ cleanup נכון
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('error', handleError);
    };
  }, [finalVideoUrl, isMobile]);

  // הצגת כפתורי בקרה
  useEffect(() => {
    if (isPlaying && !isHovering && !isMobile) {
      setShowControls(false);
    } else {
      setShowControls(true);
    }
  }, [isPlaying, isHovering, isMobile]);

  // ✅ אם לא client-side עדיין, לא מציגים כלום
  if (!isClient) {
    return <div className="min-h-screen bg-[#fdf6ed]" />;
  }

  return (
    <div 
      ref={containerRef}
      className="relative mt-[-300px] sm:mt-[-70px] min-h-[90vh] sm:min-h-[100vh] overflow-x-hidden"
    >
      {/* סקציית הוידאו */}
      <div className="flex overflow-hidden sticky top-0 justify-center items-center h-[80vh] sm:h-screen">
        <div className="text-center">
          {/* כותרות */}
          <motion.div
            className="mb-2 sm:mb-4 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1 - scrollProgress * 0.5, y: -scrollProgress * 50 }}
            transition={{ duration: 0.1 }}
          >
            {title && (
              <motion.h2 
                className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#2a2b26] font-staff mb-2 sm:mb-4"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                  textShadow: scrollProgress > 0.3 ? "0 0 20px rgba(245, 163, 131, 0.5)" : "none"
                }}
                transition={{ 
                  duration: 0.8, 
                  ease: "easeOut",
                  delay: 0.2
                }}
              >
                {title}
              </motion.h2>
            )}
            {subtitle && (
              <motion.p 
                className="text-base sm:text-lg md:text-xl lg:text-2xl text-[#2a2b26]/80 font-staff"
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  color: scrollProgress > 0.5 ? "rgba(42, 43, 38, 0.9)" : "rgba(42, 43, 38, 0.8)"
                }}
                transition={{ 
                  duration: 0.6, 
                  ease: "easeOut",
                  delay: 0.4
                }}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>

          {/* הוידאו */}
          <motion.div
            className="overflow-hidden relative mx-auto rounded-2xl shadow-2xl cursor-pointer"
            style={{
              width: isMobile 
                ? `${Math.max(videoScale * 90, 85)}vw`
                : `${videoScale * 80}vw`,
              height: isMobile 
                ? `${Math.max(videoScale * 50, 48)}vw`
                : `${videoScale * 45}vw`,
              maxWidth: isMobile ? '95vw' : '1200px',
              maxHeight: isMobile ? '53vw' : '675px',
              minWidth: isMobile ? '320px' : '300px',
              minHeight: isMobile ? '180px' : '169px',
            }}
            animate={{
              scale: videoScale,
              opacity: videoOpacity,
            }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onMouseEnter={() => !isMobile && setIsHovering(true)}
            onMouseLeave={() => !isMobile && setIsHovering(false)}
            onClick={togglePlay}
            // ✅ תיקון: touch events פשוטים יותר
            onTouchEnd={(e) => {
              if (isMobile) {
                e.preventDefault();
                togglePlay();
              }
            }}
          >
            {loading ? (
              <div className="flex justify-center items-center w-full h-full bg-gray-200">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2b26] mx-auto"></div>
                </div>
              </div>
            ) : error ? (
              <div className="flex justify-center items-center w-full h-full bg-red-100">
                <div className="text-center">
                  <p className="mb-2 text-red-600 font-staff">שגיאה בטעינת הוידאו</p>
                  <p className="text-sm text-red-500 font-staff">{error}</p>
                </div>
              </div>
            ) : finalVideoUrl ? (
              <div className="relative w-full h-full">
                {/* רקע למובייל */}
                {isMobile && !isPlaying && (
                  <div 
                    className="absolute inset-0 flex justify-center items-center bg-center bg-cover"
                    style={{
                      backgroundImage: 'url(/tumbil.png)',
                      backgroundColor: '#f5a383'
                    }}
                  >
                    <div className="flex justify-center items-center w-full h-full bg-black/30">
                      <div className="p-6 rounded-full shadow-2xl backdrop-blur-sm cursor-pointer bg-white/95">
                        <Play size={60} className="text-[#2a2b26] ml-2" />
                      </div>
                    </div>
                  </div>
                )}
                
                {/* וידאו */}
                <video
                  ref={videoRef}
                  src={finalVideoUrl}
                  loop
                  playsInline
                  muted={isMobile}
                  preload="metadata"
                  controls={false}
                  disablePictureInPicture
                  className={`object-cover w-full h-full ${
                    isMobile && !isPlaying ? 'opacity-0' : 'opacity-100'
                  }`}
                  style={{
                    transition: 'opacity 0.3s ease'
                  }}
                />
                
                {/* כפתור play במרכז */}
                <AnimatePresence>
                  {showControls && !isPlaying && (
                    <motion.div
                      className="absolute inset-0 flex justify-center items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <motion.div
                        className={`rounded-full shadow-2xl backdrop-blur-sm bg-white/90 cursor-pointer ${
                          isMobile ? 'p-8' : 'p-6'
                        }`}
                        whileHover={{ scale: isMobile ? 1 : 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          togglePlay();
                        }}
                      >
                        <Play size={isMobile ? 56 : 48} className="text-[#2a2b26] ml-2" />
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-gray-300">
                <p className="text-[#2a2b26] font-staff">אין וידאו זמין</p>
              </div>
            )}

            {/* אוברליי */}
            <div 
              className="absolute inset-0 pointer-events-none bg-black/20"
              style={{ opacity: 1 - scrollProgress * 0.5 }}
            />
          </motion.div>
        </div>
      </div>

      {/* תוכן נוסף */}
      <motion.div
        className="relative z-10 bg-[#fdf6ed] min-h-[90vh] sm:min-h-screen py-8 sm:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: scrollProgress > 0.7 ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default VideoScrollExpand;
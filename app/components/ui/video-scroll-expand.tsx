'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause } from 'lucide-react';
import { useVideo } from '../../contexts/VideoContext';

interface VideoScrollExpandProps {
  videoSrc?: string; // אופציונלי - אם לא מועבר ישתמש בוידאו מהקונטקסט
  title?: string;
  subtitle?: string;
  children?: React.ReactNode;
  usePreloadedVideo?: boolean; // האם להשתמש בוידאו הטעון מראש
}

const VideoScrollExpand = ({ 
  videoSrc, 
  title = "צפה בוידאו", 
  subtitle,
  children,
  usePreloadedVideo = true
}: VideoScrollExpandProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { mainVideo } = useVideo();
  
  // בחירה בין וידאו מוקדם לוידאו רגיל
  const shouldUsePreloaded = usePreloadedVideo && mainVideo.isReady;
  const finalVideoUrl = shouldUsePreloaded ? mainVideo.videoUrl : (videoSrc?.startsWith('/') ? videoSrc : '');
  const loading = usePreloadedVideo ? mainVideo.loading : false;
  const error = usePreloadedVideo ? mainVideo.error : null;

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // חישוב התקדמות הגלילה
      let progress = 0;
      
      if (rect.top <= windowHeight && rect.bottom >= 0) {
        // כאשר הקומפוננטה נראית על המסך
        const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
        progress = Math.min(visibleHeight / (windowHeight * 0.8), 1);
      }
      
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // קריאה ראשונית
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // חישוב גודל הוידאו בהתאם לגלילה
  const videoScale = 0.3 + (scrollProgress * 0.7); // מתחיל ב-30% ומגיע ל-100%
  const videoOpacity = 0.7 + (scrollProgress * 0.3); // מתחיל ב-70% ומגיע ל-100%

  // פונקציות לניהול הוידאו
  const togglePlay = () => {
    if (videoRef.current) {
              if (isPlaying) {
          videoRef.current.pause();
        } else {
          videoRef.current.muted = false; // Unmute when playing
          videoRef.current.play();
        }
        setIsPlaying(!isPlaying);
    }
  };

  // הצגת כפתורי בקרה כשמרחפים או כשהוידאו מושהה
  useEffect(() => {
    if (isPlaying && !isHovering) {
      // אם מנגן ולא מרחפים, הסתר מיד
      setShowControls(false);
    } else {
      // אם מושהה או מרחפים, הצג את הכפתורים
      setShowControls(true);
    }
  }, [isPlaying, isHovering]);

  return (
    <div 
      ref={containerRef}
      className="relative min-h-[200vh] bg-gradient-to-b from-[#fdf6ed] via-[#f5a383] to-[#9acdbe]"
    >
      {/* סקציית הוידאו הראשונה */}
      <div className="flex overflow-hidden sticky top-0 justify-center items-center h-screen">
        <div className="text-center">
                     {/* כותרות */}
           <motion.div
             className="mb-8"
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1 - scrollProgress * 0.5, y: -scrollProgress * 50 }}
             transition={{ duration: 0.1 }}
           >
             <motion.h2 
               className="text-4xl md:text-6xl font-bold text-[#2a2b26] font-staff mb-4"
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
               whileHover={{ 
                 scale: 1.05,
                 textShadow: "0 0 30px rgba(245, 163, 131, 0.8)"
               }}
             >
               {title}
             </motion.h2>
                           {subtitle && (
                <motion.p 
                  className="text-xl md:text-2xl text-[#2a2b26]/80 font-staff"
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
                  whileHover={{ 
                    color: "rgba(42, 43, 38, 1)",
                    x: 5
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
              width: `${videoScale * 80}vw`,
              height: `${videoScale * 45}vw`,
              maxWidth: '1200px',
              maxHeight: '675px',
              minWidth: '300px',
              minHeight: '169px',
            }}
            animate={{
              scale: videoScale,
              opacity: videoOpacity,
            }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onClick={togglePlay}
          >
            {loading ? (
              <div className="flex justify-center items-center w-full h-full bg-gray-200">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2a2b26] mx-auto mb-4"></div>
                  <p className="text-[#2a2b26] font-staff">טוען וידאו...</p>
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
              <video
                ref={videoRef}
                src={finalVideoUrl}
                loop
                playsInline
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="flex justify-center items-center w-full h-full bg-gray-300">
                <p className="text-[#2a2b26] font-staff">אין וידאו זמין</p>
              </div>
            )}

            {/* כפתור Play/Pause במרכז */}
            <AnimatePresence>
              {showControls && (
                <motion.div
                  className="flex absolute inset-0 justify-center items-center"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ 
                    opacity: 1, 
                    x: isPlaying ? 200 : 0 // זז ימינה כשלוחצים play
                  }}
                  exit={{ 
                    opacity: 0, 
                    x: 200, // יוצא ימינה
                    scale: 0.8 
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div
                    className="p-6 rounded-full shadow-2xl backdrop-blur-sm bg-white/90"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ 
                      scale: isPlaying ? 0.6 : 1, 
                      opacity: isPlaying ? 0 : 1 
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 400, 
                      damping: 25 
                    }}
                  >
                    {isPlaying ? (
                      <Pause size={48} className="text-[#2a2b26] ml-1" />
                    ) : (
                      <Play size={48} className="text-[#2a2b26] ml-2" />
                    )}
                  </motion.div>

                  {/* טקסט "PLAY VIDEO" */}
                  {!isPlaying && (
                    <motion.div
                      className="absolute bottom-[-80px] flex items-center gap-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        x: isPlaying ? 200 : 0 // זז ימינה עם הכפתור
                      }}
                      exit={{ 
                        opacity: 0, 
                        y: 20,
                        x: 200 
                      }}
                      transition={{ 
                        delay: 0.2,
                        duration: 0.5,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="px-6 py-3 rounded-full shadow-lg backdrop-blur-sm bg-white/90">
                        <span className="text-[#2a2b26] font-bold text-lg font-staff tracking-wider">
                          PLAY VIDEO
                        </span>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* אוברליי עם גרדיאנט */}
            <div 
              className="absolute inset-0 pointer-events-none bg-black/20"
              style={{ opacity: 1 - scrollProgress * 0.5 }}
            />
          </motion.div>

          {/* אינדיקטור גלילה */}
          <motion.div
            className="mt-8"
            animate={{ opacity: 1 - scrollProgress }}
            transition={{ duration: 0.1 }}
          >
            <div className="flex flex-col items-center space-y-2 text-[#2a2b26]/70">
              <span className="text-sm font-medium font-staff">גלול למטה</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="animate-bounce"
              >
                <path 
                  d="M12 5V19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                <path 
                  d="M7 14L12 19L17 14" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </motion.div>
        </div>
      </div>

      {/* תוכן נוסף */}
      <motion.div
        className="relative z-10 bg-[#fdf6ed] min-h-screen py-20"
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
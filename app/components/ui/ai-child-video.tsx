'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play } from 'lucide-react';
import { useFirebaseVideo } from '../../hooks/useFirebaseVideo';

interface AiChildVideoProps {
  className?: string;
}

const AiChildVideo = ({ className = '' }: AiChildVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showThumbnail, setShowThumbnail] = useState(true);
  const [isToggling, setIsToggling] = useState(false);
  const [showVideoLoading, setShowVideoLoading] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(containerRef, { once: true, margin: '0px 0px -20% 0px' });

  const { videoUrl, loading: firebaseLoading, error } = useFirebaseVideo('aiChild.mp4', { enabled: inView });

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const handleLoadedData = () => {
      setIsVideoLoaded(true);
      setShowThumbnail(true);
    };

    const handlePause = () => {
      if (!isToggling) {
        setIsPlaying(false);
        setShowThumbnail(true);
      }
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setShowThumbnail(true);
      setIsToggling(false);
    };

    const handleError = (e: Event) => {
      console.error('❌ שגיאה בוידאו aiChild:', e);
      setIsToggling(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
    };
  }, [videoUrl, isToggling]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || isToggling) return;

    setIsToggling(true);

    try {
      if (isPlaying) {
        await video.pause();
        setIsPlaying(false);
        setShowThumbnail(true);
        setShowVideoLoading(false);
      } else {
        setShowThumbnail(false);
        
        // אם אין videoUrl עדיין, נראה טעינה בתוך הווידאו
        if (!videoUrl) {
          setShowVideoLoading(true);
          // ממתינים ל-videoUrl להיטען
          const waitForVideo = setInterval(() => {
            if (videoUrl && video.src) {
              clearInterval(waitForVideo);
              // כשהווידאו מוכן, ננסה לנגן
              video.play().then(() => {
                setIsPlaying(true);
                setShowVideoLoading(false);
              }).catch((err) => {
                console.error('שגיאה בניגון:', err);
                setShowVideoLoading(false);
                setShowThumbnail(true);
                setIsToggling(false);
              });
            }
          }, 100);
          
          // timeout אחרי 10 שניות
          setTimeout(() => {
            clearInterval(waitForVideo);
            if (!videoUrl) {
              setShowVideoLoading(false);
              setShowThumbnail(true);
              setIsToggling(false);
            }
          }, 10000);
          return;
        }
        
        // אם יש videoUrl, נמשיך כרגיל
        setShowVideoLoading(true);
        
        // במובייל נחכה ל-canplay אם הוידאו עדיין לא מוכן
        if (typeof window !== 'undefined' && window.innerWidth <= 768) {
          if (video.readyState < 3) {
            await new Promise((resolve) => {
              const onCanPlay = () => {
                video.removeEventListener('canplay', onCanPlay);
                resolve(void 0);
              };
              video.addEventListener('canplay', onCanPlay);
              setTimeout(() => {
                video.removeEventListener('canplay', onCanPlay);
                resolve(void 0);
              }, 3000);
            });
          }
        }
        
        await video.play();
        setIsPlaying(true);
        setShowVideoLoading(false);
      }
    } catch (error) {
      console.error('שגיאה בניגון וידאו aiChild:', error);
      setShowThumbnail(true);
      setIsPlaying(false);
      setShowVideoLoading(false);
    } finally {
      setTimeout(() => {
        setIsToggling(false);
      }, 100);
    }
  };

  if (error) {
    return (
      <div className={`flex relative justify-center items-center bg-gray-200 rounded-lg aspect-video ${className}`}>
        <div className="p-4 text-center">
          <p className="text-sm text-red-500">שגיאה בטעינת הוידאו</p>
          <p className="mt-1 text-xs text-gray-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-hidden relative mx-auto bg-gray-900 rounded-lg shadow-lg max-w-[400px] aspect-[9/16] ${className}`}>
      {/* וידאו */}
      {videoUrl && (
        <video
          ref={videoRef}
          className="object-cover w-full h-full"
          preload={typeof window !== 'undefined' && window.innerWidth <= 768 ? "auto" : "metadata"}
          playsInline
          muted={false}
          controls={false}
        >
          <source src={videoUrl} type="video/mp4" />
          הדפדפן שלך לא תומך בתגית video.
        </video>
      )}

      {/* טעינה */}
      {firebaseLoading && (
        <div className="flex absolute inset-0 justify-center items-center bg-black/50">
          <div className="flex flex-col gap-2 items-center">
            <div className="w-8 h-8 rounded-full border-2 animate-spin border-white/30 border-t-white"></div>
            <p className="text-sm text-white font-staff">טוען וידאו...</p>
          </div>
        </div>
      )}

      {/* Thumbnail וכפתור Play */}
      {showThumbnail && !firebaseLoading && (
        <motion.button
          onClick={togglePlay}
          disabled={false}
          className={`flex absolute inset-0 justify-center items-center transition-all duration-200 bg-black/30 hover:bg-black/40 ${
            isToggling ? 'cursor-wait' : 'cursor-pointer'
          }`}
          whileHover={!isToggling ? { scale: 1.02 } : {}}
          whileTap={!isToggling ? { scale: 0.98 } : {}}
        >
          <div className={`p-6 rounded-full shadow-lg transition-all duration-200 bg-white/90 hover:bg-white ${
            isToggling ? 'opacity-50' : ''}`}>
            <Play size={40} className="ml-1 text-gray-800" />
          </div>
        </motion.button>
      )}

      {/* אוברליי טעינה בתוך הווידאו */}
      {showVideoLoading && (
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
          <div className="flex flex-col items-center gap-3">
            <div className="w-12 h-12 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
            <p className="text-white text-sm font-staff">טוען וידאו...</p>
          </div>
        </div>
      )}

      {/* אזור עצירה */}
      {isPlaying && !isToggling && (
        <div onClick={togglePlay} className="absolute inset-0 cursor-pointer" />
      )}
    </div>
  );
};

export default AiChildVideo;

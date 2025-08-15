'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
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
  const videoRef = useRef<HTMLVideoElement>(null);

  const { videoUrl, loading: firebaseLoading, error } = useFirebaseVideo('aiChild.mp4');

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    // כאשר ה-URL מתעדכן (blob מוכן), נכריח רענון של הנגן
    try {
      video.load();
    } catch {}

    let fallbackTimer: number | undefined;

    const handleLoadedData = () => {
      // נעדיף canplaythrough, אך נייצר פועל יוצא לאחר השהיה כדי לא להיתקע
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      fallbackTimer = window.setTimeout(() => {
        setIsVideoLoaded(true);
        setShowThumbnail(true);
      }, 1500);
    };

    const handleCanPlayThrough = () => {
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
    video.addEventListener('canplaythrough', handleCanPlayThrough);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('canplaythrough', handleCanPlayThrough);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
    };
  }, [videoUrl, isToggling]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || !videoUrl || isToggling) return;

    setIsToggling(true);

    try {
      if (isPlaying) {
        await video.pause();
        setIsPlaying(false);
        setShowThumbnail(true);
      } else {
        setShowThumbnail(false);
        await video.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('שגיאה בניגון וידאו aiChild:', error);
      setShowThumbnail(true);
      setIsPlaying(false);
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
    <div className={`overflow-hidden relative mx-auto bg-gray-900 rounded-lg shadow-lg max-w-[400px] aspect-[9/16] ${className}`}>
      {/* וידאו */}
      {videoUrl && (
        <video
          ref={videoRef}
          className="object-cover w-full h-full"
          preload="auto"
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
          </div>
        </div>
      )}

      {/* Thumbnail וכפתור Play */}
      {showThumbnail && isVideoLoaded && !firebaseLoading && (
        <motion.button
          onClick={togglePlay}
          disabled={isToggling}
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

      {/* אזור עצירה */}
      {isPlaying && !isToggling && (
        <div onClick={togglePlay} className="absolute inset-0 cursor-pointer" />
      )}
    </div>
  );
};

export default AiChildVideo;

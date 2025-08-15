'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useFirebaseVideo } from '../../hooks/useFirebaseVideo';
import { useTestimonialVideo } from '../../contexts/TestimonialVideoContext';

interface TestimonialVideoProps {
  videoPath: string;
  title?: string;
  className?: string;
  videoId: string;
}

const TestimonialVideo = ({ videoPath, title, className = '', videoId }: TestimonialVideoProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isStarting, setIsStarting] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const startGuardRef = useRef(false);
  const userWantsPlayRef = useRef(false);
  const userPausedRef = useRef(false);
  const resumeScheduledRef = useRef<null | (() => void)>(null);
  
  const { videoUrl, loading: firebaseLoading, error } = useFirebaseVideo(videoPath);
  const { currentPlayingVideo, setCurrentPlayingVideo } = useTestimonialVideo();

  // טיפול בטעינת הוידאו
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    const handleLoadedData = () => {
      console.log('📹 וידאו נטען:', videoPath);
      setIsVideoLoaded(true);
    };

    const handlePlay = () => {
      console.log('▶️ וידאו התחיל אירוע play (ייתכן לפני PLAYING):', videoPath);
    };

    const handlePlaying = () => {
      console.log('✅ אירוע playing - ניגון בפועל התחיל:', videoPath);
      setIsPlaying(true);
      setCurrentPlayingVideo(videoId);
    };

    const handlePause = () => {
      // בזמן התחלת ניגון, דפדפנים עלולים להנפיק pause רגעי - מתעלמים מכך
      if (startGuardRef.current) return;
      console.log('⏹️ וידאו נעצר:', videoPath);
      setIsPlaying(false);
      // אם המשתמש עדיין רוצה לנגן (לא לחץ pause), ננסה לחדש ברגע שאפשר
      if (userWantsPlayRef.current && !userPausedRef.current) {
        const v = videoRef.current;
        if (v && v.readyState < 3) {
          const tryResume = () => {
            if (!userWantsPlayRef.current || userPausedRef.current) return;
            v.play().catch(() => {/* נתעלם */});
          };
          resumeScheduledRef.current = tryResume;
          const onCanPlay = () => {
            v.removeEventListener('canplay', onCanPlay);
            resumeScheduledRef.current?.();
            resumeScheduledRef.current = null;
          };
          v.addEventListener('canplay', onCanPlay);
        }
      }
      if (currentPlayingVideo === videoId) {
        setCurrentPlayingVideo(null);
      }
    };

    const handleEnded = () => {
      console.log('🔚 וידאו הסתיים:', videoPath);
      setIsPlaying(false);
      if (currentPlayingVideo === videoId) {
        setCurrentPlayingVideo(null);
      }
    };

    const handleError = (e: Event) => {
      console.error('❌ שגיאה בוידאו:', videoPath, e);
    };

    const handleWaiting = () => {
      console.log('⏳ וידאו ממתין לטעינה:', videoPath);
      // אם המשתמש רצה לנגן ונוצר buffering, ננסה לחדש כשניתן
      if (userWantsPlayRef.current && !userPausedRef.current) {
        const v = videoRef.current;
        if (v) {
          const onCanPlay = () => {
            v.removeEventListener('canplay', onCanPlay);
            if (userWantsPlayRef.current && !userPausedRef.current) {
              v.play().catch(() => {/* מתעלמים משגיאות קטנות */});
            }
          };
          v.addEventListener('canplay', onCanPlay);
        }
      }
    };

    const handleCanPlay = () => {
      console.log('✅ וידאו מוכן לניגון:', videoPath);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('play', handlePlay);
    video.addEventListener('playing', handlePlaying);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    video.addEventListener('waiting', handleWaiting);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('playing', handlePlaying);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      video.removeEventListener('waiting', handleWaiting);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoUrl, videoPath, videoId, currentPlayingVideo, setCurrentPlayingVideo]);

  // השהיית סרטון אחר אם מתחיל סרטון חדש
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (currentPlayingVideo && currentPlayingVideo !== videoId && isPlaying) {
      // השהה את הסרטון הזה אם סרטון אחר מתחיל (לא מאפס את המיקום)
      video.pause();
      setIsPlaying(false);
    }
  }, [currentPlayingVideo, videoId, isPlaying]);

  const togglePlay = async () => {
    const video = videoRef.current;
    if (!video || !videoUrl) return;

    try {
      if (isPlaying) {
        // השהה - עצור במקום הנוכחי (לא חזור להתחלה)
        video.pause();
        setIsPlaying(false);
        setCurrentPlayingVideo(null);
      } else {
        // הימנע מקריאות כפולות לניגון שעלולות ליצור AbortError
        if (startGuardRef.current) {
          return;
        }
        startGuardRef.current = true;
        setIsStarting(true);
        userWantsPlayRef.current = true;
        userPausedRef.current = false;
        
        // במובייל - המתן לטעינה לפני ניגון
        if (window.innerWidth <= 768) {
          if (video.readyState < 3) {
            console.log('📱 מובייל: ממתין לטעינת וידאו...');
            await new Promise((resolve) => {
              const onCanPlay = () => {
                video.removeEventListener('canplay', onCanPlay);
                resolve(void 0);
              };
              video.addEventListener('canplay', onCanPlay);
              
              // timeout למקרה שהוידאו לא נטען
              setTimeout(() => {
                video.removeEventListener('canplay', onCanPlay);
                resolve(void 0);
              }, 3000);
            });
          }
        }
        
        try {
          await video.play();
        } catch (err: unknown) {
          // טיפול בטוח בשגיאת AbortError
          if (err instanceof DOMException && err.name === 'AbortError') {
            console.warn('play() נקטע עקב pause() - מתעלם באופן בטוח');
          } else {
            throw err;
          }
        }
      }
    } catch (error) {
      console.error('שגיאה בניגון וידאו:', error);
      setCurrentPlayingVideo(null);
      setIsPlaying(false);
    }
    finally {
      setIsStarting(false);
      startGuardRef.current = false;
      // אם הניסיון התחיל אבל play לא רץ בפועל, נשאיר userWantsPlayRef על true כדי שמאזינים יחודשו
    }
  };

  if (error) {
    return (
      <div className={`relative aspect-video bg-gray-200 rounded-lg flex items-center justify-center ${className}`}>
        <div className="text-center p-4">
          <p className="text-red-500 text-sm">שגיאה בטעינת הוידאו</p>
          <p className="text-gray-500 text-xs mt-1">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative aspect-video bg-gray-900 rounded-lg overflow-hidden shadow-lg ${className}`}>
      {/* וידאו */}
      {videoUrl && (
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          preload={window.innerWidth <= 768 ? "auto" : "metadata"}
          playsInline
          muted={false}
          controls={false}
          onClick={isPlaying ? togglePlay : undefined}
        >
          <source src={videoUrl} type="video/mp4" />
          הדפדפן שלך לא תומך בתגית video.
        </video>
      )}

      {/* אוברליי טעינה - רק בטעינה ראשונית */}
      {firebaseLoading && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        </div>
      )}

      {/* כפתור play/stop - מוסתר כשהוידאו מתנגן */}
      {isVideoLoaded && !firebaseLoading && !isPlaying && (
        <motion.button
          onClick={togglePlay}
          className={`absolute inset-0 flex items-center justify-center bg-black/30 hover:bg-black/40 transition-all duration-200 ${isStarting ? 'pointer-events-none opacity-90' : ''}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={isStarting}
        >
          <div className="bg-white/90 hover:bg-white rounded-full p-4 shadow-lg transition-all duration-200">
            <Play size={32} className="text-gray-800 ml-1" />
          </div>
        </motion.button>
      )}
      
      {/* עצרנו שימוש באוברליי לחיצה בזמן ניגון כדי למנוע פאוזה מיידית לאחר התחלה */}

      {/* כותרת אם קיימת */}
      {title && !isPlaying && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white font-staff text-sm">{title}</p>
        </div>
      )}
    </div>
  );
};

export default TestimonialVideo;

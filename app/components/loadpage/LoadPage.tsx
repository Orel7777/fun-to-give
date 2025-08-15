"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useVideo } from '../../contexts/VideoContext';
import { firebaseVideoKeys } from '../../lib/videoManifest';

interface LoadPageProps {
  onLoadComplete?: () => void;
  duration?: number;
  videoPath?: string;
}

export default function LoadPage({ 
  onLoadComplete, 
  duration = 4000, // הגדלתי את הזמן כדי לוודא טעינה מלאה
  videoPath = 'כיף לתת מקוצר.mp4' 
}: LoadPageProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);
  
  // רפרנסים לאלמנטים
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoBgRef = useRef<HTMLDivElement>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);

  const { preloadVideo, mainVideo } = useVideo();

  // טעינת הווידאו עם מעקב אחר ההתקדמות
  useEffect(() => {
    const loadVideoWithProgress = async () => {
      try {
        console.log('🎬 מתחיל לטעון וידאו:', videoPath);
        
        // התחל את תהליך הטעינה מהקונטקסט
        preloadVideo(videoPath);
        
        // יצירת אלמנט וידאו נסתר לטעינה מלאה
        const video = hiddenVideoRef.current;
        if (video && mainVideo.videoUrl) {
          video.src = mainVideo.videoUrl;
          
          const handleProgress = () => {
            if (video.buffered.length > 0) {
              const bufferedEnd = video.buffered.end(video.buffered.length - 1);
              const duration = video.duration;
              if (duration > 0) {
                const videoLoadPercent = (bufferedEnd / duration) * 100;
                setVideoProgress(Math.min(videoLoadPercent, 100));
                console.log('📊 התקדמות טעינת וידאו:', Math.round(videoLoadPercent) + '%');
              }
            }
          };
          
          const handleCanPlayThrough = () => {
            console.log('✅ וידאו נטען במלואו!');
            setVideoLoaded(true);
            setVideoProgress(100);
          };
          
          const handleError = (e: Event) => {
            console.error('❌ שגיאה בטעינת הוידאו:', e);
            setVideoLoaded(true); // ממשיכים גם במקרה של שגיאה
          };
          
          video.addEventListener('progress', handleProgress);
          video.addEventListener('canplaythrough', handleCanPlayThrough);
          video.addEventListener('error', handleError);
          
          // התחל לטעון
          video.load();
          
          return () => {
            video.removeEventListener('progress', handleProgress);
            video.removeEventListener('canplaythrough', handleCanPlayThrough);
            video.removeEventListener('error', handleError);
          };
        }
      } catch (error) {
        console.error('💥 שגיאה בטעינת הוידאו:', error);
        setVideoLoaded(true); // ממשיכים גם במקרה של שגיאה
      }
    };

    // המתן קצת לפני תחילת הטעינה כדי שה-URL יהיה מוכן
    const timer = setTimeout(loadVideoWithProgress, 500);
    return () => clearTimeout(timer);
  }, [preloadVideo, videoPath, mainVideo.videoUrl]);

  // אנימציות פתיחה
  useEffect(() => {
    gsap.fromTo(preloaderRef.current, 
      { opacity: 0, scale: 1.1 },
      { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(numberRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, delay: 0.2, ease: "power2.out" }
    );

    gsap.fromTo(progressBarRef.current,
      { opacity: 0, scaleX: 0 },
      { opacity: 1, scaleX: 1, duration: 0.8, delay: 0.4, ease: "power2.out" }
    );

    gsap.fromTo(logoRef.current,
      { opacity: 0, y: -50, scale: 0.8 },
      { opacity: 1, y: 0, scale: 1, duration: 0.8, delay: 0.1, ease: "power2.out" }
    );

    gsap.fromTo(logoBgRef.current,
      { opacity: 0, scale: 0.5, rotation: 0 },
      { opacity: 1, scale: 1, rotation: 360, duration: 1, delay: 0.2, ease: "power2.out" }
    );

    gsap.to(logoBgRef.current, {
      rotation: 360,
      duration: 2.5,
      repeat: -1,
      ease: "none",
      delay: 1.2
    });
  }, []);

  // טיימר ויזואלי משולב עם התקדמות הוידאו
  useEffect(() => {
    const startTime = Date.now();
    
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const timeProgress = Math.min(100, (elapsed / duration) * 100);
      
      // שילוב התקדמות הזמן עם התקדמות הוידאו
      // נותנים משקל של 70% לזמן ו-30% לטעינת הוידאו
      const combinedProgress = (timeProgress * 0.7) + (videoProgress * 0.3);
      
      setProgress(combinedProgress);
      
      if (combinedProgress < 100) {
        requestAnimationFrame(updateProgress);
      }
    };
    
    requestAnimationFrame(updateProgress);
  }, [duration, videoProgress]);

  // סגירה כשהכל מוכן
  useEffect(() => {
    // נחכה שגם הזמן יעבור וגם הוידאו יטען (או שיהיה timeout)
    if (progress < 95) return; // נתן מרווח קטן
    
    const isVideoReady = videoLoaded || mainVideo.isReady;
    
    if (!isVideoReady) {
      console.log('⏳ מחכים שהוידאו יסתיים לטעון...');
      return;
    }

    let finished = false;
    const closeWithAnimation = () => {
      if (finished) return;
      finished = true;
      
      console.log('🚀 סוגרים את מסך הטעינה - הוידאו מוכן!');
      
      // אנימציית סגירה
      gsap.to([numberRef.current, logoRef.current, logoBgRef.current, progressBarRef.current], {
        opacity: 0,
        duration: 0.2,
        ease: "power2.out",
      });

      const kickoff = () => {
        gsap.set(circleRef.current, {
          width: "50px",
          height: "50px",
          left: "50%",
          top: "50%",
          xPercent: -50,
          yPercent: -50,
          scale: 0,
          opacity: 1,
          borderRadius: "50%",
          backgroundColor: "#fdf6ed",
          position: "fixed",
          zIndex: 9999,
          display: "block",
        });

        gsap.to(circleRef.current, {
          scale: 1,
          duration: 0.3,
          ease: "back.out(1.7)",
          onComplete: () => {
            gsap.to(circleRef.current, {
              scale: 50,
              duration: 0.8,
              ease: "power2.out",
              onComplete: () => {
                gsap.to(preloaderRef.current, {
                  opacity: 0,
                  duration: 0.3,
                  ease: "power2.out",
                  onComplete: () => {
                    setIsVisible(false);
                    onLoadComplete?.();
                  },
                });
              },
            });
          },
        });
      };

      setTimeout(kickoff, 300);
    };

    // אם הכל מוכן - סגור מיד
    closeWithAnimation();

  }, [progress, videoLoaded, mainVideo.isReady, onLoadComplete]);

  // Fallback בטיחותי מורחב
  useEffect(() => {
    if (!isVisible) return;
    
    const timeout = setTimeout(() => {
      if (!isVisible) return;
      console.warn('⏱️ Safety fallback: סוגרים את מסך הטעינה כדי לא לתקוע');
      
      try {
        gsap.to(preloaderRef.current, { 
          opacity: 0, 
          duration: 0.3, 
          ease: 'power2.out',
          onComplete: () => {
            setIsVisible(false);
            onLoadComplete?.();
          }
        });
      } catch (error) {
        // במקרה של שגיאה - סגירה מהירה
        setIsVisible(false);
        onLoadComplete?.();
      }
    }, 30000); // 30 שניות חירום
    
    return () => clearTimeout(timeout);
  }, [isVisible, onLoadComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#f5a383] flex flex-col items-center justify-center"
      suppressHydrationWarning
    >
      {/* וידאו נסתר לטעינה מלאה */}
      <video 
        ref={hiddenVideoRef}
        style={{ display: 'none' }}
        preload="auto"
        muted
        playsInline
      />

      {/* עיגול הפיזור */}
      <div 
        ref={circleRef}
        className="fixed"
        style={{ display: 'none' }}
      />

      {/* מספר הטעינה */}
      <div 
        ref={numberRef}
        className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-[#fdf6ed] text-6xl sm:text-8xl font-bold"
        style={{ fontFamily: 'Aeonik, sans-serif' }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </div>

      {/* אינדיקטור טעינת וידאו */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 text-[#fdf6ed] text-sm sm:text-base">
        🎬 {videoLoaded ? 'וידאו מוכן' : `טוען וידאו... ${Math.round(videoProgress)}%`}
      </div>

      {/* לוגו עם רקע מונפש */}
      <div className="flex relative justify-center items-center mb-8 sm:mb-16">
        <div 
          ref={logoBgRef}
          className="absolute w-40 h-40 bg-gradient-to-r from-white via-gray-100 to-gray-200 rounded-full opacity-30 blur-sm sm:w-56 sm:h-56"
          style={{ 
            background: 'conic-gradient(from 0deg, #ffffff, #f8fafc, #e2e8f0, #ffffff)'
          }}
        />
        <Image 
          ref={logoRef}
          src="/logo.png" 
          alt="כיף לתת" 
          width={176}
          height={176}
          className="object-contain relative z-10 w-32 h-32 sm:w-44 sm:h-44"
          priority
        />
      </div>

      {/* סרגל הטעינה */}
      <div 
        ref={progressBarRef}
        className="w-64 h-3 sm:w-80 sm:h-4 md:w-96 bg-[#9acdbe] overflow-hidden shadow-2xl relative"
      >
        <div 
          ref={progressFillRef}
          className="h-full bg-[#fdf6ed] transition-all duration-200 ease-out shadow-lg absolute top-0 left-0 z-10"
          style={{ width: `${progress}%` }}
        />
        
        {/* אינדיקטור מיוחד לטעינת וידאו */}
        <div 
          className="h-full bg-[#f5a383] transition-all duration-200 ease-out shadow-lg absolute top-0 left-0 z-5 opacity-60"
          style={{ width: `${videoProgress * 0.3}%` }}
        />
      </div>

      {/* הודעת סטטוס */}
      <div className="mt-4 text-[#fdf6ed] text-center text-sm sm:text-base">
        <div className="opacity-80">
          {progress < 30 ? 'מכין את החוויה שלך...' :
           progress < 60 ? 'טוען תכנים...' :
           progress < 90 ? 'כמעט מוכן...' :
           videoLoaded ? 'הכל מוכן! נכנס לאתר...' : 'מסיים טעינה...'}
        </div>
      </div>
    </div>
  );
}
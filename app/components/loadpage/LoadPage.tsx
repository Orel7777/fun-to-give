"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import { useVideo } from '../../contexts/VideoContext';
import { firebaseVideoKeys } from '../../lib/videoManifest';

interface LoadPageProps {
  onLoadComplete?: () => void;
  duration?: number; // משך הטעינה במילישניות
  videoPath?: string; // נתיב הוידאו לטעינה מוקדמת
}

export default function LoadPage({ onLoadComplete, duration = 2500, videoPath = 'כיף לתת מקוצר.mp4' }: LoadPageProps) {
  const [progress, setProgress] = useState(0);
  // מונה שמוצג למשתמש - מתקדם במספרים שלמים 1,2,3...
  const [displayedProgress, setDisplayedProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  const { mainVideo, preloadVideo, preloadVideos, overallProgress } = useVideo();
  const videoStatusRef = useRef({ isReady: false, loading: false });
  const videoLoadedRef = useRef(false);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const progressFillRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoBgRef = useRef<HTMLDivElement>(null);

  // עדכון סטטוס הוידאו ב-ref
  useEffect(() => {
    videoStatusRef.current = { isReady: mainVideo.isReady, loading: mainVideo.loading };
  }, [mainVideo.isReady, mainVideo.loading]);

  // טעינת כל הווידאוים (פעם אחת): ראשי + יתר המניפסט
  useEffect(() => {
    if (videoLoadedRef.current) return;
    videoLoadedRef.current = true;

    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    console.log(isMobile ? '📱 מתחיל טעינת וידאוים (מובייל)' : '💻 מתחיל טעינת וידאוים (דסקטופ)');

    // 1) טען את הווידאו הראשי לתוך mainVideo כדי לשמר תאימות
    preloadVideo(videoPath);

    // 2) טען את שאר הווידאוים מהמניפסט (ללא כפילויות)
    const others = Array.from(new Set(firebaseVideoKeys.filter(k => k && k !== videoPath)));
    if (others.length > 0) {
      preloadVideos(others);
    }
  }, [preloadVideo, preloadVideos, videoPath]);

  // ניהול אנימציות פתיחה בלבד (ללא טיימר מזויף)
  useEffect(() => {
    // אנימציה ראשונית
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

  // עדכון התקדמות אמיתי: משלב את הווידאו הראשי + יתר המניפסט על בסיס ספירה
  useEffect(() => {
    const othersCount = Array.from(new Set(firebaseVideoKeys.filter(k => k && k !== videoPath))).length;
    const total = othersCount + 1; // כולל הווידאו הראשי
    const done = (overallProgress * othersCount) + (mainVideo.isReady ? 1 : 0);
    const percent = Math.min(100, Math.round((done / total) * 100));
    setProgress(percent);
  }, [overallProgress, mainVideo.isReady, videoPath]);

  // אנימציית מספור שלם: הגדלת המספר המוצג צעד-צעד עד היעד האמיתי
  useEffect(() => {
    if (displayedProgress >= progress) return;
    let raf: number;
    const step = () => {
      setDisplayedProgress(prev => {
        if (prev >= progress) return prev;
        // קפיצה של 1 כדי לשמור על 1,2,3...
        return Math.min(progress, prev + 1);
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [progress, displayedProgress]);

  // סגירה כשמוכנים: רק כאשר הווידאו הראשי מוכן וכל שאר הווידאוים הושלמו (overallProgress===1)
  useEffect(() => {
    const ready = progress >= 100 && videoStatusRef.current.isReady && overallProgress >= 1;
    if (!ready) return;

    // הטעינה הסתיימה - אפקטי GSAP
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

    const timer = setTimeout(kickoff, 300);
    return () => clearTimeout(timer);
  }, [progress, overallProgress, onLoadComplete]);

  // Fallback בטיחותי: אם אחרי זמן סביר עדיין מוצג המסך, נסגור כדי לא לתקוע מובייל
  useEffect(() => {
    if (!isVisible) return;
    const timeout = setTimeout(() => {
      if (!isVisible) return;
      console.warn('⏱️ Safety fallback: closing preloader to avoid hang');
      // סגירה מהירה ללא אנימציות ארוכות כדי לשמור על חוויה טובה
      try {
        gsap.to(preloaderRef.current, { opacity: 0, duration: 0.3, ease: 'power2.out' });
      } finally {
        setIsVisible(false);
        onLoadComplete?.();
      }
    }, 25000);
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
      {/* עיגול הפיזור */}
      <div 
        ref={circleRef}
        className="fixed"
        style={{ display: 'none' }}
      />

      {/* מספר הטעינה בפינה שמאלית תחתונה */}
      <div 
        ref={numberRef}
        className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-[#fdf6ed] text-6xl sm:text-8xl font-bold"
        style={{ fontFamily: 'Aeonik, sans-serif' }}
      >
        {Math.round(displayedProgress).toString().padStart(3, '0')}
      </div>



      {/* לוגו מעל הסרגל עם רקע מונפש */}
      <div className="flex relative justify-center items-center mb-8 sm:mb-16">
        {/* רקע מונפש מסביב ללוגו */}
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

      {/* סרגל הטעינה העבה באמצע */}
      <div 
        ref={progressBarRef}
        className="w-64 h-3 sm:w-80 sm:h-4 md:w-96 bg-[#9acdbe] overflow-hidden shadow-2xl relative"
      >
        <div 
          ref={progressFillRef}
          className="h-full bg-[#fdf6ed] transition-all duration-200 ease-out shadow-lg absolute top-0 left-0 z-10"
          style={{ width: `${displayedProgress}%` }}
        />
      </div>
    </div>
  );
} 
"use client";
import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface LoadPageProps {
  onLoadComplete?: () => void;
  duration?: number; // משך הטעינה במילישניות
}

export default function LoadPage({ onLoadComplete, duration = 8000 }: LoadPageProps) {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const preloaderRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const logoBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const startTime = Date.now();

    const updateProgress = () => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(newProgress);

      if (newProgress < 100) {
        requestAnimationFrame(updateProgress);
      } else {
        // הטעינה הסתיימה - אפקטי GSAP
        gsap.to(progressBarRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(numberRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(logoRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(logoBgRef.current, {
          opacity: 0,
          scale: 0.8,
          duration: 0.5,
          ease: "power2.out"
        });

        gsap.to(preloaderRef.current, {
          opacity: 0,
          scale: 0.9,
          duration: 1,
          ease: "power2.out",
          onComplete: () => {
            setIsVisible(false);
            onLoadComplete?.();
          }
        });
      }
    };

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

    // אנימציה מתמשכת לרקע הלוגו
    gsap.fromTo(logoBgRef.current,
      { opacity: 0, scale: 0.5, rotation: 0 },
      { opacity: 1, scale: 1, rotation: 360, duration: 1, delay: 0.2, ease: "power2.out" }
    );

    // אנימציה מתמשכת לסיבוב הרקע
    gsap.to(logoBgRef.current, {
      rotation: 360,
      duration: 8,
      repeat: -1,
      ease: "none",
      delay: 1.2
    });

    requestAnimationFrame(updateProgress);
  }, [duration, onLoadComplete]);

  if (!isVisible) {
    return null;
  }

  return (
    <div 
      ref={preloaderRef}
      className="fixed inset-0 z-[9999] bg-[#f5a383] flex flex-col items-center justify-center"
    >
      {/* מספר הטעינה בפינה שמאלית תחתונה */}
      <div 
        ref={numberRef}
        className="absolute bottom-6 left-6 text-[#fdf6ed] text-8xl font-bold"
        style={{ fontFamily: 'Aeonik, sans-serif' }}
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </div>

      {/* לוגו מעל הסרגל עם רקע מונפש */}
      <div className="mb-16 relative flex justify-center items-center">
        {/* רקע מונפש מסביב ללוגו */}
        <div 
          ref={logoBgRef}
          className="absolute w-40 h-40 rounded-full bg-gradient-to-r from-white via-gray-100 to-gray-200 opacity-30 blur-sm"
          style={{ 
            background: 'conic-gradient(from 0deg, #ffffff, #f8fafc, #e2e8f0, #ffffff)'
          }}
        />
        <img 
          ref={logoRef}
          src="/logo.png" 
          alt="כיף לתת" 
          className="w-32 h-32 object-contain relative z-10"
          loading="eager"
        />
      </div>

      {/* סרגל הטעינה העבה באמצע */}
      <div 
        ref={progressBarRef}
        className="w-96 h-4 bg-[#9acdbe] rounded-full overflow-hidden shadow-2xl"
      >
        <div 
          className="h-full bg-[#fdf6ed] transition-all duration-300 ease-out rounded-full shadow-lg"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
} 
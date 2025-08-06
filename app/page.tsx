
"use client";
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { SplashCursor } from './components';
import NavigationBar from './pages/Navbar';
import HeroSection from './pages/HeroSection';
import LoadPage from './components/loadpage/LoadPage';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTextAnimation, setShowTextAnimation] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleLoadComplete = () => {
    setIsLoading(false);
    
    // אפקטי GSAP לתוכן הראשי
    gsap.fromTo(navbarRef.current,
      { y: -50 },
      { y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(mainContentRef.current,
      { y: 50 },
      { y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );

    // התחל את אפקט הכתיבה אחרי שהאנימציה מסתיימת
    setTimeout(() => {
      setShowTextAnimation(true);
    }, 1500);
  };

  return (
    <div suppressHydrationWarning>
      {/* SplashCursor פעיל תמיד */}
      <SplashCursor />
      
      {isLoading && <LoadPage onLoadComplete={handleLoadComplete} duration={2500} videoPath="כיף לתת מקוצר.mp4" />}
      {!isLoading && (
        <div ref={navbarRef}>
          <NavigationBar />
        </div>
      )}

      <main ref={mainContentRef} className="pt-32">
        <HeroSection showTextAnimation={showTextAnimation} />
      </main>
    </div>
  );
}

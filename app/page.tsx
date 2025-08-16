
"use client";
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { SplashCursor } from './components';
import NavigationBar from './pages/Navbar';
import HeroSection from './pages/HeroSection';
import LoadPage from './components/loadpage/LoadPage';
import Footer from './pages/Footer';
import Script from 'next/script';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [showTextAnimation, setShowTextAnimation] = useState(false);
  const mainContentRef = useRef<HTMLDivElement>(null);

  const handleLoadComplete = () => {
    setIsLoading(false);
    
    // אפקט GSAP רק לתוכן הראשי (ללא אפקט על הניווט)

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
      {/* Eruda devtools: mobile-only (enabled in all environments) */}
      <Script id="eruda-loader" strategy="afterInteractive">
        {`
          try {
            if (typeof window !== 'undefined') {
              var ua = navigator.userAgent || '';
              var isMobile = /iPhone|iPad|iPod|Android/i.test(ua);
              if (isMobile) {
                var s = document.createElement('script');
                s.src = 'https://cdn.jsdelivr.net/npm/eruda';
                s.onload = function () { try { eruda.init(); } catch (e) { console.warn('Eruda init failed', e); } };
                document.body.appendChild(s);
              }
            }
          } catch (e) { console.warn('Eruda load failed', e); }
        `}
      </Script>
      {/* SplashCursor פעיל תמיד */}
      <SplashCursor />
      
      {isLoading && <LoadPage onLoadComplete={handleLoadComplete} duration={2500} videoPath="כיף לתת מקוצר.mp4" />}
      {!isLoading && <NavigationBar />}

      <main ref={mainContentRef}>
      {/* className="pt-32" */}
        <HeroSection showTextAnimation={showTextAnimation} />
      </main>
      <Footer />
    </div>
  );
}

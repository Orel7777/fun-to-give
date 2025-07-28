
"use client";
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { TextType, SplashCursor } from './components';
import NavigationBar from './pages/Navbar';
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
    <>
      {/* SplashCursor פעיל תמיד */}
      <SplashCursor />
      
      {isLoading && <LoadPage onLoadComplete={handleLoadComplete} duration={8000} />}
      {!isLoading && (
        <div ref={navbarRef}>
          <NavigationBar />
        </div>
      )}

                        <main ref={mainContentRef} className="pt-16">
                    <div className="flex flex-col justify-center items-center px-4 min-h-screen sm:px-6 lg:px-8">
                      <div className="mx-auto max-w-4xl text-center">
                        {showTextAnimation && (
                          <TextType 
                            text={["או הפונט הזה ששניהם הם דוגמאות משני האתרים ששלחת לנו"]}
                            className="text-lg leading-relaxed sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
                            textColors={["#000000"]}
                            typingSpeed={100}
                            showCursor={false}
                            loop={false}
                            initialDelay={0}
                            startOnVisible={false}
                            onSentenceComplete={() => console.log('Text completed')}
                          />
                        )}
                      </div>
                    </div>
                  </main>
    </>
  );
}

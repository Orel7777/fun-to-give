
"use client";
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { TextType, SplashCursor } from './components';
import NavigationBar from './pages/Navbar';
import LoadPage from './components/loadpage/LoadPage';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const mainContentRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLDivElement>(null);

  const handleLoadComplete = () => {
    setIsLoading(false);
    
    // אפקטי GSAP לתוכן הראשי
    gsap.fromTo(navbarRef.current,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
    );

    gsap.fromTo(mainContentRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
    );
  };

  return (
    <>
      {/* SplashCursor פעיל תמיד */}
      <SplashCursor />
      
      {isLoading && <LoadPage onLoadComplete={handleLoadComplete} duration={8000} />}
      <div ref={navbarRef} style={{ opacity: 0 }}>
        <NavigationBar />
      </div>
      <main ref={mainContentRef} className="pt-16" style={{ opacity: 0 }}>
        <div className="flex flex-col justify-center items-center px-4 min-h-screen sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <TextType 
              text={["איזה פונט הכי מדבר אליך?"]}
              className="mb-4 text-2xl font-bold sm:text-3xl md:text-4xl lg:text-5xl almoni-bold"
              textColors={["#000000"]}
              typingSpeed={100}
              showCursor={false}
              loop={false}
            />
            <h2 className="mb-4 text-lg font-bold text-black sm:text-xl md:text-2xl">או</h2>
            <TextType 
              text={["או הפונט הזה ששניהם הם דוגמאות משני האתרים ששלחת לנו"]}
              className="text-lg font-bold leading-relaxed sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl"
              textColors={["#000000"]}
              typingSpeed={100}
              showCursor={false}
              loop={false}
            />
          </div>
        </div>
      </main>
    </>
  );
}

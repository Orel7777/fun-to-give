import React from 'react';
import Image from 'next/image';
import { VideoScrollExpand } from '../components';

interface HeroSectionProps {
  showTextAnimation: boolean;
}

const HeroSection = ({ showTextAnimation }: HeroSectionProps) => {
  // Only show the futuristic hero when text animation should be visible
  if (!showTextAnimation) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen bg-[#fdf6ed] sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <div className="text-6xl font-black text-gray-900 md:text-8xl lg:text-9xl font-staff">
              כיף לתת
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-700 md:text-4xl lg:text-5xl font-staff">
              עם כל נתינה הלב מתמלא
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* טקסט ולוגו מקוריים */}
      <div className="relative h-screen w-full overflow-hidden bg-[#fdf6ed]">
        {/* Subtle animated background grid */}
        <div className="absolute inset-0 opacity-20 z-5">
          <div className="w-full h-full cyber-grid"></div>
        </div>

        {/* Scanning line effect */}
        <div 
          className="absolute w-full h-px bg-gradient-to-r from-transparent via-[#f5a383] to-transparent opacity-40 z-10"
          style={{
            animation: 'scanline 4s linear infinite',
          }}
        />

        {/* Text Content */}
        <div className="flex relative z-20 flex-col justify-center items-center px-10 h-full text-center">
          <div 
            className="transition-all duration-2000 opacity-100 transform translate-y-0"
            style={{ transform: 'translateY(-120px)' }}
          >
            {/* Content Wrapper - עטיפה חדשה */}
            <div className="flex flex-col items-center">
              {/* Logo Image - מיקום וגודל התמונה */}
              <div className="flex relative justify-center items-center mx-auto mb-0 w-64 h-64 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 hero-image-container"
                   style={{ 
                     transform: 'translateY(-40px)'
                   }}
              >
                <Image
                  src="/noBg.png"
                  alt="Logo"
                  width={320}
                  height={320}
                  className="object-contain w-full h-full transition-all duration-500 ease-in-out cursor-pointer hover:scale-110 hover:rotate-3 active:scale-95"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(42, 43, 38, 0.3))',
                  }}
                  priority
                />
              </div>

              {/* Main Title - הטקסט הראשי */}
              <h1 className="text-7xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold font-staff text-[#2a2b26] transition-all duration-500 ease-in-out cursor-pointer hover:scale-105 hover:rotate-1 active:scale-95"
                  style={{ 
                    marginTop: '-120px',
                    textShadow: '0 0 30px rgba(42, 43, 38, 0.8), 0 0 60px rgba(42, 43, 38, 0.4)',
                    animation: 'glitch 3s ease-in-out infinite alternate'
                  }}
              >
                כיף לתת
              </h1>
            
              {/* Subtitle - הטקסט המשני */}
              <p 
                className="text-3xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-[#2a2b26]/90 transition-all duration-500 ease-in-out cursor-pointer hover:scale-105 hover:rotate-1 active:scale-95"
                style={{ 
                  marginTop: '0px',
                  textShadow: '0 0 20px rgba(42, 43, 38, 0.6), 0 0 40px rgba(42, 43, 38, 0.3)',
                  animationDelay: '0.5s'
                }}
              >
                עם כל נתינה הלב מתמלא
              </p>
            </div>
          </div>

          {/* Scroll indicator */}
          <div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-[#f5a383]/70 transition-all duration-1000 opacity-100 animate-bounce"
            style={{ animationDelay: '1.5s' }}
          >
            <div className="flex flex-col items-center space-y-2 px-6 py-3 border border-[#f5a383]/20 rounded-full backdrop-blur-sm">
              <span className="text-sm font-medium font-staff">גלול למטה לוידאו</span>
              <svg 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                className="animate-pulse"
              >
                <path 
                  d="M12 5V19" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
                <path 
                  d="M7 14L12 19L17 14" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          {/* Corner decorations */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-6 left-6 w-6 h-6 border-l-2 border-t-2 border-[#f5a383]/60"></div>
            <div className="absolute top-6 right-6 w-6 h-6 border-r-2 border-t-2 border-[#9acdbe]/60"></div>
            <div className="absolute bottom-20 left-6 w-6 h-6 border-l-2 border-b-2 border-[#f5a383]/60"></div>
            <div className="absolute bottom-20 right-6 w-6 h-6 border-r-2 border-b-2 border-[#9acdbe]/60"></div>
          </div>
        </div>
      </div>

      {/* הוידאו מתחת לטקסט */}
      <VideoScrollExpand
        videoSrc="/כיף לתת מקוצר.mp4"
        title="הפעילות שלנו"
      >
        <div className="max-w-4xl mx-auto text-center px-8">
          <h2 className="text-3xl font-bold mb-6 text-[#2a2b26] font-staff">
            עמותת &ldquo;כיף לתת&rdquo;
          </h2>
          <p className="text-lg mb-6 text-[#2a2b26] font-staff leading-relaxed">
            מעניקה בשר, עופות, דגים ביצים ויין למאות משפחות באופן קבוע.
          </p>
          <p className="text-lg mb-6 text-[#2a2b26] font-staff leading-relaxed">
            בנוסף, כיף לתת עוזרת לילדים עם מוגבלויות ומשמחת ילדים בבתי חולים.
          </p>
          <p className="text-lg mb-6 text-[#2a2b26] font-staff leading-relaxed">
            הפעילות שלנו מבוצעת מתוך אמונה עמוקה בעקרונות של נתינה, אהבת הזולת ורצון לשמח את האחר.
          </p>
          <p className="text-lg text-[#2a2b26] font-staff leading-relaxed font-semibold">
            כל פעילות העמותה נעשית על ידי מתנדבים וללא מקבלי שכר.
          </p>
        </div>
      </VideoScrollExpand>
    </div>
  );
};

export default HeroSection;
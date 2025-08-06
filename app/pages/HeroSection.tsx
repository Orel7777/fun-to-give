import React, { useEffect } from 'react';
import Image from 'next/image';
import { VideoScrollExpand, HorizontalScrollCarousel } from '../components';
import FamiliesTestimonials from './Testimonials';
import { useVideo } from '../contexts/VideoContext';
import { PulseBeamsFirstDemo } from '../components/call to action/demo';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  showTextAnimation: boolean;
}

const HeroSection = ({ showTextAnimation }: HeroSectionProps) => {
  // קבלת הוידאו מהקונטקסט (הוא נטען מראש בLoadPage)
  const { mainVideo } = useVideo();
  const { loading, error, isReady } = mainVideo;
  
  // We don't need animation state anymore since we're using a one-time animation
  // לוגיקת האנימציה - הערות מסבירות
  // הערה: האנימציה תופעל רק בביקור הראשון באתר
  // מערכת הלוקל סטורג' תשמור את המידע שהמשתמש כבר ביקר באתר
  useEffect(() => {
    // בדיקה האם זהו הביקור הראשון של המשתמש באתר
    // בגרסה סופית נבדוק את הערך הזה
    
    /* 
    כאן יש שתי אפשרויות:
    
    1. למצב פיתוח - תמיד להציג את האנימציה (מחיקת הדגל):
    localStorage.removeItem('hasVisitedBefore');
    
    2. לגרסה סופית - להראות את האנימציה רק בפעם הראשונה:
    if (!hasVisited) {
      // האנימציה תופעל רק אם זה ביקור ראשון
      // הלבבות יוצגו בסיבוב סביב הכותרת והכפתור
    }
    */
    
    // במצב פיתוח - תמיד להציג את האנימציה
    localStorage.removeItem('hasVisitedBefore');
    
    // לאחר שהאנימציה הסתיימה, נרשום שהמשתמש כבר ביקר באתר
    const timer = setTimeout(() => {
      localStorage.setItem('hasVisitedBefore', 'true');
    }, 6000); // 6 שניות - משך האנימציה
    
    return () => clearTimeout(timer);
  }, []);
  
  // Only show the futuristic hero when text animation should be visible
  if (!showTextAnimation) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen bg-[#fdf6ed] sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <div className="flex justify-center">
              <div className="w-[200px] sm:w-[250px] md:w-[300px] transition-all duration-300">
                <Image
                  src="/title.png"
                  alt="כיף לתת - עם כל נתינה הלב מתמלא"
                  width={500}
                  height={200}
                  style={{ 
                    width: '100%',
                    height: 'auto'
                  }}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-hidden">
      {/* טקסט ולוגו מקוריים */}
      <div className="relative h-screen w-full overflow-hidden bg-[#fdf6ed] pt-8">
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
            className="opacity-100 transition-all transform -translate-y-[120px] sm:-translate-y-[60px] md:-translate-y-[120px] duration-2000"
          >
            {/* Content Wrapper - עטיפה חדשה */}
            <div className="flex flex-col items-center">
              {/* Logo Image - מיקום וגודל התמונה */}
              {/* זוהי המעטפת של הלבבות */}
              <div
                className="flex relative justify-center items-center mx-auto mb-0 w-40 h-40 sm:w-64 sm:h-64 md:mb-0 lg:mb-0 xl:mb-0 2xl:mb-0 hero-image-container -mt-32 sm:mt-8 md:mt-8 lg:mt-0"
                style={{
                  zIndex: 10
                }}
              >
                {/* זו האנימציה של הלבבות - כאן תוכל להתאים את המסלול */}
                {/* מתחיל מתחת לכותרת והכפתור כך שהאנימציה נראית יותר טוב */}
                <motion.div
                  initial={{ scale: 1, y: 300 }}
                  animate={{
                    x: [
                      0,      
                      50,    
                      200,    
                      150,    
                      0,      
                      -150,   
                      -200,   
                      -150,   
                      0       
                    ],
                    y: [
                      0,    
                      50,    
                      0,      
                      -200,   
                      -300,   
                      -150,   
                      0,      
                      100,    
                      85     
                    ],
                    rotate: -360,
                    scale: [1.5, 1.2, 1.3, 1.4, 1.5, 1.4, 1.3, 1.2, 1.5]
                    // 1.5 גודל הלבבות בסוף האנימציה
                  }}
                  transition={{ 
                    duration: 6, 
                    ease: "easeInOut", 
                    times: [0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875, 1]
                  }}
                  className="absolute z-50"
                  style={{
                    filter: 'drop-shadow(0 0 20px rgba(245, 163, 131, 0.9))',
                    willChange: 'transform', 
                    position: 'absolute',
                    top: '0px',
                    left: 0,
                    right: 0,
                    margin: '0 auto',
                    pointerEvents: 'none',
                    transform: 'translateY(0)'
                  }}
                >
                  <Image
                    src="/noBg.png"
                    alt="Logo"
                    width={320}
                    height={320}
                    className="object-contain w-full h-full transition-all duration-500 ease-in-out cursor-pointer"
                    style={{
                      filter: 'drop-shadow(0 0 20px rgba(42, 43, 38, 0.3))',
                    }}
                    priority
                  />
                </motion.div>
              </div>

              {/* Title Image - תמונת הכותרת */}
              <div className="flex relative z-20 justify-center items-center -mt-4 sm:-mt-16 md:-mt-12 lg:-mt-20"
              >
                <div className="w-[160px] sm:w-[250px] md:w-[300px] transition-all duration-300">
                  <Image
                    src="/title.png"
                    alt="כיף לתת - עם כל נתינה הלב מתמלא"
                    width={300}
                    height={100}
                    className="object-contain transition-all duration-500 ease-in-out cursor-pointer hover:scale-105 hover:rotate-1 active:scale-95"
                    style={{
                      animation: 'glitch 3s ease-in-out infinite alternate',
                      animationDelay: '0.5s'
                    }}
                    priority
                  />
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="mt-7 sm:mt-4 md:mt-4">
                <PulseBeamsFirstDemo />
              </div>
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
      {loading && (
        <div className="flex justify-center items-center py-0 sm:py-1 md:py-2 lg:py-4 bg-[#fdf6ed]">
          <div className="text-[#2a2b26] font-staff text-lg sm:text-xl">טוען וידאו...</div>
        </div>
      )}
      
      {error && (
        <div className="flex justify-center items-center py-1 sm:py-2 md:py-4 lg:py-6 bg-[#fdf6ed]">
          <div className="text-lg text-center text-red-600 sm:text-xl font-staff">
            {error}
          </div>
        </div>
      )}
      
      {!loading && !error && isReady && (
        <VideoScrollExpand
          usePreloadedVideo={true}
        >
        <div className="px-4 mx-auto max-w-3xl text-center sm:px-6 md:px-8 -pt-16 sm:pt-0 md:pt-2 lg:pt-8">
          {/* תמונה עם אנימציה */}
          <div className="flex justify-center mb-0 sm:mb-2">
            <div className="relative group">
              {/* רקע זוהר */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#f5a383] to-[#9acdbe] rounded-full blur-xl opacity-30 group-hover:opacity-50 transition-all duration-500 animate-pulse"></div>
              
              {/* מיכל התמונה עם אנימציה */}
              <div className="relative transition-all duration-700 transform hover:scale-110 hover:rotate-3 active:scale-95"
                   style={{
                     animation: 'coinGlow 4s ease-in-out infinite',
                   }}>
                <Image
                  src="/Hand with coin.png"
                  alt="יד עם מטבע - סמל הנתינה"
                  width={300}
                  height={300}
                  className="object-contain w-64 h-64 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80"
                  style={{
                    animation: 'coinFloat 4s ease-in-out infinite',
                  }}
                />
                
                {/* אפקט זוהר מסביב */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f5a383]/20 to-[#9acdbe]/20 blur-md animate-ping"></div>
                
                {/* חלקיקים זוהרים */}
                <div className="absolute -top-2 -left-2 w-4 h-4 bg-[#f5a383] rounded-full opacity-60 animate-ping" style={{ animationDelay: '0s' }}></div>
                <div className="absolute -top-4 -right-4 w-3 h-3 bg-[#9acdbe] rounded-full opacity-60 animate-ping" style={{ animationDelay: '1s' }}></div>
                <div className="absolute -bottom-2 -right-2 w-2 h-2 bg-[#f5a383] rounded-full opacity-60 animate-ping" style={{ animationDelay: '2s' }}></div>
                <div className="absolute -bottom-4 -left-4 w-3 h-3 bg-[#9acdbe] rounded-full opacity-60 animate-ping" style={{ animationDelay: '3s' }}></div>
              </div>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center text-[#2a2b26] font-staff mb-1 sm:mb-2">
            עמותת &ldquo;כיף לתת&rdquo;
          </h2>
          <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-[#2a2b26] font-staff leading-relaxed">
            מעניקה בשר, עופות, דגים ביצים ויין למאות משפחות באופן קבוע.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-[#2a2b26] font-staff leading-relaxed">
            בנוסף, כיף לתת עוזרת לילדים עם מוגבלויות ומשמחת ילדים בבתי חולים.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-[#2a2b26] font-staff leading-relaxed">
            הפעילות שלנו מבוצעת מתוך אמונה עמוקה בעקרונות של נתינה, אהבת הזולת ורצון לשמח את האחר.
          </p>
          <p className="text-lg sm:text-xl md:text-2xl mb-1 sm:mb-2 text-[#2a2b26] font-staff leading-relaxed font-semibold">
            כל פעילות העמותה נעשית על ידי מתנדבים וללא מקבלי שכר.
          </p>
        </div>
        </VideoScrollExpand>
      )}

      {/* מרווח גדול בין הטקסט לגלריה */}
      <div className="py-8 sm:py-12 md:py-16 lg:py-24"></div>

      {/* גלריה של תמונות פעילות העמותה */}
      <div className="bg-[#fdf6ed] py-2 sm:py-4 md:py-6 lg:py-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center text-[#2a2b26] font-staff mb-6 sm:mb-8 md:mb-10">
          תמונות מפעילות העמותה
        </h2>
      </div>
      
      <HorizontalScrollCarousel
        images={[
          "/pictures/1.JPG",
          "/pictures/2.JPG",
          "/pictures/3.jpeg",
          "/pictures/4.JPG",
          "/pictures/5.JPG",
          "/pictures/6.JPG",
          "/pictures/7.JPG",
          "/pictures/8.png",
          "/pictures/9.png",
          "/pictures/10.png",
          "/pictures/11.jpeg",
          "/pictures/12.jpeg",
          // "/pictures/13.jpeg", // הוסתר לסדר יפה של 4 תמונות בכל שורה
          // "/pictures/14.jpeg"  // הוסתר לסדר יפה של 4 תמונות בכל שורה
        ]}
      />

      {/* מרווח בין גלריית התמונות למשפחות מספרות */}
      <div className="py-4 sm:py-8 md:py-12 lg:py-20"></div>

      {/* סיפורי משפחות עם עדויות אודיו */}
      <FamiliesTestimonials />
    </div>
  );
};

export default HeroSection;
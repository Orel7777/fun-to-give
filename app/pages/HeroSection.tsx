import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Script from 'next/script';
import dynamic from 'next/dynamic';
import ScrollExpandMedia from '../components/ui/scroll-expansion-hero';
const HorizontalScrollCarousel = dynamic(() => import('../components').then(m => m.HorizontalScrollCarousel), { ssr: false });
const FamiliesTestimonials = dynamic(() => import('./Testimonials'), { ssr: false });
const DonationsSection = dynamic(() => import('./Donations-section'), { ssr: false });
const OrganizationPurpose = dynamic(() => import('./Organization-purpose'), { ssr: false });
const OrganizationStory = dynamic(() => import('./Organization-story'), { ssr: false });
import { useVideo } from '../contexts/VideoContext';
import { PulseBeamsFirstDemo } from '../components/call-to-action/Demo';
import { motion } from 'framer-motion';
import { SlidUp, SlidUpLeft, SlidUpRight } from '../lib/utils';

// Alias for custom element to satisfy TS without global typings
const LottiePlayer: any = 'lottie-player';

interface HeroSectionProps {
  showTextAnimation: boolean;
}

const HeroSection = ({ showTextAnimation }: HeroSectionProps) => {
  // קבלת הוידאו מהקונטקסט (הוא נטען מראש בLoadPage)
  const { mainVideo } = useVideo();
  const { loading, error, isReady } = mainVideo;
  
  // זיהוי גודל המסך
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // בדיקה ראשונית
    checkScreenSize();
    
    // האזנה לשינויים בגודל המסך
    window.addEventListener('resize', checkScreenSize);
    
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);
  
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
                  sizes="(max-width: 640px) 200px, (max-width: 768px) 250px, 300px"
                  style={{ 
                    width: '100%',
                    height: 'auto'
                  }}
                  className="object-fill"
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
            className="opacity-100 transition-all transform -translate-y-[60px] sm:-translate-y-[30px] md:-translate-y-[60px] duration-2000"
          >
            {/* Content Wrapper - עטיפה חדשה */}
            <div className="flex flex-col items-center">
              {/* Logo Image - מיקום וגודל התמונה */}
              {/* זוהי המעטפת של הלבבות */}
              <div
                className="flex relative justify-center items-center mx-auto -mt-20 w-40 h-40 sm:w-64 sm:h-64 hero-image-container sm:mt-2 md:mt-2 lg:mt-0"
                style={{
                  zIndex: 10
                }}
              >
                {/* זו האנימציה של הלבבות - כאן תוכל להתאים את המסלול */}
                {/* מתחיל מתחת לכותרת והכפתור כך שהאנימציה נראית יותר טוב */}
                <motion.div
                  initial={{ scale: 1, y: 300 }}
                  animate={isMobile ? {
                    // מסלול התנועה של הלבבות למסכים קטנים:
                    // נקודה 1: (0,0) - מרכז התחלה
                    // נקודה 2: (100,100) - ימינה למעלה (קטן יותר)
                    // נקודה 3: (150,0) - ימינה (קטן יותר)
                    // נקודה 4: (100,-150) - ימינה למעלה (קטן יותר)
                    // נקודה 5: (0,-200) - מרכז למעלה (הנקודה הגבוהה ביותר - קטן יותר)
                    // נקודה 6: (-100,-100) - שמאלה למעלה (קטן יותר)
                    // נקודה 7: (-150,0) - שמאלה (קטן יותר)
                    // נקודה 8: (-100,50) - שמאלה למטה (קטן יותר)
                    // נקודה 9: (0,50) - חזרה למרכז (קצת למטה - קטן יותר)
                    x: [0, 100, 100, -220, -220, 0, 0, 0, 0],
                    y: [0, 0, 300, 300, 0, 0, 0, 0, 85],
                    rotate: -360, // סיבוב מלא נגד כיוון השעון
                    scale: [1.5, 1.2, 1.3, 1.4, 1.5, 1.4, 1.3, 1.4, 1.5] // שינוי גודל קטן יותר
                  } : {
                    // מסלול התנועה של הלבבות למסכים גדולים:
                    // נקודה 1: (0,0) - מרכז התחלה
                    // נקודה 2: (50,50) - ימינה למעלה
                    // נקודה 3: (200,0) - ימינה
                    // נקודה 4: (150,-200) - ימינה למעלה
                    // נקודה 5: (0,-300) - מרכז למעלה (הנקודה הגבוהה ביותר)
                    // נקודה 6: (-150,-150) - שמאלה למעלה
                    // נקודה 7: (-200,0) - שמאלה
                    // נקודה 8: (-150,100) - שמאלה למטה
                    // נקודה 9: (0,85) - חזרה למרכז (קצת למטה)
                    x: [0, 250, 250, -500, -500, 0, 0, 0, 0],
                    y: [0, 0, 500, 500, 0, 0, 0, 0, 85],
                    rotate: -360, // סיבוב מלא נגד כיוון השעון
                    scale: [1.5, 1.2, 1.3, 1.4, 1.5, 1.4, 1.3, 1.2, 1.5] // שינוי גודל
                  }}
                  transition={{ 
                    duration: 6, 
                    ease: "easeInOut", 
                    times: [
                      0,      // נקודה 1: התחלה (0%)
                      0.02,  // נקודה 2: ימינה למעלה (12.5%)
                      0.15,   // נקודה 3: ימינה (25%)
                      0.375,  // נקודה 4: ימינה למעלה (37.5%)
                      0.5,    // נקודה 5: מרכז למעלה (50%)
                      0.625,  // נקודה 6: שמאלה למעלה (62.5%)
                      0.75,   // נקודה 7: שמאלה (75%)
                      0.875,  // נקודה 8: שמאלה למטה (87.5%)
                      1       // נקודה 9: חזרה למרכז (100%)
                    ]
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
              <div className="flex relative z-20 justify-center items-center -mt-1 sm:-mt-6 md:-mt-4 lg:-mt-8"
              >
                <div className="w-[160px] sm:w-[250px] md:w-[300px] transition-all duration-300">
                  <Image
                    src="/title.png"
                    alt="כיף לתת - עם כל נתינה הלב מתמלא"
                    width={300}
                    height={100}
                    sizes="(max-width: 640px) 160px, (max-width: 768px) 250px, 300px"
                    className="object-contain transition-all duration-500 ease-in-out cursor-pointer hover:scale-105 hover:rotate-1 active:scale-95"
                    style={{
                      animation: 'glitch 3s ease-in-out infinite alternate',
                      animationDelay: '0.5s'
                    }}
                  />
                </div>
              </div>

              {/* Call to Action Button */}
              <div className="mt-1 sm:mt-1 md:mt-1">
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
        <ScrollExpandMedia
          mediaType="video"
          mediaSrc={mainVideo.videoUrl}
          bgImageSrc="/pictures/1.webp"
          title="עמותת כיף לתת"
          date="כיף לתת"
          scrollToExpand="גלול/י להרחבה"
          textBlend
        >
          <div id="organization-activities" className="px-4 mx-auto max-w-3xl text-center sm:px-6 md:px-8 -pt-16 sm:pt-0 md:pt-2 lg:pt-8">
            {/* תמונה עם אנימציה */}
            <motion.div 
              variants={SlidUp(0.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex justify-center mb-0 sm:mb-2"
            >
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
            </motion.div>

            <motion.h2 
              variants={SlidUpLeft(0.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center text-[#2a2b26] font-staff mb-3 sm:mb-4"
            >
              עמותת כיף לתת
            </motion.h2>
            <motion.p 
              variants={SlidUpRight(0.5)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-[#2a2b26] font-staff leading-relaxed"
            >
              מעניקה בשר, עופות, דגים ביצים ויין למאות משפחות באופן קבוע.
            </motion.p>
            <motion.p 
              variants={SlidUpLeft(0.7)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg sm:text-xl md:text-2xl mb-2 sm:mb-3 text-[#2a2b26] font-staff leading-relaxed"
            >
              בנוסף, כיף לתת עוזרת לילדים עם מוגבלויות ומשמחת ילדים בבתי חולים.
            </motion.p>
            <motion.p 
              variants={SlidUpRight(0.9)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg sm:text-xl md:text-2xl mt-2 mb-2 sm:mt-3 sm:mb-3 text-[#2a2b26] font-staff leading-relaxed"
            >
              הפעילות שלנו מבוצעת מתוך אמונה עמוקה בעקרונות של נתינה, אהבת הזולת ורצון לשמח את האחר.
            </motion.p>
            <motion.p 
              variants={SlidUpLeft(1.1)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="text-lg sm:text-xl md:text-2xl mb-4 sm:mb-5 text-[#2a2b26] font-staff leading-relaxed font-semibold"
            >
              כל פעילות העמותה נעשית על ידי מתנדבים וללא מקבלי שכר.
            </motion.p>

            {/* Lottie animations row */}
            <motion.div 
              variants={SlidUp(1.3)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="flex flex-row gap-4 justify-center items-center mt-6 sm:mt-8 sm:gap-6 md:gap-10 lg:gap-12"
            >
              {/* Load Lottie web component once on client */}
              <Script
                src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
                strategy="lazyOnload"
              />

              <motion.div
                variants={SlidUpLeft(1.5)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <LottiePlayer
                  src="/animation-json/Donation.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                  style={{ width: 'auto', height: 'auto' }}
                ></LottiePlayer>
              </motion.div>

              <motion.div
                variants={SlidUp(1.7)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <LottiePlayer
                  src="/animation-json/handshake%20blue.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                  style={{ width: 'auto', height: 'auto' }}
                ></LottiePlayer>
              </motion.div>

              <motion.div
                variants={SlidUpRight(1.9)}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <LottiePlayer
                  src="/animation-json/Heart.json"
                  background="transparent"
                  speed="1"
                  loop
                  autoplay
                  className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32"
                  style={{ width: 'auto', height: 'auto' }}
                ></LottiePlayer>
              </motion.div>
            </motion.div>
          </div>
        </ScrollExpandMedia>
      )}

      {/* מרווח גדול בין הטקסט לגלריה */}
      

      {/* גלריה של תמונות פעילות העמותה */}
      <div className="bg-[#fdf6ed] py-2 sm:py-4 md:py-6 lg:py-8 text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter text-center text-[#2a2b26] font-staff mb-6 sm:mb-8 md:mb-10 flex items-center justify-center gap-3">
          תמונות מפעילות העמותה
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 1024 1024" 
            className="sm:w-12 sm:h-12 md:w-14 md:h-14 lg:w-16 lg:h-16"
            fill="currentColor"
          >
            <path d="M 794.965 466.603 c 0 -87.3813 -70.8835 -158.265 -158.265 -158.265 c -48.2418 0 -91.4773 21.6178 -120.491 55.7511 c -29.0133 -34.1333 -72.2489 -55.7511 -120.491 -55.7511 c -87.3813 0 -158.265 70.8835 -158.265 158.265 c 0 45.8525 21.0489 84.3093 50.7449 116.167 l 228.807 219.819 L 741.831 585.159 c 28.2169 -29.696 53.1342 -71.3387 53.1342 -118.557 Z" fill="#ffa9b1" />
            <path d="M 457.387 709.632 c -3.18578 -55.7511 -18.2045 -106.041 -18.7733 -108.089 l -13.6533 4.096 c 0.113778 0.341333 2.048 7.05422 4.66489 17.8631 L 361.813 588.117 c 5.12 -5.46133 8.192 -8.64711 8.41955 -8.76089 l -5.00622 -5.12 l -5.00622 -5.12 c -2.95822 2.84445 -72.5902 71.1111 -91.8187 151.211 c -19.3422 80.896 4.66489 123.904 5.68889 125.725 l 12.4018 -7.05422 c -0.113778 -0.113778 -3.75467 -6.71289 -6.82667 -19.456 l 142.905 -3.86845 c 7.28178 9.78489 16.7253 17.408 28.7858 22.1867 l 5.12 13.312 c 24.1209 -9.32978 41.0738 -28.7858 50.5173 -57.7991 c 7.168 -22.4142 9.89867 -50.6311 7.96445 -83.7405 Z" fill="#9fc8fe" />
            <path d="M 402.773 553.074 m -88.9742 0 a 88.9742 88.9742 0 1 0 177.949 0 a 88.9742 88.9742 0 1 0 -177.949 0 Z" fill="#81b6fe" />
            <path d="M 566.613 709.632 c 3.18578 -55.7511 18.2045 -106.041 18.7733 -108.089 l 13.6533 4.096 c -0.113778 0.341333 -2.048 7.05422 -4.66489 17.8631 l 67.8115 -35.3849 c -5.12 -5.46133 -8.192 -8.64711 -8.41955 -8.76089 l 5.00622 -5.12 l 5.00622 -5.12 c 2.95822 2.84445 72.5902 71.1111 91.8187 151.211 c 19.3422 80.896 -4.66489 123.904 -5.68889 125.725 l -12.4018 -7.05422 c 0.113778 -0.113778 3.75467 -6.71289 6.82667 -19.456 l -142.905 -3.86845 c 7.28178 9.78489 16.7253 17.408 28.7858 22.1867 l -5.12 13.312 c -24.1209 -9.32978 -41.0738 -28.7858 -50.5173 -57.7991 c -7.168 -22.4142 -9.89867 -50.6311 -7.96445 -83.7405 Z" fill="#ff8882" />
            <path d="M 621.227 553.074 m -88.9742 0 a 88.9742 88.9742 0 1 0 177.949 0 a 88.9742 88.9742 0 1 0 -177.949 0 Z" fill="#ff6b6a" />
            <path d="M 9.78503 148.48 v 798.72 h 1012.62 v -798.72 h -1012.62 Z m 943.559 654.677 h -873.813 v -582.542 h 873.813 v 582.542 Z" fill="#e5f1ff" />
          </svg>
        </h2>
      </div>
      
      <div id="photos-videos">
      <HorizontalScrollCarousel
        images={[
          "/pictures/1.webp",
          "/pictures/2.webp",
          "/pictures/3.webp",
          "/pictures/4.webp",
          "/pictures/13.webp",
          "/pictures/6.webp",
          "/pictures/7.webp",
          "/pictures/8.webp",
          "/pictures/9.webp",
          "/pictures/10.webp",
          "/pictures/11.webp",
          "/pictures/12.webp",
          // "/pictures/13.webp", // הוסתר לסדר יפה של 4 תמונות בכל שורה
          // "/pictures/14.webp"  // הוסתר לסדר יפה של 4 תמונות בכל שורה
        ]}
      />
      </div>

      {/* מרווח בין גלריית התמונות למשפחות מספרות */}
      <div className="py-4 sm:py-8 md:py-12 lg:py-20"></div>

      {/* סיפורי משפחות עם עדויות אודיו */}
      <div id="family-testimonials">
      <FamiliesTestimonials />
      </div>

      {/* תרומה - מוצג מיד אחרי משפחות מספרות */}
      <DonationsSection />

      {/* ייעוד העמותה - מוצג אחרי סעיף התרומה ללא מרווח */}
      <div id="organization-purpose">
      <OrganizationPurpose />
      </div>

      {/* סיפור העמותה - מוצג אחרי ייעוד העמותה */}
      <OrganizationStory />
    </div>
  );
};

export default HeroSection;
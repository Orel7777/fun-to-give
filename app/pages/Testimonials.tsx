"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TestimonialsColumn } from "../components/ui/testimonials-columns";
import TestimonialCard from "../components/ui/testimonial-card";

const testimonials = [
  {
    text: "כמות הדגים הייתה גדולה ובאיכות מאד טובה",
    name: "משפחה א'",
    audioPath: "/Families_tell_stories/1.mp3"
  },
  {
    text: "תודה רבה על כל רגע שאתם חושבים ומתכננים איך לתת לנו",
    name: "משפחה ב'",
    audioPath: "/Families_tell_stories/2.mp3"
  },
  {
    text: "זה הציל אותנו ממש בישלנו עם זה את החג",
    name: "משפחה ג'",
    audioPath: "/Families_tell_stories/3.mp3"
  },
  {
    text: "זה מאד עזר!",
    name: "משפחה ד'",
    audioPath: "/Families_tell_stories/4.mp3"
  },
  {
    text: "זה עשה לנו ממש שמחה גדולה",
    name: "משפחה ה'",
    audioPath: "/Families_tell_stories/5.mp3"
  },
  {
    text: "זה ממש הצלת נפשות",
    name: "משפחה ו'",
    audioPath: "/Families_tell_stories/6.mp3"
  },
  {
    text: "בזכות זה יכלנו להכניס אורחים בפורים",
    name: "משפחה ז'",
    audioPath: "/Families_tell_stories/7.mp3"
  }
];

const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 5);
const thirdColumn = testimonials.slice(5, 7);

const FamiliesTestimonials = () => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [animationsPaused, setAnimationsPaused] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  // פונקציה לטיפול בהשמעת אודיו
  const handleAudioPlay = (audioPath: string) => {
    // מצא את האינדקס של העדות לפי הנתיב
    const index = testimonials.findIndex(t => t.audioPath === audioPath);
    if (index === -1) {
      console.error('לא נמצאה עדות עם הנתיב:', audioPath);
      return;
    }

    // עצור כל אודיו אחר
    if (playingAudio) {
      const currentIndex = testimonials.findIndex(t => t.audioPath === playingAudio);
      if (currentIndex !== -1) {
        const currentAudio = document.getElementById(`audio-${currentIndex}`) as HTMLAudioElement;
        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
      }
    }

    // חפש את האלמנט הנוכחי לפי האינדקס
    const audio = document.getElementById(`audio-${index}`) as HTMLAudioElement;
    
    if (audio) {
      if (playingAudio === audioPath) {
        // אם לוחצים על אותו אודיו, עצור אותו
        audio.pause();
        audio.currentTime = 0;
        setPlayingAudio(null);
        setAnimationsPaused(false);
      } else {
        // נגן אודיו חדש ועצור אנימציות
        audio.play().catch((error) => {
          console.error('שגיאה בהשמעת האודיו:', error);
        });
        setPlayingAudio(audioPath);
        setAnimationsPaused(true);
        
        // חזור לאנימציות כשהאודיו נגמר
        audio.onended = () => {
          setPlayingAudio(null);
          setAnimationsPaused(false);
        };
      }
    } else {
      console.error('לא נמצא אלמנט אודיו עבור אינדקס:', index);
    }
  };

  // פונקציות לניווט בקרוסלה
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // מעבר אוטומטי כל 5 שניות (אופציונלי)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!playingAudio) { // רק אם לא משמיעים אודיו
        nextTestimonial();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [playingAudio]);

  // בדיקת קיום קבצי האודיו
  useEffect(() => {
    testimonials.forEach(testimonial => {
      const audio = new Audio();
      audio.src = testimonial.audioPath;
      audio.addEventListener('error', (e) => {
        console.error('שגיאה בקובץ אודיו:', testimonial.audioPath, e);
      });
    });
  }, []);

  // event listener לגלילה - חזור לאנימציות
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (Math.abs(currentScrollY - lastScrollY) > 50 && animationsPaused) {
        setAnimationsPaused(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationsPaused]);

  return (
    <section className="bg-[#fdf6ed] py-20 relative">
      <div className="container z-10 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[640px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border border-[#f5a383] py-2 px-6 rounded-lg bg-white/50 backdrop-blur-sm">
              <span className="text-[#2a2b26] font-staff font-medium">עדויות משפחות</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mt-8 text-center text-[#2a2b26] font-staff">
            סיפורי משפחות מרגשים
          </h2>
          <p className="text-center mt-6 opacity-75 text-lg text-[#2a2b26] font-staff">
            שמעו מה משפחות אומרות על הפעילות שלנו - כל עדות מלווה בהקלטה אמיתית
          </p>
          
          <div className="flex items-center gap-2 mt-4 text-[#f5a383]">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/>
            </svg>
            <span className="text-sm font-staff">לחצו על הסמל כדי לשמוע</span>
          </div>
        </motion.div>

        <div className="mt-16">
          {/* כל אלמנטי האודיו - נסתרים אבל קיימים מחוץ ל-AnimatePresence */}
          <div className="hidden">
            {testimonials.map((testimonial, index) => (
              <audio
                key={index}
                id={`audio-${index}`}
                preload="metadata"
                onError={(e) => console.error('שגיאה בטעינת אודיו:', testimonial.audioPath, e)}
              >
                <source src={testimonial.audioPath} type="audio/mpeg" />
              </audio>
            ))}
          </div>

          {/* תצוגת מובייל - קרוסלה */}
          <div className="md:hidden">
            <div className="mx-auto max-w-sm">
              <AnimatePresence mode="wait">
                <TestimonialCard 
                  key={currentTestimonial}
                  testimonial={testimonials[currentTestimonial]}
                  onAudioPlay={handleAudioPlay}
                  playingAudio={playingAudio}
                />
              </AnimatePresence>
              
              {/* כפתורי ניווט */}
              <div className="flex gap-4 justify-center mt-6">
                <button 
                  onClick={prevTestimonial}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-[#f5a383] hover:bg-[#98c5b1] hover:text-white"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                  </svg>
                </button>
                <button 
                  onClick={nextTestimonial}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-white shadow-md hover:shadow-lg transition-all duration-200 text-[#f5a383] hover:bg-[#98c5b1] hover:text-white"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                  </svg>
                </button>
              </div>
              
              {/* אינדיקטורים */}
              <div className="flex gap-2 justify-center mt-4">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentTestimonial 
                        ? 'bg-[#f5a383] scale-110' 
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
              
              {/* מחוון מספר העדות */}
              <div className="text-center mt-3 text-sm text-[#2a2b26]/60 font-staff">
                {currentTestimonial + 1} מתוך {testimonials.length}
              </div>
            </div>
          </div>

          {/* תצוגת דסקטופ - עמודות */}
          <div className="hidden md:flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
            <TestimonialsColumn 
              testimonials={firstColumn} 
              duration={15} 
              onAudioPlay={handleAudioPlay}
              playingAudio={playingAudio}
              animationsPaused={animationsPaused}
            />
            <TestimonialsColumn 
              testimonials={secondColumn} 
              className="hidden md:block" 
              duration={19} 
              onAudioPlay={handleAudioPlay}
              playingAudio={playingAudio}
              animationsPaused={animationsPaused}
            />
            <TestimonialsColumn 
              testimonials={thirdColumn} 
              className="hidden lg:block" 
              duration={17} 
              onAudioPlay={handleAudioPlay}
              playingAudio={playingAudio}
              animationsPaused={animationsPaused}
            />
          </div>
        </div>
        
        {/* רקע דקורטיבי */}
        <div className="overflow-hidden absolute inset-0 pointer-events-none">
          <div className="absolute top-10 left-10 w-20 h-20 bg-[#f5a383]/10 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#9acdbe]/10 rounded-full blur-xl"></div>
          <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-[#f5a383]/5 rounded-full blur-lg"></div>
        </div>
      </div>
    </section>
  );
};

export default FamiliesTestimonials;
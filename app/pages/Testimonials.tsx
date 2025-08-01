"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { TestimonialsColumn } from "../components/ui/testimonials-columns";

// עדכון כל העדויות עם 7 המשפחות
const allTestimonials = [
  { text: "כמות הדגים הייתה גדולה ובאיכות מאד טובה", name: "משפחה א", audioPath: "/Families_tell_stories/1 - כמות הדגים הייתה גדולה ובאיכות מאד טובה.mp3" },
  { text: "תודה רבה על כל רגע שאתם חושבים ומתכננים איך לתת לנו", name: "משפחה ב", audioPath: "/Families_tell_stories/2 - תודה רבה על כל רגע שאתם חושבים ומתכננים איך לתת לנו.mp3" },
  { text: "זה הציל אותנו ממש בישלנו עם זה את החג", name: "משפחה ג", audioPath: "/Families_tell_stories/3 - זה הציל אותנו ממש בישלנו עם זה את החג .mp3" },
  { text: "זה מאד עזר!", name: "משפחה ד", audioPath: "/Families_tell_stories/4 - זה מאד עזר!.mp3" },
  { text: "זה עשה לנו ממש שמחה גדולה", name: "משפחה ה", audioPath: "/Families_tell_stories/5 - זה עשה לנו ממש שמחה גדולה.mp3" },
  { text: "זה ממש הצלת נפשות", name: "משפחה ו", audioPath: "/Families_tell_stories/6 - זה ממש הצלת נפשות.mp3" },
  { text: "בזכות זה יכלנו להכניס אורחים בפורים", name: "משפחה ז", audioPath: "/Families_tell_stories/7 - בזכות זה יכלנו להכניס אורחים בפורים.mp3" },
];

// חלוקה לעמודות - כולן נראות במובייל
const firstColumn = allTestimonials.slice(0, 3);
const secondColumn = allTestimonials.slice(3, 5);
const thirdColumn = allTestimonials.slice(5, 7);

const FamiliesTestimonials = () => {
  const [playingAudio, setPlayingAudio] = useState<string | null>(null);
  const [animationsPaused, setAnimationsPaused] = useState(false);

  // פונקציה משופרת לטיפול בהשמעת אודיו במובייל
  const handleAudioPlay = async (audioPath: string) => {
    // עצור אודיו קיים
    if (playingAudio && playingAudio !== audioPath) {
      const currentAudio = document.getElementById(playingAudio) as HTMLAudioElement;
      if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
      }
    }

    const audio = document.getElementById(audioPath) as HTMLAudioElement;
    if (!audio) {
      console.error('אלמנט אודיו לא נמצא:', audioPath);
      return;
    }

    try {
      if (playingAudio === audioPath) {
        // עצור אם לוחצים שוב על אותו אודיו
        audio.pause();
        audio.currentTime = 0;
        setPlayingAudio(null);
        setAnimationsPaused(false);
      } else {
        // הגדר אודיו למובייל
        audio.preload = 'auto';
        audio.volume = 1.0;
        
        setPlayingAudio(audioPath);
        setAnimationsPaused(true);
        
        // נסה לנגן
        await audio.play();
        
        // הגדר event listeners
        audio.onended = () => {
          setPlayingAudio(null);
          setAnimationsPaused(false);
        };
        
        audio.onerror = (error) => {
          console.error('שגיאה בניגון אודיו:', error);
          setPlayingAudio(null);
          setAnimationsPaused(false);
        };
      }
    } catch (error) {
      console.error('שגיאה בניגון האודיו:', error);
      
      // נסה עם muted במובייל
      try {
        audio.muted = true;
        await audio.play();
        setTimeout(() => {
          if (audio) {
            audio.muted = false;
          }
        }, 100);
      } catch (mutedError) {
        console.error('נכשל בניגון גם עם muted:', mutedError);
        setPlayingAudio(null);
        setAnimationsPaused(false);
      }
    }
  };

  // event listener לגלילה - חזור לאנימציות
  useEffect(() => {
    let lastScrollY = window.scrollY;
    
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // אם יש גלילה משמעותית (יותר מ-50px) - חזור לאנימציות
      if (Math.abs(currentScrollY - lastScrollY) > 50 && animationsPaused) {
        setAnimationsPaused(false);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [animationsPaused]);

  // הוסר useEffect לבדיקת קבצי אודיו - לא נחוץ ויוצר שגיאות מיותרות

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

        <div className="flex justify-center gap-6 mt-16 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden flex-col md:flex-row">
          <TestimonialsColumn 
            testimonials={firstColumn} 
            duration={15} 
            onAudioPlay={handleAudioPlay}
            playingAudio={playingAudio}
            animationsPaused={animationsPaused}
          />
          <TestimonialsColumn 
            testimonials={secondColumn} 
            duration={19} 
            onAudioPlay={handleAudioPlay}
            playingAudio={playingAudio}
            animationsPaused={animationsPaused}
          />
          <TestimonialsColumn 
            testimonials={thirdColumn} 
            duration={17} 
            onAudioPlay={handleAudioPlay}
            playingAudio={playingAudio}
            animationsPaused={animationsPaused}
          />
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
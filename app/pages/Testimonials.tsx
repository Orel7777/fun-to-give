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

  // פונקציה מתוקנת לטיפול בהשמעת אודיו
  const handleAudioPlay = (audioPath: string) => {
    console.log('🔄 מנסה להשמיע:', audioPath);
    
    // מצא את האינדקס של העדות לפי הנתיב
    const index = testimonials.findIndex(t => t.audioPath === audioPath);
    if (index === -1) {
      console.error('❌ לא נמצאה עדות עם הנתיב:', audioPath);
      return;
    }
    console.log('✅ נמצא אינדקס:', index);

    // עצור כל אודיו אחר
    if (playingAudio) {
      const currentIndex = testimonials.findIndex(t => t.audioPath === playingAudio);
      if (currentIndex !== -1) {
        // עצור את כל האלמנטים האפשריים
        const possibleIds = [`audio-${currentIndex}`, `mobile-audio-${currentIndex}`];
        possibleIds.forEach(id => {
          const audioElement = document.getElementById(id) as HTMLAudioElement;
          if (audioElement) {
            audioElement.pause();
            audioElement.currentTime = 0;
            console.log('⏸️ עצר אודיו:', id);
          }
        });
      }
    }

    // זיהוי סוג המכשיר ובחירת האלמנט המתאים
    const isMobile = window.innerWidth < 768;
    const primaryAudioId = isMobile ? `mobile-audio-${index}` : `audio-${index}`;
    const fallbackAudioId = isMobile ? `audio-${index}` : `mobile-audio-${index}`;
    
    let audio = document.getElementById(primaryAudioId) as HTMLAudioElement;
    
    // אם לא מצא, נסה את האלמנט החלופי
    if (!audio) {
      audio = document.getElementById(fallbackAudioId) as HTMLAudioElement;
      console.log(`🔄 לא נמצא ${primaryAudioId}, מנסה ${fallbackAudioId}:`, !!audio);
    }
    
    if (audio) {
      if (playingAudio === audioPath) {
        // אם לוחצים על אותו אודיו, עצור אותו
        audio.pause();
        audio.currentTime = 0;
        setPlayingAudio(null);
        setAnimationsPaused(false);
        console.log('⏸️ עצר אותו אודיו');
      } else {
        // פונקציה להשמעת האודיו עם טיפול משופר בשגיאות
        const playAudio = () => {
          // וודא שהאודיו תקין לפני השמעה
          if (audio.error) {
            console.error('❌ האודיו כבר בשגיאה, מנסה לטעון מחדש...');
            audio.load();
            return;
          }
          
          const playPromise = audio.play();
          
          if (playPromise !== undefined) {
            playPromise.then(() => {
              console.log('✅ האודיו התחיל להתנגן בהצלחה');
              setPlayingAudio(audioPath);
              setAnimationsPaused(true);
            }).catch((error) => {
              console.error('❌ שגיאה בהשמעת האודיו:', error);
              console.error('פרטי השגיאה:', {
                name: error.name,
                message: error.message,
                code: error.code,
                audioError: audio.error,
                networkState: audio.networkState,
                readyState: audio.readyState,
                src: audio.src,
                currentSrc: audio.currentSrc
              });
              
              // נסה לטעון מחדש ולהשמיע שוב
              console.log('🔄 מנסה לטעון מחדש...');
              audio.load();
              setTimeout(() => {
                if (audio.readyState >= 3) {
                  audio.play().catch(retryError => {
                    console.error('❌ שגיאה גם בניסיון החוזר:', retryError);
                  });
                }
              }, 500);
            });
          }
        };

        // בדוק אם האודיו מוכן להשמעה
        if (audio.readyState >= 3) { // HAVE_FUTURE_DATA
          playAudio();
        } else {
          // אם האודיו לא מוכן, חכה שיטען
          console.log('⏳ ממתין לטעינת האודיו...');
          audio.addEventListener('canplay', playAudio, { once: true });
          audio.load(); // אלץ טעינה מחדש
        }
        
        // חזור לאנימציות כשהאודיו נגמר
        audio.onended = () => {
          setPlayingAudio(null);
          setAnimationsPaused(false);
          console.log('🏁 האודיו הסתיים');
        };
      }
    } else {
      console.error('❌ לא נמצא אלמנט אודיו עבור אינדקס:', index);
      // בדוק אילו אלמנטי אודיו קיימים
      const allAudios = document.querySelectorAll('audio');
      console.log('📋 כל אלמנטי האודיו הקיימים:', Array.from(allAudios).map(a => ({ id: a.id, src: a.src })));
    }
  };

  // פונקציות לניווט בקרוסלה
  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // מעבר אוטומטי כל 5 שניות (רק אם לא משמיעים אודיו)
  useEffect(() => {
    const interval = setInterval(() => {
      if (!playingAudio) {
        nextTestimonial();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [playingAudio]);

  // בדיקת קיום קבצי האודיו עם טיפול משופר בשגיאות
  useEffect(() => {
    console.log('🔍 בודק קבצי אודיו...');
    
    const fileSizes = {
      '1.mp3': '280KB',
      '2.mp3': '2.0MB',
      '3.mp3': '423KB',
      '4.mp3': '549KB',
      '5.mp3': '258KB',
      '6.mp3': '154KB',
      '7.mp3': '317KB'
    };
    
    testimonials.forEach((testimonial, index) => {
      const fileName = testimonial.audioPath.split('/').pop() || 'unknown.mp3';
      const fileSize = fileSizes[fileName as keyof typeof fileSizes] || 'לא ידוע';
      console.log(`📁 בודק קובץ ${index + 1}: ${fileName} (${fileSize}) - ${testimonial.text.length} תווים`);
      
      // בדיקה באמצעות fetch API
      fetch(testimonial.audioPath, { method: 'HEAD' })
        .then(response => {
          if (response.ok) {
            console.log(`✅ קובץ קיים: ${fileName} (${response.headers.get('content-length')} bytes)`);
          } else {
            console.error(`❌ קובץ לא נמצא: ${fileName} - סטטוס: ${response.status}`);
          }
        })
        .catch(error => {
          console.error(`❌ שגיאה בבדיקת קובץ: ${fileName}`, error);
        });
      
      // בדיקה נוספת עם Audio object
      const audio = new Audio();
      audio.preload = 'metadata';
      
      audio.addEventListener('loadstart', () => {
        console.log(`🔄 מתחיל לטעון: ${testimonial.audioPath}`);
      });
      
      audio.addEventListener('canplaythrough', () => {
        console.log(`✅ Audio object מוכן: ${testimonial.audioPath}`);
      });
      
      audio.addEventListener('error', (e) => {
        const errorDetails = {
          code: audio.error?.code,
          message: audio.error?.message,
          networkState: audio.networkState,
          readyState: audio.readyState,
          src: audio.src
        };
        console.error(`❌ שגיאה ב-Audio object: ${testimonial.audioPath}`, errorDetails);
      });
      
      // הגדר את המקור רק אחרי הגדרת ה-listeners
      audio.src = testimonial.audioPath;
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
          {/* תצוגת מובייל - קרוסלה מתוקנת */}
          <div className="md:hidden">
            {/* כל אלמנטי האודיو למובייל - תמיד קיימים */}
            {testimonials.map((testimonial, index) => (
              <audio
                key={`mobile-audio-${index}`}
                id={`mobile-audio-${index}`}
                preload="metadata"
                className="hidden"
                onLoadStart={() => console.log(`🔄 מובייל מתחיל לטעון: ${testimonial.audioPath}`)}
                onCanPlay={() => console.log(`✅ מובייל מוכן: ${testimonial.audioPath}`)}
                onError={(e) => console.error(`❌ שגיאה במובייל: ${testimonial.audioPath}`, e)}
              >
                <source src={testimonial.audioPath} type="audio/mpeg" />
              </audio>
            ))}

            <div className="mx-auto max-w-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentTestimonial}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full"
                >
                  <TestimonialCard 
                    testimonial={testimonials[currentTestimonial]}
                    onAudioPlay={handleAudioPlay}
                    playingAudio={playingAudio}
                  />
                </motion.div>
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
            {/* אלמנטי אודיו לדסקטופ - עם טיפול משופר בשגיאות */}
            <div className="hidden">
              {testimonials.map((testimonial, index) => (
                <audio
                  key={`desktop-audio-${index}`}
                  id={`audio-${index}`}
                  preload="metadata"
                  onLoadStart={(_e) => {
                    console.log(`🔄 דסקטופ מתחיל לטעון: ${testimonial.audioPath}`);
                  }}
                  onCanPlay={(_e) => {
                    console.log(`✅ דסקטופ מוכן: ${testimonial.audioPath}`);
                  }}
                  onError={(e) => {
                    const audio = e.target as HTMLAudioElement;
                    const errorDetails = {
                      code: audio.error?.code,
                      message: audio.error?.message,
                      networkState: audio.networkState,
                      readyState: audio.readyState,
                      src: audio.src,
                      currentSrc: audio.currentSrc
                    };
                    console.error(`❌ שגיאה בדסקטופ: ${testimonial.audioPath}`, errorDetails);
                    
                    // נסה לטעון שוב אחרי 1 שנייה
                    setTimeout(() => {
                      console.log(`🔄 מנסה לטעון שוב: ${testimonial.audioPath}`);
                      audio.load();
                    }, 1000);
                  }}
                  onLoadedData={(_e) => {
                    console.log(`📊 נתונים נטענו לדסקטופ: ${testimonial.audioPath}`);
                  }}
                  onStalled={(_e) => {
                    console.warn(`⚠️ טעינה תקועה לדסקטופ: ${testimonial.audioPath}`);
                  }}
                  onSuspend={(_e) => {
                    console.warn(`⏸️ טעינה הושעתה לדסקטופ: ${testimonial.audioPath}`);
                  }}
                >
                  <source src={testimonial.audioPath} type="audio/mpeg" />
                  <source src={testimonial.audioPath} type="audio/mp3" />
                  <source src={testimonial.audioPath} type="audio/wav" />
                </audio>
              ))}
            </div>

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
"use client";

import React from "react";
import { motion } from "framer-motion";

const TestimonialCard = ({ testimonial, onAudioPlay, playingAudio }) => {
  const isPlaying = playingAudio === testimonial.audioPath;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 relative overflow-hidden"
    >
      {/* רקע דקורטיבי */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#f5a383]/10 to-transparent rounded-bl-full"></div>
      
      {/* תוכן העדות */}
      <div className="relative z-10">
        {/* טקסט העדות */}
        <blockquote className="text-[#2a2b26] text-lg font-staff leading-relaxed mb-4 text-right">
          "{testimonial.text}"
        </blockquote>
        
        {/* פרטי המשפחה וכפתור השמעה */}
        <div className="flex items-center justify-between mt-4">
          <button
            onClick={() => onAudioPlay(testimonial.audioPath)}
            className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
              isPlaying 
                ? 'bg-[#98c5b1] text-white shadow-lg scale-110' 
                : 'bg-[#f5a383]/10 text-[#f5a383] hover:bg-[#98c5b1] hover:text-white hover:scale-105'
            }`}
          >
            {isPlaying ? (
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z"/>
              </svg>
            ) : (
              <svg className="w-5 h-5 mr-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z"/>
              </svg>
            )}
          </button>
          
          <div className="text-right">
            <div className="font-semibold text-[#2a2b26] font-staff">{testimonial.name}</div>
            <div className="text-sm text-[#f5a383] font-staff">לחץ לשמיעה</div>
          </div>
        </div>
      </div>
      
      {/* אלמנט אודיו נסתר */}
      <audio
        id={testimonial.audioPath}
        preload="metadata"
        className="hidden"
      >
        <source src={testimonial.audioPath} type="audio/mpeg" />
      </audio>
      
      {/* אנימציה של גלים כשמשמיעים */}
      {isPlaying && (
        <div className="absolute bottom-2 left-2 flex gap-1">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 h-4 bg-[#98c5b1] rounded-full"
              animate={{
                scaleY: [1, 2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{ 
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default TestimonialCard; 
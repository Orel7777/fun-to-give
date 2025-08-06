"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"

interface HorizontalScrollCarouselProps {
  images: string[]
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ images }) => {
  return (
    <div className="overflow-x-hidden bg-[#fdf6ed] py-2 sm:py-8 md:py-12 lg:py-16">
      <div className="container mx-auto px-4">


        {/* גלריה מרשימה */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6 lg:gap-8 xl:gap-10">
          {images.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Card
                src={src}
                index={index}
              />
            </motion.div>
          ))}
        </div>


      </div>
    </div>
  )
}

const Card: React.FC<{ src: string; index: number }> = ({ src, index }) => {
  const [isPressed, setIsPressed] = React.useState(false)
  const [isHovered, setIsHovered] = React.useState(false)

  const handleMouseDown = () => {
    setIsPressed(true)
  }

  const handleMouseUp = () => {
    setIsPressed(false)
  }

  const handleMouseLeave = () => {
    setIsPressed(false)
    setIsHovered(false)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  return (
    <motion.div 
      className="group relative overflow-hidden rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-out cursor-pointer aspect-square max-w-[160px] sm:max-w-[200px] md:max-w-[280px] lg:max-w-[320px] xl:max-w-[360px] mx-auto"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      whileHover={{ 
        scale: 1.05,
        y: -8,
        transition: { duration: 0.3 }
      }}
      whileTap={{ 
        scale: 1.1,
        transition: { duration: 0.1 }
      }}
    >
      {/* רקע זוהר */}
      <div className={`absolute inset-0 bg-gradient-to-br from-[#f5a383]/20 to-[#9acdbe]/20 transition-all duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      
      {/* מסגרת זוהרת */}
      <div className={`absolute inset-0 rounded-2xl border-2 transition-all duration-500 ${
        isHovered 
          ? 'border-[#f5a383]/50 shadow-[0_0_30px_rgba(245,163,131,0.3)]' 
          : 'border-transparent'
      }`} />

      <Image
        src={src}
        fill
        style={{ objectFit: "cover" }}
        alt={`תמונה ${index + 1} מפעילות העמותה`}
        className={`transition-all duration-300 ease-out ${
          isPressed 
            ? 'scale-110' 
            : isHovered ? 'scale-105' : 'scale-100'
        }`}
      />
      
      {/* אוברליי עם גרדיאנט */}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent transition-all duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} />
      


      {/* אפקט זוהר בלחיצה */}
      {isPressed && (
        <motion.div
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#f5a383]/30 to-[#9acdbe]/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* אפקט חלקיקים בהובר */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/60 rounded-full"
              initial={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: 0,
                scale: 0
              }}
              animate={{ 
                x: Math.random() * 100, 
                y: Math.random() * 100,
                opacity: [0, 1, 0],
                scale: [0, 1, 0]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3
              }}
            />
          ))}
        </div>
      )}
    </motion.div>
  )
}

export { HorizontalScrollCarousel };
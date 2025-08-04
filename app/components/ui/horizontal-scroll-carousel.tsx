"use client"

import * as React from "react"
import { motion, useTransform, useScroll } from "framer-motion"
import Image from "next/image"

interface HorizontalScrollCarouselProps {
  images: string[]
}

const HorizontalScrollCarousel: React.FC<HorizontalScrollCarouselProps> = ({ images }) => {
  const targetRef = React.useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(scrollYProgress, [0, 1], ["5%", "95%"])

  return (
    <>
      {/* תצוגת מובייל - גלילה חופשית */}
      <div className="md:hidden bg-[#fdf6ed] py-6 sm:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            {images.map((src, index) => (
              <Card
                src={src}
                key={src}
                index={index}
                isMobile={true}
              />
            ))}
          </div>
        </div>
      </div>

      {/* תצוגת דסקטופ - אפקט גלילה אופקית */}
      <section
        ref={targetRef}
        className="relative h-[400vh] w-full hidden md:block"
      >
        <div className="flex overflow-hidden sticky top-0 items-center h-screen">
          <motion.div
            style={{ x }}
            className="flex gap-4"
          >
            {images.map((src, index) => (
              <Card
                src={src}
                key={src}
                index={index}
                isMobile={false}
              />
            ))}
          </motion.div>
        </div>
      </section>
    </>
  )
}

const Card: React.FC<{ src: string; index: number; isMobile: boolean }> = ({ src, index, isMobile }) => {
  return (
    <div className={`group relative overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300 ${
      isMobile 
        ? 'h-40 sm:h-48 w-full aspect-square' 
        : 'h-[450px] w-[450px]'
    }`}>
      <Image
        src={src}
        fill
        style={{ objectFit: "cover" }}
        alt={`תמונה ${index + 1} מפעילות העמותה`}
        className="transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 transition-colors duration-300 bg-black/20 group-hover:bg-black/10" />
    </div>
  )
}

export { HorizontalScrollCarousel };
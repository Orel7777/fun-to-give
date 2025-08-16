"use client"

import { motion, useScroll, useTransform, useInView } from "framer-motion"
import { HandHeart, Building2, Target } from "lucide-react"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/MovingBorder"
import Lottie from "lottie-react"
import animationA from "../../public/animation-json/A.json"
import animationB from "../../public/animation-json/B.json"
import animationC from "../../public/animation-json/C.json"
import { useRef, useState, useEffect } from "react"
import Reveal from "../components/Reveal"

export default function OrganizationPurpose() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const yTransform = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacityTransform = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  
  const purposes = [
    {
      icon: Target,
      animation: animationA,
      title: "ערבות הדדית",
      description: "מטרתנו היא לחזר את הערבות הדדית של תושבי מדינת ישראל",
      color: "from-[#9dd0bf] to-[#f5a383]",
    },
    {
      icon: HandHeart,
      animation: animationB,
      title: "חיבור וסיוע",
      description: "על ידי יצירת חיבור בין כל מי שרוצה לסייע לכל מי שזקוק לסיוע",
      color: "from-[#f5a383] to-[#e2cdbd]",
    },
    {
      icon: Building2,
      animation: animationC,
      title: "בניית חברה",
      description: "ההתנדבות היא המפתח לחיזוק הערבות ההדדית ולבניית חברה טובה וחזקה יותר",
      color: "from-[#e2cdbd] to-[#9dd0bf]",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 60,
      rotateX: -15,
      scale: 0.9,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 12,
        duration: 0.8,
      },
    },
  }

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 120,
        damping: 10,
      },
    },
  }

  return (
    <motion.section
      id="ייעוד-העמותה"
      ref={ref}
      className="overflow-hidden px-4 pt-0 pb-16"
      dir="rtl"
      style={{ opacity: opacityTransform }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div
          className="pt-16 mb-12 text-center"
        >
          {/* מרווח במקום האייקון - שומר על אותו מרחק */}
  

          <Reveal as="h2" type="heading" className="mb-4 text-2xl font-bold tracking-tighter text-[#2a2b26] font-staff sm:text-3xl md:text-4xl lg:text-5xl flex items-center justify-center gap-3">
            ייעוד העמותה
            <motion.svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="lucide lucide-bird-icon lucide-bird sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12"
              animate={{
                y: [0, -8, 0],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.5,
              }}
              whileHover={{
                scale: 1.2,
                rotate: 360,
                transition: { duration: 0.6 },
              }}
            >
              <path d="M16 7h.01"/>
              <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 20"/>
              <path d="m20 7 2 .5-2 .5"/>
              <path d="M10 18v3"/>
              <path d="M14 17.75V21"/>
              <path d="M7 18a6 6 0 0 0 3.84-10.61"/>
            </motion.svg>
          </Reveal>

          <div
            className="w-24 h-1 bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] mx-auto rounded-full"
          />
        </div>

        {/* Purpose Cards */}
        <motion.div
          className="grid grid-cols-1 gap-4 h-full sm:grid-cols-2 lg:grid-cols-3 sm:gap-4 lg:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {purposes.map((purpose, index) => {
            const IconComponent = purpose.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  rotateY: 5,
                  scale: 1.02,
                  transition: { type: "spring", stiffness: 300 },
                }}
                whileTap={{ scale: 0.98 }}
                style={{ y: yTransform }}
                className="w-full"
              >
                <Button
                  duration={Math.floor(Math.random() * 10000) + 10000}
                  borderRadius="1.75rem"
                  style={{
                    background: "#ffffff",
                    borderRadius: `calc(1.75rem* 0.96)`,
                    border: "2px solid #9acdbe",
                    width: "100%",
                  }}
                  className="!w-full block text-black dark:text-white border-neutral-200 dark:border-slate-800 min-h-[220px] h-[220px] sm:h-[210px] md:h-[260px] lg:h-[300px]"
                >
                  <div className="flex flex-col gap-2 justify-between items-center p-3 py-4 h-full sm:p-1 sm:py-2 md:p-2 md:py-3 lg:p-3 xl:p-6 sm:gap-1 md:gap-2">
                    <div className="flex justify-center mb-3">
                      <Reveal type="media" as="div">
                        <motion.div
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0],
                          }}
                          transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.5,
                          }}
                          whileHover={{
                            scale: 1.2,
                            rotate: 15,
                            transition: { duration: 0.3 },
                          }}
                        >
                          <Lottie
                            animationData={purpose.animation}
                            loop={true}
                            autoplay={true}
                            className="w-12 h-12 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 xl:w-16 xl:h-16"
                          />
                        </motion.div>
                      </Reveal>
                    </div>

                    <div className="flex flex-col flex-1 justify-center items-center w-full space-y-2">
                      <Reveal as="h3" type="heading" className="text-sm sm:text-xs md:text-sm lg:text-lg xl:text-xl 2xl:text-2xl font-bold tracking-tighter text-[#2a2b26] font-staff text-center">
                        <motion.span
                          animate={{
                            color: ["#2a2b26", "#9dd0bf", "#2a2b26"],
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            delay: index * 0.7,
                          }}
                        >
                          {purpose.title}
                        </motion.span>
                      </Reveal>

                      <Reveal as="p" type="paragraph" className="text-xs sm:text-[10px] md:text-xs lg:text-sm xl:text-base 2xl:text-lg text-[#2a2b26] leading-relaxed text-center px-2 flex-1 flex items-center">
                        {purpose.description}
                      </Reveal>
                    </div>
                  </div>
                </Button>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Bottom decorative element */}
        <motion.div
          className="flex justify-center mt-12"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          transition={{ duration: 1, delay: 1.8 }}
          style={{ y: yTransform }}
        >
          <motion.div
            className="flex gap-4 justify-center items-center sm:gap-6"
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            whileHover={{
              scale: 1.5,
              transition: { duration: 0.3 },
            }}
          >
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="w-3 h-3 sm:w-4 sm:h-4 rounded-full bg-gradient-to-r from-[#f5a383] to-[#9dd0bf]"
                animate={{
                  opacity: [0.3, 1, 0.3],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: i * 0.3,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.5,
                  opacity: 1,
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}

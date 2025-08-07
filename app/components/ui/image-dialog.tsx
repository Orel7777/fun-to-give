"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { createPortal } from "react-dom"

interface ImageDialogProps {
  images: string[]
  isOpen: boolean
  currentIndex: number
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

const ImageDialog: React.FC<ImageDialogProps> = ({
  images,
  isOpen,
  currentIndex,
  onClose,
  onNext,
  onPrev
}) => {
  const [buttonPressed, setButtonPressed] = React.useState<'prev' | 'next' | null>(null)
  const [isNavigating, setIsNavigating] = React.useState(false)

  const handleNext = React.useCallback(() => {
    if (isNavigating) return
    
    setIsNavigating(true)
    setButtonPressed('next')
    onNext()
    
    setTimeout(() => {
      setButtonPressed(null)
      setIsNavigating(false)
    }, 300)
  }, [isNavigating, onNext])

  const handlePrev = React.useCallback(() => {
    if (isNavigating) return
    
    setIsNavigating(true)
    setButtonPressed('prev')
    onPrev()
    
    setTimeout(() => {
      setButtonPressed(null)
      setIsNavigating(false)
    }, 300)
  }, [isNavigating, onPrev])

  // מניעת גלילה ברקע כשהדיאלוג פתוח
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // טיפול בלחיצות מקלדת
  React.useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return
      
      switch (e.key) {
        case 'Escape':
          onClose()
          break
        case 'ArrowRight':
          handleNext()
          break
        case 'ArrowLeft':
          handlePrev()
          break
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen, onClose, handleNext, handlePrev])

  if (!isOpen) {
    return null
  }

  const dialogContent = (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* רקע מטושטש של האתר */}
        <motion.div
          className="absolute inset-0 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* תוכן הדיאלוג */}
        <motion.div
          className="relative z-50 flex flex-col items-center justify-center max-w-7xl mx-auto h-screen"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ 
            type: "spring", 
            stiffness: 300, 
            damping: 30,
            duration: 0.3 
          }}
        >
          {/* מיכל התמונה עם כפתורים */}
          <div className="flex items-center justify-center gap-3 sm:gap-6 w-full">
            {/* כפתור שמאל (תמונה קודמת) */}
            <motion.button
              onClick={handlePrev}
              disabled={isNavigating}
              className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm ${
                buttonPressed === 'prev' 
                  ? 'bg-[#9acdbe] text-white' 
                  : 'bg-white/90 text-[#f5a383] hover:bg-[#98c5b1] hover:text-white'
              } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: isNavigating ? 1 : 1.1 }}
              whileTap={{ scale: isNavigating ? 1 : 0.95 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
              </svg>
            </motion.button>

            {/* מיכל התמונה */}
            <div className="relative flex-1 max-w-5xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  className="relative flex items-center justify-center"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 300, 
                    damping: 30,
                    duration: 0.4 
                  }}
                >
                  <Image
                    src={images[currentIndex]}
                    width={1400}
                    height={1000}
                    style={{ 
                      objectFit: "cover", 
                      width: "100%", 
                      height: "70vh",
                      maxWidth: "90vw",
                      maxHeight: "70vh"
                    }}
                    alt={`תמונה ${currentIndex + 1} מפעילות העמותה`}
                    className="rounded-lg"
                    priority
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* כפתור ימין (תמונה הבאה) */}
            <motion.button
              onClick={handleNext}
              disabled={isNavigating}
              className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm ${
                buttonPressed === 'next' 
                  ? 'bg-[#9acdbe] text-white' 
                  : 'bg-white/90 text-[#f5a383] hover:bg-[#98c5b1] hover:text-white'
              } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: isNavigating ? 1 : 1.1 }}
              whileTap={{ scale: isNavigating ? 1 : 0.95 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
              </svg>
            </motion.button>
          </div>

          {/* נקודות ניווט וכפתור סגירה */}
          <motion.div 
            className="flex flex-col items-center justify-center mt-6 space-y-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {/* נקודות ניווט */}
            <div className="flex justify-center space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (index !== currentIndex && !isNavigating) {
                      // מעבר ישיר לתמונה
                      const diff = index - currentIndex
                      if (diff > 0) {
                        for (let i = 0; i < diff; i++) {
                          setTimeout(() => handleNext(), i * 100)
                        }
                      } else {
                        for (let i = 0; i < Math.abs(diff); i++) {
                          setTimeout(() => handlePrev(), i * 100)
                        }
                      }
                    }
                  }}
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-200 ${
                    index === currentIndex 
                      ? 'bg-[#f5a383] scale-125' 
                      : 'bg-white/50 hover:bg-white/70'
                  }`}
                  disabled={isNavigating}
                />
              ))}
            </div>
            
            {/* כפתור סגירה */}
            <motion.button
              onClick={onClose}
              disabled={isNavigating}
              className={`flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 backdrop-blur-sm ${
                'bg-white/90 text-[#f5a383] hover:bg-[#98c5b1] hover:text-white'
              } ${isNavigating ? 'opacity-50 cursor-not-allowed' : ''}`}
              whileHover={{ scale: isNavigating ? 1 : 1.1 }}
              whileTap={{ scale: isNavigating ? 1 : 0.95 }}
            >
              <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </motion.div>
        </motion.div>


      </motion.div>
    </AnimatePresence>
















  )

  // השתמש ב-portal כדי לוודא שהדיאלוג יופיע מעל הכל
  return typeof document !== 'undefined' 
    ? createPortal(dialogContent, document.body)
    : null
}

export { ImageDialog }

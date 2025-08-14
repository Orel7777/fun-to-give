import { Mail, MapPin, Phone } from "lucide-react"
import Script from "next/script"
import { motion } from "framer-motion"
import { SlidUp } from "../lib/utils"

export default function Footer() {
  return (
    <div className="min-h-screen bg-[#fdf6ed] relative overflow-hidden">
      {/* Lottie web component loader */}
      <Script
        src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"
        strategy="afterInteractive"
      />
      {/* Background texture overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder-gierp.png')] opacity-10 mix-blend-overlay"></div>

      {/* Main content container */}
      <div className="flex relative z-10 flex-col min-h-screen">




        {/* Footer section */}
        <footer className="pb-8">
          <div className="container px-6 mx-auto">
            <div className="flex justify-start" style={{ marginTop: '100px' }}>
              {/* Contact section - moved to right */}
                             <motion.div
                  className="space-y-8 max-w-md"
                  variants={SlidUp(0)}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                >
                 <h2 className="text-4xl md:text-5xl font-light text-[#f5a383] tracking-wide text-right mt-8 flex items-center justify-start gap-4" dir="rtl">
                   צור קשר
                   <div className="flex justify-center items-center w-12 h-12 md:w-16 md:h-16">
                     {/* @ts-expect-error - custom element */}
                     <lottie-player
                       autoplay
                       loop
                       mode="normal"
                       src="/animation-json/Love2.json"
                       style={{ width: '100%', height: '100%' }}
                     />
                   </div>
                 </h2>

                                 {/* Social media icons */}
                 <div className="flex justify-start mt-8 space-x-6">
                   <div className="w-14 h-14 rounded-full border border-[#f5a383]/30 flex items-center justify-center hover:bg-[#9acdbe] hover:border-[#9acdbe] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer">
                     <svg className="w-7 h-7 text-[#f5a383] hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43V7.56a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.99z" />
                     </svg>
                   </div>
                   <div className="w-14 h-14 rounded-full border border-[#f5a383]/30 flex items-center justify-center hover:bg-[#9acdbe] hover:border-[#9acdbe] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer">
                     <svg className="w-7 h-7 text-[#f5a383] hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                     </svg>
                   </div>
                   <div className="w-14 h-14 rounded-full border border-[#f5a383]/30 flex items-center justify-center hover:bg-[#9acdbe] hover:border-[#9acdbe] hover:scale-110 active:scale-95 transition-all duration-200 cursor-pointer">
                     <svg className="w-7 h-7 text-[#f5a383] hover:text-white transition-colors duration-200" viewBox="0 0 24 24" fill="currentColor">
                       <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                     </svg>
                   </div>
                 </div>

                {/* Contact information */}
                <div className="space-y-8 text-left" dir="rtl">
                  

                                     <div className="flex items-start space-x-4">
                     <Mail className="w-7 h-7 text-[#f5a383] mt-1 flex-shrink-0" />
                     <div>
                       <p className="text-[#f5a383]/80 text-lg">keflatet@gmail.com</p>
                     </div>
                   </div>

                   <div className="flex items-start space-x-4">
                     <MapPin className="w-7 h-7 text-[#f5a383] mt-1 flex-shrink-0" />
                     <div>
                       <p className="text-[#f5a383]/80 text-lg">חולדה הנביאה 10, ירושלים מיקוד 9511010</p>
                     </div>
                   </div>

                   <div className="flex items-start space-x-4">
                     <Phone className="w-7 h-7 text-[#f5a383] mt-1 flex-shrink-0" />
                     <div>
                       <p className="text-[#f5a383]/80 text-lg">053-221-7895</p>
                     </div>
                   </div>
                </div>
              </motion.div>
            </div>


          </div>
        </footer>
      </div>
    </div>
  )
}

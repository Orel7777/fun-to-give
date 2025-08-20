"use client"

import { ContactForm } from "../pages/Contact-form"
import { motion } from "framer-motion"
import { SlidUpRight } from "../lib/utils"
import { Button } from "../components/ui/button"
import { useRouter } from "next/navigation"

export default function ContactFormPage() {
  const router = useRouter()

  const handleBackToSite = () => {
    router.push("/")
  }
  // 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <motion.div
          variants={SlidUpRight(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <ContactForm />
        </motion.div>
        
        {/* Back to Site Button - Outside the form frame */}
        <motion.div
          variants={SlidUpRight(0.2)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="flex justify-center mt-8"
        >
          <Button
            onClick={handleBackToSite}
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg font-medium font-staff"
          >
            חזרה לאתר
          </Button>
        </motion.div>
      </div>
    </div>
  )
}

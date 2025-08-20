"use client"

import { ContactForm } from "../pages/Contact-form"
import { motion } from "framer-motion"
import { SlidUpRight } from "../lib/utils"

export default function ContactFormPage() {
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
      </div>
    </div>
  )
}

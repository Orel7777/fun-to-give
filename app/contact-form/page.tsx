"use client"

import { ContactForm } from "../pages/Contact-form"

export default function ContactFormPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <ContactForm />
        </div>
      </div>
    </div>
  )
}

"use client"

import React, { useState } from "react"
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

export default function ContactFormPage() {
  const [formData, setFormData] = useState({
    subject: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    notifications: false,
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Build email content
    const to = "keflatet@gmail.com"
    const subject = formData.subject || "פנייה מאתר כיף לתת"
    const bodyLines = [
      `שם פרטי: ${formData.firstName}`,
      `שם משפחה: ${formData.lastName}`,
      `טלפון: ${formData.phone}`,
      `אימייל: ${formData.email}`,
      `הודעה:`,
      formData.message,
      "",
      `קבלת הודעות: ${formData.notifications ? "כן" : "לא"}`,
    ]
    const body = encodeURIComponent(bodyLines.join("\n"))
    const subjectEncoded = encodeURIComponent(subject)

    // Open default mail client
    const mailto = `mailto:${to}?subject=${subjectEncoded}&body=${body}`
    window.location.href = mailto
  }

  return (
    <main className="min-h-screen bg-[#fdf6ed] py-14">
      <div className="container mx-auto px-4 max-w-5xl">
        <h1 className="text-center text-3xl md:text-4xl font-light text-[#f5a383] mb-10">דברו איתנו</h1>

        {/* Back to site button */}
        <div className="mb-6 flex justify-center">
          <Button asChild variant="outline" className="rounded-full px-6">
            <Link href="/">חזרה לאתר</Link>
          </Button>
        </div>

        <div className="bg-white/80 rounded-2xl shadow-sm border border-[#f5a383]/20 p-6 md:p-10">
          <form onSubmit={handleSubmit} className="space-y-6" dir="rtl">
            <div className="text-center mb-4">
              <h2 className="text-xl font-medium text-gray-700">נושא לחבר</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* First Name Dropdown (native select instead of custom Select) */}
              <div>
                <select
                  className="w-full h-12 px-3 border border-gray-300 rounded-md text-right bg-white focus:outline-none focus:ring-2 focus:ring-[#9acdbe]"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                >
                  <option value="">שם פרטי</option>
                  <option value="מר">מר</option>
                  <option value="גברת">גברת</option>
                  <option value="גב'">גב'</option>
                </select>
              </div>

              {/* Subject Field */}
              <div>
                <Input
                  type="text"
                  placeholder="נושא הפנייה"
                  className="text-right h-12 border-gray-300"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Phone */}
              <div>
                <Input
                  type="tel"
                  placeholder="מס' נייד"
                  className="text-right h-12 border-gray-300"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              {/* Last Name */}
              <div>
                <Input
                  type="text"
                  placeholder="שם משפחה"
                  className="text-right h-12 border-gray-300"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Input
                type="email"
                placeholder="אימייל"
                className="text-right h-12 border-gray-300"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            {/* Message */}
            <div>
              <Textarea
                placeholder="פירוט הבעיה"
                className="text-right min-h-[120px] resize-none border-gray-300"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            {/* Notifications checkbox (native) */}
            <div className="flex items-center gap-3 justify-end">
              <label htmlFor="notifications" className="text-sm text-gray-600 cursor-pointer">
                אני רוצה לקבל הודעות
              </label>
              <input
                id="notifications"
                type="checkbox"
                checked={formData.notifications}
                onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
                className="w-4 h-4 text-[#9acdbe] bg-gray-100 border-gray-300 rounded focus:ring-[#9acdbe]"
              />
            </div>

            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-16 py-3 rounded-full text-lg font-medium"
              >
                שליחה
              </Button>
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}

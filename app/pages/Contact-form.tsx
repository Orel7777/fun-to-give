"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

export function ContactForm() {
  const [formData, setFormData] = useState({
    subject: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    message: "",
    notifications: false,
  })

  const [submitting, setSubmitting] = useState(false)
  const [sent, setSent] = useState<null | boolean>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSent(null)
    setError(null)
    try {
      // Basic client validation
      if (!formData.email && !formData.phone) {
        throw new Error("נא למלא אימייל או טלפון ליצירת קשר")
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'שליחה נכשלה, אנא נסו שוב')
      }
      setSent(true)
      // Reset form on success
      setFormData({
        subject: "",
        firstName: "",
        lastName: "",
        phone: "",
        email: "",
        message: "",
        notifications: false,
      })
    } catch (err: any) {
      setSent(false)
      setError(err?.message || 'שליחה נכשלה, אנא נסו שוב')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold font-staff text-gray-700">נשמח לחבר</h2>
      </div>

      {sent === true && (
        <p className="text-center text-green-600">הטופס נשלח בהצלחה!</p>
      )}
      {sent === false && error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subject Dropdown */}
        <div>
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          >
            <option value="">בחר נושא</option>
            <option value="general">כללי</option>
            <option value="support">תמיכה</option>
            <option value="donation">תרומה</option>
          </select>
        </div>

        {/* First Name */}
        <div>
          <Input
            type="text"
            placeholder="שם פרטי"
            className="text-right"
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <Input
            type="tel"
            placeholder="מס' נייד"
            className="text-right"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        {/* Last Name */}
        <div>
          <Input
            type="text"
            placeholder="שם משפחה"
            className="text-right"
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
          className="text-right"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
      </div>

      {/* Message */}
      <div>
        <Textarea
          placeholder="פירוט הבעיה"
          className="text-right min-h-[120px] resize-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
      </div>

      {/* Checkbox */}
      <div className="flex items-center gap-3 justify-end">
        <label htmlFor="notifications" className="text-sm text-gray-600 cursor-pointer">
          אני רוצה לקבל הודעות
        </label>
        <input
          type="checkbox"
          id="notifications"
          checked={formData.notifications}
          onChange={(e) => setFormData({ ...formData, notifications: e.target.checked })}
          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-12 py-3 rounded-full text-lg font-medium font-staff"
        >
          {submitting ? 'שולח…' : 'שליחה'}
        </Button>
      </div>
    </form>
  )
}

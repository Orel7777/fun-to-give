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
  const [warning, setWarning] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSent(null)
    setError(null)
    setWarning(null)
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
      const data = await res.json().catch(() => ({}))
      
      if (!res.ok) {
        throw new Error(data?.error || 'שליחה נכשלה, אנא נסו שוב')
      }
      
      setSent(true)
      
      // Handle partial success with warnings
      if (data.warning && data.errors?.length > 0) {
        setWarning(`${data.warning}: ${data.errors.join(', ')}`)
      }
      
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
    <form onSubmit={handleSubmit} className="space-y-6 overflow-visible">
      <div className="text-center mb-8">
        <h2 className="text-xl font-semibold font-staff text-gray-700">נשמח לדבר</h2>
      </div>

      {sent === true && (
        <div className="text-center">
          <p className="text-green-600">הטופס נשלח בהצלחה!</p>
          {warning && (
            <p className="text-yellow-600 text-sm mt-1">{warning}</p>
          )}
        </div>
      )}
      {sent === false && error && (
        <p className="text-center text-red-600">{error}</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Subject Dropdown */}
        <div className="relative z-50">
          <select 
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-right bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            dir="rtl"
          >
            <option value="" className="bg-white text-gray-900">בחר נושא</option>
            <option value="donation" className="bg-white text-gray-900">תרומה</option>
            <option value="jobs" className="bg-white text-gray-900">דרושים</option>
            <option value="about" className="bg-white text-gray-900">על העמותה</option>
            <option value="other" className="bg-white text-gray-900">כל נושא אחר</option>
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
          placeholder="אני מעוניין ב..."
          className="text-right min-h-[120px] resize-none"
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
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

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
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({})

  const validateField = (name: string, value: string) => {
    const errors: {[key: string]: string} = {}
    
    switch (name) {
      case 'subject':
        if (!value.trim()) errors.subject = 'נא לבחור נושא'
        break
      case 'firstName':
        if (!value.trim()) errors.firstName = 'נא למלא שם פרטי'
        else if (value.trim().length < 2) errors.firstName = 'שם פרטי חייב להכיל לפחות 2 תווים'
        break
      case 'lastName':
        if (!value.trim()) errors.lastName = 'נא למלא שם משפחה'
        else if (value.trim().length < 2) errors.lastName = 'שם משפחה חייב להכיל לפחות 2 תווים'
        break
      case 'phone':
        if (!value.trim()) errors.phone = 'נא למלא מספר טלפון'
        else if (!/^0\d{1,2}-?\d{7}$|^05\d-?\d{7}$/.test(value.replace(/\s/g, ''))) {
          errors.phone = 'נא למלא מספר טלפון תקין'
        }
        break
      case 'email':
        if (!value.trim()) errors.email = 'נא למלא כתובת אימייל'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          errors.email = 'נא למלא כתובת אימייל תקינה'
        }
        break
      case 'message':
        if (!value.trim()) errors.message = 'נא למלא הודעה'
        else if (value.trim().length < 10) errors.message = 'ההודעה חייבת להכיל לפחות 10 תווים'
        break
    }
    
    return errors
  }

  const validateForm = () => {
    const errors: {[key: string]: string} = {}
    
    Object.keys(formData).forEach(key => {
      if (key !== 'notifications') {
        const fieldErrors = validateField(key, formData[key as keyof typeof formData] as string)
        Object.assign(errors, fieldErrors)
      }
    })
    
    setValidationErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitting(true)
    setSent(null)
    setError(null)
    setWarning(null)
    setValidationErrors({})
    
    // Validate form before submission
    if (!validateForm()) {
      setSubmitting(false)
      return
    }
    
    try {
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
            className={`w-full px-3 py-2 border rounded-md text-right bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer ${validationErrors.subject ? 'border-red-500' : 'border-gray-300'}`}
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
          {validationErrors.subject && (
            <p className="text-red-500 text-sm mt-1 text-right">{validationErrors.subject}</p>
          )}
        </div>

        {/* First Name - Mobile first, Desktop second */}
        <div className="order-2 md:order-1">
          <Input
            type="text"
            placeholder="שם פרטי"
            className={`text-right ${validationErrors.firstName ? 'border-red-500' : ''}`}
            value={formData.firstName}
            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
          />
          {validationErrors.firstName && (
            <p className="text-red-500 text-sm mt-1 text-right">{validationErrors.firstName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Last Name - Mobile second, Desktop first */}
        <div className="order-1 md:order-2">
          <Input
            type="text"
            placeholder="שם משפחה"
            className={`text-right ${validationErrors.lastName ? 'border-red-500' : ''}`}
            value={formData.lastName}
            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
          />
          {validationErrors.lastName && (
            <p className="text-red-500 text-sm mt-1 text-right">{validationErrors.lastName}</p>
          )}
        </div>

        {/* Phone - Mobile third, Desktop second */}
        <div className="order-2 md:order-1">
          <Input
            type="tel"
            placeholder="מס' נייד"
            className={`text-right ${validationErrors.phone ? 'border-red-500' : ''}`}
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm mt-1 text-right">{validationErrors.phone}</p>
          )}
        </div>
      </div>

      {/* Email - Mobile fourth */}
      <div>
        <Input
          type="email"
          placeholder="אימייל"
          className={`text-right ${validationErrors.email ? 'border-red-500' : ''}`}
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {validationErrors.email && (
          <p className="text-red-500 text-sm mt-1 text-right">{validationErrors.email}</p>
        )}
      </div>

      {/* Message */}
      <div>
        <Textarea
          placeholder="אני מעוניין ב..."
          className={`text-right min-h-[120px] resize-none ${validationErrors.message ? 'border-red-500' : ''}`}
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        />
        {validationErrors.message && (
          <p className="text-red-500 text-sm mt-1 text-right">{validationErrors.message}</p>
        )}
      </div>

      

      {/* Submit Button */}
      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          disabled={submitting}
          className="bg-blue-600 hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed text-white px-12 py-3 rounded-full text-lg font-medium font-staff cursor-pointer"
        >
          {submitting ? 'שולח…' : 'שליחה'}
        </Button>
      </div>
    </form>
  )
}

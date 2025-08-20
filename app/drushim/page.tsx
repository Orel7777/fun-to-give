"use client";

import { Button } from "../components/ui/button"
import { Card } from "../components/ui/card"
import Link from "next/link"
import { motion } from "framer-motion"
import { SlidUpRight, SlidUpLeft } from "../lib/utils"

export default function JobPostPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Page Title */}
        <motion.h1
          className="mb-8 text-3xl md:text-4xl font-bold font-staff text-center text-gray-800"
          variants={SlidUpRight(0) as any}
          initial="hidden"
          animate="visible"
        >
          דרושים
        </motion.h1>

        {/* Centered content wrapper */}
        <motion.div
          className="flex flex-col items-center justify-center min-h-[70vh]"
          variants={SlidUpLeft(0.1) as any}
          initial="hidden"
          animate="visible"
        >

          {/* Job Cards - עם מרכוז משופר */}
          <div className="flex justify-center mb-6" style={{ marginTop: 16 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            {[
              { title: 'ספקים - שמעוניינים לתת יד ולתרום לסלי המזון.', type: 'משרה מלאה', location: 'צפון הארץ' },
              { title: 'ספקים - שמעוניינים לעשות הנחה משמעותית למזון ומוצרים שונים שיכולים להתאים לסלי המזון הקיימים.', type: 'משרה מלאה', location: 'מרכז, ת"א' },
              { title: 'מתנדבים - שרוצים לקחת חלק באריזת סלי המזון ובחלוקה.', type: 'משרה מלאה', location: 'מרכז, ת"א' },
              { title: 'צלמות - שמעוניינן לצלם את פעילות העמותה.', type: 'משרה חלקית', location: 'מרכז, בני ברק/בית שמש' },
              { title: 'בעלי רכבים גדולים - שמעוניינים לעזור בשינוע סלי המזון.', type: 'משרה מלאה', location: 'מרכז, ת"א' },
              { title: 'מנהלת תוכן מדיה חברתית ופרסום העמותה, מנהלת קמפיינים לתרומות ברשת.', type: 'משרה חלקית', location: 'מרכז, ת"א' },
            ].map((job, i) => (
              <Card key={i} className="w-full max-w-md mx-auto rounded-xl shadow-md bg-white overflow-hidden">
                {/* Header */}
                <div className="bg-[#0f62a5] text-white px-4 py-3 rounded-t-xl">
                  <h3 className="text-right font-bold font-staff text-base md:text-lg leading-snug">
                    {job.title}
                  </h3>
                </div>
                {/* Body */}
                <div className="px-4 py-4 flex flex-col gap-4">
                  <div className="text-center">
                    <Button asChild variant="outline" className="rounded-full px-6 transition-transform duration-200 hover:scale-105 active:scale-95">
                      <Link href="/contact-form">הגשת מועמדות</Link>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
            </div>
          </div>

          {/* Back to site */}
          <div className="flex justify-center">
            <Button asChild variant="outline" className="rounded-full px-8 py-6 text-lg shadow-sm hover:shadow-md transition-shadow">
              <Link href="/">חזרה לאתר</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
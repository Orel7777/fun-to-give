"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Calendar, Gift, CreditCard, User, Mail, Phone, MessageSquare } from "lucide-react"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { CanvasRevealEffectDemo } from "../components/ui/canvas-reveal-effect-demo"
import Lottie from "lottie-react"
import paymentSuccessAnimation from "../../public/animation-json/Payment Success.json"
import AiChildVideo from "../components/ui/ai-child-video"

export default function DonationsSection() {
  const donationType = "monthly"
  const [customAmount, setCustomAmount] = useState("")

  const donationOptions = [
    {
      id: "monthly",
      title: "תרומה חודשית",
      description: "תרומה קבועה המאפשרת תכנון ארוך טווח",
      icon: Calendar,
      amounts: [50, 100, 200, 500],
    },
    {
      id: "basket",
      title: "סל לתרומה",
      description: "חבילת תרומה מיוחדת עם מוצרים נבחרים",
      icon: Gift,
      amounts: [150, 300, 600, 1000],
    },
    {
      id: "onetime",
      title: "תרומה חד-פעמית",
      description: "תרומה בסכום לבחירתכם",
      icon: CreditCard,
      amounts: [100, 250, 500, 1000],
    },
  ]

  const selectedOption = donationOptions.find((option) => option.id === donationType)

  return (
    <motion.section
      className="px-4 pt-16 pb-0"
      // style={{
      //   background: 'linear-gradient(135deg, #e2cdbd 0%, #f5f5f5 15%, #f5f5f5 85%, #9dd0bf 100%)',
      //   minHeight: '200vh'
      // }}
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <motion.div
          className="mb-12 text-center"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div
            className="flex justify-center mb-4"
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <div className="p-3 bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
          </motion.div>
          <h2 className="mb-4 text-4xl font-bold tracking-tighter text-[#2a2b26] font-staff">הצטרפו אלינו לעשות שינוי</h2>
          <div className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600" style={{ textAlign: 'center' }}>
            <p style={{ marginBottom: '8px' }}>
              התרומה שלכם מאפשרת לנו להמשיך בפעילותנו החשובה.
            </p>
            <p>
              <span className="font-semibold text-[#9dd0bf]">רק שם ושם משפחה נדרשים</span> - כל השדות האחרים הם
              אופציונליים לנוחותכם.
            </p>
          </div>
        </motion.div>

        {/* Donation type cards with effects (kept as requested) */}
        <div className="mb-8">
          <CanvasRevealEffectDemo />
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card id="donation-form" className="border-0 shadow-xl backdrop-blur-sm bg-white/80">
            <CardHeader className="pb-6">
              <CardTitle className="text-2xl text-center text-gray-800">פרטי התרומה</CardTitle>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Amount Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-center text-gray-800" style={{ marginBottom: '20px' }}>בחרו סכום לתרומה (₪)</h3>
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ gap: '20px' }}
                >
                  {selectedOption?.amounts.map((amount, index) => (
                    <motion.div
                      key={amount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex justify-center"
                    >
                      <Button
                        key={amount}
                        variant={customAmount === amount.toString() ? "default" : "outline"}
                        className={`h-12 w-full sm:w-auto text-lg font-semibold transition-all duration-300 ${
                          customAmount === amount.toString()
                            ? "bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] hover:from-[#f5a383]/80 hover:to-[#9dd0bf]/80 text-white border-0"
                            : "border-2 border-gray-200 hover:border-[#f5a383] hover:bg-[#f5a383]/10"
                        }`}
                        onClick={() => setCustomAmount(amount.toString())}
                      >
                        ₪{amount}
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="flex justify-center items-center space-x-reverse">
                  <Label htmlFor="custom-amount" className="text-sm font-medium text-gray-700">
                    או הזינו סכום אחר:
                  </Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    placeholder="סכום בש״ח"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="max-w-32 text-center border-2 focus:border-[#9dd0bf]"
                    style={{ marginRight: '15px' }}
                  />
                </div>
              </div>

              {/* Form Fields */}
              <motion.div
                className="grid gap-6 pt-6 border-t border-gray-200 md:grid-cols-2"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center text-sm font-medium text-gray-700">
                    <User className="ml-2 w-4 h-4" />
                    שם פרטי *
                  </Label>
                  <Input
                    id="firstName"
                    required
                    className="border-2 focus:border-[#9dd0bf]"
                    aria-label="שם פרטי - שדה חובה"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center text-sm font-medium text-gray-700">
                    <User className="ml-2 w-4 h-4" />
                    שם משפחה *
                  </Label>
                  <Input
                    id="lastName"
                    required
                    className="border-2 focus:border-[#9dd0bf]"
                    aria-label="שם משפחה - שדה חובה"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700">
                    <Mail className="ml-2 w-4 h-4" />
                    דוא״ל
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-2 focus:border-[#9dd0bf]"
                    aria-label="כתובת דוא״ל - שדה אופציונלי"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700">
                    <Phone className="ml-2 w-4 h-4" />
                    טלפון
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="border-2 focus:border-[#9dd0bf]"
                    aria-label="מספר טלפון - שדה אופציונלי"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="comments" className="flex items-center text-sm font-medium text-gray-700">
                    <MessageSquare className="ml-2 w-4 h-4" />
                    הערות
                  </Label>
                  <Textarea
                    id="comments"
                    rows={3}
                    className="border-2 focus:border-[#9dd0bf] resize-none"
                    placeholder="הערות או הקדשה מיוחדת (אופציונלי)"
                    aria-label="הערות או הקדשה - שדה אופציונלי"
                  />
                </div>
              </motion.div>

              {/* Payment Success Animation */}
              <motion.div
                className="flex justify-center mb-6"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 1.0 }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                  <Lottie
                    animationData={paymentSuccessAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>
              </motion.div>

              {/* CTA Button */}
              <motion.div
                className="pt-2 text-center"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
              >
                <motion.div 
                  whileHover={{ scale: 1.1 }} 
                  whileTap={{ scale: 0.95 }}
                  className="cursor-pointer"
                >
                  <Button
                    size="lg"
                    className="w-full md:w-auto px-12 py-4 text-xl font-bold bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] hover:from-[#f5a383]/80 hover:to-[#9dd0bf]/80 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer"
                    aria-label="לחצו כאן לביצוע התרומה"
                    onClick={() => {
                      // כאן תוכל להוסיף לוגיקה לטיפול בלחיצה
                      console.log('כפתור תרומה נלחץ')
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                    >
                      <Heart className="ml-2 w-6 h-6" />
                    </motion.div>
                    הצטרפו לנתינה
                  </Button>
                </motion.div>
                <p className="mt-3 text-sm text-gray-500">התרומה מאובטחת ומוגנת בהצפנה מתקדמת</p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>

        {/* סרטון aiChild */}
        <motion.div
          className="mt-16 mb-8"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="mx-auto max-w-4xl">
            <AiChildVideo className="w-full" />
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}

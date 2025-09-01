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
import Reveal from "../components/Reveal"
import Lottie from "lottie-react"
import paymentSuccessAnimation from "../../public/animation-json/Payment Success.json"
import { SlidUp } from "../lib/utils"

export default function DonationsSection() {
  const [donationType, setDonationType] = useState<'monthly' | 'basket' | 'onetime'>("monthly")
  const [customAmount, setCustomAmount] = useState("")
  const [selectedPayment, setSelectedPayment] = useState("")

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
      id="תרומה"
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
          <Reveal as="h2" type="heading" className="mb-4 text-4xl font-bold tracking-tighter text-[#2a2b26] font-staff">הצטרפו אלינו לעשות שינוי</Reveal>
          <div className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600" style={{ textAlign: 'center' }}>
            <Reveal as="p" type="paragraph" className="mb-2">
              התרומה שלכם מאפשרת לנו להמשיך בפעילותנו החשובה.
            </Reveal>
            <Reveal as="p" type="paragraph">
              <span className="font-semibold font-staff text-[#f5a383]">רק שם ושם משפחה נדרשים</span> - כל השדות האחרים הם
              אופציונליים לנוחותכם.
            </Reveal>
          </div>
        </motion.div>

        {/* Donation type cards with effects (kept as requested) */}
        <div className="mb-8">
          <CanvasRevealEffectDemo
            selectedId={donationType}
            onSelect={(id) => {
              // מיפוי זהה לשמות ה-id ברשימת האפשרויות
              if (id === 'monthly' || id === 'basket' || id === 'onetime') {
                setDonationType(id)
              }
            }}
          />
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Card className="border-0 shadow-xl backdrop-blur-sm" style={{ backgroundColor: "#e1cdbd" }}>
            <CardHeader className="pb-6">
              <Reveal as="h3" type="heading" className="text-2xl text-center text-gray-800">פרטי התרומה</Reveal>
            </CardHeader>

            <CardContent className="space-y-8">
              {/* Amount Selection */}
              <div className="space-y-4">
                <Reveal as="h3" type="heading" className="text-lg font-semibold font-staff text-center text-gray-800" style={{ marginBottom: '20px' }}>בחרו סכום לתרומה (₪)</Reveal>
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
                        className={`h-12 w-full sm:w-auto text-lg font-semibold font-staff transition-all duration-300 ${
                          customAmount === amount.toString()
                            ? "bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] hover:from-[#f5a383]/80 hover:to-[#9dd0bf]/80 text-white border-0"
                            : "border-2 border-black hover:border-[#f5a383] hover:bg-[#f5a383]/10"
                        }`}
                        onClick={() => setCustomAmount(amount.toString())}
                      >
                        {amount}₪
                      </Button>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="flex justify-center items-center space-x-reverse">
                  <Label htmlFor="custom-amount" className="text-sm font-medium font-staff text-gray-700">
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

                {/* Payment Options */}
                <motion.div
                  className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 }}
                >
                  {/* Credit Card Payment */}
                  <motion.button
                    onClick={() => {
                      setSelectedPayment('credit');
                      console.log('מעבר לתרומה בכרטיס אשראי');
                    }}
                    className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-black transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs h-16 sm:flex-1 sm:min-w-0 ${
                      selectedPayment === 'credit' 
                        ? 'bg-[#f4a282] hover:bg-[#f4a282]/90' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center flex-1">
                      <div className="text-sm font-bold text-black font-staff">חיוב בודד / תשלומים</div>
                      <div className="text-xs text-gray-600">באמצעות אשראי</div>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-[#FFD700] rounded-lg flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8H4V6H20V8ZM20 18H4V12H20V18ZM6 15H8V17H6V15ZM10 15H14V17H10V15Z"/>
                      </svg>
                    </div>
                  </motion.button>

                  {/* Israeli Shekel Payment */}
                  <motion.button
                    onClick={() => {
                      setSelectedPayment('shekel');
                      console.log('מעבר לתרומה בח״פ ישראלי');
                    }}
                    className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-black transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs h-16 sm:flex-1 sm:min-w-0 ${
                      selectedPayment === 'shekel' 
                        ? 'bg-[#f4a282] hover:bg-[#f4a282]/90' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center flex-1">
                      <div className="text-sm font-bold text-black font-staff">הו"ק אשראי</div>
                      <div className="text-xs text-gray-600">ללא תפיסת מסגרת</div>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 bg-[#FFD700] rounded-lg flex-shrink-0">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 9H14V4H19V9ZM7 7H12V9H7V7ZM7 11H17V13H7V11ZM7 15H17V17H7V15Z"/>
                      </svg>
                    </div>
                  </motion.button>

                  {/* Bit Payment */}
                  <motion.button
                    onClick={() => {
                      setSelectedPayment('bit');
                      console.log('מעבר לתרומה דרך ביט');
                    }}
                    className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-black transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs h-16 sm:flex-1 sm:min-w-0 ${
                      selectedPayment === 'bit' 
                        ? 'bg-[#f4a282] hover:bg-[#f4a282]/90' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="text-center flex-1">
                      <div className="text-sm font-bold text-black font-staff">Bit ביט</div>
                    </div>
                    <div className="flex items-center justify-center w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                      <img src="/pictures/bit.webp" alt="Bit" className="w-full h-full object-cover" />
                    </div>
                  </motion.button>
                </motion.div>
              </div>

              {/* Form Fields */}
              <motion.div
                className="flex flex-wrap gap-6 pt-6 border-t border-gray-200 justify-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="flex items-center text-lg font-medium font-staff text-gray-700">
                    <User className="ml-2 w-4 h-4" />
                    שם פרטי *
                  </Label>
                  <Input
                    id="firstName"
                    required
                    className="border-2 !border-black focus:border-[#9dd0bf] w-40"
                    aria-label="שם פרטי - שדה חובה"
                    maxLength={20}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastName" className="flex items-center text-lg font-medium font-staff text-gray-700">
                    <User className="ml-2 w-4 h-4" />
                    שם משפחה *
                  </Label>
                  <Input
                    id="lastName"
                    required
                    className="border-2 !border-black focus:border-[#9dd0bf] w-40"
                    aria-label="שם משפחה - שדה חובה"
                    maxLength={20}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="flex items-center text-lg font-medium font-staff text-gray-700">
                    <Mail className="ml-2 w-4 h-4" />
                    דוא״ל
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    className="border-2 !border-black focus:border-[#9dd0bf] w-56"
                    aria-label="כתובת דוא״ל - שדה אופציונלי"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone" className="flex items-center text-lg font-medium font-staff text-gray-700">
                    <Phone className="ml-2 w-4 h-4" />
                    טלפון
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="border-2 !border-black focus:border-[#9dd0bf] w-44"
                    aria-label="מספר טלפון - שדה אופציונלי"
                  />
                </div>

                <div className="space-y-2 w-full max-w-md">
                  <Label htmlFor="comments" className="flex items-center text-lg font-medium font-staff text-gray-700">
                    <MessageSquare className="ml-2 w-4 h-4" />
                    הערות
                  </Label>
                  <Textarea
                    id="comments"
                    rows={3}
                    className="border-2 !border-black focus:border-[#9dd0bf] resize-none w-full"
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
                <Reveal type="media" className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28">
                  <Lottie
                    animationData={paymentSuccessAnimation}
                    loop={true}
                    autoplay={true}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Reveal>
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
                    className="w-full md:w-auto px-12 py-4 text-xl font-bold font-staff bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] hover:from-[#f5a383]/80 hover:to-[#9dd0bf]/80 text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer"
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

      </div>
    </motion.section>
  )
}

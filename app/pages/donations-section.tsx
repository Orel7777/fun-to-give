"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Heart, Calendar, Gift, CreditCard, User, Mail, Phone, MessageSquare } from "lucide-react"

export default function DonationsSection() {
  const [donationType, setDonationType] = useState('monthly')
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

  const renderCreditCardFields = () => (
    <motion.div
      className="flex flex-wrap gap-6 pt-6 border-t border-gray-200 justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <div className="space-y-2">
        <label htmlFor="cardNumber" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <CreditCard className="ml-2 w-4 h-4" />
          מספר כרטיס אשראי *
        </label>
        <input
          id="cardNumber"
          type="text"
          placeholder="0000 0000 0000 0000"
          required
          className="border-2 border-black focus:border-[#9dd0bf] w-60 px-3 py-2 rounded-md"
          aria-label="מספר כרטיס אשראי - שדה חובה"
          maxLength={19}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="expiryDate" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <Calendar className="ml-2 w-4 h-4" />
          תוקף *
        </label>
        <input
          id="expiryDate"
          type="text"
          placeholder="MM/YY"
          required
          className="border-2 border-black focus:border-[#9dd0bf] w-32 px-3 py-2 rounded-md text-center"
          aria-label="תאריך תוקף - שדה חובה"
          maxLength={5}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="cvv" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <span className="ml-2 w-4 h-4 flex items-center justify-center bg-gray-200 rounded text-xs font-bold">
            CVV
          </span>
          קוד אבטחה *
        </label>
        <input
          id="cvv"
          type="text"
          placeholder="123"
          required
          className="border-2 border-black focus:border-[#9dd0bf] w-24 px-3 py-2 rounded-md text-center"
          aria-label="קוד אבטחה - שדה חובה"
          maxLength={4}
        />
      </div>

      <div className="space-y-2 w-full max-w-md">
        <label htmlFor="cardHolder" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <User className="ml-2 w-4 h-4" />
          שם למחזיק הכרטיס *
        </label>
        <input
          id="cardHolder"
          type="text"
          placeholder="כפי שמופיע על הכרטיס"
          required
          className="border-2 border-black focus:border-[#9dd0bf] w-full px-3 py-2 rounded-md"
          aria-label="שם מחזיק הכרטיס - שדה חובה"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="installments" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <CreditCard className="ml-2 w-4 h-4" />
          מספר תשלומים
        </label>
        <select
          id="installments"
          className="border-2 border-black focus:border-[#9dd0bf] w-40 px-3 py-2 rounded-md"
          aria-label="בחירת מספר תשלומים"
        >
          <option value="1">תשלום אחד</option>
          <option value="2">2 תשלומים</option>
          <option value="3">3 תשלומים</option>
          <option value="4">4 תשלומים</option>
          <option value="5">5 תשלומים</option>
          <option value="6">6 תשלומים</option>
          <option value="12">12 תשלומים</option>
        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <Mail className="ml-2 w-4 h-4" />
          דוא״ל
        </label>
        <input
          id="email"
          type="email"
          className="border-2 border-black focus:border-[#9dd0bf] w-56 px-3 py-2 rounded-md"
          aria-label="כתובת דוא״ל - שדה אופציונלי"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <Phone className="ml-2 w-4 h-4" />
          טלפון
        </label>
        <input
          id="phone"
          type="tel"
          className="border-2 border-black focus:border-[#9dd0bf] w-44 px-3 py-2 rounded-md"
          aria-label="מספר טלפון - שדה אופציונלי"
        />
      </div>

      <div className="space-y-2 w-full max-w-md">
        <label htmlFor="comments" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <MessageSquare className="ml-2 w-4 h-4" />
          הערות
        </label>
        <textarea
          id="comments"
          rows={3}
          className="border-2 border-black focus:border-[#9dd0bf] resize-none w-full px-3 py-2 rounded-md"
          placeholder="הערות או הקדשה מיוחדת (אופציונלי)"
          aria-label="הערות או הקדשה - שדה אופציונלי"
        />
      </div>
    </motion.div>
  )

  const renderShekelFields = () => (
    <motion.div
      className="space-y-6 pt-6 border-t border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <div className="flex flex-wrap gap-6 justify-center">
        <div className="space-y-2">
          <label htmlFor="monthlyAmountShekel" className="flex items-center text-lg font-medium font-staff text-gray-700">
            <span className="text-red-500">*</span>
            סכום לחיוב בכל חודש:
          </label>
          <div className="flex items-center gap-2">
            <input
              id="monthlyAmountShekel"
              type="number"
              placeholder="400"
              required
              className="border-2 border-black focus:border-[#9dd0bf] w-32 px-3 py-2 rounded-md text-center font-bold"
              aria-label="סכום חיוב חודשי - שדה חובה"
            />
            <span className="text-gray-500">₪</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="fixedAmountShekel" className="flex items-center text-lg font-medium font-staff text-gray-700">
            מספר תשלומים לחיוב:
          </label>
          <div className="flex items-center gap-2">
            <span className="text-gray-500">ללא הגבלה</span>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="dayOfMonthShekel" className="flex items-center text-lg font-medium font-staff text-gray-700">
            <span className="text-red-500">*</span>
            יום גביה בכל חודש:
          </label>
          <input
            id="dayOfMonthShekel"
            type="number"
            min="1"
            max="31"
            placeholder="1"
            required
            className="border-2 border-black focus:border-[#9dd0bf] w-24 px-3 py-2 rounded-md text-center"
            aria-label="יום בחודש לגביה - שדה חובה"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="cardNumberShekel" className="flex items-center text-lg font-medium font-staff text-gray-700">
            <span className="text-red-500">*</span>
            מספר כרטיס אשראי:
          </label>
          <input
            id="cardNumberShekel"
            type="text"
            required
            className="border-2 border-black focus:border-[#9dd0bf] w-56 px-3 py-2 rounded-md"
            aria-label="מספר כרטיס אשראי - שדה חובה"
            placeholder="0000 0000 0000 0000"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="validityShekel" className="flex items-center text-lg font-medium font-staff text-gray-700">
            <span className="text-red-500">*</span>
            תוקף:
          </label>
          <input
            id="validityShekel"
            type="text"
            placeholder="07/2026 0426"
            required
            className="border-2 border-black focus:border-[#9dd0bf] w-40 px-3 py-2 rounded-md text-center"
            aria-label="תוקף כרטיס - שדה חובה"
            maxLength={11}
          />
        </div>

        <div className="space-y-2 w-full">
          <label htmlFor="installmentsShekel" className="flex items-center justify-center text-lg font-medium font-staff text-gray-700">
            3 ספרות נגד הכרטיס:
          </label>
          <div className="flex justify-center">
            <input
              id="installmentsShekel"
              type="text"
              maxLength={3}
              className="border-2 border-black focus:border-[#9dd0bf] w-24 px-3 py-2 rounded-md text-center"
              aria-label="3 ספרות נגד הכרטיס"
              placeholder="123"
            />
          </div>
        </div>
      </div>

      <div className="text-center">
        <label className="flex items-center justify-center gap-2 text-base text-gray-700">
          <input
            type="checkbox"
            className="w-4 h-4 text-[#9dd0bf] border-2 border-gray-300 rounded focus:ring-[#9dd0bf]"
            defaultChecked
          />
          <span className="text-blue-600 underline cursor-pointer">
            אני מסכים לתקנון האתר
          </span>
        </label>
      </div>

      <div className="text-center">
        <button className="w-full max-w-md bg-[#5fb3a3] hover:bg-[#4a9d8e] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300">
          שמירת הוראת קבע
        </button>
        <p className="mt-2 text-sm text-gray-600">זה הו"ק אשראי</p>
      </div>
    </motion.div>
  )

  const renderBitFields = () => (
    <motion.div
      className="space-y-6 pt-6 border-t border-gray-200"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <div className="flex justify-center">
        <div className="space-y-2">
          <label htmlFor="bitAmount" className="flex items-center justify-center text-lg font-medium font-staff text-gray-700">
            <span className="text-red-500">*</span>
            סכום לתרומה:
          </label>
          <input
            id="bitAmount"
            type="number"
            placeholder="400"
            required
            className="border-2 border-black focus:border-[#9dd0bf] w-32 px-3 py-2 rounded-md text-center font-bold text-lg"
            aria-label="סכום לתרומה - שדה חובה"
          />
        </div>
      </div>

      <div className="text-center">
        <label className="flex items-center justify-center gap-2 text-base text-gray-700">
          <input
            type="checkbox"
            className="w-4 h-4 text-[#9dd0bf] border-2 border-gray-300 rounded focus:ring-[#9dd0bf]"
            defaultChecked
          />
          <span className="text-blue-600 underline cursor-pointer">
            אני מסכים לתקנון האתר
          </span>
        </label>
      </div>

      <div className="text-center">
        <button className="w-full max-w-md bg-[#5fb3a3] hover:bg-[#4a9d8e] text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors duration-300">
          תיוב תשלום באמצעות BIT
        </button>
      </div>
    </motion.div>
  )

  const renderOriginalFields = () => (
    <motion.div
      className="flex flex-wrap gap-6 pt-6 border-t border-gray-200 justify-center"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 1.0 }}
    >
      <div className="space-y-2">
        <label htmlFor="firstName" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <User className="ml-2 w-4 h-4" />
          שם פרטי *
        </label>
        <input
          id="firstName"
          required
          className="border-2 border-black focus:border-[#9dd0bf] w-40 px-3 py-2 rounded-md"
          aria-label="שם פרטי - שדה חובה"
          maxLength={20}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="lastName" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <User className="ml-2 w-4 h-4" />
          שם משפחה *
        </label>
        <input
          id="lastName"
          required
          className="border-2 border-black focus:border-[#9dd0bf] w-40 px-3 py-2 rounded-md"
          aria-label="שם משפחה - שדה חובה"
          maxLength={20}
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <Mail className="ml-2 w-4 h-4" />
          דוא״ל
        </label>
        <input
          id="email"
          type="email"
          className="border-2 border-black focus:border-[#9dd0bf] w-56 px-3 py-2 rounded-md"
          aria-label="כתובת דוא״ל - שדה אופציונלי"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="phone" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <Phone className="ml-2 w-4 h-4" />
          טלפון
        </label>
        <input
          id="phone"
          type="tel"
          className="border-2 border-black focus:border-[#9dd0bf] w-44 px-3 py-2 rounded-md"
          aria-label="מספר טלפון - שדה אופציונלי"
        />
      </div>

      <div className="space-y-2 w-full max-w-md">
        <label htmlFor="comments" className="flex items-center text-lg font-medium font-staff text-gray-700">
          <MessageSquare className="ml-2 w-4 h-4" />
          הערות
        </label>
        <textarea
          id="comments"
          rows={3}
          className="border-2 border-black focus:border-[#9dd0bf] resize-none w-full px-3 py-2 rounded-md"
          placeholder="הערות או הקדשה מיוחדת (אופציונלי)"
          aria-label="הערות או הקדשה - שדה אופציונלי"
        />
      </div>
    </motion.div>
  )

  return (
    <motion.section
      id="תרומה"
      className="px-4 pt-16 pb-16 mb-24"
      dir="rtl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="border-0 shadow-xl backdrop-blur-sm bg-[#f2f2e8] rounded-lg">
            <div className="pb-2 pt-6 px-6">
              <motion.div
                className="flex justify-center mb-4"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="p-3 bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </motion.div>
              <h2 className="text-3xl font-bold tracking-tighter text-[#2a2b26] font-staff mb-4 text-center">הצטרפו אלינו לעשות שינוי</h2>
              <div className="mx-auto max-w-2xl text-lg leading-relaxed text-gray-600 text-center mb-4">
                <p className="mb-2">
                  התרומה שלכם מאפשרת לנו להמשיך בפעילותנו החשובה.
                </p>
                <p>
                  <span className="font-semibold font-staff text-[#f5a383]">רק שם ושם משפחה נדרשים</span> - כל השדות האחרים הם
                  אופציונליים לנוחותכם.
                </p>
              </div>
            </div>

            <div className="space-y-8 px-6 pb-6">
              {/* Payment Options */}
              <motion.div
                className="flex flex-col sm:flex-row justify-center items-center gap-3 mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {/* Credit Card Payment */}
                <motion.button
                  onClick={() => {
                    setSelectedPayment('credit');
                    console.log('מעבר לתרומה בכרטיס אשראי');
                  }}
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-black transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs h-16 sm:flex-1 sm:min-w-0 cursor-pointer ${
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
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-black transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs h-16 sm:flex-1 sm:min-w-0 cursor-pointer ${
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
                  className={`flex items-center justify-center gap-3 px-4 py-3 rounded-xl border-2 border-black transition-all duration-300 shadow-md hover:shadow-lg w-full max-w-xs h-16 sm:flex-1 sm:min-w-0 cursor-pointer ${
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
                    <div className="w-full h-full bg-blue-500 rounded flex items-center justify-center text-white text-xs font-bold">
                      BIT
                    </div>
                  </div>
                </motion.button>
              </motion.div>

              {/* Amount Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold font-staff text-center text-gray-800" style={{ marginBottom: '20px' }}>בחרו סכום לתרומה (₪)</h3>
                <motion.div
                  className="grid grid-cols-2 gap-4 sm:flex sm:flex-wrap sm:justify-center sm:items-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  style={{ gap: '20px' }}
                >
                  {[50, 100, 200, 500].map((amount, index) => (
                    <motion.div
                      key={amount}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex justify-center"
                    >
                      <button
                        className={`h-12 w-full sm:w-auto text-lg font-semibold font-staff transition-all duration-300 cursor-pointer px-6 py-2 rounded-md ${
                          customAmount === amount.toString()
                            ? "bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] text-white border-0"
                            : "border-2 border-black hover:border-[#f5a383] hover:bg-[#f5a383]/10 bg-[#fdf6ed]"
                        }`}
                        onClick={() => setCustomAmount(amount.toString())}
                      >
                        {amount}₪
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
                <div className="flex justify-center items-center space-x-reverse">
                  <label htmlFor="custom-amount" className="text-base font-bold font-staff text-gray-800">
                    או הזינו סכום אחר:
                  </label>
                  <input
                    id="custom-amount"
                    type="number"
                    placeholder="סכום בש״ח"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    className="max-w-32 text-center border-2 focus:border-[#9dd0bf] font-bold text-base bg-[#fdf6ed] px-3 py-2 rounded-md"
                    style={{ marginRight: '15px' }}
                  />
                </div>
              </div>

              {/* Dynamic Form Fields based on payment selection */}
              {selectedPayment === 'credit' && renderCreditCardFields()}
              {selectedPayment === 'shekel' && renderShekelFields()}
              {selectedPayment === 'bit' && renderBitFields()}
              {!selectedPayment && renderOriginalFields()}

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
                  <button
                    className="w-full md:w-auto px-12 py-4 text-xl font-bold font-staff bg-gradient-to-r from-[#f5a383] to-[#9dd0bf] text-white border-0 shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 cursor-pointer rounded-lg"
                    aria-label="לחצו כאן לביצוע התרומה"
                    onClick={() => {
                      console.log('כפתור תרומה נלחץ')
                    }}
                  >
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="inline-flex items-center"
                    >
                      <Heart className="ml-2 w-6 h-6" />
                      הצטרפו לנתינה
                    </motion.div>
                  </button>
                </motion.div>
                <p className="mt-3 text-sm text-gray-500">התרומה מאובטחת ומוגנת בהצפנה מתקדמת</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  )
}
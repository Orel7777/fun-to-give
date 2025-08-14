"use client"
import { Card } from "../components/ui/card"
import { motion } from "framer-motion"
import Image from "next/image"

export default function OrganizationStory() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const iconBounceAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#fdf6ed" }}>
      <div className="px-6 mx-auto max-w-4xl">
        {/* Main Title */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
                                                                                       <motion.h1
               className="flex gap-3 justify-center items-baseline mb-4 text-4xl font-bold tracking-tighter text-center md:text-5xl"
               style={{ color: "#2a2b26" }}
               initial={{ opacity: 0, y: -30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6, delay: 0.2 }}
             >
               סיפור העמותה
               <motion.svg
                 xmlns="http://www.w3.org/2000/svg"
                 width="40"
                 height="40"
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
                 strokeWidth="2"
                 strokeLinecap="round"
                 strokeLinejoin="round"
                 className="text-[#2a2b26]"
                 animate={{
                   rotateY: [0, 180, 0],
                   scale: [1, 1.2, 1],
                   rotateZ: [0, 5, -5, 0]
                 }}
                 transition={{
                   duration: 4,
                   repeat: Infinity,
                   ease: "easeInOut",
                   times: [0, 0.5, 1]
                 }}
               >
                 <path d="M12 7v14"/>
                 <path d="M16 12h2"/>
                 <path d="M16 8h2"/>
                 <path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>
                 <path d="M6 12h2"/>
                 <path d="M6 8h2"/>
               </motion.svg>
             </motion.h1>
          <motion.div
            className="mx-auto w-24 h-1 rounded-full"
            style={{ backgroundColor: "#f2a283" }}
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          ></motion.div>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          {/* Why we named it "Fun to Give" */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 mb-12 border-0 shadow-lg" style={{ backgroundColor: "rgba(151, 202, 188, 0.1)" }}>
              <div className="flex gap-4 items-start mb-6" dir="rtl">
                <motion.div variants={iconBounce} animate="animate" className="flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "#f2a283" }}
                  >
                    <path d="m11 17 2 2a1 1 0 1 0 3-3" />
                    <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
                    <path d="m21 3 1 11h-2" />
                    <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
                    <path d="M3 4h8" />
                  </svg>
                </motion.div>
                <div className="text-right">
                                     <motion.h2
                     className="mb-4 text-2xl font-bold tracking-tighter"
                     style={{ color: "#2a2b26" }}
                     initial={{ opacity: 0, x: 30 }}
                     animate={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.6, delay: 0.3 }}
                   >
                     למה קראנו לעמותה כיף לתת?
                   </motion.h2>
                  <motion.p
                    className="text-lg leading-relaxed text-gray-800"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    אם ישאלו אותנו מה הדבר שאנחנו הכי אוהבים, נעמה חד משמעית שלחת לאחר זה הדבר הכי כיף בעולם!
                  </motion.p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Foundation Story */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 mb-12 border-0 shadow-lg" style={{ backgroundColor: "rgba(242, 162, 131, 0.1)" }}>
              <div className="flex gap-4 items-start mb-6" dir="rtl">
                <motion.div variants={iconBounce} animate="animate" className="flex-shrink-0 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ color: "#97cabc" }}
                  >
                    <circle cx="4" cy="4" r="2" />
                    <path d="m14 5 3-3 3 3" />
                    <path d="m14 10 3-3 3 3" />
                    <path d="M17 14V2" />
                    <path d="M17 14H7l-5 8h20Z" />
                    <path d="M8 14v8" />
                    <path d="m9 14 5 8" />
                  </svg>
                </motion.div>
                <div className="text-right">
                  <motion.p
                    className="text-lg leading-relaxed text-gray-800"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                  >
                    העמותה הוקמה על שם של יוסף ומסעדה כנפו ז&quot;ל, שעלו לארץ הקדישו את חייהם לגידול 14 ילדים, שאיתם הם
                    חינכו לערכים של אהבת הזולת ואהבת הארץ.
                  </motion.p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Memorial Section */}
          <motion.div variants={fadeInUp} className="mb-16">
                         <motion.h2
               className="mb-8 text-2xl font-bold tracking-tighter text-center"
               style={{ color: "#2a2b26" }}
               dir="rtl"
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
             >
               אנו גאים להוקיר באהבה:
             </motion.h2>

                         <div className="grid gap-8 mt-8 md:grid-cols-2">
              {/* Miriam Almalich Memorial */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                                 <Card className="p-6 h-full border-0 shadow-lg" style={{ backgroundColor: "rgba(151, 202, 188, 0.1)" }}>
                   <div className="flex flex-col items-center text-center" dir="rtl">
                     <motion.div
                       className="flex overflow-hidden justify-center items-center mb-4 w-32 h-32 rounded-full"
                       whileHover={{ scale: 1.05 }}
                       transition={{ duration: 0.3 }}
                     >
                       <div className="flex w-full h-full">
                         <Image
                           src="/picture-personal/women1.jpg"
                           alt="מרים אלמליח ז״ל"
                           width={64}
                           height={128}
                           className="object-cover w-1/2 h-full"
                         />
                         <Image
                           src="/picture-personal/women2.jpeg"
                           alt="מרים אלמליח ז״ל"
                           width={64}
                           height={128}
                           className="object-cover w-1/2 h-full"
                         />
                       </div>
                     </motion.div>
                    <motion.p
                      className="text-base leading-relaxed text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                    >
                      את זכרה של <strong>מרים אלמליח ז&quot;ל</strong>, שהקדישה את חייה לגידול ילדיה ושמשה כוח עוז בבית
                      החולים סורוקה במסירות לב ואהבת אדם.
                    </motion.p>
                  </div>
                </Card>
              </motion.div>

              {/* Professor Yaakov Bichler Memorial */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                                 <Card className="p-6 h-full border-0 shadow-lg" style={{ backgroundColor: "rgba(242, 162, 131, 0.1)" }}>
                   <div className="flex flex-col items-center text-center" dir="rtl">
                     <motion.div
                       className="flex overflow-hidden justify-center items-center mb-4 w-32 h-32 rounded-full"
                       whileHover={{ scale: 1.05 }}
                       transition={{ duration: 0.3 }}
                     >
                       <div className="flex w-full h-full">
                         <Image
                           src="/picture-personal/man1.jpeg"
                           alt="פרופסור יעקב ביכלר ז״ל"
                           width={64}
                           height={128}
                           className="object-cover w-1/2 h-full"
                         />
                         <Image
                           src="/picture-personal/man2.png"
                           alt="פרופסור יעקב ביכלר ז״ל"
                           width={64}
                           height={128}
                           className="object-cover w-1/2 h-full"
                         />
                       </div>
                     </motion.div>
                    <motion.p
                      className="text-base leading-relaxed text-gray-800"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                    >
                      את זכרו של <strong>פרופסור יעקב ביכלר ז&quot;ל</strong>, ששירת את ישראל בכבוד ונתן בסתר לנצרכים ביחד עם
                      אשתו יהודית ביכלר ז&quot;ל.
                    </motion.p>
                  </div>
                </Card>
              </motion.div>
            </div>
          </motion.div>

          {/* Mission Statement */}
          <motion.div variants={fadeInUp}>
            <Card className="p-8 mb-12 border-0 shadow-lg" style={{ backgroundColor: "rgba(151, 202, 188, 0.1)" }}>
              <div className="text-center" dir="rtl">
                                 <motion.h2
                   className="mb-6 text-3xl font-bold tracking-tighter"
                   style={{ color: "#2a2b26" }}
                   initial={{ opacity: 0, scale: 0.8 }}
                   animate={{ opacity: 1, scale: 1 }}
                   transition={{ duration: 0.6, delay: 0.2 }}
                 >
                   &quot;ואהבת לרעך כמוך&quot;
                 </motion.h2>
                                 <motion.div
                   className="space-y-4 text-lg leading-relaxed text-gray-800"
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.6, delay: 0.4 }}
                 >
                   <p>הוא עקרון בסיסי שעלינו ליישם בחיינו ולכן אנו פועלים במטרה להעניק עזרה לכל מי שזקוק לה.</p>
                   <p>
                     כיום, אנו מחלקים באופן קבוע סלי מזון עשירים למאות משפחות, ושואפים להרחיב את החלוקה שלנו
                     לכמות גדולה יותר של משפחות.
                   </p>
                   <p>נשמח להיות שותפים אתכם בסיוע למשפחות במצוקה, ויחד נוכל להמשיך ולהפיץ שמחה ואהבה.</p>
                                      <p className="font-semibold">כל תרומה, קטנה או גדולה, תסייע לנו להמשיך את המפעל החשוב הזה.</p>
                 </motion.div>
               </div>
             </Card>
           </motion.div>

           {/* Call to Action Button */}
           <motion.div
             variants={fadeInUp}
             className="mt-8 text-center"
           >
                           <motion.button
                className="px-8 py-4 text-lg font-bold text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #f2a283 0%, #97cabc 100%)"
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                onClick={() => {
                  // כאן אפשר להוסיף לוגיקה לניווט או פעולה
                  console.log("הכפתור נלחץ - הצטרפו לנתניה");
                }}
              >
               <div className="flex gap-3 justify-center items-center" dir="rtl">
                 <span>הצטרפו לנתניה</span>
                 <svg
                   width="24"
                   height="24"
                   viewBox="0 0 24 24"
                   fill="none"
                   stroke="currentColor"
                   strokeWidth="2"
                   strokeLinecap="round"
                   strokeLinejoin="round"
                   className="text-white"
                 >
                   <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                 </svg>
               </div>
             </motion.button>
             <motion.p
               className="mt-3 text-sm text-gray-600"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               transition={{ duration: 0.6, delay: 0.8 }}
             >
               התרומה מאובטחת ומוגנת בהצפנה מתקדמת
             </motion.p>
           </motion.div>
         </motion.div>
       </div>
     </div>
   )
 }

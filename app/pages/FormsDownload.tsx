"use client";

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Download,
  FileText,
  Users,
  Phone,
  Mail,
  MessageCircle,
  Camera,
  Truck,
  HandHeart,
  Store,
  Megaphone,
  Send,
  Check
} from 'lucide-react';

interface JobPosting {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  requirements?: string[];
}

interface FormDocument {
  id: string;
  title: string;
  description: string;
  filename: string;
  icon: React.ReactNode;
}

type SectionType = 'forms' | 'jobs' | 'contact';

const FormsDownload: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionType>('forms');
  const [selectedLanguage, setSelectedLanguage] = useState<'he' | 'en'>('he');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    agreeToMarketing: false
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.1 });

  const documents: FormDocument[] = [
    {
      id: 'registration',
      title: 'תעודת רישום עמותה',
      description: 'תעודה רשמית המאשרת את רישום העמותה במרשם העמותות',
      filename: 'certificate-of-registration.pdf',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 'tax-exemption',
      title: 'אישור מוסד ציבורי לעניין תרומות (טופס 46)',
      description: 'אישור רשמי המאפשר קיזוז מס על תרומות לעמותה',
      filename: 'tax-exemption-form-46.pdf',
      icon: <FileText className="w-6 h-6" />
    },
    {
      id: 'proper-management',
      title: 'אישור ניהול תקין',
      description: 'אישור על ניהול תקין של העמותה בהתאם לדרישות החוק',
      filename: 'proper-management-certificate.pdf',
      icon: <FileText className="w-6 h-6" />
    }
  ];

  const jobPostings: JobPosting[] = [
    {
      id: 'suppliers-donation',
      title: 'ספקים - תרומות לסלי מזון',
      description: 'מחפשים ספקים המעוניינים לתרום ולתת יד לסלי המזון שלנו',
      icon: <HandHeart className="w-6 h-6" />,
      requirements: ['נכונות לתרום מוצרי מזון', 'אמינות ויציבות', 'התחייבות ארוכת טווח']
    },
    {
      id: 'suppliers-discount',
      title: 'ספקים - הנחות על מוצרי מזון',
      description: 'ספקים המעוניינים לעשות הנחה משמעותית על מוצרי מזון שונים',
      icon: <Store className="w-6 h-6" />,
      requirements: ['יכולת מתן הנחות משמעותיות', 'מגוון מוצרי מזון איכותיים', 'שירות אמין']
    },
    {
      id: 'volunteers',
      title: 'מתנדבים - אריזה וחלוקה',
      description: 'מתנדבים הרוצים לקחת חלק באריזת סלי המזון ובחלוקתם למשפחות',
      icon: <Users className="w-6 h-6" />,
      requirements: ['זמינות קבועה', 'רצון לעזור', 'יכולת עבודה בצוות']
    },
    {
      id: 'photographer',
      title: 'צלם/ת - תיעוד פעילות העמותה',
      description: 'צלם מקצועי המעוניין לצלם ולתעד את פעילות העמותה',
      icon: <Camera className="w-6 h-6" />,
      requirements: ['ניסיון בצילום אירועים', 'ציוד מקצועי', 'יצירתיות וחדשנות']
    },
    {
      id: 'drivers',
      title: 'בעלי רכבים גדולים - שינוע',
      description: 'בעלי רכבים גדולים המעוניינים לעזור בשינוע סלי המזון',
      icon: <Truck className="w-6 h-6" />,
      requirements: ['רכב גדול מתאים', 'רשיון נהיגה בתוקף', 'זמינות גמישה']
    },
    {
      id: 'social-media-manager',
      title: 'מנהלת תוכן ברשתות חברתיות',
      description: 'מנהלת מדיה חברתית ופרסום, מנהלת קמפיינים לתרומות ברשת',
      icon: <Megaphone className="w-6 h-6" />,
      requirements: ['ניסיון בניהול רשתות חברתיות', 'יכולת כתיבה יצירתית', 'הבנה בשיווק דיגיטלי']
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', phone: '', message: '', agreeToMarketing: false });
    }, 3000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hover: {
      scale: 1.02,
      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
      transition: { duration: 0.3 }
    }
  };

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0] py-20"
      dir={selectedLanguage === 'he' ? 'rtl' : 'ltr'}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8"
      >
        {/* Language Selector */}
        <motion.div
          variants={itemVariants}
          className="fixed z-50 top-6 right-6"
        >
          <div className="flex items-center p-2 space-x-2 bg-white rounded-full shadow-lg">
            <button
              onClick={() => setSelectedLanguage('he')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'he'
                  ? 'bg-[#2a2b26] text-white'
                  : 'text-[#2a2b26] hover:bg-gray-100'
              }`}
            >
              עברית
            </button>
            <button
              onClick={() => setSelectedLanguage('en')}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                selectedLanguage === 'en'
                  ? 'bg-[#2a2b26] text-white'
                  : 'text-[#2a2b26] hover:bg-gray-100'
              }`}
            >
              English
            </button>
          </div>
        </motion.div>

        {/* Header */}
        <motion.div variants={itemVariants} className="mb-16 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-[#2a2b26] mb-6">
            {selectedLanguage === 'he' ? 'מרכז המידע שלנו' : 'Our Information Center'}
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            {selectedLanguage === 'he' 
              ? 'כל המידע הרלוונטי על העמותה, הזדמנויות עבודה ודרכי יצירת קשר'
              : 'All relevant information about our organization, job opportunities and contact methods'
            }
          </p>
        </motion.div>

        {/* Navigation Tabs */}
        <motion.div variants={itemVariants} className="flex justify-center mb-12">
          <div className="p-2 bg-white rounded-full shadow-lg">
            <div className="flex space-x-2">
              {[
                { id: 'forms' as SectionType, label: selectedLanguage === 'he' ? 'טפסים להורדה' : 'Forms Download', icon: <Download className="w-5 h-5" /> },
                { id: 'jobs' as SectionType, label: selectedLanguage === 'he' ? 'דרושים' : 'Jobs', icon: <Users className="w-5 h-5" /> },
                { id: 'contact' as SectionType, label: selectedLanguage === 'he' ? 'צור קשר' : 'Contact', icon: <Phone className="w-5 h-5" /> }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all ${
                    activeSection === tab.id
                      ? 'bg-[#2a2b26] text-white shadow-md'
                      : 'text-[#2a2b26] hover:bg-gray-100'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === 'forms' && (
            <motion.div
              key="forms"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
            >
              {documents.map((doc, index) => (
                <motion.div
                  key={doc.id}
                  variants={cardVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 transition-all bg-white shadow-lg cursor-pointer rounded-2xl hover:shadow-xl group"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-[#2a2b26] rounded-full text-white group-hover:scale-110 transition-transform">
                      {doc.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#2a2b26] mr-4">{doc.title}</h3>
                  </div>
                  <p className="mb-6 leading-relaxed text-gray-600">{doc.description}</p>
                  <button className="w-full bg-gradient-to-r from-[#2a2b26] to-[#3a3b36] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>{selectedLanguage === 'he' ? 'הורד קובץ' : 'Download File'}</span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === 'jobs' && (
            <motion.div
              key="jobs"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-8 md:grid-cols-2"
            >
              {jobPostings.map((job, index) => (
                <motion.div
                  key={job.id}
                  variants={cardVariants}
                  whileHover="hover"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-8 transition-all bg-white shadow-lg rounded-2xl hover:shadow-xl"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-gradient-to-r from-[#2a2b26] to-[#3a3b36] rounded-full text-white">
                      {job.icon}
                    </div>
                    <h3 className="text-xl font-bold text-[#2a2b26] mr-4">{job.title}</h3>
                  </div>
                  <p className="mb-6 leading-relaxed text-gray-600">{job.description}</p>
                 
                  {job.requirements && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-[#2a2b26] mb-3">
                        {selectedLanguage === 'he' ? 'דרישות:' : 'Requirements:'}
                      </h4>
                      <ul className="space-y-2">
                        {job.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-center text-gray-600">
                            <Check className="flex-shrink-0 w-4 h-4 ml-2 text-green-500" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button className="w-full bg-gradient-to-r from-[#2a2b26] to-[#3a3b36] text-white py-3 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2">
                    <Send className="w-5 h-5" />
                    <span>{selectedLanguage === 'he' ? 'שלח פנייה' : 'Send Application'}</span>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              key="contact"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-12 lg:grid-cols-2"
            >
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-8 bg-white shadow-lg rounded-2xl"
              >
                <h3 className="text-2xl font-bold text-[#2a2b26] mb-6">
                  {selectedLanguage === 'he' ? 'השאר פרטים ונחזור אליך' : 'Leave your details and we\'ll get back to you'}
                </h3>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {selectedLanguage === 'he' ? 'שם מלא' : 'Full Name'}
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a2b26] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {selectedLanguage === 'he' ? 'דואר אלקטרוני' : 'Email'}
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a2b26] focus:border-transparent transition-all"
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {selectedLanguage === 'he' ? 'טלפון' : 'Phone'}
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a2b26] focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      {selectedLanguage === 'he' ? 'הודעה' : 'Message'}
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      rows={4}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#2a2b26] focus:border-transparent transition-all resize-none"
                      required
                    />
                  </div>

                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="marketing"
                      checked={formData.agreeToMarketing}
                      onChange={(e) => setFormData({...formData, agreeToMarketing: e.target.checked})}
                      className="w-4 h-4 text-[#2a2b26] bg-gray-100 border-gray-300 rounded focus:ring-[#2a2b26] focus:ring-2"
                    />
                    <label htmlFor="marketing" className="mr-2 text-sm text-gray-600">
                      {selectedLanguage === 'he' 
                        ? 'אני מאשר לקבל מידע נוסף מכיף לתת'
                        : 'I agree to receive additional information from Keif Latet'
                      }
                    </label>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#2a2b26] to-[#3a3b36] text-white py-4 rounded-xl font-medium hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                  >
                    <Send className="w-5 h-5" />
                    <span>{selectedLanguage === 'he' ? 'שלח הודעה' : 'Send Message'}</span>
                  </motion.button>
                </form>

                {isSubmitted && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-4 mt-4 text-center text-green-800 bg-green-100 rounded-xl"
                  >
                    {selectedLanguage === 'he' 
                      ? 'תודה! ההודעה נשלחה בהצלחה. נחזור אליך בקרוב.'
                      : 'Thank you! Your message has been sent successfully. We will get back to you soon.'
                    }
                  </motion.div>
                )}
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="space-y-8"
              >
                <div className="p-8 bg-white shadow-lg rounded-2xl">
                  <h3 className="text-2xl font-bold text-[#2a2b26] mb-6">
                    {selectedLanguage === 'he' ? 'פרטי התקשרות' : 'Contact Information'}
                  </h3>
                  
                  <div className="space-y-6">
                    <motion.a
                      href="tel:053-221-7895"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-4 transition-all bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:shadow-md"
                    >
                      <Phone className="w-6 h-6 ml-4 text-blue-600" />
                      <div>
                        <div className="font-semibold text-[#2a2b26]">
                          {selectedLanguage === 'he' ? 'טלפון' : 'Phone'}
                        </div>
                        <div className="text-blue-600">053-221-7895</div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="mailto:keflatet@gmail.com"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-4 transition-all bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-md"
                    >
                      <Mail className="w-6 h-6 ml-4 text-green-600" />
                      <div>
                        <div className="font-semibold text-[#2a2b26]">
                          {selectedLanguage === 'he' ? 'דואר אלקטרוני' : 'Email'}
                        </div>
                        <div className="text-green-600">keflatet@gmail.com</div>
                      </div>
                    </motion.a>

                    <motion.a
                      href="https://wa.me/972532217895"
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center p-4 transition-all bg-gradient-to-r from-green-50 to-green-100 rounded-xl hover:shadow-md"
                    >
                      <MessageCircle className="w-6 h-6 ml-4 text-green-600" />
                      <div>
                        <div className="font-semibold text-[#2a2b26]">
                          {selectedLanguage === 'he' ? 'ווטסאפ' : 'WhatsApp'}
                        </div>
                        <div className="text-green-600">053-221-7895</div>
                      </div>
                    </motion.a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-[#2a2b26] to-[#3a3b36] rounded-2xl p-8 text-white">
                  <h3 className="mb-4 text-xl font-bold">
                    {selectedLanguage === 'he' ? 'זמינים עבורך' : 'Available for You'}
                  </h3>
                  <p className="leading-relaxed text-gray-300">
                    {selectedLanguage === 'he'
                      ? 'הצוות שלנו זמין כדי לענות על כל שאלה ולעזור לך להצטרף למשימה החשובה של עזרה לקהילה.'
                      : 'Our team is available to answer any questions and help you join our important mission of helping the community.'
                    }
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating Action Button for WhatsApp */}
      <motion.a
        href="https://wa.me/972532217895"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed z-50 p-4 text-white transition-all bg-green-500 rounded-full shadow-xl bottom-6 left-6 hover:shadow-2xl"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
      >
        <MessageCircle className="w-6 h-6" />
      </motion.a>
    </div>
  );
};

export default FormsDownload;
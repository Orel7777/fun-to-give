"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { SlidUpLeft } from '../lib/utils';
import Card from '../ui/Card';

const FormsDownload: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf6ed' }}>
      <div className="container px-4 py-12 mx-auto">
        <motion.h1
          className="mb-28 md:mb-32 text-4xl font-bold font-staff text-center text-gray-800"
          variants={SlidUpLeft(0)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          טפסים רשמיים
        </motion.h1>
        
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: '90px' }}>
          {/* תעודת רישום עמותה */}
          <Card>
            <motion.div
              className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0"
              variants={SlidUpLeft(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="mb-0 text-xl font-bold font-staff text-gray-800 text-center"
                variants={SlidUpLeft(0.1)}
              >
                תעודת רישום עמותה
              </motion.h2>
              <motion.div
                className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto"
                variants={SlidUpLeft(0.15)}
              >
                <Image
                  src="/טפסים/תעודת רישום עמותה.png"
                  alt="תעודת רישום עמותה"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="rounded-lg shadow-md object-cover object-center"
                />
              </motion.div>
              <motion.div variants={SlidUpLeft(0.2)}>
                <motion.a
                  href="/טפסים/תעודת רישום עמותה.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline hover:text-blue-800"
                  style={{ color: '#f5a383' }}
                >
                  לצפייה בתעודה לחץ כאן
                </motion.a>
              </motion.div>
            </motion.div>
          </Card>

          {/* אישור מוסד ציבורי לעניין תרומות */}
          <Card>
            <motion.div
              className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0"
              variants={SlidUpLeft(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="mb-0 text-xl font-bold font-staff text-gray-800 text-center"
                variants={SlidUpLeft(0.1)}
              >
                אישור מוסד ציבורי לעניין תרומות (טופס 46)
              </motion.h2>
              <motion.div
                className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto"
                variants={SlidUpLeft(0.15)}
              >
                <Image
                  src="/טפסים/טופס 46.png"
                  alt="אישור מוסד ציבורי לעניין תרומות"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="rounded-lg shadow-md object-cover object-center"
                />
              </motion.div>
              <motion.div variants={SlidUpLeft(0.2)}>
                <motion.a
                  href="/טפסים/טופס 46.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline hover:text-blue-800"
                  style={{ color: '#f5a383' }}
                >
                  לצפייה בתעודה לחץ כאן
                </motion.a>
              </motion.div>
            </motion.div>
          </Card>

          {/* אישור ניהול תקין */}
          <Card>
            <motion.div
              className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0"
              variants={SlidUpLeft(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="mb-0 text-xl font-bold font-staff text-gray-800 text-center"
                variants={SlidUpLeft(0.1)}
              >
                אישור ניהול תקין לשנת 2025
              </motion.h2>
              <motion.div
                className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto"
                variants={SlidUpLeft(0.15)}
              >
                <Image
                  src="/טפסים/אישור הגשת מסמכים.png"
                  alt="אישור ניהול תקין"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="rounded-lg shadow-md object-cover object-center"
                />
              </motion.div>
              <motion.div variants={SlidUpLeft(0.2)}>
                <motion.a
                  href="/טפסים/אישור הגשת מסמכים.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline hover:text-blue-800"
                  style={{ color: '#f5a383' }}
                >
                  לצפייה בתעודה לחץ כאן
                </motion.a>
              </motion.div>
            </motion.div>
          </Card>

          {/* אישור ניכוי מס במקור */}
          <Card>
            <motion.div
              className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0"
              variants={SlidUpLeft(0.05)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              <motion.h2
                className="mb-0 text-xl font-bold font-staff text-gray-800 text-center"
                variants={SlidUpLeft(0.1)}
              >
                אישור ניכוי מס במקור
              </motion.h2>
              <motion.div
                className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto"
                variants={SlidUpLeft(0.15)}
              >
                <Image
                  src="/טפסים/ניכוי מס.png"
                  alt="אישור ניכוי מס במקור"
                  fill
                  sizes="(max-width: 640px) 100vw, 300px"
                  className="rounded-lg shadow-md object-cover object-center"
                />
              </motion.div>
              <motion.div variants={SlidUpLeft(0.2)}>
                <motion.a
                  href="/טפסים/ניכוי מס.png"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-blue-600 underline hover:text-blue-800"
                  style={{ color: '#f5a383' }}
                >
                  לצפייה בתעודה לחץ כאן
                </motion.a>
              </motion.div>
            </motion.div>
          </Card>
        </div>
        
        {/* כפתור חזרה לאתר */}
        <motion.div
          className="mt-12 text-center"
          variants={SlidUpLeft(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <Link href="/">
            <button className="px-8 py-3 bg-[#f5a383] text-white font-semibold font-staff rounded-lg hover:bg-[#e0ccbc] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              חזרה לאתר
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default FormsDownload;
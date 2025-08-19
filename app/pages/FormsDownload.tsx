"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FormsDownload: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf6ed' }}>
      <div className="container px-4 py-12 mx-auto">
        <h1 className="mb-28 md:mb-32 text-4xl font-bold font-staff text-center text-gray-800">
          טפסים רשמיים
        </h1>
        
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4" style={{ marginTop: '90px' }}>
          {/* תעודת רישום עמותה */}
          <div className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0">
            <h2 className="mb-0 text-xl font-bold font-staff text-gray-800 text-center">
              תעודת רישום עמותה
            </h2>
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto">
              <Image
                src="/טפסים/תעודת רישום עמותה.png"
                alt="תעודת רישום עמותה"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="rounded-lg shadow-md object-cover object-center"
              />
            </div>
            <div>
              <a
                href="/טפסים/תעודת רישום עמותה.png"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline hover:text-blue-800"
                style={{ color: '#f5a383' }}
              >
                לצפייה בתעודה לחץ כאן
              </a>
            </div>
          </div>

          {/* אישור מוסד ציבורי לעניין תרומות */}
          <div className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0">
            <h2 className="mb-0 text-xl font-bold font-staff text-gray-800 text-center">
              אישור מוסד ציבורי לעניין תרומות (טופס 46)
            </h2>
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto">
              <Image
                src="/טפסים/טופס 46.png"
                alt="אישור מוסד ציבורי לעניין תרומות"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="rounded-lg shadow-md object-cover object-center"
              />
            </div>
            <div>
              <a
                href="/טפסים/טופס 46.png"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline hover:text-blue-800"
                style={{ color: '#f5a383' }}
              >
                לצפייה בתעודה לחץ כאן
              </a>
            </div>
          </div>

          {/* אישור ניהול תקין */}
          <div className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0">
            <h2 className="mb-0 text-xl font-bold font-staff text-gray-800 text-center">
              אישור ניהול תקין לשנת 2025
            </h2>
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto">
              <Image
                src="/טפסים/אישור הגשת מסמכים.png"
                alt="אישור ניהול תקין"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="rounded-lg shadow-md object-cover object-center"
              />
            </div>
            <div>
              <a
                href="/טפסים/אישור הגשת מסמכים.png"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline hover:text-blue-800"
                style={{ color: '#f5a383' }}
              >
                לצפייה בתעודה לחץ כאן
              </a>
            </div>
          </div>

          {/* אישור ניכוי מס במקור */}
          <div className="text-center bg-white rounded-lg shadow-lg flex flex-col h-full p-0">
            <h2 className="mb-0 text-xl font-bold font-staff text-gray-800 text-center">
              אישור ניכוי מס במקור
            </h2>
            <div className="relative w-full max-w-[320px] sm:max-w-[340px] aspect-[210/297] mx-auto">
              <Image
                src="/טפסים/ניכוי מס.png"
                alt="אישור ניכוי מס במקור"
                fill
                sizes="(max-width: 640px) 100vw, 300px"
                className="rounded-lg shadow-md object-cover object-center"
              />
            </div>
            <div>
              <a
                href="/טפסים/ניכוי מס.png"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline hover:text-blue-800"
                style={{ color: '#f5a383' }}
              >
                לצפייה בתעודה לחץ כאן
              </a>
            </div>
          </div>
        </div>
        
        {/* כפתור חזרה לאתר */}
        <div className="mt-12 text-center">
          <Link href="/">
            <button className="px-8 py-3 bg-[#f5a383] text-white font-semibold font-staff rounded-lg hover:bg-[#e0ccbc] transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
              חזרה לאתר
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FormsDownload;
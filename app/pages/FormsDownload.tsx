"use client";

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const FormsDownload: React.FC = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdf6ed' }}>
      <div className="container px-4 py-12 mx-auto">
        <h1 className="mb-12 text-4xl font-bold font-staff text-center text-gray-800">
          טפסים רשמיים
        </h1>
        
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* תעודת רישום עמותה */}
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold font-staff text-gray-800">
              תעודת רישום עמותה
            </h2>
            <div className="relative mb-4">
              <Image
                src="/טפסים/תעודת רישום עמותה.png"
                alt="תעודת רישום עמותה"
                width={300}
                height={400}
                className="mx-auto rounded-lg shadow-md"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="space-y-2">
              <a
                href="/טפסים/תעודת רישום עמותה.png"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline hover:text-blue-800"
                style={{ color: '#f5a383' }}
              >
                לצפייה בתעודה לחץ כאן
              </a>
              <a
                href="https://www.guidestar.org.il"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-blue-600 underline hover:text-blue-800"
                style={{ color: '#9acdbe' }}
              >
                צפייה בדף העמותה באתר גיידסטאר
              </a>
            </div>
          </div>

          {/* אישור מוסד ציבורי לעניין תרומות */}
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold font-staff text-gray-800">
              אישור מוסד ציבורי לעניין תרומות (טופס 46)
            </h2>
            <div className="relative mb-4">
              <Image
                src="/טפסים/טופס 46.png"
                alt="אישור מוסד ציבורי לעניין תרומות"
                width={300}
                height={400}
                className="mx-auto rounded-lg shadow-md"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="space-y-2">
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
          <div className="p-6 text-center bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-xl font-bold font-staff text-gray-800">
              אישור ניהול תקין לשנת 2025
            </h2>
            <div className="relative mb-4">
              <Image
                src="/טפסים/אישור הגשת מסמכים.png"
                alt="אישור ניהול תקין"
                width={300}
                height={400}
                className="mx-auto rounded-lg shadow-md"
                style={{ objectFit: 'cover' }}
              />
            </div>
            <div className="space-y-2">
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
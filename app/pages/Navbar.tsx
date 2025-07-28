"use client";
import React, { useState } from "react";

interface NavigationBarProps {
  className?: string;
}

export default function NavigationBar({ className = "" }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const menuItems: string[] = [
    "הפעילות שלנו",
    "תמונות ווידאו",
    "משפחות מספרות",
    "תרומה",
    "ייעוד העמותה",
    "סיפור העמותה",
    "דרושים"
  ];

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
  };

  return (
    <nav className={`fixed top-0 right-0 left-0 z-50 border-b shadow-lg backdrop-blur-xl bg-white/30 border-gray-200/40 ${className}`} dir="rtl">
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline space-x-6 space-x-reverse">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
                  className="px-4 py-3 text-base font-semibold text-gray-800 rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50/50 hover:scale-105"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
                          <img
                src="/logo.png"
                alt="כיף לתת"
                className="w-auto h-16"
                loading="eager"
              />
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 transition-colors duration-200 hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t backdrop-blur-xl bg-white/40 border-gray-200/30 md:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2 sm:px-6">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
                className="block px-4 py-3 text-lg font-semibold text-gray-800 rounded-lg transition-all duration-300 hover:text-blue-600 hover:bg-blue-50/50"
                onClick={closeMenu}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
} 
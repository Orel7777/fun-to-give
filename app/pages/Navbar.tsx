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
    <nav className={`fixed top-0 right-0 left-0 z-50 bg-white shadow-md ${className}`} dir="rtl">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl font-bold text-black">כיף לתת</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="flex items-baseline ml-10 space-x-4 space-x-reverse">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
                  className="px-3 py-2 text-sm font-medium text-black rounded-md transition-colors duration-200 hover:text-blue-600"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-black hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
        <div className="bg-white border-t border-gray-200 md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={`#${item.replace(/\s+/g, '-').toLowerCase()}`}
                className="block px-3 py-2 text-base font-medium text-black rounded-md transition-colors duration-200 hover:text-blue-600"
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
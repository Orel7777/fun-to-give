"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Book, Menu, Heart, Users, Camera, Gift, FileText } from "lucide-react";

interface NavigationBarProps {
  className?: string;
}

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.JSX.Element;
  items?: MenuItem[];
}

export default function NavigationBar({ className = "" }: NavigationBarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isMobileMenuDropdownOpen, setIsMobileMenuDropdownOpen] = useState<boolean>(false);

  const menuItems = [
    { title: "הפעילות שלנו", url: "#הפעילות-שלנו" },
    { title: "תמונות ווידאו", url: "#תמונות-ווידאו" },
    { title: "משפחות מספרות", url: "#משפחות-מספרות" },
    { title: "תרומה", url: "#תרומה" },
    { title: "ייעוד העמותה", url: "#ייעוד-העמותה" },
  ];

  const toggleMenu = (): void => {
    setIsMenuOpen(!isMenuOpen);
    if (isMenuOpen) {
      setIsMobileMenuDropdownOpen(false);
    }
  };

  const closeMenu = (): void => {
    setIsMenuOpen(false);
    setIsMobileMenuDropdownOpen(false);
  };

  const toggleMobileMenuDropdown = (): void => {
    setIsMobileMenuDropdownOpen(!isMobileMenuDropdownOpen);
  };

  return (
    <nav className={`fixed top-0 right-0 left-0 border-b shadow-lg backdrop-blur-xl z-[999999] bg-white/30 border-gray-200/40 ${className}`}>
      <div className="px-6 mx-auto max-w-7xl sm:px-8 lg:px-12">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Donate - בצד שמאל */}
          <div className="flex items-center space-x-4">
            {/* Logo - הכי ימין */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex gap-2 items-center">
                <img
                  src="/logo.png"
                  alt="כיף לתת"
                  className="w-auto h-16"
                  loading="eager"
                />
              </Link>
            </div>
            
            <button className="px-6 py-2 font-semibold text-white bg-[#2b2e3a] rounded-lg transition-all duration-300 hover:scale-105 flex items-center gap-2 relative overflow-hidden group cursor-pointer">
              <span className="relative z-10">תרום עכשיו</span>
              <div className="relative z-10 w-2 h-2 bg-white rounded-full transition-all duration-300 group-hover:translate-x-1 group-hover:w-4 group-hover:h-4 group-hover:rounded-none group-hover:bg-transparent">
                <svg 
                  className="w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
                  fill="white" 
                  fillRule="evenodd"
                  viewBox="0 0 198.204 198.204"
                >
                  <path d="M114.799,168.906c-1.582,0-5.261-0.716-5.261-7.383v-30.624H8.181
					c-0.279,0.043-0.655,0.082-1.102,0.082c-1.8,0-3.464-0.68-4.688-1.933C0.805,127.427,0,124.947,0,121.686V74.614
					c0-6.51,4.617-8.231,7.057-8.231h100.34V38.317c0-7.848,3.736-9.019,5.962-9.019c3.572,0,7.129,3.396,7.805,4.08
					c2.441,1.8,66.982,50.455,74.075,57.541c2.577,2.58,3.028,5.175,2.956,6.893c-0.172,4.134-3.357,6.947-3.715,7.258
					l-71.792,59.413C121.91,165.334,118.267,168.906,114.799,168.906z"/>
                </svg>
              </div>
              <div className="absolute inset-0 bg-[#0016ec] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
            </button>
          </div>

          {/* Auth Buttons - בצד ימין */}
          <div className="hidden items-center space-x-4 md:flex">
            <div className="relative group">
              <button className="px-4 py-2 font-semibold text-gray-800 rounded-lg transition-all duration-300 cursor-pointer hover:text-blue-600 hover:bg-blue-50/50">
                תפריט
              </button>
              
              {/* Dropdown Menu */}
              <div className="absolute right-0 top-full invisible z-50 mt-2 w-72 rounded-xl border shadow-2xl opacity-0 backdrop-blur-xl transition-all duration-500 ease-out scale-95 bg-white/95 border-gray-200/50 group-hover:opacity-100 group-hover:visible group-hover:scale-100">
                <div className="p-3">
                  {menuItems.map((item, index) => (
                    <a
                      key={index}
                      href={item.url}
                      className="block px-4 py-4 text-base font-medium text-gray-700 rounded-lg transition-all duration-300 cursor-pointer hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:text-blue-700 hover:shadow-md hover:scale-105 hover:translate-x-1 active:scale-95"
                      style={{
                        animationDelay: `${index * 100}ms`,
                        transform: 'translateX(0)',
                      }}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 transition-all duration-300">{item.title}</span>
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full opacity-0 transition-all duration-300 transform scale-y-0 group-hover:opacity-100 group-hover:scale-y-100"></div>
                      </div>
                    </a>
                  ))}
                </div>
                {/* Decorative bottom border */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-b-xl"></div>
              </div>
            </div>
            <button className="px-4 py-2 font-semibold text-gray-800 rounded-lg transition-all duration-300 cursor-pointer hover:text-blue-600 hover:bg-blue-50/50">
              צור קשר
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-800 transition-colors duration-200 cursor-pointer hover:text-blue-600 focus:outline-none focus:text-blue-600"
              aria-label={isMenuOpen ? "סגור תפריט" : "פתח תפריט"}
            >
              <Menu className="w-7 h-7" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t backdrop-blur-xl bg-white/95 border-gray-200/30 lg:hidden">
          <div className="px-4 pt-4 pb-6 space-y-2">
            {/* Mobile Auth Buttons */}
            <div className="pt-4 mt-4 space-y-3 border-t">
              <div className="space-y-2">
                <button 
                  className="flex justify-between items-center px-4 py-3 w-full font-semibold text-gray-800 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50"
                  onClick={toggleMobileMenuDropdown}
                >
                  <span>תפריט</span>
                  <svg 
                    className={`w-4 h-4 transition-transform duration-300 ${isMobileMenuDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                  </svg>
                </button>
                {/* Mobile Menu Items */}
                <div 
                  className={`ml-4 space-y-1 transition-all duration-300 ease-in-out overflow-hidden ${
                    isMobileMenuDropdownOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
            {menuItems.map((item, index) => (
              <a
                key={index}
                      href={item.url}
                      className="block px-4 py-3 text-base text-gray-600 rounded-lg transition-all duration-300 cursor-pointer hover:text-blue-600 hover:bg-gradient-to-r hover:from-blue-50 hover:to-indigo-50 hover:shadow-sm hover:scale-105 active:scale-95"
                onClick={closeMenu}
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
              >
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-gray-800 transition-all duration-300">{item.title}</span>
                        <div className="w-1 h-6 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full opacity-0 transition-all duration-300 transform scale-y-0"></div>
                      </div>
              </a>
            ))}
                </div>
              </div>
              <button className="px-4 py-3 w-full font-semibold text-gray-800 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-50">
                צור קשר
              </button>
              <button className="px-4 py-3 w-full font-semibold text-white bg-[#2b2e3a] rounded-lg hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer">
                <span className="relative z-10">תרום עכשיו</span>
                <div className="relative z-10 w-2 h-2 bg-white rounded-full transition-all duration-300 group-hover:translate-x-1 group-hover:w-4 group-hover:h-4 group-hover:rounded-none group-hover:bg-transparent">
                  <svg 
                    className="w-full h-full opacity-0 transition-opacity duration-300 group-hover:opacity-100" 
                    fill="white" 
                    fillRule="evenodd"
                    viewBox="0 0 198.204 198.204"
                  >
                    <path d="M114.799,168.906c-1.582,0-5.261-0.716-5.261-7.383v-30.624H8.181
					c-0.279,0.043-0.655,0.082-1.102,0.082c-1.8,0-3.464-0.68-4.688-1.933C0.805,127.427,0,124.947,0,121.686V74.614
					c0-6.51,4.617-8.231,7.057-8.231h100.34V38.317c0-7.848,3.736-9.019,5.962-9.019c3.572,0,7.129,3.396,7.805,4.08
					c2.441,1.8,66.982,50.455,74.075,57.541c2.577,2.58,3.028,5.175,2.956,6.893c-0.172,4.134-3.357,6.947-3.715,7.258
					l-71.792,59.413C121.91,165.334,118.267,168.906,114.799,168.906z"/>
                  </svg>
                </div>
                <div className="absolute inset-0 bg-[#0016ec] transform -translate-x-full transition-transform duration-300 group-hover:translate-x-0"></div>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 
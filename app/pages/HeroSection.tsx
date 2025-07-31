import React from 'react';
import { HeroSimple } from '../components';

interface HeroSectionProps {
  showTextAnimation: boolean;
}

const HeroSection = ({ showTextAnimation }: HeroSectionProps) => {
  // Only show the futuristic hero when text animation should be visible
  if (!showTextAnimation) {
    return (
      <div className="flex flex-col justify-center items-center px-4 min-h-screen bg-[#fdf6ed] sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-7xl text-center">
          <div className="mb-8">
            <div className="text-6xl font-black text-gray-900 md:text-8xl lg:text-9xl font-staff">
              כיף לתת
            </div>
            <div className="mt-4 text-2xl font-bold text-gray-700 md:text-4xl lg:text-5xl font-staff">
              עם כל נתינה הלב מתמלא
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <HeroSimple />;
};

export default HeroSection;
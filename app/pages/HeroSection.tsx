import React from 'react';
import { TextType } from '../components';

interface HeroSectionProps {
  showTextAnimation: boolean;
}

const HeroSection = ({ showTextAnimation }: HeroSectionProps) => {
  return (
    <div className="flex flex-col justify-center items-center px-4 min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 sm:px-6 lg:px-8">
      <div className="relative mx-auto max-w-7xl text-center">
        {/* טקסט ראשי גדול */}
        <div className="mb-8">
          {showTextAnimation && (
            <div className="space-y-4">
              {/* כיף לתת עם כל נתינה הלב מתמלא */}
              <div className="relative">
                <TextType 
                  text={["כיף לתת\nעם כל נתינה הלב מתמלא"]}
                  className="text-9xl font-black leading-tight sm:text-[12rem] md:text-[15rem] lg:text-[18rem] xl:text-[20rem] text-gray-900 almoni-bold whitespace-pre-line"
                  textColors={["#1a1a1a"]}
                  typingSpeed={150}
                  showCursor={false}
                  loop={true}
                  initialDelay={0}
                  startOnVisible={true}
                  onSentenceComplete={() => console.log('Text completed')}
                />
                {/* אלמנט דקורטיבי */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-pink-200 rounded-full opacity-60 animate-pulse"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
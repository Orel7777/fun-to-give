"use client";

import { useEffect } from 'react';

export default function ScrollToTop() {
  useEffect(() => {
    // Function to scroll to top
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto' // Instant scroll on page load
      });
    };

    // Scroll to top on component mount (page load/refresh)
    scrollToTop();

    // Also listen for beforeunload to ensure we start at top on refresh
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
}

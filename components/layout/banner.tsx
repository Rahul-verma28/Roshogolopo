"use client";

import { useEffect, useState } from "react";

export function Banner() {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  const bannerMessages = [
    "PAN India Delivery – 4 to 6 days",
    "Enjoy fast and fresh delivery from our outlets within 3–6 km in Gurugram, Delhi, Faridabad, Sohna & Palwal."
  ];

  // Auto slide effect
  useEffect(() => {
    const timer = setInterval(() => {
      handleSlide();
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(timer);
  }, [currentMessageIndex]);

  // Manual slide handler
  const handleSlide = () => {
    setIsSliding(true);
    setTimeout(() => {
      setCurrentMessageIndex((prevIndex) => 
        prevIndex === bannerMessages.length - 1 ? 0 : prevIndex + 1
      );
      setIsSliding(false);
    }, 500); // Match this with CSS animation duration
  };

  return (
    <div 
      className="w-full py-3 cursor-pointer relative"
      style={{ backgroundColor: "#af2037" }}
      onClick={handleSlide}
    >
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden">
          <div
            className={`text-white text-center text-xs font-medium transition-all duration-500 ease-in-out 
              ${isSliding ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'}`}
          >
            {bannerMessages[currentMessageIndex]}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Banner;
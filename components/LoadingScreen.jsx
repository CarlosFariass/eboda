'use client';

import { useState, useEffect } from 'react';
import FuzzyText from './FuzzyText';

const LoadingScreen = ({ onComplete }) => {
  const [isDissolving, setIsDissolving] = useState(false);
  const [opacity, setOpacity] = useState(1);
  const [blur, setBlur] = useState(0);

  useEffect(() => {
    // Start dissolve animation after 2 seconds
    const dissolveTimer = setTimeout(() => {
      setIsDissolving(true);
      setBlur(20);
    }, 2000);

    // Increase blur and reduce opacity
    const fadeTimer = setTimeout(() => {
      setBlur(50);
      setOpacity(0);
    }, 2500);

    // Complete after fade out
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 3500);

    return () => {
      clearTimeout(dissolveTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className="fixed inset-0 bg-[#060010] flex items-center justify-center z-50 transition-opacity duration-1000 p-4"
      style={{ opacity }}
    >
      <div 
        className="transition-all duration-1000 ease-out text-center w-full max-w-[90vw] md:max-w-[80vw]"
        style={{
          filter: `blur(${blur}px)`,
          transform: isDissolving ? 'scale(1.1)' : 'scale(1)',
          opacity: isDissolving ? 0 : 1,
        }}
      >
        {/* Desktop: single line */}
        <div className="hidden md:block">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(2.5rem, 8vw, 6rem)"
            color="#ffffff"
          >
            Bem-vindo ao EBODA
          </FuzzyText>
        </div>
        
        {/* Mobile/Tablet: two lines */}
        <div className="md:hidden flex flex-col items-center gap-2">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(2rem, 10vw, 4rem)"
            color="#ffffff"
          >
            Bem-vindo ao
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(2.5rem, 14vw, 5rem)"
            color="#ffffff"
          >
            EBODA
          </FuzzyText>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
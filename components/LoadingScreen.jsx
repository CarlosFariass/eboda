'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import FuzzyText from './FuzzyText';

const LoadingScreen = ({ onComplete }) => {
  const t = useTranslations('loading');
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
      className="fixed inset-0 bg-[#060010] flex items-center justify-center z-50 transition-opacity duration-1000"
      style={{ opacity }}
    >
      <div 
        className="transition-all duration-1000 ease-out flex flex-col items-center justify-center w-full h-full px-4"
        style={{
          filter: `blur(${blur}px)`,
          transform: isDissolving ? 'scale(1.1)' : 'scale(1)',
          opacity: isDissolving ? 0 : 1,
        }}
      >
        {/* Layout unificado para todos os dispositivos */}
        <div className="flex flex-col items-center justify-center text-center gap-1 sm:gap-2">
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(1.5rem, 5vw, 3rem)"
            color="#ffffff"
          >
            {t('welcomeTo')}
          </FuzzyText>
          <FuzzyText
            baseIntensity={0.2}
            hoverIntensity={0.5}
            enableHover={true}
            fontSize="clamp(3rem, 12vw, 8rem)"
            fontWeight="900"
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
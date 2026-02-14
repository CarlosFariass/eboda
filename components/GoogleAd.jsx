'use client';

import { useEffect, useRef } from 'react';

export default function GoogleAd({ 
  adSlot = "5443365802",
  adFormat = "auto",
  fullWidthResponsive = true,
  className = ""
}) {
  const adRef = useRef(null);
  const isAdLoaded = useRef(false);

  useEffect(() => {
    // Evitar carregar o anúncio múltiplas vezes
    if (isAdLoaded.current) return;
    
    try {
      // Verificar se o script do AdSense já foi carregado
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        window.adsbygoogle.push({});
        isAdLoaded.current = true;
      }
    } catch (err) {
      console.error('Erro ao carregar anúncio:', err);
    }
  }, []);

  return (
    <div className={`google-ad-container ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client="ca-pub-2115500079864644"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={fullWidthResponsive ? "true" : "false"}
        ref={adRef}
      />
    </div>
  );
}

import React, { useEffect } from 'react';

const ShopPage = () => {
  useEffect(() => {
    // Create and append the Payhip script
    const script = document.createElement('script');
    script.src = 'https://payhip.com/embed-page.js?v=24u68984';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-ga-black text-ga-white">
      {/* Header spacing */}
      <div className="h-20"></div>
      
      {/* Shop content */}
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-5xl font-alata mb-12">Shop</h1>
        
        {/* Payhip embed container */}
        <div className="w-full bg-ga-gray/50 rounded-lg backdrop-blur-sm border border-ga-gray/20 p-4">
          <div 
            className="payhip-embed-page w-full min-h-[800px]" 
            data-key="peXsw"
            style={{
              background: 'transparent',
              border: 'none',
              width: '100%',
              margin: '0 auto',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ShopPage;
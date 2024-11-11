import React, { useEffect, useState } from 'react';

const AboutPage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  return (
    <div className="min-h-screen bg-ga-black text-ga-white">
      <div className="h-20" /> {/* Header spacing */}
      
      <div className="relative">
        {/* Video Background */}
        <div className="absolute inset-0 overflow-hidden">
          <video
            className={`w-full h-full object-cover opacity-20 transition-opacity duration-1000 ${
              isVideoLoaded ? 'opacity-20' : 'opacity-0'
            }`}
            autoPlay
            loop
            muted
            playsInline
            onLoadedData={() => setIsVideoLoaded(true)}
          >
            <source src="/assets/dna-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-ga-black/50" />
        </div>

        {/* Content */}
        <div className="relative container mx-auto px-6 py-24">
          <h1 className="text-5xl font-alata mb-12 animate-fade-in">About Us</h1>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <p className="text-lg leading-relaxed">
                Growth Academy HQ, represented by our distinctive DNA-inspired logo, symbolizes the
                essence of growth as an integral part of your business's journey. Just as DNA encodes the
                blueprint for life, our mission is to provide the foundational knowledge and skills necessary for
                growth in marketing, customer success, and customer experience.
              </p>
              
              <p className="text-lg leading-relaxed">
                Our academy aims to decode complex strategies and best practices, making them accessible and
                actionable for professionals and businesses seeking sustainable success. The DNA strand in
                our logo represents continuous learning, evolution, and the interconnectedness of growth strategies
                that drive businesses forward.
              </p>
              
              <p className="text-lg leading-relaxed">
                At Growth Academy HQ, we are committed to equipping you with the tools and insights needed
                to optimize growth and enhance customer experiences, ensuring your business thrives in an
                ever-evolving landscape.
              </p>
            </div>

            <div className="relative aspect-square">
              <div className="absolute inset-0 bg-gradient-to-br from-ga-gray/20 to-transparent rounded-lg backdrop-blur-sm border border-ga-gray/20">
                <div className="p-8 h-full flex flex-col justify-center">
                  <h3 className="text-2xl font-alata mb-6">Our Values</h3>
                  <ul className="space-y-4">
                    <li className="flex items-center gap-3">
                      <span className="text-2xl">🧬</span>
                      <span>Continuous Learning & Evolution</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl">🎯</span>
                      <span>Results-Driven Strategies</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl">🤝</span>
                      <span>Client Success Focus</span>
                    </li>
                    <li className="flex items-center gap-3">
                      <span className="text-2xl">💡</span>
                      <span>Innovative Solutions</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
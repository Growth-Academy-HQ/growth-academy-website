import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, TrendingUp, Users } from 'lucide-react';
const FeatureCard = ({ icon, title, description }) => (
  <motion.div
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5 }}
    className="bg-ga-black/30 backdrop-blur-sm border border-ga-gray/10 p-6 rounded-lg 
               hover:border-ga-gray/30 hover:bg-ga-black/40 transition-all duration-300"
  >
    <div className="text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-alata mb-2">{title}</h3>
    <p className="text-ga-light">{description}</p>
  </motion.div>
);

const HomePage = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const features = [
    {
      icon: <Target className="w-8 h-8 text-ga-white/90" />,
      title: "Marketing Strategy",
      description: "Learn advanced marketing strategies to grow your business effectively."
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-ga-white/90" />,
      title: "Customer Experience",
      description: "Master the art of delivering exceptional customer experiences."
    },
    {
      icon: <Users className="w-8 h-8 text-ga-white/90" />,
      title: "Business Growth",
      description: "Develop skills to scale your business sustainably."
    }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      <div className="fixed inset-0">
        <video
          className={`w-full h-full object-cover transition-opacity duration-1000 ${
            isVideoLoaded ? 'opacity-40' : 'opacity-0'
          }`}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setIsVideoLoaded(true)}
        >
          <source src="/assets/dark-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-ga-black/30 via-ga-black/20 to-ga-black/30" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="min-h-screen flex items-center justify-center px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-center"
          >
            <h1 className="text-6xl md:text-7xl font-alata mb-6 bg-clip-text text-transparent bg-gradient-to-r from-ga-pure-white via-ga-white to-ga-light">
              Grow your skills,<br />
              Grow your business.
            </h1>
            
            <p className="text-xl md:text-2xl text-ga-light mb-12 max-w-2xl mx-auto leading-relaxed">
              Easy-to-understand content to elevate your marketing and customer experience skills.
            </p>

            <motion.a
              href="https://payhip.com/b/peXsw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ga-white text-ga-black px-8 py-4 rounded-lg font-bold 
                       hover:bg-ga-light transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Start Learning NOW!
            </motion.a>
          </motion.div>
        </div>

        {/* Features Section */}
        <div className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.h2 
              className="text-4xl md:text-5xl font-alata text-center mb-16"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              What We Offer
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard key={index} {...feature} />
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action Section */}
        <div className="py-24 px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-4xl md:text-5xl font-alata mb-6">Ready to Start Growing?</h2>
            <p className="text-xl text-ga-light mb-12">
              Join our community of successful professionals and start your growth journey today.
            </p>
            <motion.a
              href="https://payhip.com/b/peXsw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-ga-white text-ga-black px-8 py-4 rounded-lg font-bold 
                       hover:bg-ga-light transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started Now
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
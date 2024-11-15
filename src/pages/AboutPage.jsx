import React from 'react';
import { motion } from 'framer-motion';
import { Target, Lightbulb, Users, BarChart3 } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Target className="w-8 h-8 text-ga-white/90" />,
      title: "Excellence",
      description: "We strive for excellence in every piece of content and guidance we provide."
    },
    {
      icon: <Lightbulb className="w-8 h-8 text-ga-white/90" />,
      title: "Innovation",
      description: "Constantly adapting and evolving with the latest marketing trends and strategies."
    },
    {
      icon: <Users className="w-8 h-8 text-ga-white/90" />,
      title: "Community",
      description: "Building a supportive community of growth-minded professionals."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-ga-white/90" />,
      title: "Results-Driven",
      description: "Focus on practical strategies that deliver measurable business outcomes."
    }
  ];

  return (
    <div className="bg-ga-black">
      {/* Initial Impact Section */}
      <section className="min-h-screen flex flex-col items-center justify-center relative pt-20">
        {/* Background Image with proper centering */}
        <div className="absolute inset-0 flex items-center justify-center opacity-5">
          <img 
            src="/assets/about-background.png" 
            alt="" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-6 text-center relative z-10"
        >
          <h1 className="text-6xl md:text-8xl font-alata mb-8">
            About Growth Academy
          </h1>
          <p className="text-xl md:text-2xl text-ga-light max-w-2xl mx-auto mb-16">
            Scroll to discover our story
          </p>
        </motion.div>

        {/* Animated Arrow */}
        <motion.div
          className="relative z-10 mt-8"
          animate={{ 
            y: [0, 15, 0],
            opacity: [1, 0.5, 1]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <svg 
            width="40" 
            height="40" 
            viewBox="0 0 24 24" 
            fill="none" 
            className="text-ga-white"
          >
            <motion.path
              d="M12 4 L12 20 M5 13 L12 20 L19 13"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </section>

      {/* Mission Statement Section */}
      <section className="min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-ga-gray/5 via-transparent to-ga-gray/5" />
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl"
          >
            <h2 className="text-4xl md:text-6xl font-alata mb-8">
              We empower businesses to grow through knowledge
            </h2>
            <p className="text-xl text-ga-light leading-relaxed">
              Growth Academy HQ provides easy-to-understand content to elevate your
              marketing and customer experience skills. Whether you're just starting
              or looking to grow, we're here to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-ga-gray/5 to-transparent" />
        <div className="container mx-auto px-6 relative">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-4xl font-alata text-center mb-24"
          >
            Our Core Values
          </motion.h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="mb-6 transform group-hover:scale-110 transition-transform">
                  {value.icon}
                </div>
                <h3 className="text-xl font-alata mb-4">{value.title}</h3>
                <p className="text-ga-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="min-h-screen flex items-center relative">
        <div className="absolute inset-0 bg-gradient-to-t from-ga-gray/5 to-transparent" />
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-24 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-alata">Our Vision</h2>
              <p className="text-xl text-ga-light leading-relaxed">
                To be the leading platform for practical business growth education, 
                creating a community of successful professionals who drive 
                innovation and excellence in their industries.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl font-alata">Our Mission</h2>
              <p className="text-xl text-ga-light leading-relaxed">
                To empower businesses and professionals with practical knowledge 
                and tools for sustainable growth, making complex marketing 
                strategies accessible and actionable for everyone.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
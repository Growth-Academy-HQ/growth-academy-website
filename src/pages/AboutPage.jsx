import React from 'react';
import { motion } from 'framer-motion';
import { Flag, Heart, Target } from 'lucide-react';

const AboutPage = () => {
  const values = [
    {
      icon: <Flag className="w-6 h-6" />,
      title: "Be bold",
      description: "We're not afraid to take risks and try new things. We believe in thinking big and challenging the status quo."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Be helpful",
      description: "We're here to help you succeed. We believe in being generous with our time, knowledge, and resources."
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Be results-driven",
      description: "We're focused on delivering real value. We believe in setting clear goals, measuring our progress, and iterating to improve."
    }
  ];

  return (
    <div className="bg-ga-black text-ga-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20">
        <div className="absolute inset-0">
          <img
            src="/assets/about-background.png"
            alt=""
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ga-black/50 via-ga-black/30 to-ga-black" />
        </div>
        
        <div className="container mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto text-center"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-alata mb-8">
              The future of business is here
            </h1>
            <p className="text-lg md:text-xl text-ga-light mb-12">
              We believe that the future of business is in creating great customer experiences. 
              Our mission is to help professionals grow by providing them with the knowledge and tools 
              they need to succeed in a world where customers are more empowered than ever before.
            </p>
            
            {/* Newsletter Signup */}
            <div className="max-w-xl mx-auto">
              <div className="flex gap-4 bg-ga-gray/20 p-2 rounded-lg backdrop-blur-sm">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 bg-transparent border-none focus:outline-none px-4 py-2 text-ga-white placeholder-ga-light"
                />
                <button className="bg-ga-white text-ga-black px-6 py-2 rounded-lg font-bold hover:bg-ga-light transition-colors">
                  Join our newsletter
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Meet the Founder Section */}
      <section className="py-24 bg-ga-gray/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-4xl font-alata mb-16 text-center">Meet the Founder</h2>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img 
                  src="/assets/founder-profile.png" // You'll need to add your profile image
                  alt="Diego Barnica"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-alata mb-2">Diego Barnica</h3>
                  <p className="text-ga-light text-lg">Founder</p>
                </div>
                <p className="text-lg text-ga-light leading-relaxed">
                  With a distinguished background in Customer Success Management at industry-leading 
                  companies like Primer and RocketReach, Diego has developed a deep understanding of 
                  what drives sustainable business growth. His expertise in customer-centric strategies 
                  and retention optimization has helped countless organizations achieve their growth objectives.
                </p>
                <p className="text-lg text-ga-light leading-relaxed">
                  Driven by a passion for democratizing business knowledge, Diego founded Growth Academy 
                  to make professional growth strategies accessible to everyone. His approach combines 
                  years of hands-on experience with a commitment to customer-centricity, creating a unique 
                  platform that bridges the gap between theoretical knowledge and practical application.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-alata text-center mb-16"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Our Values
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="bg-ga-gray/10 p-8 rounded-lg backdrop-blur-sm border border-ga-gray/20"
              >
                <div className="text-ga-white mb-6">{value.icon}</div>
                <h3 className="text-xl font-alata mb-4">{value.title}</h3>
                <p className="text-ga-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
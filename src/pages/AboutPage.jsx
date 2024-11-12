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
    <div className="pt-20 bg-ga-black text-ga-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-6 py-24">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h1 
              className="text-5xl md:text-6xl font-alata mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              About Growth Academy
            </motion.h1>
            <motion.p 
              className="text-xl text-ga-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Empowering professionals with the knowledge and tools needed for sustainable business growth.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Mission & DNA Video Section */}
      <section className="py-24 bg-gradient-to-b from-ga-gray/5 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                <div className="space-y-6">
                  <h2 className="text-3xl font-alata">Our Mission</h2>
                  <p className="text-ga-light text-lg leading-relaxed">
                    To empower businesses and professionals with practical knowledge and tools for 
                    sustainable growth, making complex marketing strategies accessible and actionable 
                    for everyone.
                  </p>
                </div>

                <div className="space-y-6">
                  <h2 className="text-3xl font-alata">Our Vision</h2>
                  <p className="text-ga-light text-lg leading-relaxed">
                    To be the leading platform for practical business growth education, creating a 
                    community of successful professionals who drive innovation and excellence in their 
                    industries.
                  </p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl"
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                >
                  <source src="/assets/dna-video.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-ga-black/20 to-transparent" />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-alata mb-6">Our Core Values</h2>
            <p className="text-ga-light text-lg max-w-2xl mx-auto">
              These principles guide everything we do at Growth Academy
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-ga-gray/10 backdrop-blur-sm border border-ga-gray/20 p-8 rounded-xl
                         hover:border-ga-gray/30 hover:bg-ga-gray/20 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{value.icon}</div>
                <h3 className="text-xl font-alata mb-3">{value.title}</h3>
                <p className="text-ga-light">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Approach Section */}
      <section className="py-24 bg-gradient-to-b from-transparent to-ga-gray/5">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <h2 className="text-4xl font-alata mb-8">Our Approach</h2>
            <p className="text-lg text-ga-light leading-relaxed">
              Our academy aims to decode complex strategies and best practices, making them accessible and
              actionable for professionals and businesses seeking sustainable success. The DNA strand in
              our logo represents continuous learning, evolution, and the interconnectedness of growth 
              strategies that drive businesses forward.
            </p>
            <p className="text-lg text-ga-light leading-relaxed">
              At Growth Academy HQ, we are committed to equipping you with the tools and insights needed
              to optimize growth and enhance customer experiences, ensuring your business thrives in an
              ever-evolving landscape.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
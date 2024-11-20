import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const CaseStudiesPage = () => {
  const caseStudies = [
    {
      title: "How Dropbox achieved 3900% growth with referral marketing",
      description: "Learn how Dropbox's revolutionary referral program turned users into advocates and drove exponential growth.",
      image: "/assets/dropbox-logo.svg",
      link: "/case-studies/dropbox",
      metrics: {
        value: "3900%",
        timeframe: "15 months",
        impact: "4M users"
      }
    },
    {
      title: "How Airbnb optimized listings by leveraging existing platforms",
      description: "Discover how Airbnb's strategic platform integration and optimization led to exponential marketplace growth.",
      image: "/assets/airbnb-logo.svg",
      link: "/case-studies/airbnb",
      metrics: {
        value: "10x",
        timeframe: "12 months",
        impact: "100K+ listings"
      }
    },
    {
      title: "How LinkedIn reached 1M users with network effects",
      description: "Explore how LinkedIn's focus on professional networking created powerful viral growth loops.",
      image: "/assets/linkedin-logo.svg",
      link: "/case-studies/linkedin",
      metrics: {
        value: "1M+",
        timeframe: "18 months",
        impact: "88% retention"
      }
    }
  ];

  return (
    <div className="bg-ga-black text-ga-white">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/assets/case-studies-background.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-ga-black/30 via-ga-black/50 to-ga-black" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-5xl md:text-6xl lg:text-7xl font-alata mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              Growth Secrets of Tech Giants
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-ga-light mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Step-by-step analysis of 3 breakthrough growth strategies you can implement today. Learn exactly how Dropbox, Airbnb, and LinkedIn engineered their path to market leadership.
            </motion.p>
            <motion.a
              href="https://payhip.com/b/peXsw"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ga-white text-ga-black px-6 py-2 rounded-full hover:bg-ga-light transition-all duration-300 mx-auto text-sm font-medium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get the eBook
              <ArrowRight className="w-4 h-4" />
            </motion.a>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <motion.h2 
            className="text-4xl font-alata mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Case Studies
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <Link 
                to={study.link} 
                key={index}
                className="block"
              >
                <motion.div
                  className="group h-full bg-ga-gray rounded-lg overflow-hidden transition-all duration-300 hover:bg-ga-gray/80"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  {/* Logo Section */}
                  <div className="h-32 flex items-center justify-center p-6 border-b border-ga-white/10">
                    <img 
                      src={study.image}
                      alt={study.title}
                      className="w-20 h-20 object-contain opacity-75 group-hover:opacity-100 transition-opacity"
                    />
                  </div>

                  {/* Content Section */}
                  <div className="p-6">
                    <h3 className="text-xl font-alata mb-4 min-h-[4rem]">{study.title}</h3>
                    <p className="text-ga-light mb-6 line-clamp-2 min-h-[3rem]">
                      {study.description}
                    </p>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-3 gap-4 py-6 border-y border-ga-white/10">
                      <div>
                        <div className="text-xl font-bold">{study.metrics.value}</div>
                        <div className="text-sm text-ga-light">Growth</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">{study.metrics.timeframe}</div>
                        <div className="text-sm text-ga-light">Timeframe</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold">{study.metrics.impact}</div>
                        <div className="text-sm text-ga-light">Impact</div>
                      </div>
                    </div>

                    {/* Read More Link */}
                    <div className="flex items-center gap-2 text-ga-light group-hover:text-ga-white transition-colors pt-6">
                      <span>Read the full case study</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudiesPage;
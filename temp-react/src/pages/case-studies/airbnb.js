import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function AirbnbCaseStudy() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-black text-white min-h-screen"
        >
            {/* Back Button */}
            <button 
                onClick={() => navigate('/case-studies')}
                className="fixed top-8 left-8 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors"
            >
                ← Back to Case Studies
            </button>

            {/* Hero Section */}
            <div className="relative h-96 bg-neutral-900">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                        src="/assets/airbnb-logo.svg" 
                        alt="Airbnb" 
                        className="w-32 h-32 filter brightness-0 invert" 
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-8">Airbnb: Optimizing Listings Strategy</h1>
                
                <div className="space-y-12">
                    {/* Overview */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                        <p className="text-gray-300 leading-relaxed">
                            In its early days, Airbnb faced the crucial challenge of building a two-sided marketplace. 
                            The platform needed both hosts willing to list their properties and guests looking for 
                            unique places to stay. Their innovative approach to solving this challenge became a 
                            textbook example of marketplace growth.
                        </p>
                    </section>

                    {/* Challenge */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Airbnb faced several critical challenges:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Building trust between strangers for home sharing</li>
                                <li>Attracting high-quality property listings</li>
                                <li>Reaching potential guests effectively</li>
                                <li>Competing with established hotel industry</li>
                                <li>Managing the chicken-and-egg problem of a two-sided marketplace</li>
                            </ul>
                        </div>
                    </section>

                    {/* Solution */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                Airbnb implemented several innovative solutions:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Created professional photography service for listings</li>
                                <li>Developed cross-posting integration with Craigslist</li>
                                <li>Implemented robust review and verification systems</li>
                                <li>Built sophisticated search algorithms for matching</li>
                                <li>Focused on building trust through user profiles and reviews</li>
                            </ul>
                        </div>
                    </section>

                    {/* Results */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">The Results</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="bg-neutral-800 p-6 rounded">
                                    <h3 className="text-xl font-bold mb-2">Growth</h3>
                                    <p>Achieved significant user base growth in key markets</p>
                                </div>
                                <div className="bg-neutral-800 p-6 rounded">
                                    <h3 className="text-xl font-bold mb-2">Market</h3>
                                    <p>Established strong market foothold globally</p>
                                </div>
                                <div className="bg-neutral-800 p-6 rounded">
                                    <h3 className="text-xl font-bold mb-2">Brand</h3>
                                    <p>Built trusted brand recognition worldwide</p>
                                </div>
                            </div>
                            <p className="mt-6">
                                The combination of these strategies led to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Exponential growth in property listings</li>
                                <li>Improved listing quality and guest satisfaction</li>
                                <li>Strong network effects in key markets</li>
                                <li>Establishment as a leading travel platform</li>
                            </ul>
                        </div>
                    </section>

                    {/* Key Takeaways */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Key Takeaways</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Quality of listings is crucial for marketplace success</li>
                                <li>Trust and safety are fundamental for sharing economy platforms</li>
                                <li>Professional photography can significantly impact conversion</li>
                                <li>Cross-platform integration can accelerate growth</li>
                                <li>Focus on solving the chicken-and-egg problem early</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
}

export default AirbnbCaseStudy;
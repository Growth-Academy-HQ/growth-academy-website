import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

function LinkedInCaseStudy() {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-black text-white min-h-screen relative"
        >
            {/* Back Button */}
            <button 
                onClick={() => navigate('/case-studies')}
                className="fixed top-8 left-8 bg-white text-black px-4 py-2 rounded hover:bg-gray-200 transition-colors z-10"
            >
                ← Back to Case Studies
            </button>

            {/* Hero Section */}
            <div className="relative h-96 bg-neutral-900">
                <div className="absolute inset-0 flex items-center justify-center">
                    <img 
                        src="/assets/linkedin-logo.svg" 
                        alt="LinkedIn" 
                        className="w-32 h-32 filter brightness-0 invert" 
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto px-6 py-16">
                <h1 className="text-4xl font-bold mb-8">LinkedIn: Building Network Effects</h1>
                
                <div className="space-y-12">
                    {/* Overview */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Overview</h2>
                        <p className="text-gray-300 leading-relaxed">
                            LinkedIn's journey to becoming the world's largest professional network showcases 
                            the power of network effects and strategic user acquisition. By focusing on 
                            professional networking and making it easy for users to build their networks, 
                            LinkedIn created a platform that becomes more valuable with each new user.
                        </p>
                    </section>

                    {/* Challenge */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">The Challenge</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                LinkedIn faced several challenges in establishing itself:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Building critical mass in a professional network</li>
                                <li>Differentiating from existing social networks</li>
                                <li>Creating value for early adopters</li>
                                <li>Maintaining professional atmosphere and trust</li>
                            </ul>
                        </div>
                    </section>

                    {/* Solution */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">The Solution</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <p>
                                LinkedIn implemented several key strategies:
                            </p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Contact import feature for easy network building</li>
                                <li>Professional profile optimization tools</li>
                                <li>Targeted connection recommendations</li>
                                <li>Focus on professional content and interactions</li>
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
                                    <p>Significant early user base growth</p>
                                </div>
                                <div className="bg-neutral-800 p-6 rounded">
                                    <h3 className="text-xl font-bold mb-2">1M Users</h3>
                                    <p>Reached in just 16 months</p>
                                </div>
                                <div className="bg-neutral-800 p-6 rounded">
                                    <h3 className="text-xl font-bold mb-2">#1</h3>
                                    <p>Became the go-to professional platform</p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Key Takeaways */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-4">Key Takeaways</h2>
                        <div className="space-y-4 text-gray-300 leading-relaxed">
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Network effects are crucial for professional platforms</li>
                                <li>Easy onboarding accelerates user acquisition</li>
                                <li>Focus on professional identity drives engagement</li>
                                <li>Quality of connections matters more than quantity</li>
                                <li>Consistent professional environment builds trust</li>
                            </ul>
                        </div>
                    </section>
                </div>
            </div>
        </motion.div>
    );
}

export default LinkedInCaseStudy;
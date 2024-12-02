import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PricingPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState(null);

  const plans = [
    {
      name: 'Seed Starter',
      price: '0',
      period: 'Free',
      features: [
        'A basic trial of our Marketing Plan Generator',
        '15-minute call with Marketing Expert',
        'Email support',
        'Access to our newsletter',
      ],
      popular: false
    },
    {
      name: 'Growth Catalyst',
      price: '29.99',
      period: 'month',
      features: [
        '10 uses per month of our Marketing Plan Generator',
        'Downloadable templates for your marketing strategies',
        'Email support',
        'Access to valuable e-books related to growth strategies',
      ],
      popular: true
    },
    {
      name: 'Scaling Pro',
      price: '49.99',
      period: 'month',
      features: [
        'Everything in Growth Catalyst',
        '30 uses per month of our Marketing Plan Generator',
        '1 monthly call with Marketing Expert',
        'Priority email support',
        'Early access to new resources and templates',
      ],
      popular: false
    }
  ];

  const handleSelectPlan = (plan) => {
    if (!user) {
      navigate('/signin', { state: { from: '/pricing' } });
      return;
    }
    setSelectedPlan(plan);
    // Here you would typically redirect to a checkout page
    // navigate('/checkout', { state: { plan } });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen pt-20 bg-gradient-to-b from-ga-black to-ga-black/90"
    >
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-alata text-ga-white mb-6">
            Choose Your Growth Plan
          </h1>
          <p className="text-xl text-ga-light max-w-2xl mx-auto">
            Select the perfect plan to accelerate your marketing strategy with AI-powered insights
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={`relative h-full ${
                plan.popular ? 'border-2 border-ga-white/20' : 'border border-ga-white/10'
              } bg-ga-black/50 backdrop-blur-sm`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-ga-white text-ga-black px-4 py-1 rounded-full text-sm font-alata">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl font-alata text-ga-white text-center">
                    {plan.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <span className="text-4xl font-alata text-ga-white">${plan.price}</span>
                    <span className="text-ga-light">/{plan.period}</span>
                  </div>
                  <ul className="space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="text-ga-light flex items-center">
                        <svg
                          className="w-5 h-5 text-ga-white mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full ${
                      plan.popular
                        ? 'bg-ga-white text-ga-black hover:bg-ga-light'
                        : 'bg-ga-black/50 text-ga-white hover:bg-ga-white/10'
                    }`}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PricingPage;
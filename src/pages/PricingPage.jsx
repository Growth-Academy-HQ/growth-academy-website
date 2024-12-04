import { useState } from 'react';
import { useSubscriptions } from '../utils/subscriptions';

const PRICE_IDS = {
  pro: 'price_1QS3WrDx4hYKRW6tovZXvOiB',  // Your actual Stripe price IDs
  expert: 'price_1QS3XWDx4hYKRW6tQoxNOwzZ'
}

export function PricingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const { createCheckoutSession } = useSubscriptions();

  const handleSubscribe = async (priceId) => {
    try {
      setIsLoading(true);
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Error:', error);
      // Show error message to user
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-ga-black pt-20">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold text-ga-white text-center mb-12">
          Choose Your Growth Plan
        </h1>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Free Tier */}
          <div className="bg-ga-black/50 border border-ga-white/10 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-ga-white mb-4">Growth Starter</h2>
            <p className="text-3xl font-bold text-ga-white mb-6">Free</p>
            <ul className="space-y-3 mb-8">
              <li className="text-ga-white/70">3 AI Marketing Plans/month</li>
              <li className="text-ga-white/70">Basic Analytics</li>
              <li className="text-ga-white/70">Email Support</li>
            </ul>
            <button className="w-full px-6 py-3 bg-ga-white text-ga-black rounded-lg" disabled>
              Current Plan
            </button>
          </div>

          {/* Pro Tier */}
          <div className="bg-ga-black/50 border border-purple-500/30 rounded-lg p-6 transform scale-105">
            <h2 className="text-2xl font-bold text-ga-white mb-4">Growth Pro</h2>
            <p className="text-3xl font-bold text-ga-white mb-6">$29/mo</p>
            <ul className="space-y-3 mb-8">
              <li className="text-ga-white/70">15 AI Marketing Plans/month</li>
              <li className="text-ga-white/70">Advanced Analytics</li>
              <li className="text-ga-white/70">Priority Support</li>
            </ul>
            <button 
              onClick={() => handleSubscribe(PRICE_IDS.pro)}
              className="w-full px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Upgrade to Pro'}
            </button>
          </div>

          {/* Expert Tier */}
          <div className="bg-ga-black/50 border border-amber-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-bold text-ga-white mb-4">Growth Expert</h2>
            <p className="text-3xl font-bold text-ga-white mb-6">$99/mo</p>
            <ul className="space-y-3 mb-8">
              <li className="text-ga-white/70">Unlimited AI Marketing Plans</li>
              <li className="text-ga-white/70">Custom Analytics</li>
              <li className="text-ga-white/70">24/7 Priority Support</li>
            </ul>
            <button 
              onClick={() => handleSubscribe(PRICE_IDS.expert)}
              className="w-full px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Upgrade to Expert'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PricingPage;
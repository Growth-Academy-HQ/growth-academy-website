import { getRateLimiterForSubscription } from '../utils/rateLimit';

// Removed useSubscriptions and getToken imports

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateMarketingPlan = async (formData, token, currentPlan) => { // Added parameters
  const rateLimiter = getRateLimiterForSubscription(currentPlan);

  if (!rateLimiter.canMakeRequest()) {
    const waitTime = rateLimiter.getTimeUntilNextRequest();
    const days = Math.ceil(waitTime / 86400000);
    throw new Error(`Please wait ${days} day${days > 1 ? 's' : ''} before making another request.`);
  }

  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      console.log('Starting request to:', `${API_BASE_URL}/api/generate-plan`);
      console.log('With data:', formData);

      const response = await fetch(`${API_BASE_URL}/api/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // Use token parameter
        },
        body: JSON.stringify({
          planName: formData.planName,
          businessIdea: formData.businessIdea,
          targetMarket: formData.targetMarket,
          currentStage: formData.currentStage,
          marketingGoals: formData.marketingGoals,
          budget: formData.budget
        })
      });

      if (!response.ok) {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        throw new Error(`API error! status: ${response.status}, message: ${errorData}`);
      }

      const data = await response.json();
      console.log('Successful response:', data);
      
      return {
        content: [{
          text: data.content[0].text
        }]
      };

    } catch (error) {
      attempts++;
      console.error(`Attempt ${attempts} failed:`, error);
      
      if (attempts === MAX_RETRIES) {
        throw new Error(`Failed after ${MAX_RETRIES} attempts: ${error.message}`);
      }
      
      await sleep(RETRY_DELAY);
    }
  }
};

export const formatPlan = (planText) => {
  try {
    const sections = planText.split(/\d\.\s+/).filter(Boolean);
    return {
      executiveSummary: sections[0]?.trim() || '',
      targetAudience: sections[1]?.trim() || '',
      marketingStrategy: sections[2]?.trim() || '',
      budgetAllocation: sections[3]?.trim() || '',
      timeline: sections[4]?.trim() || '',
      kpis: sections[5]?.trim() || ''
    };
  } catch (error) {
    console.error('Error formatting plan:', error);
    return planText;
  }
};
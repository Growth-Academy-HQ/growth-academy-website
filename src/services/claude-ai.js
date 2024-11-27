const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateMarketingPlan = async (businessData) => {
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      console.log('Starting request to:', `${API_BASE_URL}/api/generate-plan`);
      console.log('With data:', businessData);

      const response = await fetch(`${API_BASE_URL}/api/generate-plan`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          businessIdea: businessData.businessIdea,
          targetMarket: businessData.targetMarket,
          currentStage: businessData.currentStage,
          marketingGoals: businessData.marketingGoals,
          budget: businessData.budget
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
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 second

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateMarketingPlan = async (businessData) => {
  let attempts = 0;
  
  while (attempts < MAX_RETRIES) {
    try {
      console.log(`Attempt ${attempts + 1} of ${MAX_RETRIES}`);
      console.log('Starting generation with data:', businessData);

      const response = await fetch('http://localhost:3001/api/generate-plan', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessData),
        credentials: 'include'
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error || 'Unknown error'}`);
      }

      const message = await response.json();
      console.log('Response received:', message);
      return message;
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

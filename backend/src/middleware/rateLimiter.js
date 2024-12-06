const rateLimit = require('express-rate-limit');

// Create rate limiters with different configurations
const rateLimiters = {
  free: rateLimit({
    windowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    max: 1, // 1 request per month
    message: {
      error: 'Free plan limit reached. Please upgrade for more requests.'
    }
  }),
  
  pro: rateLimit({
    windowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    max: 10, // 10 requests per month
    message: {
      error: 'Pro plan limit reached. Please upgrade for more requests.'
    }
  }),
  
  expert: rateLimit({
    windowMs: 30 * 24 * 60 * 60 * 1000, // 30 days
    max: 30, // 30 requests per month
    message: {
      error: 'Expert plan limit reached.'
    }
  })
};

module.exports = rateLimiters;
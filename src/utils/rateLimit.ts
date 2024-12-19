interface RateLimitConfig {
    maxRequests: number;  // Maximum number of requests allowed
    windowMs: number;     // Time window in milliseconds
  }
  
  class RateLimiter {
    private timestamps: number[];
    private config: RateLimitConfig;
  
    constructor(config: RateLimitConfig) {
      this.timestamps = [];
      this.config = config;
    }
  
    canMakeRequest(): boolean {
      const now = Date.now();
      
      // Remove timestamps outside the window
      this.timestamps = this.timestamps.filter(
        timestamp => now - timestamp < this.config.windowMs
      );
  
      // Check if we're under the limit
      if (this.timestamps.length < this.config.maxRequests) {
        this.timestamps.push(now);
        return true;
      }
  
      return false;
    }
  
    getTimeUntilNextRequest(): number {
      if (this.timestamps.length === 0) return 0;
      
      const oldestTimestamp = this.timestamps[0];
      const timeUntilExpiry = (oldestTimestamp + this.config.windowMs) - Date.now();
      
      return Math.max(0, timeUntilExpiry);
    }
  }
  
  // Create instances for different types of requests
  export const apiRateLimiter = new RateLimiter({
    maxRequests: 50,    // 50 requests
    windowMs: 60000     // per minute
  });
  
  export const authRateLimiter = new RateLimiter({
    maxRequests: 5,     // 5 attempts
    windowMs: 300000    // per 5 minutes
  });
  
  export const contactRateLimiter = new RateLimiter({
    maxRequests: 3,     // 3 submissions
    windowMs: 3600000   // per hour
  });
  
  const rateLimits = {
    free: { maxRequests: 1, windowMs: 2592000000 },  // 1 per month
    pro: { maxRequests: 10, windowMs: 2592000000 },  // 10 per month
    expert: { maxRequests: 20, windowMs: 2592000000 } // 30 per month
  };
  
  export const getRateLimiterForSubscription = (subscriptionLevel: 'free' | 'pro' | 'expert') => {
    return new RateLimiter(rateLimits[subscriptionLevel]);
  };
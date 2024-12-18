require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { Anthropic } = require('@anthropic-ai/sdk');
const stripeRoutes = require('./routes/stripe');
const clerkRoutes = require('./routes/clerk');
const rateLimiters = require('./middleware/rateLimiter');
const validateAuth = require('./middleware/auth');
const { scheduleMeeting } = require('./routes/meetings');
const { ClerkExpressWithAuth } = require('@clerk/clerk-sdk-node');

const app = express();
const port = 3001;

// Environment check
console.log('Environment Check:', { 
  stripeKey: process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'Present' : 'Missing',
  anthropicKey: process.env.ANTHROPIC_API_KEY ? 'Present' : 'Missing',
  clerkPublishable: process.env.CLERK_PUBLISHABLE_KEY ? 'Present' : 'Missing',
  clerkSecret: process.env.CLERK_SECRET_KEY ? 'Present' : 'Missing'
});

// Regular middleware first
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'],
  methods: ['POST', 'GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Accept', 'stripe-signature', 'Authorization'],
  credentials: true
}));

// Webhook routes (with raw body parsing)
app.post('/api/stripe/webhooks', 
  express.raw({type: 'application/json'}),
  function(req, res) {
    res.json({ received: true });
  }
);

app.post('/api/clerk/webhooks', 
  express.raw({type: 'application/json'}),
  function(req, res) {
    res.json({ received: true });
  }
);

// Regular body parsing middleware for other routes
app.use(express.json());

// Request logging middleware
app.use(function(req, res, next) {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Protected route with auth and rate limiting
app.post('/api/generate-plan', validateAuth, function(req, res, next) {
  const handlePlan = async () => {
    try {
      console.log('Received request body:', req.body);
      
      if (!req.body) {
        return res.status(400).json({ error: 'No request body provided' });
      }

      const { businessIdea, targetMarket, currentStage, marketingGoals, budget } = req.body;
      
      // Validate required fields
      if (!businessIdea || !targetMarket || !currentStage || !marketingGoals || !budget) {
        return res.status(400).json({ 
          error: 'Missing required fields',
          required: ['businessIdea', 'targetMarket', 'currentStage', 'marketingGoals', 'budget']
        });
      }

      const message = await anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 1000,
        messages: [{
          role: "user",
          content: `Generate a detailed marketing plan for the following business:
            Business Idea: ${businessIdea}
            Target Market: ${targetMarket}
            Current Stage: ${currentStage}
            Marketing Goals: ${marketingGoals}
            Monthly Budget: ${budget}
            
         Please structure your response exactly as follows:

            1. Executive Summary
            - High-level overview of the business and marketing approach
            
            2. Mission Statement
            - Company's unique selling proposition (USP)
            - Brand's purpose and values
            
            3. Marketing Objectives
            - Specific, measurable marketing goals
            - Timeline for achieving these goals
            
            4. SWOT Analysis
            - Strengths
            - Weaknesses
            - Opportunities
            - Threats
            
            5. Market Research
            - Target market analysis
            - Competitor analysis
            - Current market trends
            
            6. Marketing Strategy
            - Detailed tactics and channels
            - Implementation timeline
            - Key metrics for success
            
            7. Budget Allocation
            - Breakdown by marketing channel
            - Percentage allocation of total budget
            - ROI expectations`
        }]
      });

      console.log('Claude API Response:', message);
      res.json(message);
    } catch (error) {
      console.error('Server error:', error);
      
      if (error.status === 401) {
        return res.status(401).json({ 
          error: 'Authentication error with Claude API',
          details: error.message 
        });
      }
      
      if (error.status === 400) {
        return res.status(400).json({ 
          error: 'Invalid request to Claude API',
          details: error.message 
        });
      }
      
      res.status(500).json({ 
        error: 'Failed to generate marketing plan',
        details: error.message 
      });
    }
  };

  handlePlan();
});

// Add routes
app.use('/api/stripe', stripeRoutes);
app.use('/api/clerk', clerkRoutes);

// Test endpoint for Clerk auth
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working' });
});

app.get('/api/test-auth', ClerkExpressWithAuth(), (req, res) => {
  console.log('Auth test:', req.auth);
  res.json({ 
    message: 'Auth working', 
    userId: req.auth.userId 
  });
});

app.post('/api/schedule-meeting', ClerkExpressWithAuth(), scheduleMeeting);

// Error handling middleware
app.use(function(err, req, res, next) {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message 
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('CORS enabled for:', ['http://localhost:5173', 'http://127.0.0.1:5173']);
  console.log('Environment:', process.env.NODE_ENV);
});
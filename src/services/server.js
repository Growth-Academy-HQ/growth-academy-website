const express = require('express');
const cors = require('cors');
const { Anthropic } = require('@anthropic-ai/sdk');
require('dotenv').config();

const app = express();
const port = 3001;

// Middleware
app.use(cors({
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173'], // Allow both localhost variations
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true
}));
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ status: 'Server is running' });
});

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// API endpoint for generating marketing plans
app.post('/api/generate-plan', async (req, res) => {
  try {
    console.log('Received request:', req.body);
    
    if (!req.body) {
      return res.status(400).json({ error: 'No request body provided' });
    }

    const businessData = req.body;
    
    const message = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 1000,
      messages: [{
        role: "user",
        content: `Generate a detailed marketing plan for the following business:
          Business Idea: ${businessData.businessIdea}
          Target Market: ${businessData.targetMarket}
          Current Stage: ${businessData.currentStage}
          Marketing Goals: ${businessData.marketingGoals}
          Monthly Budget: ${businessData.budget}
          
          Please provide a structured response with these sections:
          1. Executive Summary
          2. Target Audience Analysis
          3. Marketing Channels & Strategy
          4. Budget Allocation
          5. Timeline & Milestones
          6. Key Performance Indicators`
      }]
    });

    console.log('Generated response:', message);
    res.json(message);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ 
      error: 'Failed to generate marketing plan',
      details: error.message 
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message 
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log('CORS enabled for:', ['http://localhost:5173', 'http://127.0.0.1:5173']);
});


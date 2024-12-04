const express = require('express');
const router = express.Router();
const { createFreeSubscription } = require('../controllers/subscriptionController');
const { Webhook } = require('svix');

router.post('/webhooks', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
    
    // Get the headers
    const svix_id = req.headers['svix-id'];
    const svix_timestamp = req.headers['svix-timestamp'];
    const svix_signature = req.headers['svix-signature'];

    // Debug logging
    console.log('Webhook Headers:', {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature
    });
    console.log('Webhook Secret:', webhookSecret?.substring(0, 4) + '...');
    console.log('Raw Body:', req.body.toString());

    // If there are missing headers, return 400
    if (!svix_id || !svix_timestamp || !svix_signature) {
      console.log('Missing headers:', { svix_id, svix_timestamp, svix_signature });
      return res.status(400).json({
        error: 'Missing required headers'
      });
    }

    const payload = req.body;
    const payloadString = payload.toString();

    // Create an object of headers
    const headers = {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    };

    // Verify the webhook
    const webhook = new Webhook(webhookSecret);
    const evt = webhook.verify(payloadString, headers);

    // Handle the webhook
    if (evt.type === 'user.created') {
      console.log('Creating free subscription for user:', evt.data.id);
      await createFreeSubscription(evt.data.id);
      console.log('Free subscription created successfully');
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({
      error: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

module.exports = router;
const express = require('express');
const router = express.Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const { createClient } = require('@supabase/supabase-js');
const { createCheckoutSession, handleWebhook } = require('../controllers/stripeController');

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

router.post('/create-checkout-session', createCheckoutSession);
router.post('/webhooks', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const sig = req.headers['stripe-signature'];
    console.log('Received webhook with signature:', sig);
    
    const event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('Event type:', event.type);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      const userId = session.metadata.userId;
      const subscriptionId = session.subscription;

      console.log('Checkout session completed:', {
        userId,
        subscriptionId,
        customerId: session.customer,
        metadata: session.metadata
      });

      // First, check if subscription exists
      const { data: existingSubscription, error: fetchError } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', userId)
        .single();

      console.log('Existing subscription:', existingSubscription);
      if (fetchError) console.error('Error fetching subscription:', fetchError);

      // Update subscription in database
      const { data, error } = await supabase
        .from('subscriptions')
        .update({ 
          stripe_subscription_id: subscriptionId,
          stripe_customer_id: session.customer,
          plan_type: 'pro',
          status: 'active'
        })
        .eq('user_id', userId)
        .select();

      if (error) {
        console.error('Supabase update error:', error);
      } else {
        console.log('Supabase update successful:', data);
      }
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err.message);
    console.error(err.stack);
    res.status(400).send(`Webhook Error: ${err.message}`);
  }
});

module.exports = router;
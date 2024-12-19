require('dotenv').config();
const Stripe = require('stripe');
const { updateSubscription } = require('./subscriptionController');

// Add this to debug
console.log('Environment Check:', {
  stripeKey: process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'Present' : 'Missing'
});

console.log('Current webhook secret:', process.env.STRIPE_WEBHOOK_SECRET.substring(0, 10) + '...');

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Define price IDs
const PRICE_IDS = {
  pro: 'price_1QS3WrDx4hYKRW6tovZXvOiB',
  expert: 'price_1QS3XWDx4hYKRW6tQoxNOwzZ'
};

const createCheckoutSession = async (req, res) => {
  try {
    console.log('Received checkout request:', req.body); // Debug log
    const { priceId, userId, customerEmail, currentPlan } = req.body;

    if (!priceId || !userId || !customerEmail) {
      return res.status(400).json({ 
        error: 'Missing required fields',
        received: { priceId, userId, customerEmail }
      });
    }

    // Create checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.DOMAIN}/dashboard?success=true`,
      cancel_url: `${process.env.DOMAIN}/pricing?canceled=true`,
      customer_email: customerEmail,
      metadata: { 
        userId,
        currentPlan 
      },
    });

    console.log('Checkout session created:', session.id); // Debug log
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    res.status(500).json({ 
      error: error.message,
      details: error.stack 
    });
  }
};

const handleWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    console.log('Webhook event received:', {
      type: event.type,
      id: event.id,
      data: event.data.object
    });

    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Checkout session completed:', {
          sessionId: session.id,
          userId: session.metadata.userId,
          customerId: session.customer,
          subscriptionId: session.subscription
        });

        // Get the subscription details from the session
        const subscription = await stripe.subscriptions.retrieve(session.subscription);
        console.log('Retrieved subscription:', {
          id: subscription.id,
          priceId: subscription.items.data[0].price.id,
          customerId: subscription.customer
        });

        // Determine plan type from price ID
        const priceId = subscription.items.data[0].price.id;
        const planType = Object.entries(PRICE_IDS).find(([_, id]) => id === priceId)?.[0];
        
        if (!planType) {
          console.error('Unknown price ID:', priceId);
          throw new Error('Unknown price ID');
        }

        console.log('Updating subscription in database:', {
          userId: session.metadata.userId,
          planType,
          subscriptionId: session.subscription,
          customerId: session.customer
        });

        // Update subscription in database
        await updateSubscription(
          session.metadata.userId,
          planType,
          {
            subscriptionId: session.subscription,
            customerId: session.customer,
            status: 'active'
          }
        );
        break;

      case 'customer.subscription.updated':
        const updatedSubscription = event.data.object;
        console.log('Subscription updated:', updatedSubscription); // Add logging
        
        const updatedPriceId = updatedSubscription.items.data[0].price.id;
        const updatedPlanType = updatedPriceId === PRICE_IDS.pro ? 'pro' : 'expert';

        await updateSubscription(
          updatedSubscription.metadata.userId,
          updatedPlanType,
          {
            subscriptionId: updatedSubscription.id,
            customerId: updatedSubscription.customer,
            status: updatedSubscription.status
          }
        );
        break;

      case 'customer.subscription.deleted':
        const canceledSubscription = event.data.object;
        console.log('Subscription canceled:', canceledSubscription); // Add logging

        await updateSubscription(
          canceledSubscription.metadata.userId,
          'free',
          {
            subscriptionId: null,
            customerId: null,
            status: 'inactive'
          }
        );
        break;
    }

    res.json({ received: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
};

module.exports = {
  createCheckoutSession,
  handleWebhook
};
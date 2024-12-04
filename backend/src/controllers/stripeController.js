require('dotenv').config();
const Stripe = require('stripe');
const { updateSubscription } = require('./subscriptionController');

// Add this to debug
console.log('Environment Check:', {
  stripeKey: process.env.STRIPE_SECRET_KEY ? 'Present' : 'Missing',
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET ? 'Present' : 'Missing'
});

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const createCheckoutSession = async (req, res) => {
  try {
    const { priceId, userId, customerEmail } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${process.env.DOMAIN}/dashboard?success=true`,
      cancel_url: `${process.env.DOMAIN}/pricing?canceled=true`,
      customer_email: customerEmail,
      metadata: { userId },
    });

    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
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
  } catch (err) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  switch (event.type) {
    case 'customer.subscription.created':
    case 'customer.subscription.updated':
      const subscription = event.data.object;
      // Map Stripe price IDs to plan types
      const planType = subscription.items.data[0].price.id === PRICE_IDS.pro 
        ? 'pro' 
        : 'expert';
      
      await updateSubscription(subscription.metadata.userId, planType, {
        subscriptionId: subscription.id,
        customerId: subscription.customer
      });
      break;

    case 'customer.subscription.deleted':
      const canceledSubscription = event.data.object;
      await updateSubscription(canceledSubscription.metadata.userId, 'free', {});
      break;
  }

  res.json({ received: true });
};

module.exports = {
  createCheckoutSession,
  handleWebhook
};
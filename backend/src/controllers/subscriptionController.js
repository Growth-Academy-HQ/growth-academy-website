const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

// Create initial free subscription when user signs up
const createFreeSubscription = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .insert([
        {
          user_id: userId,
          plan_type: 'free',
          status: 'active'
        }
      ]);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating free subscription:', error);
    throw error;
  }
};

// Get user's current subscription
const getUserSubscription = async (userId) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error getting user subscription:', error);
    throw error;
  }
};

// Update subscription when user upgrades/downgrades
const updateSubscription = async (userId, planType, stripeData = {}) => {
  try {
    const { data, error } = await supabase
      .from('subscriptions')
      .update({
        plan_type: planType,
        stripe_subscription_id: stripeData.subscriptionId,
        stripe_customer_id: stripeData.customerId,
        updated_at: new Date().toISOString()
      })
      .eq('user_id', userId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error updating subscription:', error);
    throw error;
  }
};

module.exports = {
  createFreeSubscription,
  getUserSubscription,
  updateSubscription
}; 
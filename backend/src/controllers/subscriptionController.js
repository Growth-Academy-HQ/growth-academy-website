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
const updateSubscription = async (userId, planType, details) => {
  try {
    console.log('Updating subscription in Supabase:', {
      userId,
      planType,
      details
    });

    // First, check if a subscription exists
    const { data: existingData, error: existingError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (existingError && existingError.code !== 'PGRST116') { // PGRST116 is "not found"
      console.error('Error checking existing subscription:', existingError);
      throw existingError;
    }

    let result;
    if (existingData) {
      // Update existing subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .update({
          plan_type: planType,
          stripe_subscription_id: details.subscriptionId,
          stripe_customer_id: details.customerId,
          status: details.status || 'active',
          updated_at: new Date().toISOString()
        })
        .eq('user_id', userId)
        .select();

      result = { data, error };
    } else {
      // Create new subscription
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([{
          user_id: userId,
          plan_type: planType,
          stripe_subscription_id: details.subscriptionId,
          stripe_customer_id: details.customerId,
          status: details.status || 'active'
        }])
        .select();

      result = { data, error };
    }

    if (result.error) {
      console.error('Error updating/inserting subscription:', result.error);
      throw result.error;
    }

    console.log('Subscription updated successfully:', result.data);
    return result.data;
  } catch (error) {
    console.error('Error in updateSubscription:', error);
    throw error;
  }
};

module.exports = {
  createFreeSubscription,
  getUserSubscription,
  updateSubscription
}; 
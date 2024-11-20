// Import Stripe library
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Subscription logic
async function createSubscription(customerId, planId) {
  try {
    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [{ plan: planId }],
      payment_settings: { payment_method_types: ['card'] },
    });

    return subscription;
  } catch (error) {
    console.error(error);
  }
}

module.exports = createSubscription;

// Import Stripe library
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Payment logic
async function makePayment(amount) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    return paymentIntent;
  } catch (error) {
    console.error(error);
  }
}

module.exports = makePayment;

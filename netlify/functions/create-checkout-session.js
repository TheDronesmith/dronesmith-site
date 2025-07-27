// netlify/functions/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { quantity = 1 } = JSON.parse(event.body || '{}');

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Dronesmith 5" Carbon Fiber FPV Frame',
            images: ['https://yourdomain.com/path/to/drone.jpg'], // use your own hosted image
          },
          unit_amount: 5999, // $59.99 in cents
        },
        quantity,
      }],
      success_url: 'https://dronesmith.net/success',
      cancel_url: 'https://dronesmith.net/cancel',
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ url: session.url }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

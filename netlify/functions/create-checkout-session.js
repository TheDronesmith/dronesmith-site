const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

exports.handler = async (event) => {
  const { quantity = 1 } = JSON.parse(event.body || '{}');

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{
        price: 'price_1RpcvbCnwpv7061402Y5nLAJ',
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

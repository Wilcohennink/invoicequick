const Stripe = require('stripe');

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    apiVersion: '2023-10-16',
  });

  const { plan } = req.body;
  const origin = req.headers.origin || `https://${req.headers.host}`;

  try {
    let sessionConfig;

    if (plan === 'ltd') {
      // Lifetime Deal — €59 one-time
      sessionConfig = {
        mode: 'payment',
        line_items: [
          {
            price_data: {
              currency: 'eur',
              unit_amount: 5900, // €59.00 in cents
              product_data: {
                name: 'InvoiceQuick Lifetime Deal',
                description: 'Unlimited invoices forever — one-time payment. No recurring fees.',
                images: [],
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing.html`,
        allow_promotion_codes: true,
        metadata: {
          plan: 'ltd',
        },
      };
    } else if (plan === 'monthly') {
      // Pro Monthly — €9/month
      sessionConfig = {
        mode: 'subscription',
        line_items: [
          {
            price_data: {
              currency: 'eur',
              unit_amount: 900, // €9.00 in cents
              recurring: { interval: 'month' },
              product_data: {
                name: 'InvoiceQuick Pro',
                description: 'Unlimited invoices per month. Cancel anytime.',
              },
            },
            quantity: 1,
          },
        ],
        success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pricing.html`,
        allow_promotion_codes: true,
        metadata: {
          plan: 'monthly',
        },
      };
    } else {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe error:', err.message);
    res.status(500).json({ error: err.message });
  }
};

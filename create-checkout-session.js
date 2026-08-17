
const Stripe = require('stripe');

const ALLOWED_PRICES = new Set([
  'price_1U5XJ8LrpSDZrH2ju7UPvgpt',
  'price_1U5XJCLrpSDZrH2jzlskE80C',
  'price_1U5XJGLrpSDZrH2j68VsUWJK',
  'price_1U5XK9LrpSDZrH2jdytijiSu',
  'price_1U5XKELrpSDZrH2jjfQUIr2A',
  'price_1U5XKKLrpSDZrH2jniVLOczt',
  'price_1U5XKsLrpSDZrH2jnvHEbTWi',
  'price_1U5XL1LrpSDZrH2j1O6iFFY0',
  'price_1U5XLALrpSDZrH2jEMAu9iGr',
  'price_1U5XLKLrpSDZrH2jCieLX64q',
  'price_1U5XLRLrpSDZrH2juqmnmbY6',
  'price_1U5XLYLrpSDZrH2jILTP9vgE',
  'price_1U5XLhLrpSDZrH2jzFN5MDTz',
  'price_1U5XLnLrpSDZrH2jSKzaBfx1',
  'price_1U5XLuLrpSDZrH2j930aOAEP',
  'price_1U5XM2LrpSDZrH2jKvQiy8UE',
  'price_1U5XMBLrpSDZrH2jEzKMkJfJ'
]);

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({error:'Method not allowed'});
  try {
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({error:'Stripe secret key is not configured'});
    }
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
    const { items } = req.body || {};
    if (!Array.isArray(items) || !items.length) return res.status(400).json({error:'Cart is empty'});

    const line_items = [];
    let subtotal = 0;

    for (const item of items) {
      if (!ALLOWED_PRICES.has(item.price)) return res.status(400).json({error:'Invalid price'});
      const qty = Math.max(1, Math.min(25, parseInt(item.quantity || 1, 10)));
      const price = await stripe.prices.retrieve(item.price);
      if (!price.active || price.currency !== 'usd' || !price.unit_amount) {
        return res.status(400).json({error:'Unavailable price'});
      }
      subtotal += price.unit_amount * qty;
      line_items.push({price:item.price, quantity:qty});
    }

    const shippingRate = {
      shipping_rate_data: {
        type: 'fixed_amount',
        fixed_amount: { amount: subtotal >= 5000 ? 0 : 599, currency: 'usd' },
        display_name: subtotal >= 5000 ? 'Free Shipping' : 'Standard Shipping',
        delivery_estimate: {
          minimum: { unit: 'business_day', value: 3 },
          maximum: { unit: 'business_day', value: 7 }
        }
      }
    };

    const origin = req.headers.origin || `https://${req.headers.host}`;
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items,
      shipping_address_collection: { allowed_countries: ['US'] },
      shipping_options: [shippingRate],
      billing_address_collection: 'auto',
      phone_number_collection: { enabled: true },
      customer_creation: 'always',
      allow_promotion_codes: true,
      success_url: `${origin}/success.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/index.html#shop`,
      metadata: { store: "Benco's" }
    });

    return res.status(200).json({url: session.url});
  } catch (err) {
    console.error(err);
    return res.status(500).json({error: err.message || 'Checkout failed'});
  }
}

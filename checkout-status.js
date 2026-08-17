
const Stripe = require('stripe');
module.exports = async function handler(req, res) {
  if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({error:'Stripe not configured'});
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
  const sessionId = req.query.session_id;
  if (!sessionId) return res.status(400).json({error:'Missing session'});
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return res.status(200).json({
      payment_status: session.payment_status,
      customer_email: session.customer_details?.email || '',
      amount_total: session.amount_total || 0
    });
  } catch (e) {
    return res.status(500).json({error:'Unable to verify order'});
  }
}

import { verifyAuth } from '@hono/auth-js';
import { Hono } from 'hono';

import { stripe } from '@/lib/stripe';

const app = new Hono().post('/checkout', verifyAuth(), async (ctx) => {
  const auth = ctx.get('authUser');

  if (!auth.token?.id || !auth.token?.email) {
    return ctx.json('Unauthorized!', 401);
  }

  const session = await stripe.checkout.sessions.create({
    success_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}?success=1`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_BASE_URL}?canceled=1`,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    customer_email: auth.token.email,
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    metadata: {
      userId: auth.token.id,
    },
  });

  const url = session.url;

  if (!url) return ctx.json('Failed to create session!', 400);

  return ctx.json(url);
});

export default app;

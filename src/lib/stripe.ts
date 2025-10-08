import Stripe from 'stripe';

// The Stripe client initialization is temporarily commented out to resolve a build error.
// We will uncomment and configure this when we implement the payment functionality.

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: '2024-06-20',
// });

export const stripe = null;
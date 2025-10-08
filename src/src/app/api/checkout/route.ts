import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
// import { stripe } from '@/lib/stripe';
// import { absoluteUrl } from '@/lib/utils';

// const dashboardUrl = absoluteUrl('/dashboard');

export async function POST(req: NextRequest) {
  // The logic for this route is temporarily disabled until Stripe is fully configured.
  const { userId } = getAuth(req);
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  // Return a placeholder response
  return new NextResponse(JSON.stringify({ message: 'This endpoint is not yet configured.' }));

  /*
  const user = await currentUser();

  if (!userId || !user) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const userSubscription = {
      isPro: false // Placeholder logic
  }

  // If user is already on a pro plan, redirect to dashboard
  if (userSubscription.isPro) {
    return new NextResponse(JSON.stringify({ url: dashboardUrl }));
  }

  // If user is not on a pro plan, create a checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    success_url: dashboardUrl,
    cancel_url: dashboardUrl,
    payment_method_types: ['card'],
    mode: 'subscription',
    billing_address_collection: 'auto',
    customer_email: user.emailAddresses[0].emailAddress,
    line_items: [
      {
        price_data: {
          currency: 'USD',
          product_data: {
            name: 'Premium Tier',
            description: 'Unlock all premium features'
          },
          unit_amount: 700, // $7.00
          recurring: {
            interval: 'month'
          }
        },
        quantity: 1,
      }
    ],
    metadata: {
      userId: userId,
    }
  });

  return new NextResponse(JSON.stringify({ url: stripeSession.url }));
  */
}

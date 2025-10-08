import Stripe from 'stripe'
import { headers } from 'next/headers'
import { NextResponse } from 'next/server'

// import { stripe } from '@/lib/stripe'

export async function POST(req: Request) {
  // The logic for this route is temporarily disabled until Stripe is fully configured.
  return new NextResponse(null, { status: 200 })

  /*
  const body = await req.text()
  const sig = headers().get('Stripe-Signature') as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET as string)
  } catch (err: any) {
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }

  const session = event.data.object as Stripe.Checkout.Session

  if (event.type === 'checkout.session.completed') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // TODO: Update the user stripe into in your database.
    // Since this is a webhook, you can't send a response to the user.
    // You can use a database trigger or a serverless function to handle this.
  }

  if (event.type === 'invoice.payment_succeeded') {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    )

    // TODO: Update the user stripe into in your database.
    // Since this is a webhook, you can't send a response to the user.
    // You can use a database trigger or a serverless function to handle this.
  }

  return new NextResponse(null, { status: 200 })
  */
}
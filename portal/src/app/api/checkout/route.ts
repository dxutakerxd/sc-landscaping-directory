import { auth, currentUser } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  const { userId } = auth()
  const user = await currentUser()

  if (!userId || !user) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { priceId, airtableRecordId } = await req.json()

  if (!priceId || !airtableRecordId) {
    return new NextResponse('Missing priceId or airtableRecordId', { status: 400 })
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: 'subscription',
    payment_method_types: ['card'],
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: `${process.env.NEXT_PUBLIC_URL}/dashboard?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/dashboard`,
    metadata: {
      userId,
      airtableRecordId,
    },
  })

  return NextResponse.json({ url: checkoutSession.url })
}

import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import { Resend } from 'resend'

import base from '@/lib/airtable'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, businessName } = body

    if (!email || !businessName) {
      return NextResponse.json({ error: 'Email and Business Name are required' }, { status: 400 })
    }

    // 1. Add the new lead to Airtable
    await base('users').create([
      {
        fields: {
          Email: email,
          'Business Name': businessName,
          Tier: 'Free', // Assign Free tier by default
        },
      },
    ])

    // 2. Send a welcome email using Resend
    await resend.emails.send({
      from: 'onboarding@yourdomain.com', // IMPORTANT: Replace with your verified domain in Resend
      to: email,
      subject: 'Welcome to the SC Landscaping Directory!',
      html: `
        <div>
          <h1>Welcome, ${businessName}!</h1>
          <p>Thank you for signing up for the SC Landscaping Directory.</p>
          <p>Your free, AI-powered listing has been created. You can now log in to your dashboard to view your listing, get your initial AI score, and see how you can improve your visibility.</p>
          <a href="https://sc-landscaping-directory.vercel.app/portal/dashboard">Go to Your Dashboard</a>
          <br/>
          <p>Best,</p>
          <p>The SC Landscaping Directory Team</p>
        </div>
      `,
    })

    // Return a success response
    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Signup Lead Error:', error)
    return NextResponse.json(
      { error: 'An error occurred processing your request.' },
      { status: 500 },
    )
  }
}

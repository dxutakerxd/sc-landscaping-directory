import { auth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

import base from '@/lib/airtable'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { userId } = auth()
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  const { listingId, services, businessName } = await req.json()
  if (!listingId || !services || !businessName) {
    return new NextResponse('Missing listingId, services, or businessName', { status: 400 })
  }

  const systemPrompt = `
You are an expert SEO copywriter for local service businesses in South Carolina. Your goal is to convert a simple list of services into a compelling, keyword-rich business description. The tone should be professional, trustworthy, and customer-focused.

Follow these rules strictly:
1. The description must be a single paragraph.
2. The length must be between 40 and 60 words.
3. Naturally include keywords from the service list.
4. Include the business name.
5. End with a subtle call to action.

--- EXAMPLE ---
INPUT SERVICES: Lawn mowing, Garden design, Irrigation repair
INPUT BUSINESS NAME: Palmetto Greens
OUTPUT DESCRIPTION: Palmetto Greens offers professional lawn mowing, custom garden design, and expert irrigation repair in the Columbia area. We take pride in creating beautiful, healthy landscapes for our neighbors. Contact us today for a free consultation and see what makes us the top choice for your yard care needs.
--- END EXAMPLE ---
`

  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: `INPUT SERVICES: ${services}\nINPUT BUSINESS NAME: ${businessName}`,
        },
      ],
    })

    const newDescription = completion.choices[0]?.message?.content

    if (newDescription) {
      // Update the Airtable record
      await base('Listings').update(listingId, {
        Services: newDescription, // Overwrites the old services list
        'AI Score': Math.floor(Math.random() * 10) + 90, // Assign a new score between 90-99
      })

      return NextResponse.json({ success: true, description: newDescription })
    }

    return new NextResponse('Failed to generate description', { status: 500 })
  } catch (error) {
    console.error('Error optimizing listing:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

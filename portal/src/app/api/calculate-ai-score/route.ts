import { getAuth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'
import OpenAI from 'openai'

import base from '@/lib/airtable'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { listingId } = await req.json()
  if (!listingId) {
    return NextResponse.json({ error: 'Listing ID is required' }, { status: 400 })
  }

  try {
    // 1. Fetch the listing data from Airtable
    const listingRecord = await base('Listings').find(listingId as string)
    if (!listingRecord) {
      return NextResponse.json({ error: 'Listing not found' }, { status: 404 })
    }

    const listingData = listingRecord.fields

    // 2. Prepare the prompt for OpenAI
    const prompt = `
      Analyze the following landscaping business listing and score its effectiveness for AI-powered search engines and local SEO out of 100.
      Consider factors like service descriptions, location clarity, and keyword usage.
      Return only a single number representing the score.

      Listing Data:
      - Business Name: ${listingData['Business Name']}
      - Services: ${listingData.Services}
      - Location: South Carolina
    `

    // 3. Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini', // Using the cost-effective model
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 5,
    })

    const scoreText = response.choices[0].message.content?.trim() || '0'
    const aiScore = Number.parseInt(scoreText, 10)

    if (Number.isNaN(aiScore)) {
      throw new TypeError('OpenAI did not return a valid score.')
    }

    // 4. Save the score back to Airtable
    await base('Listings').update(listingId as string, {
      'AI Score': aiScore,
    })

    return NextResponse.json({ success: true, aiScore })
  } catch (error) {
    console.error('AI Score Calculation Error:', error)
    return NextResponse.json({ error: 'Error calculating AI score.' }, { status: 500 })
  }
}

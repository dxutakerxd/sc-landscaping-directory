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

  const { listingId, businessName, currentServices } = await req.json()
  if (!listingId || !businessName || !currentServices) {
    return NextResponse.json({ error: 'Missing required listing data' }, { status: 400 })
  }

  try {
    // Ensure user is on the paid tier before proceeding
    const userRecords = await base('users')
      .select({ filterByFormula: `{clerk_id} = '${userId}'` })
      .firstPage()
    if (!userRecords || userRecords.length === 0 || userRecords[0].get('Tier') !== 'Paid') {
      return NextResponse.json({ error: 'This feature is for paid users only.' }, { status: 403 })
    }

    // 1. Prepare the new, integrated prompt for OpenAI
    const prompt = `
      You are an expert in local SEO and AI search optimization for service-based businesses.
      Your task is to analyze and improve a business's services description.
      
      Perform the following actions in order:
      1.  Analyze the "Original Description" and provide a score from 1-100 for its effectiveness in AI search.
      2.  Rewrite the description to be better optimized for local search in South Carolina. The new description should be a single, compelling paragraph.
      3.  Provide a brief, one-sentence summary explaining the key improvements you made.
      4.  Provide a new score from 1-100 for your rewritten description. Ensure this new score is higher than the original score.

      The output must be a single JSON object with exactly these four keys: "original_score" (number), "optimized_services" (string), "optimization_summary" (string), and "new_score" (number).

      Business Name: "${businessName}"
      Original Description: "${currentServices}"
    `

    // 2. Call the OpenAI API
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: prompt }],
    })

    const result = response.choices[0].message.content
    if (!result) {
      throw new Error('OpenAI returned an empty response.')
    }

    const optimizationData = JSON.parse(result)

    // 3. Return the entire optimization object to the client for review
    // We do NOT save it to Airtable yet. The user must accept the changes first.
    return NextResponse.json(optimizationData)
  } catch (error) {
    console.error('Listing Optimization Error:', error)
    return NextResponse.json({ error: 'Error optimizing listing.' }, { status: 500 })
  }
}

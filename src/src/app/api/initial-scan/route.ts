import { getAuth } from '@clerk/nextjs/server'
import * as cheerio from 'cheerio'
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

  const { listingId, url } = await req.json()
  if (!listingId || !url) {
    return NextResponse.json({ error: 'Missing listingId or URL' }, { status: 400 })
  }

  try {
    // 1. Fetch and parse website content
    const responseHtml = await fetch(url)
    if (!responseHtml.ok) throw new Error(`Failed to fetch URL: ${responseHtml.statusText}`)
    const html = await responseHtml.text()
    const $ = cheerio.load(html)
    $('script, style, nav, footer, header, noscript, svg').remove()
    const websiteText = $('body')
      .text()
      .replaceAll(/\s{2,}/g, ' ')
      .trim()
    if (!websiteText || websiteText.length < 50)
      throw new Error('Could not extract enough content.')

    // 2. Use AI to extract the CURRENT services description
    const extractionPrompt = `
      Analyze the text from a company's website and extract a concise, single-paragraph summary of the services they offer.
      The output must be a single JSON object with one key: "extracted_services".
      Website Text: "${websiteText.slice(0, 15000)}"
    `
    const extractionResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      response_format: { type: 'json_object' },
      messages: [{ role: 'user', content: extractionPrompt }],
    })
    const extractionResult = extractionResponse.choices[0].message.content
    if (!extractionResult) throw new Error('AI extraction failed.')
    const currentServices = JSON.parse(extractionResult).extracted_services

    // 3. Use AI again to SCORE the extracted description
    const scoringPrompt = `
      Analyze the following landscaping business listing and score its effectiveness for AI-powered search engines and local SEO out of 100.
      Return only a single number representing the score.
      Listing Data:
      - Services: ${currentServices}
    `
    const scoringResponse = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [{ role: 'user', content: scoringPrompt }],
      max_tokens: 5,
    })
    const scoreText = scoringResponse.choices[0].message.content?.trim() || '0'
    const initialScore = Number.parseInt(scoreText, 10)
    if (Number.isNaN(initialScore)) throw new Error('AI scoring failed.')

    // 4. Save BOTH the extracted services and the initial score to Airtable
    const updatedRecord = await base('Listings').update(listingId, {
      Services: currentServices,
      'AI Score': initialScore,
    })

    return NextResponse.json(updatedRecord.fields)
  } catch (error) {
    console.error('Initial Scan Error:', error)
    return NextResponse.json({ error: 'Error performing initial scan.' }, { status: 500 })
  }
}

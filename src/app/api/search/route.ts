import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import base from '@/lib/airtable'

// This route is public and can be accessed without authentication.
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ results: [] })
  }

  const lowerCaseQuery = query.toLowerCase()

  try {
    // Airtable formula to search case-insensitively in two fields:
    // 1. The Business Name (assuming you named the lookup field 'Business Name Lookup')
    // 2. The Services field
    const filterFormula = `OR(
      SEARCH("${lowerCaseQuery}", LOWER({Business Name Lookup})),
      SEARCH("${lowerCaseQuery}", LOWER({Services}))
    )`

    const records = await base('Listings')
      .select({
        filterByFormula: filterFormula,
        // Only return the fields we need for public display
        fields: ['Business Name Lookup', 'Services'],
        maxRecords: 10, // Limit the number of results
      })
      .all()

    const results = records.map((record) => ({
      businessName: record.get('Business Name Lookup'),
      services: record.get('Services'),
    }))

    return NextResponse.json({ results })
  } catch (error) {
    console.error('[SEARCH_API]', error)
    // Return an empty array on error to prevent the frontend from breaking.
    return NextResponse.json({ results: [] }, { status: 500 })
  }
}

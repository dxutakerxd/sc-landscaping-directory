import { getAuth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import base from '@/lib/airtable'

export async function GET(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Find the user record in Airtable by their Clerk ID.
    // The /api/sync-user route is responsible for ensuring this ID exists.
    const userRecords = await base('users')
      .select({
        maxRecords: 1,
        filterByFormula: `{clerk_id} = '${userId}'`,
      })
      .firstPage()

    if (!userRecords || userRecords.length === 0) {
      return NextResponse.json(
        { error: 'User record not found in Airtable after sync.' },
        { status: 404 },
      )
    }
    const userRecord = userRecords[0]

    // Fetch the linked Listing record, if it exists
    let listingRecord = null
    const listingIds = userRecord.get('Listings') as string[] | undefined

    if (listingIds && listingIds.length > 0) {
      const listingId = listingIds[0]
      const fetchedListing = await base('Listings').find(listingId)
      listingRecord = {
        id: fetchedListing.id,
        ...fetchedListing.fields,
      }
    }

    // Return a composite response
    return NextResponse.json({
      user: { id: userRecord.id, ...userRecord.fields },
      listing: listingRecord,
    })
  } catch (error) {
    console.error('Get User Data API Error:', error)
    return NextResponse.json({ error: 'Error fetching data from Airtable.' }, { status: 500 })
  }
}

import { getAuth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import base from '@/lib/airtable'

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req)

  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await req.json()
    const { airtableRecordId, ...fieldsToUpdate } = body

    if (!airtableRecordId) {
      return NextResponse.json({ error: 'Airtable Record ID is missing' }, { status: 400 })
    }

    // Update the user's record in Airtable
    const updatedRecord = await base('Listings').update([
      {
        id: airtableRecordId,
        fields: fieldsToUpdate,
      },
    ])

    return NextResponse.json(updatedRecord[0].fields)
  } catch (error) {
    console.error('Airtable API Error:', error)
    return NextResponse.json({ error: 'Error updating user data in Airtable' }, { status: 500 })
  }
}

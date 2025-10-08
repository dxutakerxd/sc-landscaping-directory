import { getAuth } from '@clerk/nextjs/server'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

import base from '@/lib/airtable'

// This route is responsible for syncing the clerk_id to an existing user record.
export async function POST(req: NextRequest) {
  // 1. Verify the request is from an authenticated user
  const { userId } = getAuth(req)
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // 2. Get the email from the request body (sent from the client)
  const { email } = await req.json()
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 })
  }

  try {
    // 3. Find the user in Airtable by their email
    const usersByEmail = await base('users')
      .select({
        maxRecords: 1,
        filterByFormula: `LOWER({Email}) = LOWER('${email}')`,
      })
      .firstPage()

    if (usersByEmail && usersByEmail.length > 0) {
      const userRecord = usersByEmail[0]

      // 4. If the record doesn't have a clerk_id, update it.
      if (!userRecord.get('clerk_id')) {
        await base('users').update(userRecord.id, { clerk_id: userId })
        return NextResponse.json({ success: true, message: 'User synced' })
      }
      return NextResponse.json({ success: true, message: 'User already synced' })
    }

    return NextResponse.json({ error: 'User not found by email' }, { status: 404 })
  } catch (error) {
    console.error('Sync User API Error:', error)
    return NextResponse.json({ error: 'Error syncing user data.' }, { status: 500 })
  }
}

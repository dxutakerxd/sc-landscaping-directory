import { getAuth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

// IMPORTANT! This file was part of the original boilerplate and is not currently used.
// The active logic for optimization is in /api/optimize-listing/route.ts
// This code is being fixed to allow the build to pass.

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const { userId } = getAuth(req);
  if (!userId) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const { text } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: `Please optimize the following text for SEO: ${text}`,
      },
    ],
  });

  return NextResponse.json(response.choices[0].message);
}
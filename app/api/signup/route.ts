import { NextRequest, NextResponse } from 'next/server';

const AIRTABLE_API_TOKEN = process.env.AIRTABLE_API_TOKEN;
const AIRTABLE_BASE_ID = process.env.AIRTABLE_BASE_ID;
const AIRTABLE_TABLE_NAME = process.env.AIRTABLE_TABLE_NAME || 'Signups';

export async function POST(request: NextRequest) {
  try {
    // Check environment variables
    if (!AIRTABLE_API_TOKEN || !AIRTABLE_BASE_ID) {
      return NextResponse.json(
        { error: 'Server configuration error', missing: { token: !AIRTABLE_API_TOKEN, baseId: !AIRTABLE_BASE_ID } },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, device, sources, otherSource, hasLists } = body;

    // Validate required fields
    if (!name || !email || !device) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Build sources array for Airtable multi-select
    const sourcesArray: string[] = [];
    if (sources?.tiktok) sourcesArray.push('TikTok');
    if (sources?.instagram) sourcesArray.push('Instagram');
    if (sources?.googleMaps) sourcesArray.push('Google Maps');
    if (sources?.other) sourcesArray.push('Other');

    // Create record in Airtable
    const response = await fetch(
      `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${encodeURIComponent(AIRTABLE_TABLE_NAME)}`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${AIRTABLE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          records: [
            {
              fields: {
                Name: name,
                Email: email,
                Device: device,
                Sources: sourcesArray,
                OtherSource: otherSource || '',
                HasLists: hasLists === true,
                CreatedAt: new Date().toISOString().split('T')[0],
              },
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Airtable error:', errorData);
      return NextResponse.json(
        { error: 'Failed to save signup', details: errorData },
        { status: 500 }
      );
    }

    const data = await response.json();
    return NextResponse.json({ success: true, id: data.records[0].id });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: String(error) },
      { status: 500 }
    );
  }
}

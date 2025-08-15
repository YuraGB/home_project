// app/api/category/route.ts
import { getCatalogByUserIdWithData } from '@/server/services/catalog/getCatalogByUserIDWithData';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const userId = searchParams.get('userId');
  const categoryId = searchParams.get('categoryId');

  if (!userId || !categoryId) {
    return NextResponse.json(
      {
        error: 'User ID and Category ID are required',
      },
      { status: 400 },
    );
  }

  try {
    const result = await getCatalogByUserIdWithData(
      Number(userId),
      Number(categoryId),
    );

    if (result === null) {
      NextResponse.json(
        {
          error: 'No data found for the given user and category',
        },
        { status: 404 },
      );
    }
    return NextResponse.json(result, {
      status: 200,
      headers: { 'x-vercel-cache-tag': 'categoriyData' },
    });
  } catch (err) {
    console.error('Error fetching catalog data:', err);
    return NextResponse.json({ error: 'failed to load data' }, { status: 500 });
  }
}

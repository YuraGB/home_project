// app/api/posts/route.ts
import { getAllPosts } from '@/server/controllers/post/postService';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const [scheme, token] = authHeader.split(' ');

  if (scheme !== 'Bearer' || !token) {
    return new Response(
      JSON.stringify({ error: 'Invalid Authorization header' }),
      {
        status: 401,
      },
    );
  }

  try {
    const result = await getAllPosts(token);
    return NextResponse.json(result, {
      status: 200,
      headers: { 'x-vercel-cache-tag': 'categoriyData' },
    });
  } catch (err) {
    console.error('Error fetching posts data:', err);
    return NextResponse.json({ error: 'failed to load data' }, { status: 500 });
  }
}

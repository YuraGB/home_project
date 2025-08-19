import { isAuthenticatedByApiKey } from '@/server/lib/isAuthentikated';
import logger from '@/server/lib/logger';
import { updatePostResource } from '@/server/services/post/updatePostResource';
import { NextRequest, NextResponse } from 'next/server';

type PatchBody = {
  postId: number;
};

export async function PATCH(req: NextRequest) {
  const canContinue = isAuthenticatedByApiKey(req);

  if (!canContinue) {
    return new Response(
      JSON.stringify({ error: 'Invalid Authorization header' }),
      {
        status: 401,
      },
    );
  }

  try {
    const body: PatchBody = await req.json();

    if (!body || !body.postId) {
      return new Response(
        JSON.stringify({ error: 'There is no data to update' }),
        {
          status: 501,
        },
      );
    }

    const wasUpdated = await updatePostResource({
      postId: body.postId,
      apiKey: canContinue,
    });

    return NextResponse.json({
      wasUpdated,
    });
  } catch (e) {
    logger.error(`The postwasn't apdated: ${(e as Error).message}`);

    return NextResponse.json({
      wasUpdated: false,
    });
  }
}

// app/api/post/last_visited/route.ts
import { NextRequest, NextResponse } from "next/server";

type RequestBody = {
  id: number;
};

export async function PUT(req: NextRequest) {
  const body = (await req.json()) as RequestBody;

  const { id } = body;

  if (!id) {
    return NextResponse.json({ error: "postId is required" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}

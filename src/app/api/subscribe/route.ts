import { pushSubscribe } from "@/server/controllers/subscribe/pushSubscribe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { userId, subscription } = body;

  // Validate input
  if (!userId || !subscription) {
    return NextResponse.json(
      { error: "Missing userId or subscription" },
      { status: 400 },
    );
  }

  const result = await pushSubscribe({ userId, subscription });

  if (!result) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}

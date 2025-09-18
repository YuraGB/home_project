import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]";
import { unSubscribeUser } from "@/server/controllers/subscribe/unSubscribeUser";

export async function POST(req: NextRequest) {
  const body = await req.json();
  let { userId } = body;

  if (!userId) {
    const session = await getServerSession(authOptions);
    userId = session?.user?.id;

    if (!userId) {
      return NextResponse.json(
        { error: "Missing subscription" },
        { status: 400 },
      );
    }
  }

  // const result = await pushSubscribe({ userId, subscription });

  const result = await unSubscribeUser({ userId });

  if (!result) {
    return NextResponse.json({ success: false });
  }

  return NextResponse.json({ success: true });
}

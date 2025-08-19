import webpush from "web-push";
import { NextRequest, NextResponse } from "next/server";
import { getSubscription } from "@/server/controllers/subscribe/getSubscription";

webpush.setVapidDetails(
  `mailto:${process.env.VAPID_EMAIL!}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!,
);

export async function POST(req: NextRequest) {
  const {
    userId,
    title,
    body,
  }: { userId: number; title: string; body: string } = await req.json();
  const subscription = await getSubscription(userId);

  if (!subscription) {
    return NextResponse.json(
      { error: "No subscription found" },
      { status: 404 },
    );
  }

  try {
    const sub = subscription.subscription as webpush.PushSubscription;

    await webpush.sendNotification(sub, JSON.stringify({ title, body }));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Push error:", err);
    return NextResponse.json({ error: "Push failed" }, { status: 500 });
  }
}

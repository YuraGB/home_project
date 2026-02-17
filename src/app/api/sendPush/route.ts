import webpush from "web-push";
import { NextRequest, NextResponse } from "next/server";
import { getSubscription } from "@/server/controllers/subscribe/getSubscription";
import { deleteSubscribtion } from "@/server/services/subscribe/deleteSubscribtion";

export async function POST(req: NextRequest) {
  if (!process.env.VAPID_PUBLIC_KEY || !process.env.VAPID_PRIVATE_KEY) {
    throw new Error("Missing VAPID keys");
  }

  webpush.setVapidDetails(
    "mailto:example@gmail.com",
    process.env.VAPID_PUBLIC_KEY,
    process.env.VAPID_PRIVATE_KEY,
  );

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

    //delete subscr
    deleteSubscribtion(userId);
    return NextResponse.json({ error: "Push failed" }, { status: 500 });
  }
}

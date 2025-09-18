"use client";
import { Button } from "../ui/button";
import { TSubscription } from "./hook/useGetSubscription";
import { useSubscridtion } from "./hook/useSubscribtion";

export default function SubscribeButton({
  userId,
  subscribtion,
}: {
  userId: number;
  subscribtion: TSubscription;
}) {
  const { subscribe, unSubscribeUser } = useSubscridtion({
    userId,
  });

  return (
    <Button
      onClick={subscribtion.subscribed ? subscribe : unSubscribeUser}
      disabled={
        subscribtion.loadingSubscribes || subscribtion?.subscribed
          ? true
          : false
      }
      variant={"ghost"}
    >
      {subscribtion.subscribed ? "✅ Notification " : "🔔 Set Notifications"}
    </Button>
  );
}

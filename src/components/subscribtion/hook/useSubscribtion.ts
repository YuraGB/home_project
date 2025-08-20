"use client";
import { useEffect } from "react";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { pushSubscribe } from "@/server/controllers/subscribe/pushSubscribe";
import { useQueryClient } from "@tanstack/react-query";
import { urlBase64ToUint8Array } from "@/lib/helpers";

export const useSubscridtion = ({ userId }: { userId: number }) => {
  const queryClient = useQueryClient();

  const { mutate: saveSubscribeAction, data: savedSubscribe } =
    useMutationApi(pushSubscribe);

  async function subscribe() {
    // Реєстрація service worker
    const registration = await navigator.serviceWorker.register("/sw.js");

    // Підписка на push
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });

    saveSubscribeAction({
      userId,
      subscription: JSON.stringify(subscription),
    });
  }

  useEffect(() => {
    if (savedSubscribe) {
      queryClient.invalidateQueries({ queryKey: [`subscription/${userId}`] });
    }
  }, [savedSubscribe, queryClient, userId]);

  return {
    subscribe,
  };
};

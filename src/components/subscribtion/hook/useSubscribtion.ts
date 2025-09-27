"use client";
import { useEffect } from "react";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { pushSubscribe } from "@/server/controllers/subscribe/pushSubscribe";
import { useQueryClient } from "@tanstack/react-query";
import { urlBase64ToUint8Array } from "@/lib/helpers";
import { unSubscribeUser } from "@/server/controllers/subscribe/unSubscribeUser";
import { toast } from "@/hooks/use-toast";

export const useSubscridtion = ({ userId }: { userId: number }) => {
  const queryClient = useQueryClient();

  const { mutate: saveSubscribeAction, data: savedSubscribe } =
    useMutationApi(pushSubscribe);

  const { mutate: onDeleteSubscribtion, data: subscrWasDeleted } =
    useMutationApi(unSubscribeUser);

  async function subscribe() {
    // Перевірка дозволів
    const permission = await Notification.requestPermission();
    if (permission !== "granted") {
      console.warn("❌ User denied notifications");
      return;
    }

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

  async function unSubscribe() {
    try {
      // 1. Чекаємо поки service worker готовий
      const registration = await navigator.serviceWorker.ready;

      // 2. Дістаємо поточний subscription (якщо є)
      const subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        console.log("❌ No active subscription found");
        return { success: false, message: "No active subscription" };
      }

      // 3. Відписуємо у браузері
      const unsubscribed = await subscription.unsubscribe();

      if (!unsubscribed) {
        console.warn("⚠️ Subscription could not be unsubscribed in browser");
        return { success: false, message: "Unsubscribe failed in browser" };
      }

      // 4. Відправляємо запит на бекенд, щоб видалити subscription
      onDeleteSubscribtion({ userId });

      return { success: true };
    } catch (error) {
      console.error("❌ Error unsubscribing:", error);
      return { success: false, error };
    }
  }

  useEffect(() => {
    if (savedSubscribe || subscrWasDeleted) {
      queryClient.invalidateQueries({ queryKey: [`subscription/${userId}`] });

      if (savedSubscribe) {
        toast({
          title: "Notification is set",
          description: "You will receive brouser notifications",
        });
      }
    }
  }, [savedSubscribe, queryClient, userId, subscrWasDeleted]);

  return {
    subscribe,
    unSubscribe,
  };
};

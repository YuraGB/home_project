"use server";
import { getSubscriptionService } from "@/server/services/subscribe/getSubscriptionService";

export const getSubscription = async (userId: number) => {
  const subscribtion = await getSubscriptionService(Number(userId));

  if (!subscribtion) return null;

  return subscribtion;
};

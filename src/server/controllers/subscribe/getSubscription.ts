import { getSubscriptionService } from "@/server/services/subscribe/getSubscriptionService";

export const getSubscription = async (userId: number) => {
  const subscriptions = await getSubscriptionService(Number(userId));

  if (!subscriptions) return null;

  return subscriptions;
};

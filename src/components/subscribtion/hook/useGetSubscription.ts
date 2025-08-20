import { getSubscription } from "@/server/controllers/subscribe/getSubscription";
import { useQuery } from "@tanstack/react-query";

export const useGetSubscription = (
  userId?: number,
  subscription?: PushSubscription | null | unknown,
) => {
  const {
    data: subscribed,
    isFetching: loadingSubscribes,
    error: subscriptionError,
  } = useQuery({
    queryKey: [`subscription/${userId}`],
    queryFn: () => (userId ? getSubscription(userId) : null),
    enabled: !!userId,
    initialData: subscription ? { subscription } : null,
    staleTime: 0,
  });

  return { subscribed, loadingSubscribes, subscriptionError };
};

export type TSubscription = ReturnType<typeof useGetSubscription>;

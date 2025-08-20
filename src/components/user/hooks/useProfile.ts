import { useGetSubscription } from "@/components/subscribtion/hook/useGetSubscription";
import { signOut, useSession } from "next-auth/react";

export const useProfile = () => {
  const { data } = useSession();

  const subscribtion = useGetSubscription(data?.user?.id);
  const logOut = () => {
    signOut();
  };

  return {
    logOut,
    subscribtion,
    userData: data?.user ?? null,
  };
};

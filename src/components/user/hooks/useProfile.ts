import { signOut, useSession } from "next-auth/react";

export const useProfile = () => {
  const { data } = useSession();

  const logOut = () => {
    signOut();
  };

  return {
    logOut,
    userData: data?.user ?? null,
  };
};

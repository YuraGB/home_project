"use server";
import { deleteSubscribtion } from "@/server/services/subscribe/deleteSubscribtion";
import { getUserById } from "@/server/services/user/getUserById";

export const unSubscribeUser = async ({ userId }: { userId: number }) => {
  const userExist = await getUserById(Number(userId));
  if (!userExist) {
    return null;
  }

  const deletedSubsribtion = await deleteSubscribtion(userId);

  return deletedSubsribtion;
};

import { createOrUpdateSubscribe } from '@/server/services/subscribe/createUpdateSubscribe';
import { getUserById } from '@/server/services/user/getUserById';

export const pushSubscribe = async ({
  userId,
  subscription,
}: {
  userId: number;
  subscription: string;
}) => {
  const userExist = await getUserById(Number(userId));
  if (!userExist) {
    return null;
  }

  const subscribe = await createOrUpdateSubscribe({
    userId,
    subscription,
  });

  return subscribe;
};

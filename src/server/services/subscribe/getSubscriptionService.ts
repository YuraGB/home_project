import { db } from '@/db';
import { eq } from 'drizzle-orm';
import logger from '@/server/lib/logger';
import {
  NewPushSubscription,
  pushSubscriptions,
} from '@/db/drizzle/schemas/subscription';

export const getSubscriptionService = async (
  id: number,
): Promise<NewPushSubscription | null> => {
  try {
    const [sub] = await db
      .select()
      .from(pushSubscriptions)
      .where(eq(pushSubscriptions.userId, id));
    return sub;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

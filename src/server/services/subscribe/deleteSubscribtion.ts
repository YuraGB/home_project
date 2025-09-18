import { db } from "@/db";
import { eq } from "drizzle-orm";
import logger from "@/server/lib/logger";
import {
  NewPushSubscription,
  pushSubscriptions,
} from "@/db/drizzle/schemas/subscription";

export const deleteSubscribtion = async (
  id: number,
): Promise<NewPushSubscription | null> => {
  try {
    const [sub] = await db
      .delete(pushSubscriptions)
      .where(eq(pushSubscriptions.userId, id))
      .returning();

    return sub;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

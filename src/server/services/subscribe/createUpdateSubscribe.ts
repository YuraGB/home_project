import { db } from "@/db";
import { pushSubscriptions } from "@/db/drizzle/schemas/subscription";

type Params = {
  userId: number;
  subscription: unknown; // WebPush subscription (JSON)
};

export const createOrUpdateSubscribe = async ({
  userId,
  subscription,
}: Params) => {
  try {
    await db
      .insert(pushSubscriptions)
      .values({
        userId,
        subscription,
      })
      .onConflictDoUpdate({
        target: pushSubscriptions.userId,
        set: {
          subscription,
        },
      });

    return { success: true };
  } catch (e) {
    console.error("DB Error:", e);
    return { success: false, error: e };
  }
};

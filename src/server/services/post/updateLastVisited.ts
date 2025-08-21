import logger from "@/server/lib/logger";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";

export const updateLastVisited = async (
  id: number,
): Promise<TDBPost | null> => {
  try {
    const [result] = await db
      .update(postsSchema)
      .set({ lastVisited: new Date(), hasUpdates: false })
      .where(eq(postsSchema.id, id))
      .returning();

    return result;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

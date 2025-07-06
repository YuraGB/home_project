import { db } from "@/db";
import { eq } from "drizzle-orm";
import logger from "@/server/lib/logger";
import { postsSchema } from "@/db/drizzle/schemas/postsSchema";

export const deletePost = async (id: number): Promise<number | null> => {
  try {
    const [result] = await db
      .delete(postsSchema)
      .where(eq(postsSchema.id, id))
      .returning();
    return result.id;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

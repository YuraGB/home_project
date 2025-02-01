import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import logger from "@/server/lib/logger";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";

export const getPostsByUserIdAndId = async (
  userId: number,
  id: number,
): Promise<TDBPost | null> => {
  try {
    const [post] = await db
      .select()
      .from(postsSchema)
      .where(and(eq(postsSchema.id, id), eq(postsSchema.userId, userId)));
    return post;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

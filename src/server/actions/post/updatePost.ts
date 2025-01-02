import logger from "@/lib/logger";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";

export const updatePost = async (data: TDBPost): Promise<TDBPost | null> => {
  try {
    const [result] = await db
      .update(postsSchema)
      .set(data)
      .where(eq(postsSchema.id, data.id))
      .returning();
    return result;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

import logger from "@/server/lib/logger";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { TUpdatePostData } from "@/server/controllers/post/types";

export const updatePost = async (
  data: TUpdatePostData & { rating: boolean },
): Promise<TDBPost | null> => {
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

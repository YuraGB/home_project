import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import logger from "@/server/lib/logger";

export const getPostById = async (id: number): Promise<TDBPost | null> => {
  try {
    const [post] = await db
      .select()
      .from(postsSchema)
      .where(eq(postsSchema.id, id));

    return post;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

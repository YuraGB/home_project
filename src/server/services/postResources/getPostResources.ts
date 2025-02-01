import { db } from "@/db";
import { resourceTable } from "@/db/drizzle/schemas/postResourses";
import { eq } from "drizzle-orm";
import logger from "@/server/lib/logger";

export const getResources = async (postId: number) => {
  try {
    return await db
      .select()
      .from(resourceTable)
      .where(eq(resourceTable.postId, postId));
  } catch (error) {
    logger.error((error as Error).stack);
    return [];
  }
};

import {
  resourceTable,
  TPostResources,
} from "@/db/drizzle/schemas/postResourses";
import { db } from "@/db";
import logger from "@/server/lib/logger";

export const addPostResources = async (
  postId: number,
  resources: string,
): Promise<TPostResources[] | []> => {
  if (!resources.length) {
    return [];
  }
  try {
    return await db
      .insert(resourceTable)
      .values({
        postId,
        url: resources,
      })
      .returning();
  } catch (error) {
    logger.error((error as Error).stack);
    return [];
  }
};

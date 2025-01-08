import { db } from "@/db";
import logger from "@/lib/logger";
import { TCreatePostData } from "@/server/services/post/types";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";

export const addNewPost = async (
  data: TCreatePostData,
): Promise<TDBPost | null> => {
  try {
    const [createdUser] = await db
      .insert(postsSchema)
      .values(data)
      .returning() // Specify columns
      .execute();

    return createdUser;
  } catch (error) {
    logger.error((error as Error).stack);
    console.error("Post not created", error);
    return null;
  }
};

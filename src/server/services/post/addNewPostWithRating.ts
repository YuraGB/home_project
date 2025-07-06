import { db } from "@/db";
import logger from "@/server/lib/logger";
import { TCreatePostData } from "@/server/controllers/post/types";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ratingTable, TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { TCreateNewRating } from "@/server/controllers/rating/types";

export type TPostWithRating = {
  post: TDBPost | null;
  rating: TRatingSchema | null;
};
export const addNewPostWithRating = async (
  postData: TCreatePostData,
  ratingData: Omit<TCreateNewRating, "postId">, // postId will be added in the transaction
): Promise<TPostWithRating | null> => {
  try {
    return await db.transaction(async (trx) => {
      const [post] = await trx.insert(postsSchema).values(postData).returning();

      const [rating] = await trx
        .insert(ratingTable)
        .values({
          ...ratingData, // Additional rating data
          postId: post.id, // Reference to the created post
        })
        .returning();

      return {
        post: post,
        rating: rating,
      };
    });
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

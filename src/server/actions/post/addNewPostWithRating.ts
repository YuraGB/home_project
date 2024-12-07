import { db } from "@/db";
import logger from "@/lib/logger";
import { TCreatePostData } from "@/server/services/post/types";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ratingTable, TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { TCreateNewRating } from "@/server/services/rating/types";

export type TPostWithRating = {
  post: TDBPost | null;
  rating: TRatingSchema | null;
};
export const addNewPostWithRating = async (
  postData: TCreatePostData,
  ratingData: Omit<TCreateNewRating, "postId">,
): Promise<TPostWithRating | null> => {
  try {
    // Start a transaction
    return await db.transaction(async (trx) => {
      // Step 1: Create the post
      const [post] = await trx.insert(postsSchema).values(postData).returning();

      // Step 2: Create the rating for the post (using the postId)
      const [rating] = await trx
        .insert(ratingTable)
        .values({
          ...ratingData, // Additional rating data
          postId: post.id, // Reference to the created post
        })
        .returning();

      // Step 3: Return the created post and rating as a response
      return {
        post: post,
        rating: rating,
      };
    });
  } catch (error) {
    logger.error((error as Error).stack);
    console.error("Post not created", error);
    return null;
  }
};

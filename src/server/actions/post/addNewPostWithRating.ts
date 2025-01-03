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
  ratingData: Omit<TCreateNewRating, "postId">, // postId will be added in the transaction
): Promise<TPostWithRating | null> => {
  try {
    return await db.transaction(async (trx) => {
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

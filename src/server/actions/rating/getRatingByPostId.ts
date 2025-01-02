"use server";
import { ratingTable, TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import logger from "@/lib/logger";

export const getRatingDataByPostId = async (
  id: number,
): Promise<TRatingSchema | null> => {
  try {
    const [rating] = await db
      .select()
      .from(ratingTable)
      .where(eq(ratingTable.postId, id));
    return rating;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

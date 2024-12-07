"use server";
import { ratingTable, TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { db } from "@/db";
import logger from "@/lib/logger";
import { TCreateNewRating } from "@/server/services/rating/types";

export const createNewRating = async (
  data: TCreateNewRating,
): Promise<TRatingSchema | null> => {
  try {
    const [newRate] = await db.insert(ratingTable).values(data).returning();
    return newRate;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

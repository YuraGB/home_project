"use server";
import { ratingTable, TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { db } from "@/db";
import logger from "@/lib/logger";
import { eq } from "drizzle-orm";

export const updateRate = async (
  data: TRatingSchema,
): Promise<TRatingSchema | null> => {
  try {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { id, ...rest } = data; // exclude id

    const [updatedRate] = await db
      .update(ratingTable)
      .set(rest)
      .where(eq(ratingTable.id, id))
      .returning();

    return updatedRate;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

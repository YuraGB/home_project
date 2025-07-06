import { db } from "@/db";
import { ratingTable } from "@/db/drizzle/schemas/ratingSchema";
import { eq } from "drizzle-orm";
import logger from "@/server/lib/logger";

export const deleteRating = async (id: number) => {
  try {
    const [result] = await db
      .delete(ratingTable)
      .where(eq(ratingTable.id, id))
      .returning();
    return result.id;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

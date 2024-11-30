"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { categorySchema, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/lib/logger";

export const getCatalogByUserId = async (
  id: number,
): Promise<TCategory[] | null> => {
  try {
    return await db
      .select()
      .from(categorySchema)
      .where(eq(categorySchema.userId, id));
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

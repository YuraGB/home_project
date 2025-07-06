"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { categoryTable, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/server/lib/logger";

export const getCatalogByUserId = async (
  id: number,
): Promise<TCategory[] | null> => {
  try {
    return await db
      .select()
      .from(categoryTable)
      .where(eq(categoryTable.userId, id));
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

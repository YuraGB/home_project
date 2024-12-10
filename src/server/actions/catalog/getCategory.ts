"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { categorySchema, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/lib/logger";

export const getCatalogById = async (
  id: number,
): Promise<TCategory[] | null> => {
  try {
    return await db
      .select()
      .from(categorySchema)
      .where(eq(categorySchema.id, id));
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

import { db } from "@/db";
import { categoryTable, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/server/lib/logger";

export const getAllCategories = async (): Promise<TCategory[] | []> => {
  try {
    return await db.select().from(categoryTable);
  } catch (error) {
    logger.error((error as Error).stack);
    return [];
  }
};

import { db } from "@/db";
import { categorySchema, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/lib/logger";

export const getAllCategories = async (): Promise<TCategory[] | []> => {
  try {
    return await db.select().from(categorySchema);
  } catch (error) {
    logger.error((error as Error).stack);
    return [];
  }
};

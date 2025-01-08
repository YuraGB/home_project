import {
  subCategoriesSchema,
  TSubCategory,
} from "@/db/drizzle/schemas/subCategoriesSchema";
import logger from "@/lib/logger";
import { db } from "@/db";

export const getAllSubCategories = async (): Promise<TSubCategory[]> => {
  try {
    return await db.select().from(subCategoriesSchema);
  } catch (error) {
    logger.error((error as Error).stack);
    return [];
  }
};

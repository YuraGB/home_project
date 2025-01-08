import { TCreateSubCategoryData } from "@/server/services/subCategory/types";
import {
  subCategoriesSchema,
  TSubCategory,
} from "@/db/drizzle/schemas/subCategoriesSchema";
import { db } from "@/db";
import logger from "@/lib/logger";

export const addNewSubCategory = async (
  data: TCreateSubCategoryData,
): Promise<TSubCategory | null> => {
  try {
    const [newSubCategory] = await db
      .insert(subCategoriesSchema)
      .values(data)
      .returning();
    return newSubCategory;
  } catch (e) {
    logger.error((e as Error).stack);
    return null;
  }
};

import logger from "@/lib/logger";
import { db } from "@/db";
import {
  subCategoriesSchema,
  TSubCategory,
} from "@/db/drizzle/schemas/subCategoriesSchema";
import { eq } from "drizzle-orm";
import { TUpdateSubCat } from "@/server/controllers/subCategory/validationSchemas";

export const updateSubCategory = async (
  data: TUpdateSubCat,
): Promise<TSubCategory | null> => {
  try {
    const [result] = await db
      .update(subCategoriesSchema)
      .set(data)
      .where(eq(subCategoriesSchema.id, data.id))
      .returning();
    return result;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

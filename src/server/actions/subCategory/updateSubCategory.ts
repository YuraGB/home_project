import logger from "@/lib/logger";
import { db } from "@/db";
import {
  subCategoriesSchema,
  TSubCategory,
} from "@/db/drizzle/schemas/subCategoriesSchema";
import { eq } from "drizzle-orm";

export const updateSubCategory = async (
  data: TSubCategory,
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

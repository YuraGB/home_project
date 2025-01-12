import { db } from "@/db";
import { eq } from "drizzle-orm";
import logger from "@/lib/logger";
import { subCategoriesSchema } from "@/db/drizzle/schemas/subCategoriesSchema";

export const deleteSubCategory = async (id: number): Promise<number | null> => {
  try {
    const [result] = await db
      .delete(subCategoriesSchema)
      .where(eq(subCategoriesSchema.id, id))
      .returning();
    return result.id;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

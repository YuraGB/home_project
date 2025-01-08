import { categoryTable, TCategory } from "@/db/drizzle/schemas/categorySchema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import logger from "@/lib/logger";
import { TUpdateCatalog } from "@/server/services/category/validationSchemas";

export const updateCatalog = async (
  data: TUpdateCatalog,
): Promise<TCategory | null> => {
  try {
    const [result] = await db
      .update(categoryTable)
      .set(data)
      .where(eq(categoryTable.id, data.id))
      .returning();
    return result;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

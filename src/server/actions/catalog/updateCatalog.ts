import { categorySchema, TCategory } from "@/db/drizzle/schemas/categorySchema";
import { eq } from "drizzle-orm";
import { db } from "@/db";
import logger from "@/lib/logger";

export const updateCatalog = async (
  data: TCategory,
): Promise<TCategory | null> => {
  try {
    const [result] = await db
      .update(categorySchema)
      .set(data)
      .where(eq(categorySchema.id, data.id))
      .returning();
    return result;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

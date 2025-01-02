import { db } from "@/db";
import { eq } from "drizzle-orm";
import logger from "@/lib/logger";
import { categorySchema } from "@/db/drizzle/schemas/categorySchema";

export const deleteCatalog = async (id: number): Promise<number | null> => {
  try {
    const [result] = await db
      .delete(categorySchema)
      .where(eq(categorySchema.id, id))
      .returning();
    return result.id;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

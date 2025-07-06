"use server";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import logger from "@/server/lib/logger";
import { categoryTable } from "@/db/drizzle/schemas/categorySchema";

export const deleteCatalog = async (id: number): Promise<number | null> => {
  try {
    const [result] = await db
      .delete(categoryTable)
      .where(eq(categoryTable.id, id))
      .returning();
    return result.id;
  } catch (e) {
    logger.error((e as Error).message);
    return null;
  }
};

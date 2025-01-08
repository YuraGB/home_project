"use server";
import { db } from "@/db";
import { categoryTable, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/lib/logger";

export const addNewCategory = async (data: {
  userId: number;
  name: string;
  description: string;
}): Promise<TCategory | null> => {
  try {
    const [categoryCreated] = await db
      .insert(categoryTable)
      .values(data)
      .returning(); // Specify columns

    return categoryCreated;
  } catch (error) {
    logger.error((error as Error).stack);
    console.error("Category not created", error);
    return null;
  }
};

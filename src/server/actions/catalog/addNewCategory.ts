"use server";
import { db } from "@/db";
import { categorySchema, TCategory } from "@/db/drizzle/schemas/categorySchema";
import { z } from "zod";
import logger from "@/lib/logger";

const categoryValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string(),
  userId: z.number(),
});
export const addNewCategory = async (data: {
  userId: number;
  name: string;
  description: string;
}): Promise<TCategory | null> => {
  try {
    const newUserData = categoryValidationSchema.parse(data);
    const [categoryCreated] = await db
      .insert(categorySchema)
      .values(newUserData)
      .returning() // Specify columns
      .execute();

    return categoryCreated;
  } catch (error) {
    logger.error((error as Error).stack);
    console.error("Category not created", error);
    return null;
  }
};

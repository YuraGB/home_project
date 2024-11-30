"use server";
import { db } from "@/db";
import logger from "@/lib/logger";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { eq } from "drizzle-orm";

export const getPostsByEntityId = async (
  data: [string, number],
): Promise<TDBPost[] | null> => {
  const [key, value] = data;

  // Перелік дозволених ключів
  const allowedKeys = {
    categoryId: postsSchema.categoryId,
    subCategoryId: postsSchema.subCategoryId,
  } as const;

  // Перевірка ключа з явним приведенням
  if (!(key in allowedKeys)) {
    logger.error(`Search posts not allowed - invalid key ${key}`);
    throw new Error(`Invalid key: ${key}`);
  }

  // Приведення типу після перевірки
  const validKey = key as keyof typeof allowedKeys;

  try {
    // Виконання запиту
    return await db
      .select()
      .from(postsSchema)
      .where(eq(allowedKeys[validKey], value));
  } catch (error) {
    logger.error((error as Error).stack);
    console.error("Post not retrieved", error);
    return null;
  }
};

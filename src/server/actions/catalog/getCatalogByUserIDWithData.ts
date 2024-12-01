"use server";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { categorySchema, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/lib/logger";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import {
  subCategoriesSchema,
  TSubCategory,
} from "@/db/drizzle/schemas/subCategoriesSchema";

type TCategoryWithRelations = {
  categories: TCategory;
  posts: TDBPost | null;
  sub_categories: TSubCategory | null;
};

export const getCatalogByUserIdWithData = async (
  id: number,
  catId: number,
): Promise<TCategoryWithRelations | null> => {
  try {
    const [catalogWithRelationData] = await db
      .select()
      .from(categorySchema)
      // Join subcategories
      .leftJoin(
        subCategoriesSchema,
        eq(subCategoriesSchema.categoryId, categorySchema.id),
      )
      // Join posts
      .leftJoin(postsSchema, eq(postsSchema.categoryId, categorySchema.id))
      // Filter by userId and categoryId
      .where(and(eq(categorySchema.userId, id), eq(categorySchema.id, catId)));
    return catalogWithRelationData;
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

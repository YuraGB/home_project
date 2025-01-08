"use server";
import { db } from "@/db";
import { and, eq } from "drizzle-orm";
import { categoryTable, TCategory } from "@/db/drizzle/schemas/categorySchema";
import logger from "@/lib/logger";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import {
  subCategoriesSchema,
  TSubCategory,
} from "@/db/drizzle/schemas/subCategoriesSchema";
import { ratingTable, TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { helper } from "@/server/actions/catalog/util";

export type TCategoryWithRelations = {
  categories: TCategory;
  posts: TDBPost | null;
  sub_categories: TSubCategory | null;
  rating: TRatingSchema | null;
}[];

export type TCategoryReturnType = {
  categories: TCategory;
  posts: TDBPost[] | null;
  sub_categories: TSubCategory[] | null;
  rating: TRatingSchema[] | null;
};

export const getCatalogByUserIdWithData = async (
  id: number,
  catId: number,
): Promise<TCategoryReturnType | null> => {
  try {
    const catalogWithRelationData = await db
      .select()
      .from(categoryTable)
      .leftJoin(
        subCategoriesSchema,
        eq(subCategoriesSchema.categoryId, categoryTable.id),
      )
      .leftJoin(postsSchema, eq(postsSchema.categoryId, categoryTable.id))
      .leftJoin(ratingTable, eq(ratingTable.postId, postsSchema.id))
      .where(and(eq(categoryTable.userId, id), eq(categoryTable.id, catId)));
    return helper(catalogWithRelationData);
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

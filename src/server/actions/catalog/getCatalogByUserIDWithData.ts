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
      .from(categorySchema)
      .leftJoin(
        subCategoriesSchema,
        eq(subCategoriesSchema.categoryId, categorySchema.id),
      )
      .leftJoin(postsSchema, eq(postsSchema.categoryId, categorySchema.id))
      .leftJoin(ratingTable, eq(ratingTable.postId, postsSchema.id))
      .where(and(eq(categorySchema.userId, id), eq(categorySchema.id, catId)));
    return helper(catalogWithRelationData);
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

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

type TCategoryWithRelations = {
  categories: TCategory;
  posts: TDBPost | null;
  sub_categories: TSubCategory | null;
  rating: TRatingSchema | null;
}[];

type TCategoryReturnType = {
  categories: TCategory;
  posts: TDBPost[] | null;
  sub_categories: TSubCategory[] | null;
  rating: TRatingSchema[] | null;
};

const helper = (data: TCategoryWithRelations): TCategoryReturnType => {
  return data.reduce(
    (acc, row) => {
      const posts = acc.posts;
      const rating = acc.rating;
      const subCategories = acc.sub_categories;

      const rate = row.rating;
      const post = row.posts;
      const subCat = row.sub_categories;

      if (post && !posts.find((i) => i.id === post.id)) {
        posts.push(post);
      }

      if (rate && !rating.find((i) => i.id === rate.id)) {
        rating.push(rate);
      }

      if (subCat && !subCategories.find((i) => i.id === subCat.id)) {
        subCategories.push(subCat);
      }

      return acc;
    },
    {
      categories: data[0].categories,
      posts: data[0].posts ? [data[0].posts] : [],
      sub_categories: data[0].sub_categories ? [data[0].sub_categories] : [],
      rating: data[0].rating ? [data[0].rating] : [],
    },
  );
};

export const getCatalogByUserIdWithData = async (
  id: number,
  catId: number,
): Promise<TCategoryReturnType | null> => {
  try {
    const catalogWithRelationData = await db
      .select()
      .from(categorySchema)
      // Join subcategories
      .leftJoin(
        subCategoriesSchema,
        eq(subCategoriesSchema.categoryId, categorySchema.id),
      )
      // Join posts
      .leftJoin(postsSchema, eq(postsSchema.categoryId, categorySchema.id))

      .leftJoin(ratingTable, eq(ratingTable.postId, postsSchema.id))
      // Filter by userId and categoryId
      .where(and(eq(categorySchema.userId, id), eq(categorySchema.id, catId)));
    return helper(catalogWithRelationData);
  } catch (error) {
    logger.error((error as Error).stack);
    return null;
  }
};

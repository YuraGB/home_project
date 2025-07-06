import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { postsSchema, TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ratingTable, TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";

export type TSubCategoryWithPosts = TSubCategory & {
  posts: (typeof postsSchema.$inferSelect)[];
};

export type TSubData = {
  sub_categories: TSubCategory | null;
  posts: TDBPost | null;
  rating: typeof ratingTable.$inferSelect | null;
}[];

export type TSubReturnType = {
  sub_categories: TSubCategory | null | [];
  posts: TDBPost[] | null;
  rating: TRatingSchema[] | null;
};

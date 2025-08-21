"use server";
//update post and revalidate cache

import { TUpdatePostData } from "@/server/controllers/post/types";
import { updatePost } from "@/server/services/post/updatePost";
import { revalidatePath } from "next/cache";
import { getPostsByUserIdAndId } from "@/server/services/post/getPostsByUserIdAndId";
import logger from "@/server/lib/logger";
import { getCurrentUser } from "@/server/lib/getCurrentUser";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { locales as defaultLocales } from "@/server/lib/intl";

export const updateRevalidate = async (
  data: TUpdatePostData & { rating: boolean },
  locale: string,
) => {
  const post = await updatePost(data);

  if (post) {
    revalidatePath(
      `/${locale}${data.categoryId ? "/categories/" + data.categoryId : ""}/subCategory/${data.subCategoryId}`,
    );
  }

  return post;
};

// does this user able to do updates
export const canUpdate = async (
  userId: number,
  postId: number,
): Promise<TDBPost | false | null> => {
  const user = await getCurrentUser();

  if (user === null) {
    return false;
  }

  if (user.id !== userId) {
    logger.error(
      `The user with such id: ${user.id} wants to update this post (postId: ${postId})`,
    );

    return false;
  }

  // Was this post created by the this user
  const post = await getPostsByUserIdAndId(userId, postId);
  if (!post) {
    logger.error(`Post with id: ${postId} not found for user: ${userId}`);
    return false;
  }

  return post;
};

// does this user able to delete posts
export const canDelete = async (postId: number): Promise<boolean> => {
  const user = await getCurrentUser();

  if (user === null) {
    return false;
  }

  const post = await getPostsByUserIdAndId(user.id, postId);

  if (!post) {
    return false;
  }

  const userCanDelete = post.userId === user.id;

  if (!userCanDelete) {
    logger.error(
      `The user with such id: ${user.id} wants to delete this post (postId: ${postId})`,
    );
  }
  return userCanDelete;
};

// Revalidate the path after updating a post
// This function is used to revalidate the cache after a post is updated
// It will revalidate the path for the post's category and subcategory
// If the subcategory is not provided, it will only revalidate the category path
// If the category is not provided, it will throw an error
export const updatedPostRevalidate = async (data: TDBPost, locale?: string) => {
  const subCategoryId = data.subCategoryId;
  const categoryId = data.categoryId;

  // categoryId is required for revalidation
  if (!categoryId) {
    logger.error("Update post: No category id provided");
    throw new Error("No category id provided");
  }

  if (locale) {
    if (subCategoryId) {
      revalidatePath(
        `/${locale}"/categories/${categoryId}/subCategory/${subCategoryId}"`,
      );
      return;
    }

    revalidatePath(`/${locale}/categories/${categoryId}`);
    return;
  }

  // If locale is not provided, revalidate for all default locales
  if (!defaultLocales) {
    logger.error("Update post: No default locales provided");
    throw new Error("No default locales provided");
  }

  Object.values(defaultLocales).forEach((locale) => {
    if (subCategoryId) {
      revalidatePath(
        `/${locale}/categories/${categoryId}/subCategory/${subCategoryId}`,
      );
      return;
    }

    revalidatePath(`/${locale}/categories/${categoryId}`);
  });
  return;
};

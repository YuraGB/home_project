"use server";
//update post and revalidate cache

import { TUpdatePostData } from "@/server/controllers/post/types";
import { updatePost } from "@/server/services/post/updatePost";
import { revalidatePath } from "next/cache";
import { getPostsByUserIdAndId } from "@/server/services/post/getPostsByUserIdAndId";
import logger from "@/server/lib/logger";
import { getCurrentUser } from "@/server/lib/getCurrentUser";

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
): Promise<boolean> => {
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

  return !!post;
};

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

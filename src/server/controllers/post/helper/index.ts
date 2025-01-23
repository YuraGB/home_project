"use server";
//update post and revalidate cache

import { TUpdatePostData } from "@/server/controllers/post/types";
import { updatePost } from "@/server/services/post/updatePost";
import { revalidatePath } from "next/cache";
import { getPostsByUserIdAndId } from "@/server/services/post/getPostsByUserIdAndId";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import logger from "@/lib/logger";

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
  const session = await getServerSession(authOptions);
  if (!session) return false;
  if (session.user.id !== userId) {
    logger.error(
      `The user with such id: ${session.user.id} wants to update this post (postId: ${postId})`,
    );

    return false;
  }

  // Was this post created by the this user
  const post = await getPostsByUserIdAndId(userId, postId);

  return !!post;
};

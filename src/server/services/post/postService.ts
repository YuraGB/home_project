"use server";
import { getPostsByEntityId } from "@/server/actions/post/getAllPostsByEntityId";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import {
  TCreatePostData,
  TFindPost,
  TUpdatePostData,
} from "@/server/services/post/types";
import {
  creatingPostValidationData,
  postValidationSchema,
  updatePostValidationData,
} from "@/server/services/post/validationSchemas";
import { addNewPost } from "@/server/actions/post/addNewPost";
import { addNewPostWithRating } from "@/server/actions/post/addNewPostWithRating";
import { revalidatePath } from "next/cache";
import { updatePost } from "@/server/actions/post/updatePost";
import { addNewRating, getRatingByPostId } from "@/server/services/rating";
import logger from "@/lib/logger";
import { getRatingDataByPostId } from "@/server/actions/rating/getRatingByPostId";
import { deleteRating } from "@/server/actions/rating/deleteRating";
import { deletePost } from "@/server/actions/post/deletePost";

export const createNewPost = async (
  data: TCreatePostData & { rating: boolean } & { locale: string },
) => {
  const { rating, locale = "en-US", ...rest } = data;
  const validatedData = creatingPostValidationData.parse(data);

  if (rating) {
    const ratingData = {
      votes: 0,
      amountRating: 0,
    };
    const createdPost = await addNewPostWithRating(validatedData, ratingData);
    if (createdPost?.post) {
      revalidatePath(
        `/${locale}${data.categoryId ? "/" + data.categoryId : ""}/subCategory/${data.subCategoryId}`,
      );
      return createdPost;
    }
  } else {
    const newPost = await addNewPost(rest);

    if (newPost?.id) {
      revalidatePath(
        `/${locale}${data.categoryId ? "/" + data.categoryId : ""}/subCategory/${data.subCategoryId}`,
      );

      return newPost;
    }
  }
};

export const getPosts = async (data: TFindPost): Promise<TDBPost[] | null> => {
  const entry = Object.entries(data)[0];

  if (!entry) {
    throw new Error("No search criteria provided");
  }

  postValidationSchema.parse(data);

  return await getPostsByEntityId(entry);
};

export const updatePostData = async (
  data: TUpdatePostData & { rating: boolean } & { locale: string },
) => {
  const { rating, ...rest } = data;

  if (!rest.id) {
    logger.error(`Update post data: No post id provided`);
    throw new Error("No post id provided");
  }

  const validatedData = updatePostValidationData.parse(data);

  // if rating is true, we need to check if the post already has a rating
  // if it doesn't, we need to create a new rating for the post
  if (rating) {
    const existRating = await getRatingByPostId(rest.id);

    if (!existRating) {
      const rate = await addNewRating({ postId: rest.id });

      if (!rate) {
        logger.error(`Update post data: Error creating rating for post`);
        throw new Error("Error creating rating for post");
      }
    }

    //update post and revalidate cache
    return updateRevalidate(validatedData, data.locale);
  }

  //update post and revalidate cache
  return updateRevalidate(validatedData, data.locale);
};

export const deletePostData = async (postId: number) => {
  if (!postId) {
    logger.error(`Delete post data: No post id provided`);
    throw new Error("No post id provided");
  }

  // Get rate of the post if it exists
  const rate = await getRatingDataByPostId(postId);

  if (rate) {
    // delete the rate
    await deleteRating(rate.id);
  }

  return await deletePost(postId);
};

//update post and revalidate cache
async function updateRevalidate(
  data: TUpdatePostData & { rating: boolean },
  locale: string,
) {
  const post = await updatePost(data);

  if (post) {
    revalidatePath(
      `/${locale}${data.categoryId ? "/" + data.categoryId : ""}/subCategory/${data.subCategoryId}`,
    );
  }

  return post;
}

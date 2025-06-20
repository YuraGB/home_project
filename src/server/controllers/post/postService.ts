"use server";
import { getPostsByEntityId } from "@/server/services/post/getAllPostsByEntityId";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import {
  TCreatePostData,
  TFindPost,
  TUpdatePostData,
} from "@/server/controllers/post/types";
import {
  creatingPostValidationData,
  postValidationSchema,
  updatePostValidationData,
} from "@/server/controllers/post/validationSchemas";
import { addNewPost } from "@/server/services/post/addNewPost";
import { addNewPostWithRating } from "@/server/services/post/addNewPostWithRating";
import { revalidatePath } from "next/cache";
import { addNewRating, getRatingByPostId } from "@/server/controllers/rating";
import logger from "@/server/lib/logger";
import { getRatingDataByPostId } from "@/server/services/rating/getRatingByPostId";
import { deleteRating } from "@/server/services/rating/deleteRating";
import { deletePost } from "@/server/services/post/deletePost";
import {
  canDelete,
  canUpdate,
  updateRevalidate,
} from "@/server/controllers/post/helper";
import { uploadBase64Image } from "@/server/lib/uploadImageToHost";

export const createNewPost = async (
  data: TCreatePostData & { rating: boolean } & { locale: string },
) => {
  const { rating, locale = "en-US", ...rest } = data;
  const validatedData = creatingPostValidationData.parse(data);

  // Validate image if it exists
  // If the image is a base64 string, we need to upload it to the host
  if (validatedData.image) {
    const uploadImageToTheHost = await uploadBase64Image(validatedData.image);
    if (!uploadImageToTheHost) {
      logger.error(`Create new post: Error uploading image to the host`);
      throw new Error("Error uploading image to the host");
    }
    rest.image = uploadImageToTheHost;
  }

  if (rating) {
    const ratingData = {
      votes: 0,
      amountRating: 0,
    };

    const createdPost = await addNewPostWithRating(validatedData, ratingData);

    if (createdPost?.post) {
      revalidatePath(
        `/${locale}${data.categoryId ? "/categories/" + data.categoryId : ""}/subCategory/${data.subCategoryId}`,
      );
      return createdPost;
    }
  } else {
    const newPost = await addNewPost(rest);

    if (newPost?.id) {
      revalidatePath(
        `/${locale}${data.categoryId ? "/categories/" + data.categoryId : ""}/subCategory/${data.subCategoryId}`,
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

  if (!rest.userId) {
    logger.error(`Update post data: No user id provided`);
    throw new Error("No all data was provided");
  }

  const ableToUpdate = await canUpdate(rest.userId, rest.id);

  if (!ableToUpdate) {
    throw new Error("You can't update this post");
  }

  const validatedData = updatePostValidationData.parse(data);

  // Validate image if it exists
  // If the image is a base64 string, we need to upload it to the host
  if (validatedData.image) {
    const uploadImageToTheHost = await uploadBase64Image(validatedData.image);
    if (!uploadImageToTheHost) {
      logger.error(`Create new post: Error uploading image to the host`);
      throw new Error("Error uploading image to the host");
    }
    rest.image = uploadImageToTheHost;
  }

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

  const permitted = await canDelete(postId);

  if (!permitted) {
    throw new Error("You can't delete this post");
  }

  // Get rate of the post if it exists
  const rate = await getRatingDataByPostId(postId);

  if (rate) {
    // delete the rate
    await deleteRating(rate.id);
  }

  return await deletePost(postId);
};

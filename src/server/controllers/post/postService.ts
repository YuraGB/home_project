'use server';
import { getPostsByEntityId } from '@/server/services/post/getAllPostsByEntityId';
import { TDBPost } from '@/db/drizzle/schemas/postsSchema';
import {
  TCreatePostData,
  TFindPost,
  TUpdatePostData,
} from '@/server/controllers/post/types';
import {
  creatingPostValidationData,
  postValidationSchema,
  updatePostValidationData,
} from '@/server/controllers/post/validationSchemas';
import { addNewPost } from '@/server/services/post/addNewPost';
import { addNewPostWithRating } from '@/server/services/post/addNewPostWithRating';
import { revalidatePath } from 'next/cache';
import { addNewRating, getRatingByPostId } from '@/server/controllers/rating';
import logger from '@/server/lib/logger';
import { getRatingDataByPostId } from '@/server/services/rating/getRatingByPostId';
import { deleteRating } from '@/server/services/rating/deleteRating';
import { deletePost } from '@/server/services/post/deletePost';
import {
  canDelete,
  canUpdate,
  updateRevalidate,
} from '@/server/controllers/post/helper';
import { uploadBase64Image } from '@/server/lib/uploadImageToHost';
import { updateLastVisited } from '@/server/services/post/updateLastVisited';
import { getAllPostsService } from '@/server/services/post/getPosts';
import { log } from 'console';
import { console } from 'inspector';

/**
 * This file contains the post service functions that handle the business logic
 * for creating, updating, deleting, and retrieving posts.
 */
export const createNewPost = async (
  data: TCreatePostData & { rating: boolean } & { locale: string },
) => {
  const { rating, locale = 'en-US', ...rest } = data;
  const validatedData = creatingPostValidationData.parse(data);

  // Validate image if it exists
  // If the image is a base64 string, we need to upload it to the host
  if (validatedData.image) {
    const uploadImageToTheHost = await uploadBase64Image(validatedData.image);
    if (!uploadImageToTheHost) {
      logger.error(`Create new post: Error uploading image to the host`);
      throw new Error('Error uploading image to the host');
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
        `/${locale}${data.categoryId ? '/categories/' + data.categoryId : ''}/subCategory/${data.subCategoryId}`,
      );
      return createdPost;
    }
  } else {
    const newPost = await addNewPost(rest);

    if (newPost?.id) {
      revalidatePath(
        `/${locale}${data.categoryId ? '/categories/' + data.categoryId : ''}/subCategory/${data.subCategoryId}`,
      );

      return newPost;
    }
  }
};

/**
 * Retrieves posts based on the provided search criteria.
 * @param data - The search criteria for finding posts.
 * @returns A promise that resolves to an array of posts or null if no posts are found.
 */
export const getPosts = async (data: TFindPost): Promise<TDBPost[] | null> => {
  const entry = Object.entries(data)[0];

  if (!entry) {
    throw new Error('No search criteria provided');
  }

  postValidationSchema.parse(data);

  return await getPostsByEntityId(entry);
};

/**
 * Retrieves all posts from the database.
 * @returns A promise that resolves to an array of all posts or null if an error occurs.
 */
export const getAllPosts = async (apiKey: string) => {
  try {
    const result = await getAllPostsService(apiKey);
    return result;
  } catch (error) {
    logger.error('Error fetching all posts:', error);
    return null;
  }
};

/**
 * Updates the post data based on the provided data.
 * @param data - The data to update the post with, including post ID and user ID.
 * @returns A promise that resolves to the updated post data or throws an error if the update fails.
 */
export const updatePostData = async (
  data: TUpdatePostData & { rating: boolean } & { locale: string },
) => {
  const { rating, ...rest } = data;

  if (!rest.id) {
    logger.error(`Update post data: No post id provided`);
    throw new Error('No post id provided');
  }

  if (!rest.userId) {
    logger.error(`Update post data: No user id provided`);
    throw new Error('No all data was provided');
  }

  const ableToUpdate = await canUpdate(rest.userId, rest.id);

  if (!ableToUpdate) {
    throw new Error("You can't update this post");
  }

  console.log('Update post data', data);
  debugger;
  const validatedData = updatePostValidationData.parse({
    ...data,
    lastVisited: new Date(),
  });

  // Validate image if it exists
  // If the image is a base64 string, we need to upload it to the host
  if (validatedData.image) {
    const uploadImageToTheHost = await uploadBase64Image(validatedData.image);
    if (!uploadImageToTheHost) {
      logger.error(`Create new post: Error uploading image to the host`);
      throw new Error('Error uploading image to the host');
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
        throw new Error('Error creating rating for post');
      }
    }

    //update post and revalidate cache
    return updateRevalidate(validatedData, data.locale);
  }

  //update post and revalidate cache
  return updateRevalidate(validatedData, data.locale);
};

/**
 * Deletes the post data based on the provided post ID.
 * @param postId - The ID of the post to delete.
 * @returns A promise that resolves to the deleted post data or throws an error if the deletion fails.
 */
export const deletePostData = async (postId: number) => {
  if (!postId) {
    logger.error(`Delete post data: No post id provided`);
    throw new Error('No post id provided');
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

/**
 * Updates the last visited post based on the provided post ID.
 * @param postId - The ID of the post to update as last visited.
 * @returns A promise that resolves to the updated last visited post or throws an error if the update fails.
 */
export const updateLastVisitedPost = async (postId: number) => {
  if (!postId) {
    throw new Error('Post id should by provided');
  }

  return await updateLastVisited(postId);
};

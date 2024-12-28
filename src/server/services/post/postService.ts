"use server";
import { getPostsByEntityId } from "@/server/actions/post/getAllPostsByEntityId";
import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { TCreatePostData, TFindPost } from "@/server/services/post/types";
import {
  creatingPostValidationData,
  postValidationSchema,
} from "@/server/services/post/validationSchemas";
import { addNewPost } from "@/server/actions/post/addNewPost";
import { addNewPostWithRating } from "@/server/actions/post/addNewPostWithRating";
import { revalidatePath } from "next/cache";

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

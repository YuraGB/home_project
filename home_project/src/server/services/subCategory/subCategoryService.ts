"use server";

import { TCreateSubCategoryData } from "@/server/services/subCategory/types";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import {
  creatingSubCategoryValidationData,
  TUpdateSubCat,
  updateSubCatValidationData,
} from "@/server/services/subCategory/validationSchemas";
import { addNewSubCategory } from "@/server/actions/subCategory/addNewSubCategory";
import { updateSubCategory } from "@/server/actions/subCategory/updateSubCategory";
import { getPostsByEntityId } from "@/server/actions/post/getAllPostsByEntityId";
import { deleteSubCategory } from "@/server/actions/subCategory/deleteSubCategory";
import { deleteRelatedSubCatData } from "@/server/services/subCategory/util";

export const createNewSubCategory = async (
  data: TCreateSubCategoryData,
): Promise<TSubCategory | null> => {
  const validatedData = creatingSubCategoryValidationData.parse(data);

  return await addNewSubCategory(validatedData);
};

export const updateSubCategoryData = async (
  data: TUpdateSubCat,
): Promise<TSubCategory | null> => {
  const validatedData = updateSubCatValidationData.parse(data);

  return await updateSubCategory(validatedData);
};

export const deleteSubCategoryData = async (
  id: number,
): Promise<number | null> => {
  const relatedPosts = await getPostsByEntityId(["subCategoryId", id]);
  const deletedSubCatId = await deleteSubCategory(id);

  if (relatedPosts?.length && deletedSubCatId) {
    deleteRelatedSubCatData(relatedPosts);
  }

  return deletedSubCatId;
};

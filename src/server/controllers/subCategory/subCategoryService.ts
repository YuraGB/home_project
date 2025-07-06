"use server";

import { TCreateSubCategoryData } from "@/server/controllers/subCategory/types";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import {
  creatingSubCategoryValidationData,
  TUpdateSubCat,
  updateSubCatValidationData,
} from "@/server/controllers/subCategory/validationSchemas";
import { addNewSubCategory } from "@/server/services/subCategory/addNewSubCategory";
import { updateSubCategory } from "@/server/services/subCategory/updateSubCategory";
import { getPostsByEntityId } from "@/server/services/post/getAllPostsByEntityId";
import { deleteSubCategory } from "@/server/services/subCategory/deleteSubCategory";
import { deleteRelatedSubCatData } from "@/server/controllers/subCategory/util";

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

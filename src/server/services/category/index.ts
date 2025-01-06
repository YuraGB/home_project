"use server";
import { addNewCategory } from "@/server/actions/catalog/addNewCategory";
import logger from "@/lib/logger";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import {
  categoryValidationSchema,
  TUpdateCatalog,
  updateCategoryValidationSchema,
} from "@/server/services/category/validationSchemas";
import { updateCatalog } from "@/server/actions/catalog/updateCatalog";
import { getCatalogByUserIdWithData } from "@/server/actions/catalog/getCatalogByUserIDWithData";
import { deleteAllRelations } from "@/server/services/category/util";
import { deleteCatalog } from "@/server/actions/catalog/deleteCatalog";

export const createNewCategory = async (data: {
  name: string;
  description: string;
  userId: number;
}) => {
  const newUserData = categoryValidationSchema.parse(data);

  return addNewCategory(newUserData);
};

export const deleteCategoryById = async (
  id: number,
  userId: number,
): Promise<number | null> => {
  if (!id || !userId) {
    logger.error("Tries to delete category without id or without logged user");
    throw new Error("There is no category Id was provided");
  }

  // Get all relations
  const relations = await getCatalogByUserIdWithData(userId, id);

  const removedCategory = await deleteCatalog(id);

  if (removedCategory && relations) {
    // don't await.
    // if error -> log it from delete functions
    deleteAllRelations(relations);
  }

  return removedCategory;
};

export const updateExistingCategory = async (
  newData: TUpdateCatalog,
): Promise<TCategory | null> => {
  const validatedData = updateCategoryValidationSchema.parse(newData);

  return updateCatalog(validatedData);
};

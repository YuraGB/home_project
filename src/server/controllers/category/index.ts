"use server";
import { addNewCategory } from "@/server/services/catalog/addNewCategory";
import logger from "@/server/lib/logger";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import {
  categoryValidationSchema,
  TUpdateCatalog,
  updateCategoryValidationSchema,
} from "@/server/controllers/category/validationSchemas";
import { updateCatalog } from "@/server/services/catalog/updateCatalog";
import { getCatalogByUserIdWithData } from "@/server/services/catalog/getCatalogByUserIDWithData";
import { deleteAllRelations } from "@/server/controllers/category/util";
import { deleteCatalog } from "@/server/services/catalog/deleteCatalog";

export const createNewCategory = async (data: {
  name: string;
  description: string;
  userId: number;
}): Promise<TCategory | null> => {
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

"use server";

import { TCreateSubCategoryData } from "@/server/services/subCategory/types";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { creatingSubCategoryValidationData } from "@/server/services/subCategory/validationSchemas";
import { addNewSubCategory } from "@/server/actions/subCategory/addNewSubCategory";

export const createNewSubCategory = async (
  data: TCreateSubCategoryData,
): Promise<TSubCategory | null> => {
  const validatedData = creatingSubCategoryValidationData.parse(data);

  return await addNewSubCategory(validatedData);
};

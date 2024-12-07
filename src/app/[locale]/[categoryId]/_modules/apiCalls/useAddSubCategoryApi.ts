"use client";
import { useMutation } from "@tanstack/react-query";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { createNewSubCategory } from "@/server/services/subCategory/subCategoryService";
import { TCreateSubCategoryData } from "@/server/services/subCategory/types";
import { useRouter } from "next/navigation";

export const useAddSubCategoryApi = () => {
  const { refresh } = useRouter();
  const {
    mutate: createSubCategory,
    data: newSubCategory,
    error: errorCreateNewSubCategory,
    isPending: loadingNewSubCategory,
  } = useMutation({
    mutationFn: async (
      data: TCreateSubCategoryData,
    ): Promise<TSubCategory | null> => await createNewSubCategory(data),
    onSuccess: () => refresh(),
  });

  return {
    createSubCategory,
    newSubCategory,
    errorCreateNewSubCategory,
    loadingNewSubCategory,
  };
};

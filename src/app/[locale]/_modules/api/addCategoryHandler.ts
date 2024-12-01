import { useMutation } from "@tanstack/react-query";
import { createNewCategory } from "@/server/services/category/createNewCategory";

type TAddCategoryData = {
  name: string;
  description: string;
  userId: number;
};

export const useAddCategoryHandler = () => {
  const {
    mutate: addCategoryHandler,
    data: newCategory,
    error: errorCreateNewCategory,
    isPending: loadingNewCategory,
  } = useMutation({
    mutationFn: async (data: TAddCategoryData) => await createNewCategory(data),
  });

  return {
    addCategoryHandler,
    newCategory,
    errorCreateNewCategory,
    loadingNewCategory,
  };
};

import { useMutation } from "@tanstack/react-query";
import { createNewCategory } from "@/server/services/category/createNewCategory";
import { useRouter } from "next/navigation";

type TAddCategoryData = {
  name: string;
  description: string;
  userId: number;
};

export const useAddCategoryHandler = () => {
  const { refresh } = useRouter();
  const {
    mutate: addCategoryHandler,
    data: newCategory,
    error: errorCreateNewCategory,
    isPending: loadingNewCategory,
  } = useMutation({
    mutationFn: async (data: TAddCategoryData) => await createNewCategory(data),
    onSuccess: () => refresh(),
  });

  return {
    addCategoryHandler,
    newCategory,
    errorCreateNewCategory,
    loadingNewCategory,
  };
};

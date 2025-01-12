import {
  NewCategory,
  TNewCategorySave,
  useAddNewCategoryValidation,
} from "@/app/[locale]/_modules/hooks/schema/useAddCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { createNewCategory } from "@/server/controllers/category";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";

export const useAddCategoryForm = (userId: number, onClose: () => void) => {
  const {
    mutate: addCategoryHandler,
    data: newCategory,
    error: errorCreateNewCategory,
    isPending: loadingNewCategory,
  } = useMutationApi<TNewCategorySave, TCategory | null>(createNewCategory);

  const formSchema = useAddNewCategoryValidation();
  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (newCategory?.id) {
      onClose();
    }
  }, [newCategory, onClose]);

  const onSubmit = (values: NewCategory) => {
    return addCategoryHandler({
      userId,
      ...values,
    });
  };

  return {
    form,
    onSubmit,
    newCategory,
    errorCreateNewCategory,
    loadingNewCategory,
  };
};

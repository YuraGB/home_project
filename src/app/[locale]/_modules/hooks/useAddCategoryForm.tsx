import {
  NewCategory,
  useAddNewCategoryValidation,
} from "@/app/[locale]/_modules/hooks/schema/useAddCategorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAddCategoryHandler } from "@/app/[locale]/_modules/api/addCategoryHandler";
import { useEffect } from "react";

export const useAddCategoryForm = (userId: number, onClose: () => void) => {
  const {
    addCategoryHandler,
    newCategory,
    errorCreateNewCategory,
    loadingNewCategory,
  } = useAddCategoryHandler();
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

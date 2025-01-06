import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { useUpdateCategoryApi } from "@/app/[locale]/_modules/apiCalls/useUpdateCategory";
import {
  NewCategory,
  useAddNewCategoryValidation,
} from "@/app/[locale]/_modules/hooks/schema/useAddCategorySchema";

export const useUpdateCategory = (
  category: TCategory,
  onCloseAction: Dispatch<SetStateAction<boolean>>,
) => {
  const { toast } = useToast();
  const { updatedCategory, updateAction, onUpdating, errorOnUpdate } =
    useUpdateCategoryApi();

  const formSchema = useAddNewCategoryValidation();
  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name ?? "",
      description: category.description ?? "",
    },
  });

  useEffect(() => {
    if (errorOnUpdate) {
      //todo translation
      toast({
        variant: "destructive",
        title: "Category not updated",
        description: "There was a problem with creating new post.",
      });
    }
  }, [errorOnUpdate, toast]);

  useEffect(() => {
    if (!!updatedCategory) {
      onCloseAction(false);
    }
  }, [onCloseAction, updatedCategory]);

  const onSubmit = (values: NewCategory) => {
    if (category.id && category.userId) {
      updateAction({
        ...values,
        userId: category.userId,
        id: category.id,
      });
    }
  };

  return {
    onUpdating,
    onSubmit,
    form,
  };
};

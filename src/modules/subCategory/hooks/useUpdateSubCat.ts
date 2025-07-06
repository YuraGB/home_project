import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import {
  NewSubCategory,
  useNewSubCategoryValidationSchema,
} from "@/modules/subCategory/hooks/schema/validationSchemaAddSubCategoryt";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { updateSubCategoryData } from "@/server/controllers/subCategory/subCategoryService";
import { TUpdateSubCat } from "@/server/controllers/subCategory/validationSchemas";

export const useUpdateSubCat = (
  subCatData: TSubCategory,
  onClose: Dispatch<SetStateAction<boolean>>
) => {
  const {
    error: errorUpdatedSubCat,
    mutate: updateAction,
    isPending: onUpdating,
    data: updatedSubCat,
  } = useMutationApi<TUpdateSubCat, TSubCategory | null>(updateSubCategoryData);

  const formSchema = useNewSubCategoryValidationSchema();
  const form = useForm<NewSubCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: subCatData.name ?? "",
      description: subCatData.description ?? "",
      image: subCatData.image ?? "",
      layoutSchema: subCatData.layoutSchema ?? "",
    },
  });

  useEffect(() => {
    if (errorUpdatedSubCat) {
      //todo translation
      toast({
        variant: "destructive",
        title: "New post not created",
        description: "There was a problem with creating new post.",
      });
    }
  }, [errorUpdatedSubCat]);

  useEffect(() => {
    if (!!updatedSubCat) {
      onClose(false);
    }
  }, [onClose, updatedSubCat]);

  const onSubmit = (values: NewSubCategory) => {
    if (subCatData.userId !== null) {
      updateAction({
        ...subCatData,
        ...values,
        userId: subCatData.userId as number,
        categoryId: subCatData.categoryId as number,
        image: values.image ?? "",
      });
    }
  };

  return {
    form,
    onSubmit,
    loading: onUpdating,
  };
};

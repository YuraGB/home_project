import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { TPropsAddForm } from "@/modules/subCategory/components/types";
import {
  NewSubCategory,
  useNewSubCategoryValidationSchema,
} from "@/modules/subCategory/hooks/schema/validationSchemaAddSubCategoryt";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { TCreateSubCategoryData } from "@/server/controllers/subCategory/types";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { createNewSubCategory } from "@/server/controllers/subCategory/subCategoryService";

export const useAddSubCategory = ({
  onClose,
  categoryId,
  userId,
}: TPropsAddForm) => {
  const { toast } = useToast();
  const {
    isPending: loadingNewSubCategory,
    error: errorCreateNewSubCategory,
    mutate: createSubCategory,
    data: newSubCategory,
  } = useMutationApi<TCreateSubCategoryData, TSubCategory | null>(
    createNewSubCategory,
  );

  const formSchema = useNewSubCategoryValidationSchema();
  const form = useForm<NewSubCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      image: "",
      layoutSchema: "",
    },
  });

  useEffect(() => {
    if (errorCreateNewSubCategory) {
      //todo translation
      toast({
        variant: "destructive",
        title: "New post not created",
        description: "There was a problem with creating new post.",
      });
    }
  }, [errorCreateNewSubCategory, toast]);

  useEffect(() => {
    if (!!newSubCategory) {
      onClose();
    }
  }, [onClose, newSubCategory]);

  const onSubmit = (values: NewSubCategory) => {
    if (categoryId && userId) {
      createSubCategory({
        userId,
        categoryId,
        ...values,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Category not found",
        description: "There was a problem with creating new sub category.",
      });
    }
  };
  return {
    loadingNewSubCategory,
    onSubmit,
    form,
  };
};

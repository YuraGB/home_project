import { useAddSubCategoryApi } from "@/app/[locale]/[categoryId]/_modules/apiCalls/useAddSubCategoryApi";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { TPropsAddForm } from "@/app/[locale]/[categoryId]/_modules/components/types";
import {
  NewSubCategory,
  useNewSubCategoryValidationSchema,
} from "@/app/[locale]/[categoryId]/_modules/hooks/schema/validationSchemaAddSubCategoryt";

export const useAddSubCategory = ({
  onClose,
  categoryId,
  userId,
}: TPropsAddForm) => {
  const { toast } = useToast();
  const {
    loadingNewSubCategory,
    errorCreateNewSubCategory,
    createSubCategory,
    newSubCategory,
  } = useAddSubCategoryApi();
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
    console.log("submit", values);
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

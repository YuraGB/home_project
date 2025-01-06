"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { updateExistingCategory } from "@/server/services/category";
import { TUpdateCatalog } from "@/server/services/category/validationSchemas";
import { toast } from "@/hooks/use-toast";

export const useUpdateCategoryApi = () => {
  const { refresh } = useRouter();

  const {
    data: updatedCategory,
    error: errorOnUpdate,
    mutate: updateAction,
    isPending: onUpdating,
  } = useMutation({
    mutationFn: (data: TUpdateCatalog) => updateExistingCategory(data),
    onSuccess: () => {
      refresh();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops",
        description: "During updating the category something went wrong",
      });
    },
  });

  return {
    updatedCategory,
    errorOnUpdate,
    updateAction,
    onUpdating,
  };
};

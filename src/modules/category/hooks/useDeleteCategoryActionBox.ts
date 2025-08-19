"use client";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { deleteCategoryById } from "@/server/controllers/category";

export const useDeleteCategoryActionBox = (category: TCategory) => {
  const {
    mutate: deleteAction,
    isPending: onDeleting,
    data: deletedCategoryId,
  } = useMutationApi<{ id: number; userId: number }, number | null>(
    ({ id, userId }) => deleteCategoryById(id, userId),
  );

  const onDeleteAction = () => {
    if (!category.userId) return;
    deleteAction({ userId: category.userId, id: category.id });
  };

  useEffect(() => {
    if (deletedCategoryId) {
      toast({
        variant: "default",
        title: "Success",
        description: "The category was deleted",
      });
    }
  }, [deletedCategoryId]);

  return {
    disabled: onDeleting,
    onDeleteAction,
  };
};

"use client";
import { useDeleteCategoryApi } from "@/app/[locale]/_modules/apiCalls/useDeleteCategory";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";

export const useDeleteCategoryActionBox = (category: TCategory) => {
  const { deleteAction, onDeleting, deletedCategoryId } =
    useDeleteCategoryApi();

  const onDeleteAction = () => {
    if (!category.userId) return;
    deleteAction({ userId: category.userId, id: category.id });
  };

  useEffect(() => {
    if (deletedCategoryId) {
      toast({
        variant: "default",
        title: "Success",
        description: `The category was deleted`,
      });
    }
  }, [deletedCategoryId]);

  return {
    disabled: onDeleting,
    onDeleteAction,
  };
};

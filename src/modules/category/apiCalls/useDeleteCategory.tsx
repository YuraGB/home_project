"use client";

import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { deleteCategoryById } from "@/server/controllers/category";
import { toast } from "@/hooks/use-toast";

export const useDeleteCategoryApi = () => {
  const { refresh } = useRouter();

  const {
    data: deletedCategoryId,
    error: errorOnDelete,
    mutate: deleteAction,
    isPending: onDeleting,
  } = useMutation({
    mutationFn: ({ id, userId }: { id: number; userId: number }) =>
      deleteCategoryById(id, userId),
    onSuccess: () => {
      refresh();
    },
    onError: () => {
      toast({
        variant: "destructive",
        title: "Oops",
        description: "During deleting the category something went wrong",
      });
    },
  });

  return {
    deleteAction,
    onDeleting,
    errorOnDelete,
    deletedCategoryId,
  };
};

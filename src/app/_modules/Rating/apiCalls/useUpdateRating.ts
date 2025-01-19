"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRating } from "@/server/controllers/rating";
import { useRouter } from "next/navigation";

export const useUpdateRating = () => {
  const { refresh } = useRouter();
  const queryClient = useQueryClient();

  const {
    mutate: updateRatingData,
    data: updatedRating,
    isPending: loadingUpdate,
    error: errorUpdating,
  } = useMutation({
    mutationFn: updateRating,
    onSuccess: (data) => {
      if (data?.id) {
        queryClient.invalidateQueries({
          queryKey: [`rating/${data.id}`],
        });
        refresh();
      }
    },
  });

  return {
    updateRatingData,
    updatedRating,
    loadingUpdate,
    errorUpdating,
  };
};

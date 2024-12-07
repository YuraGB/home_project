"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateRating } from "@/server/services/rating";

export const useUpdateRating = (id: number) => {
  const queryClient = useQueryClient();
  const {
    mutate: updateRatingData,
    data: updatedRating,
    isPending: loadingUpdate,
    error: errorUpdating,
  } = useMutation({
    mutationFn: updateRating,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`rating/${id}`] });
    },
  });

  return {
    updateRatingData,
    updatedRating,
    loadingUpdate,
    errorUpdating,
  };
};

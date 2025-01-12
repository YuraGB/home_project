"use client";
import { useMutation } from "@tanstack/react-query";
import { updateRating } from "@/server/controllers/rating";
import { useRouter } from "next/navigation";

export const useUpdateRating = () => {
  const { refresh } = useRouter();
  const {
    mutate: updateRatingData,
    data: updatedRating,
    isPending: loadingUpdate,
    error: errorUpdating,
  } = useMutation({
    mutationFn: updateRating,
    onSuccess: () => refresh(),
  });

  return {
    updateRatingData,
    updatedRating,
    loadingUpdate,
    errorUpdating,
  };
};

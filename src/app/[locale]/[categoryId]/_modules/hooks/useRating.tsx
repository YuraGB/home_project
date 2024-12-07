import { useGetRating } from "@/app/[locale]/[categoryId]/_modules/apiCalls/useGetRating";
import { useUpdateRating } from "@/app/[locale]/[categoryId]/_modules/apiCalls/useUpdateRating";
import { toast } from "@/hooks/use-toast";
import { useCallback, useEffect } from "react";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";

export const useRating = (rate: TRatingSchema) => {
  const { ratingData, errorRatingData, loadingRatingData } = useGetRating(rate);
  const { updateRatingData, loadingUpdate, errorUpdating } = useUpdateRating(
    rate.id,
  );

  const onUpdate = useCallback(
    (vote: number) => {
      if (ratingData) {
        updateRatingData({ ...ratingData, vote });
      }
    },
    [updateRatingData, ratingData],
  );

  useEffect(() => {
    if (errorRatingData || errorUpdating) {
      //todo translation
      toast({
        variant: "destructive",
        title: "Oops",
        description: "Oops! There has been an error. Please try again later",
      });
    }
  }, [errorRatingData, errorUpdating]);

  return {
    loading: loadingRatingData || loadingUpdate,
    onUpdate,
    ratingData,
  };
};

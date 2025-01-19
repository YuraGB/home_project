import { useGetRating } from "@/app/_modules/Rating/apiCalls/useGetRating";
import { useUpdateRating } from "@/app/_modules/Rating/apiCalls/useUpdateRating";
import { toast } from "@/hooks/use-toast";
import { useCallback, useEffect } from "react";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { useIntl } from "react-intl";

export const useRating = (rate: TRatingSchema) => {
  const { ratingData, errorRatingData, loadingRatingData } = useGetRating(rate);

  const { locale } = useIntl();
  const { updateRatingData, loadingUpdate, errorUpdating } = useUpdateRating();

  const onUpdate = useCallback(
    (vote: number) => {
      if (ratingData) {
        updateRatingData({ ...ratingData, vote, locale });
      }
    },
    [ratingData, updateRatingData, locale],
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

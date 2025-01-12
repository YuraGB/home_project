"use client";
import { useQuery } from "@tanstack/react-query";
import { getRatingById } from "@/server/controllers/rating";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";

export const useGetRating = (initObj: TRatingSchema) => {
  const {
    data: ratingData,
    error: errorRatingData,
    isPending: loadingRatinData,
  } = useQuery({
    queryKey: [`rating/${initObj.id}`],
    queryFn: async () => await getRatingById(initObj.id),
    initialData: initObj,
    staleTime: 0,
  });

  return {
    ratingData,
    errorRatingData,
    loadingRatingData: loadingRatinData,
  };
};

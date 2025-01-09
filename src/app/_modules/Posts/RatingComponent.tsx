"use client";
import { Ratings } from "@/components/rating/Rating";
import { ReactNode } from "react";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { useRating } from "@/app/_modules/Rating/hooks/useRating";

export const RatingComponent = ({
  rate,
}: {
  rate: TRatingSchema;
}): ReactNode => {
  const { onUpdate, ratingData, loading } = useRating(rate);
  if (!ratingData) return null;
  const { amountRating, votes } = ratingData;
  return (
    <>
      <Ratings
        rating={amountRating ? Math.round(amountRating / (votes ?? 1)) : 0}
        cb={onUpdate}
        disabled={loading}
      />
    </>
  );
};

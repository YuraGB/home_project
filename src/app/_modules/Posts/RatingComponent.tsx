"use client";
import { Ratings } from "@/components/rating/Rating";
import { ReactNode } from "react";
import { useRating } from "@/app/[locale]/[categoryId]/_modules/hooks/useRating";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";

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

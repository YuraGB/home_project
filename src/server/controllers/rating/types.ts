import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { createValidationSchema } from "@/server/controllers/rating/validationSchema";
import { z } from "zod";

export type TUpdateRateData = TRatingSchema & {
  vote: number;
};

export type TNewRating = {
  postId: number;
};

export type TCreateNewRating = z.infer<typeof createValidationSchema>;

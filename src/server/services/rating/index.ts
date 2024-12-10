"use server";
import { z } from "zod";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import { getRatingDataById } from "@/server/actions/rating/getRatindDataById";
import { TNewRating, TUpdateRateData } from "@/server/services/rating/types";
import {
  createValidationSchema,
  updateValidationSchema,
} from "@/server/services/rating/validationSchema";
import { updateRate } from "@/server/actions/rating/updateRate";
import { createNewRating } from "@/server/actions/rating/createNewRating";

const validationPostId = z.number().min(1);

export const getRatingById = async (
  id: number,
): Promise<TRatingSchema | null> => {
  const validData = validationPostId.parse(id);

  const result = await getRatingDataById(validData);

  // undefined is not excepted
  return result ?? null;
};

export const addNewRating = async ({ postId }: TNewRating) => {
  const newRating = {
    postId,
    addNewRating: 0,
    votes: 0,
  };

  const validatedData = createValidationSchema.parse(newRating);

  return await createNewRating(validatedData);
};

export const updateRating = async ({
  id,
  postId,
  vote,
  amountRating,
  createdAt,
  votes,
}: TUpdateRateData) => {
  const amountVotes = votes ? votes + 1 : 1;
  const calculateAmountRating = amountRating ? amountRating + vote : vote;

  // exclude "vote" because it's not in the list of the ratingTable
  const formData = {
    id,
    postId,
    createdAt,
    votes: amountVotes,
    amountRating: calculateAmountRating,
  };

  const validatedData = updateValidationSchema.parse(formData);
  return await updateRate(validatedData);
};

import z from "zod";

export const updateValidationSchema = z.object({
  id: z.number().min(1),
  postId: z.number().min(1),
  createdAt: z.date(),
  votes: z.number(),
  amountRating: z.number().min(1),
});

export const createValidationSchema = z.object({
  postId: z.number(),
  votes: z.number(),
  amountRating: z.number().min(1),
});

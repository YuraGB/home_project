import { z } from "zod";

export const postValidationSchema = z.object({
  categoryId: z.number().optional(),
  subCategoryId: z.number().optional(),
});

export const creatingPostValidationData = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url().min(1),
  image: z.string().optional(),
  categoryId: z.number().optional(),
  subCategoryId: z.number().optional(),
  userId: z.number().min(1),
  rating: z.boolean(),
});

export const updatePostValidationData = z.object({
  id: z.number().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  url: z.string().url().min(1),
  image: z.string(),
  categoryId: z.number().nullable(),
  subCategoryId: z.number(),
  userId: z.number().min(1),
  rating: z.boolean(),
  createdAt: z.date(),
});

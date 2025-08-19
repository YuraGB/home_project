import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.number(),
  categoryIcon: z.string().optional(),
});

export const updateCategoryValidationSchema = categoryValidationSchema.extend({
  id: z.number(),
});

export type TUpdateCatalog = z.infer<typeof updateCategoryValidationSchema>;

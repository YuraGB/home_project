import { z } from "zod";

export const categoryValidationSchema = z.object({
  name: z.string(),
  description: z.string(),
  userId: z.number(),
});

export const updateCategoryValidationSchema = categoryValidationSchema.extend({
  id: z.number(),
});

export type TUpdateCatalog = z.infer<typeof updateCategoryValidationSchema>;

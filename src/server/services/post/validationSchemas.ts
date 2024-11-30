import { z } from "zod";

export const postValidationSchema = z.object({
  categoryId: z.number().optional(),
  subCategoryId: z.number().optional(),
});

export const creatingPostValidationData = z.object({
  name: z.string(),
  description: z.string(),
  url: z.string().url(),
  image: z.string(),
  categoryId: z.number().optional(),
  subcategoryId: z.number().optional(),
});

import { z } from "zod";

export const subCategoryValidationSchema = z.object({
  categoryId: z.number().min(1),
  userId: z.number().min(1),
});

export const validationNewSubCategory = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});
export const creatingSubCategoryValidationData = validationNewSubCategory.merge(
  subCategoryValidationSchema,
);

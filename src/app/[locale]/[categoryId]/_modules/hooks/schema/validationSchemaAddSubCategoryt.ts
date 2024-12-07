import { z } from "zod";
import { useIntl } from "react-intl";

export const validationNewSubCategory = z.object({
  name: z.string().min(2),
  description: z.string().min(2),
  image: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

export type NewSubCategory = z.infer<typeof validationNewSubCategory>;

export const useNewSubCategoryValidationSchema = () => {
  const { formatMessage } = useIntl();

  // translations for error messages
  const postNameError = formatMessage({
    defaultMessage:
      "The name of the sub category must be at least 2 characters",
    id: "subCategoryNameErrorMessage",
  });
  const descriptionErrorMessage = formatMessage({
    defaultMessage: "The description of the sub category must be set",
    id: "subCategoryDescriptionErrorMessage",
  });

  // validation
  return validationNewSubCategory.merge(
    z.object({
      name: z.string().min(2, {
        message: postNameError,
      }),
      description: z.string().min(2, {
        message: descriptionErrorMessage,
      }),
    }),
  );
};

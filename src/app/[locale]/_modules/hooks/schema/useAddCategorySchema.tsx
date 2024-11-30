import { z } from "zod";
import { useIntl } from "react-intl";

export const validationNewCategory = z.object({
  name: z.string().min(2),
  description: z.string().min(8),
  url: z.string().url(),
});

export type NewCategory = z.infer<typeof validationNewCategory>;

export const useAddNewCategoryValidation = () => {
  const { formatMessage } = useIntl();
  // translations for error messages
  const nameErrorMessage = formatMessage({
    defaultMessage: "Name must be at least 2 characters",
    id: "nameErrorMessage",
  });
  const descriptionErrorMessage = formatMessage({
    defaultMessage: "Description should be at least 8 characters",
    id: "descriptionErrorMessage",
  });
  const urlErrorMessage = formatMessage({
    defaultMessage: "Invalid url adress",
    id: "urlErrorMessage",
  });

  return validationNewCategory.merge(
    z.object({
      name: z.string().min(2, { message: nameErrorMessage }),
      description: z.string().min(8, {
        message: descriptionErrorMessage,
      }),
      url: z.string().url({
        message: urlErrorMessage,
      }),
    }),
  );
};

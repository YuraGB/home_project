import { z } from 'zod';
import { useIntl } from 'react-intl';

export const validationNewCategory = z.object({
  name: z.string().min(2),
  description: z.string().min(8),
  categoryIcon: z.string().optional(),
});

export type NewCategory = z.infer<typeof validationNewCategory>;
export type TNewCategorySave = NewCategory & { userId: number };

export const useAddNewCategoryValidation = () => {
  const { formatMessage } = useIntl();
  // translations for error messages
  const nameErrorMessage = formatMessage({
    defaultMessage: 'Name must be at least 2 characters',
    id: 'nameErrorMessage',
  });
  const descriptionErrorMessage = formatMessage({
    defaultMessage: 'Description should be at least 8 characters',
    id: 'descriptionErrorMessage',
  });

  return validationNewCategory.merge(
    z.object({
      name: z.string().min(2, { message: nameErrorMessage }),
      description: z.string().min(8, {
        message: descriptionErrorMessage,
      }),
    }),
  );
};

import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Dispatch, SetStateAction, useEffect } from 'react';
import { TCategory } from '@/db/drizzle/schemas/categorySchema';
import {
  NewCategory,
  useAddNewCategoryValidation,
} from '@/modules/category/hooks/schema/useAddCategorySchema';
import { useMutationApi } from '@/hooks/apiCalls/mutation';
import { updateExistingCategory } from '@/server/controllers/category';
import { TUpdateCatalog } from '@/server/controllers/category/validationSchemas';

export const useUpdateCategory = (
  category: TCategory,
  onCloseAction: Dispatch<SetStateAction<boolean>>,
) => {
  const { toast } = useToast();
  const {
    data: updatedCategory,
    mutate: updateAction,
    isPending: onUpdating,
    error: errorOnUpdate,
  } = useMutationApi<TUpdateCatalog, TCategory | null>(updateExistingCategory);

  const formSchema = useAddNewCategoryValidation();
  const form = useForm<NewCategory>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: category.name ?? '',
      description: category.description ?? '',
    },
  });

  useEffect(() => {
    if (errorOnUpdate) {
      //todo translation
      toast({
        variant: 'destructive',
        title: 'Category not updated',
        description: 'There was a problem with creating new post.',
      });
    }
  }, [errorOnUpdate, toast]);

  useEffect(() => {
    if (!!updatedCategory) {
      onCloseAction(false);
    }
  }, [onCloseAction, updatedCategory]);

  const onSubmit = (values: NewCategory) => {
    if (category.id && category.userId) {
      updateAction({
        ...values,
        userId: category.userId,
        id: category.id,
      });
    }
  };

  return {
    onUpdating,
    onSubmit,
    form,
  };
};

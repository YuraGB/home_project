import { useUpdateCategoryApi } from "@/app/[locale]/_modules/apiCalls/useUpdateCategory";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { NewCategory } from "@/app/[locale]/_modules/hooks/schema/useAddCategorySchema";
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";

export const useCatalogListActions = (userId: number, category: TCategory) => {
  const { updateAction, updatedCategory, onUpdating } = useUpdateCategoryApi();

  const onUpdateAction = (values: NewCategory) => {
    updateAction({
      ...values,
      userId,
      id: category.id,
    });
  };

  useEffect(() => {
    if (updatedCategory) {
      toast({
        variant: "default",
        title: "Success",
        description: `The category "${updatedCategory.name}" was updated`,
      });
    }
  }, [updatedCategory]);

  return {
    loading: onUpdating,
    onUpdateAction,
  };
};

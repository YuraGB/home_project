import { useUpdateCategoryApi } from "@/modules/category/apiCalls/useUpdateCategory";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { NewCategory } from "@/modules/category/hooks/schema/useAddCategorySchema";
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

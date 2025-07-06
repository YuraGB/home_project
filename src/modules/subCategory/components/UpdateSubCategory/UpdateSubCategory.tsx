import { Dispatch, ReactNode, SetStateAction } from "react";
import { SubCategoryForm } from "@/modules/subCategory/components/subCategoryForm";
import { Button } from "@/components/ui/button";
import { useUpdateSubCat } from "@/modules/subCategory/hooks/useUpdateSubCat";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";

type TProps = {
  subCategory: TSubCategory;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};
export const UpdateSubCategory = ({
  subCategory,
  onCloseAction,
}: TProps): ReactNode => {
  const { form, loading, onSubmit } = useUpdateSubCat(
    subCategory,
    onCloseAction
  );
  return (
    <SubCategoryForm form={form} onSubmitAction={onSubmit}>
      <Button type={"submit"} disabled={loading}>
        Update sub category
      </Button>
    </SubCategoryForm>
  );
};

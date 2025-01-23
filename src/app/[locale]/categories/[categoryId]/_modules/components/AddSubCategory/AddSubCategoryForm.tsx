import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { TPropsAddForm } from "@/app/[locale]/categories/[categoryId]/_modules/components/types";
import { useAddSubCategory } from "@/app/[locale]/categories/[categoryId]/_modules/hooks/useAddSubCategory";

import { SubCategoryForm } from "@/app/[locale]/categories/[categoryId]/_modules/components/subCategoryForm";

export const AddSubCategoryForm = (props: TPropsAddForm): ReactNode => {
  const { onSubmit, form, loadingNewSubCategory } = useAddSubCategory(props);

  return (
    <SubCategoryForm form={form} onSubmitAction={onSubmit}>
      <Button type="submit" disabled={loadingNewSubCategory}>
        {loadingNewSubCategory ? (
          <FormattedMessage
            id={"savingSubCategory"}
            defaultMessage={"Saving"}
          />
        ) : (
          <FormattedMessage
            id={"saveSubCategory"}
            defaultMessage={"Save new sub category"}
          />
        )}
      </Button>
    </SubCategoryForm>
  );
};

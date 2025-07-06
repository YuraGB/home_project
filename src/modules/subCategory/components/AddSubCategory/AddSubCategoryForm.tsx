import { ReactNode } from "react";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { useAddSubCategory } from "@/modules/subCategory/hooks/useAddSubCategory";

import { SubCategoryForm } from "@/modules/subCategory/components/subCategoryForm";
import { TPropsAddForm } from "../types";

export const AddSubCategoryForm = (props: TPropsAddForm): ReactNode => {
  const { onSubmit, form, loadingNewSubCategory } = useAddSubCategory(props);

  return (
    <SubCategoryForm form={form} onSubmitAction={onSubmit}>
      <Button type='submit' disabled={loadingNewSubCategory}>
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

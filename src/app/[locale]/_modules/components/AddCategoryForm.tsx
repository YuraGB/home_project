"use client";

import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { useAddCategoryForm } from "@/app/[locale]/_modules/hooks/useAddCategoryForm";
import { ReactNode } from "react";
import { CreateUpdateCategoryForm } from "@/app/[locale]/_modules/components/CreateUpdateCategoryForm";

export const AddCategoryForm = ({
  userId,
  onCloseAction,
}: {
  userId: number;
  onCloseAction: () => void;
}): ReactNode => {
  const { onSubmit, form, loadingNewCategory } = useAddCategoryForm(
    userId,
    onCloseAction,
  );

  return (
    <CreateUpdateCategoryForm form={form} onSubmitAction={onSubmit}>
      <Button type="submit" disabled={loadingNewCategory} className={"w-full"}>
        {loadingNewCategory ? (
          <FormattedMessage id={"savingCategory"} defaultMessage={"Saving"} />
        ) : (
          <FormattedMessage
            id={"saveCategory"}
            defaultMessage={"Save new category"}
          />
        )}
      </Button>
    </CreateUpdateCategoryForm>
  );
};

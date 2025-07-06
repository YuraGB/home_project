import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { FormattedMessage } from "react-intl";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction } from "react";
import { CreateUpdateCategoryForm } from "../../CreateUpdateCategoryForm";
import { useUpdateCategory } from "@/modules/category/hooks/useUpdateCategory";

type TProps = {
  category: TCategory;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};
export const UpdateCategoryForm = ({ category, onCloseAction }: TProps) => {
  const { form, onSubmit, onUpdating } = useUpdateCategory(
    category,
    onCloseAction
  );

  return (
    <CreateUpdateCategoryForm form={form} onSubmitAction={onSubmit}>
      <Button type='submit' disabled={onUpdating} className={"w-full"}>
        {onUpdating ? (
          <FormattedMessage id={"savingCategory"} defaultMessage={"Saving"} />
        ) : (
          <FormattedMessage
            id={"updateCategory"}
            defaultMessage={"Update category"}
          />
        )}
      </Button>
    </CreateUpdateCategoryForm>
  );
};

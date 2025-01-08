import { Dispatch, ReactNode, SetStateAction } from "react";
import { DeleteAction } from "../../../../../../components/DeleteAction";
import { useDeleteSubCategory } from "@/app/[locale]/[categoryId]/_modules/hooks/useDeleteSubCategory";

export const DeleteSubCategory = ({
  onCloseAction,
  subCatId,
}: {
  onCloseAction: Dispatch<SetStateAction<boolean>>;
  subCatId: number;
}): ReactNode => {
  const { onClickAction, loadingDeletePost } = useDeleteSubCategory({
    subCatId,
    onCloseAction,
  });
  return (
    <DeleteAction
      disabled={loadingDeletePost}
      onClickAction={onClickAction}
      onCloseAction={onCloseAction}
    />
  );
};

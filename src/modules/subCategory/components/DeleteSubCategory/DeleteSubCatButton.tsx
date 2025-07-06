import { Dispatch, ReactNode, SetStateAction } from "react";
import { useDeleteSubCategory } from "@/modules/subCategory/hooks/useDeleteSubCategory";
import { DeleteAction } from "@/components/DeleteAction";

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

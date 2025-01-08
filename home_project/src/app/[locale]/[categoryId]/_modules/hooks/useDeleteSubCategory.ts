import { Dispatch, SetStateAction, useEffect } from "react";
import { useMutationApi } from "@/hooks/apiCalls/mutation";
import { deleteSubCategoryData } from "@/server/services/subCategory/subCategoryService";

export const useDeleteSubCategory = ({
  subCatId,
  onCloseAction,
}: {
  subCatId: number;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
}) => {
  const {
    isPending: onDeleting,
    data: deletedSubCat,
    mutate: deleteSubCatAction,
  } = useMutationApi<number, number | null>(deleteSubCategoryData);

  useEffect(() => {
    if (!!deletedSubCat) {
      onCloseAction(false);
    }
  }, [deletedSubCat, onCloseAction]);

  const onClickAction = () => {
    if (subCatId) {
      deleteSubCatAction(subCatId);
    }
  };

  return {
    onClickAction,
    loadingDeletePost: onDeleting,
  };
};

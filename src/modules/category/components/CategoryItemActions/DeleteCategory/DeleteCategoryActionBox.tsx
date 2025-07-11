"use client";
import { Dispatch, SetStateAction } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { DeleteAction } from "@/components/DeleteAction";
import { useDeleteCategoryActionBox } from "@/modules/category/hooks/useDeleteCategoryActionBox";

export type TDeleteActionBox = {
  category: TCategory;
  onCloseAction: Dispatch<SetStateAction<boolean>>;
};

export const DeleteCategoryActionBox = ({
  category,
  onCloseAction,
}: TDeleteActionBox) => {
  const { onDeleteAction, disabled } = useDeleteCategoryActionBox(category);

  return (
    <DeleteAction
      disabled={disabled}
      onClickAction={onDeleteAction}
      onCloseAction={onCloseAction}
    />
  );
};

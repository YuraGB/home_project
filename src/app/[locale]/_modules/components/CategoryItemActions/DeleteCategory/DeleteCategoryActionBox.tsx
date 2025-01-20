"use client";
import { Dispatch, SetStateAction } from "react";
import { useDeleteCategoryActionBox } from "@/app/[locale]/_modules/hooks/useDeleteCategoryActionBox";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { DeleteAction } from "@/components/DeleteAction";

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

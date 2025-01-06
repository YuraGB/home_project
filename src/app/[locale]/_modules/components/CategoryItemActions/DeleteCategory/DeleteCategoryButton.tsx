"use client";
import { ReactNode, useState } from "react";
import { AddUpdateDeleteDialog } from "@/components/addUpdateDialog";
import { Trash2 } from "lucide-react";
import { DeleteCategoryActionBox } from "@/app/[locale]/_modules/components/CategoryItemActions/DeleteCategory/DeleteCategoryActionBox";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";

export const DeleteCategoryButton = ({
  category,
}: {
  category: TCategory;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AddUpdateDeleteDialog
      dialogTitle={"Delete the Category"}
      buttonTitle={<Trash2 className={"absolute"} />}
      isOpen={open}
      setOpenAction={setOpen}
    >
      <DeleteCategoryActionBox onCloseAction={setOpen} category={category} />
    </AddUpdateDeleteDialog>
  );
};

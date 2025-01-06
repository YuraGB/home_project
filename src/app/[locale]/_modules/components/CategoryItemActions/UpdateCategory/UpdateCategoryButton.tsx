"use client";
import { ReactNode, useState } from "react";
import { AddUpdateDeleteDialog } from "@/components/addUpdateDialog";
import { Pencil } from "lucide-react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { UpdateCategoryForm } from "@/app/[locale]/_modules/components/CategoryItemActions/UpdateCategory/UpdateCategoryForm";

export const UpdateCategoryButton = ({
  category,
}: {
  category: TCategory;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AddUpdateDeleteDialog
      dialogTitle={"Update the Category"}
      buttonTitle={<Pencil className={"absolute"} />}
      isOpen={open}
      setOpenAction={setOpen}
    >
      <UpdateCategoryForm category={category} onCloseAction={setOpen} />
    </AddUpdateDeleteDialog>
  );
};

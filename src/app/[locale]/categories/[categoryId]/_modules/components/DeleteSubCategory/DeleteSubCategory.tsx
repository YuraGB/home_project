import { ReactNode, useState } from "react";
import { AddUpdateDeleteDialog } from "@/components/addUpdateDialog";
import { Trash2 } from "lucide-react";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { DeleteSubCategory } from "@/app/[locale]/[categoryId]/_modules/components/DeleteSubCategory/DeleteSubCatButton";

export const DeleteSubCategoryButton = ({
  subCategory,
}: {
  subCategory: TSubCategory;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AddUpdateDeleteDialog
      dialogTitle={"Delete the post"}
      buttonTitle={<Trash2 className={"absolute"} />}
      isOpen={open}
      setOpenAction={setOpen}
    >
      <DeleteSubCategory subCatId={subCategory.id} onCloseAction={setOpen} />
    </AddUpdateDeleteDialog>
  );
};

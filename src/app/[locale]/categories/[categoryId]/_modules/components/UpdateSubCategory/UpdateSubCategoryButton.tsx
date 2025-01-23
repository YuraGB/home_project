import { ReactNode, useState } from "react";
import { AddUpdateDeleteDialog } from "@/components/addUpdateDialog";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { UpdateSubCategory } from "@/app/[locale]/categories/[categoryId]/_modules/components/UpdateSubCategory/UpdateSubCategory";
import { Pencil } from "lucide-react";

export const UpdateSubCategoryButton = ({
  subCategory,
}: {
  subCategory: TSubCategory;
}): ReactNode => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <AddUpdateDeleteDialog
      dialogTitle={"Update the sub category"}
      buttonTitle={<Pencil className={"absolute"} />}
      isOpen={open}
      setOpenAction={setOpen}
    >
      <UpdateSubCategory subCategory={subCategory} onCloseAction={setOpen} />
    </AddUpdateDeleteDialog>
  );
};

import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { ReactNode } from "react";

export const SubCategoryItem = ({
  item,
}: {
  item: TSubCategory | null;
}): ReactNode => {
  if (!item) return null;
  return <div>item</div>;
};

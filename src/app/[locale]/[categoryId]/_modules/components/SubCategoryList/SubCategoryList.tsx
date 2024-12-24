import { SubCategoryItem } from "@/app/[locale]/[categoryId]/_modules/components/SubCategoryList/SubCategoryItem";
import { TSubCategory } from "@/db/drizzle/schemas/subCategoriesSchema";
import { ReactNode } from "react";

export const SubCategoryList = ({
  sub_categories,
}: {
  sub_categories: TSubCategory[] | null;
}): ReactNode => {
  if (!sub_categories?.length) return null;
  const listOfSubCategories = sub_categories.map((item) => (
    <SubCategoryItem key={item.id} item={item} />
  ));

  return <section className={"border-b p-4"}>{listOfSubCategories}</section>;
};

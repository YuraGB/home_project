import { ReactNode } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { CategoryItem } from "@/app/[locale]/_modules/components/CategoryItem";

export const ListOfCategories = ({
  categories,
}: {
  categories: TCategory[] | null;
}): ReactNode => {
  const list = categories?.map((category) => (
    <CategoryItem category={category} key={category.id} />
  ));
  return <>{list}</>;
};

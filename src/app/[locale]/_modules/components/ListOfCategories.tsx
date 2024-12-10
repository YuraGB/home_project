import { ReactNode } from "react";
import { TCategory } from "@/db/drizzle/schemas/categorySchema";
import { CategoryItem } from "@/app/[locale]/_modules/components/CategoryItem";

export const ListOfCategories = ({
  categories,
  locale,
}: {
  categories: TCategory[] | null;
  locale: string;
}): ReactNode => {
  if (!categories) return null;

  const list = categories?.map((category) => (
    <CategoryItem category={category} key={category.id} locale={locale} />
  ));
  return <article className={"columns-4 w-full"}>{list}</article>;
};

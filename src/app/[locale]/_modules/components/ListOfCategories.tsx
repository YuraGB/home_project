import { CategoryItem } from "@/app/[locale]/_modules/components/CategoryItem";
import { getHomePage } from "@/app/[locale]/_modules/hooks/useHomePage";
import { TLocaleParams } from "@/app/[locale]/page";

export const ListOfCategories = async ({ params }: TLocaleParams) => {
  const pageData = await getHomePage();
  const { locale } = await params;
  const { categories } = pageData || {};

  if (!categories || !categories.length) return null;

  const list = categories?.map((category) => (
    <CategoryItem category={category} key={category.id} locale={locale} />
  ));
  return <article className={"columns-2 md:columns-4 w-full"}>{list}</article>;
};

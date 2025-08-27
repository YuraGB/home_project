import { CategoryItem } from "@/modules/category/components/CategoryItem";
import { getHomePage } from "@/modules/category/hooks/useHomePage";
import { TLocaleParams } from "@/app/[locale]/page";

export const ListOfCategories = async ({ params }: TLocaleParams) => {
  const pageData = await getHomePage();
  const { locale } = await params;
  const { categories } = pageData || {};

  if (!categories || !categories.length) return null;

  const list = categories?.map((category) => (
    <CategoryItem category={category} key={category.id} locale={locale} />
  ));

  return (
    <article
      className={
        "lg:columns-3 sm:columns-2 align-middle justify-center items-center place-items-center columns-1 w-full "
      }
    >
      {list}
    </article>
  );
};

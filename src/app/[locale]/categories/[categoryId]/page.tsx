import React, { Suspense } from "react";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import { BreadcrmbsConteiner } from "@/components/bradcrumbs/BradcrmbsConteiner";
import { getAllCategories } from "@/server/services/catalog/getAllCategories";
import { TParams } from "@/modules/subCategory/hooks/useCategoryPage";
import { CategoryPageContent } from "@/modules/subCategory/components/CategoryPageContent";
import { CategoryPageSkeleton } from "@/components/skeleton/CategoryPage.skeleton";

export default async function CategoryPage(props: TParams) {
  return (
    <DefaultPageLayout>
      <Suspense fallback={"Loading"}>
        <BreadcrmbsConteiner params={props.params} />
      </Suspense>
      <Suspense fallback={<CategoryPageSkeleton />}>
        <CategoryPageContent params={props.params} />
      </Suspense>
    </DefaultPageLayout>
  );
}

//SSG
export async function generateStaticParams(): Promise<
  { categoryId: string }[] | []
> {
  const categories = await getAllCategories();

  return categories.map(({ id }) => ({ categoryId: String(id) }));
}

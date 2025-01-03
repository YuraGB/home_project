import React, { Suspense } from "react";
import { TParams } from "@/app/[locale]/[categoryId]/_modules/hooks/useCategoryPage";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";
import { BreadcrmbsConteiner } from "@/components/bradcrumbs/BradcrmbsConteiner";
import { CategoryPageContent } from "@/app/[locale]/[categoryId]/_modules/components/CategoryPageContent";

export const experimental_ppr = true;

export default async function CategoryPage(props: TParams) {
  return (
    <DefaultPageLayout>
      <Suspense fallback={"Loading"}>
        <BreadcrmbsConteiner params={props.params} />
      </Suspense>

      <Suspense fallback={"Loading"}>
        <CategoryPageContent params={props.params} />
      </Suspense>
    </DefaultPageLayout>
  );
}

//SSG
// export async function generateStaticParams(): Promise<
//   { categoryId: string }[] | []
// > {
//   const categories = await getAllCategories();
//
//   return categories.map(({ id }) => ({ categoryId: String(id) }));
// }

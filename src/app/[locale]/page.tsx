import { getHomePage } from "@/app/[locale]/_modules/hooks/useHomePage";
import { ListOfCategories } from "@/app/[locale]/_modules/components/ListOfCategories";
import React from "react";
import { AddCategoryBtn } from "@/app/[locale]/_modules/components/AddCategoryBtn";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";

type TParams = { params: Promise<{ locale: string }> };
export default async function Home({ params }: Readonly<TParams>) {
  const pageData = await getHomePage();
  const categories = pageData?.categories ?? [];
  const userId = pageData?.id ?? null;
  const { locale } = await params;

  return (
    <DefaultPageLayout>
      <AddCategoryBtn userId={userId} />
      <ListOfCategories categories={categories} locale={locale} />
    </DefaultPageLayout>
  );
}

import React from "react";
import { Bradcrmbs } from "@/components/bradcrumbs/Bradcrmbs";
import { breadcrumbsService } from "@/server/services/breadcrumbs";
import { DefaultPageLayout } from "@/components/pageLayout/defaultPageLayout";

export default async function SubCategory({
  params,
}: {
  params: Promise<{ subCategoryId: string; categoryId: string }>;
}) {
  const { subCategoryId, categoryId } = await params;
  const breadcrumbsData = await breadcrumbsService({
    subCategoryId: Number(subCategoryId),
    catalogId: Number(categoryId),
  });
  return (
    <DefaultPageLayout>
      <Bradcrmbs bradcrumbs={breadcrumbsData} />
      <h1>subCategory</h1>
    </DefaultPageLayout>
  );
}

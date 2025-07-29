import { Bradcrmbs } from "@/components/bradcrumbs/Bradcrmbs";
import React, { cache } from "react";
import { breadcrumbsService } from "@/server/controllers/breadcrumbs";
import { TParams } from "@/modules/subCategory/hooks/useCategoryPage";

const getBreadcrumbs = cache(async (params: { catalogId: string }) => {
  return await breadcrumbsService(params);
});

export const BreadcrmbsConteiner = async ({ params }: TParams) => {
  const { categoryId } = await params;
  const breadcrumbsData = await getBreadcrumbs({ catalogId: categoryId });

  return <Bradcrmbs bradcrumbs={breadcrumbsData} />;
};

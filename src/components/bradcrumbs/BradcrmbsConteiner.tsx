import { Bradcrmbs } from "@/components/bradcrumbs/Bradcrmbs";
import React from "react";
import { breadcrumbsService } from "@/server/controllers/breadcrumbs";
import { TParams } from "@/modules/subCategory/hooks/useCategoryPage";

export const BreadcrmbsConteiner = async ({ params }: TParams) => {
  const { categoryId } = await params;
  const breadcrumbsData = await breadcrumbsService({ catalogId: categoryId });

  return <Bradcrmbs bradcrumbs={breadcrumbsData} />;
};

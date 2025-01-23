import { Bradcrmbs } from "@/components/bradcrumbs/Bradcrmbs";
import React from "react";
import { TParams } from "@/app/[locale]/categories/[categoryId]//_modules/hooks/useCategoryPage";
import { breadcrumbsService } from "@/server/controllers/breadcrumbs";

export const BreadcrmbsConteiner = async ({ params }: TParams) => {
  const { categoryId } = await params;
  const breadcrumbsData = await breadcrumbsService({ catalogId: categoryId });

  return <Bradcrmbs bradcrumbs={breadcrumbsData} />;
};

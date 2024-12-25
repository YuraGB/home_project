import { breadcrumbsService } from "@/server/services/breadcrumbs";
import { getSubCategoryById } from "@/server/actions/subCategory/getSubCategoryByCategoryId";

export type TParams = {
  params: Promise<{ categoryId: string; subCategoryId: string }>;
};

export const getSubCategoryPage = async ({ params }: Readonly<TParams>) => {
  const { categoryId, subCategoryId } = await params;
  const subId = Number(subCategoryId);
  const catId = Number(categoryId);

  const breadcrumbsData = await breadcrumbsService({
    subCategoryId: subId,
    catalogId: catId,
  });

  const pageData = await getSubCategoryById(Number(subCategoryId));
  console.log(pageData);
  return {
    posts: pageData && !Array.isArray(pageData) ? pageData.posts : null,
    sub_category:
      pageData && !Array.isArray(pageData) ? pageData.sub_categories : null,
    rating: pageData && !Array.isArray(pageData) ? pageData.rating : null,
    breadcrumbsData,
    subCategoryId: subId,
  };
};

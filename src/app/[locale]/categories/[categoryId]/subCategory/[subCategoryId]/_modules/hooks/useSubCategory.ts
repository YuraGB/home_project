import { breadcrumbsService } from "@/server/controllers/breadcrumbs";
import { getSubCategoryById } from "@/server/services/subCategory/getSubCategoryByCategoryId";
import { formatPostData } from "@/lib/formatPostData";
import { redirect } from "next/navigation";

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

  if (Array.isArray(pageData)) {
    redirect("/");
  }
  const { sub_categories, rating, posts } = pageData;

  const postsData = formatPostData(posts ?? [], rating);

  return {
    posts: postsData,
    sub_category:
      sub_categories && !Array.isArray(sub_categories) ? sub_categories : null,
    rating: !Array.isArray(pageData) ? pageData.rating : null,
    breadcrumbsData,
    subCategoryId: subId,
    categoryId: catId,
  };
};

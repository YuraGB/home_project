import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { breadcrumbsService } from "@/server/services/breadcrumbs";
import { getSubCategoryById } from "@/server/actions/subCategory/getSubCategoryByCategoryId";

export type TParams = {
  params: Promise<{ categoryId: string; subCategoryId: string }>;
};

export const getSubCategoryPage = async ({ params }: Readonly<TParams>) => {
  const { categoryId, subCategoryId } = await params;
  const subId = Number(subCategoryId);
  const catId = Number(categoryId);

  const session = await getServerSession(authOptions);
  const breadcrumbsData = await breadcrumbsService({
    subCategoryId: subId,
    catalogId: catId,
  });

  if (!session?.user) {
    redirect("/login");
  }

  if (!categoryId || !subCategoryId) {
    redirect("/");
  }

  const pageData = session?.user
    ? await getSubCategoryById(Number(subCategoryId))
    : null;

  return {
    posts: pageData && !Array.isArray(pageData) ? pageData.posts : null,
    sub_category:
      pageData && !Array.isArray(pageData) ? pageData.sub_categories : null,
    userId: session?.user.id,
    rating: pageData && !Array.isArray(pageData) ? pageData.rating : null,
    breadcrumbsData,
    subCategoryId: subId,
  };
};

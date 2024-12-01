import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { getCatalogByUserIdWithData } from "@/server/actions/catalog/getCatalogByUserIDWithData";

export type TParams = { params: Promise<{ categoryId: string }> };

export const useCategoryPage = async ({ params }: Readonly<TParams>) => {
  const { categoryId } = await params;

  const session = await getServerSession(authOptions);
  if (!categoryId || !session) {
    redirect("/login");
  }
  const pageData = await getCatalogByUserIdWithData(
    Number(session.user.id),
    Number(categoryId),
  );

  return {
    posts: pageData?.posts ? [pageData.posts] : null,
    categories: pageData?.categories ? pageData.categories : null,
    sub_category: pageData?.sub_categories ? [pageData.sub_categories] : null,
  };
};

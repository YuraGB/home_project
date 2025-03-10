import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { redirect } from "next/navigation";
import { getCatalogByUserIdWithData } from "@/server/services/catalog/getCatalogByUserIDWithData";
import { breadcrumbsService } from "@/server/controllers/breadcrumbs";
import { formatPostData } from "@/server/lib/formatPostData";

export type TParams = { params: Promise<{ categoryId: string }> };

export const getCategoryPage = async ({ params }: Readonly<TParams>) => {
  const { categoryId } = await params;
  const session = await getServerSession(authOptions);
  const breadcrumbsData = await breadcrumbsService({ catalogId: categoryId });
  if (!categoryId || !session?.user) {
    redirect("/login");
  }

  const pageData = session?.user
    ? await getCatalogByUserIdWithData(
        Number(session.user.id),
        Number(categoryId),
      )
    : null;

  const posts = pageData?.posts
    ? formatPostData(pageData.posts, pageData?.rating ?? null)
    : null;

  return {
    posts,
    categories: pageData ? pageData.categories : null,
    sub_category: pageData ? pageData.sub_categories : null,
    userId: session?.user.id,
    breadcrumbsData,
  };
};

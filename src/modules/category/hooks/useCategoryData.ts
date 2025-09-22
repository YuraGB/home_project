// src/lib/cache/getCategoryData.ts
import { authOptions } from "@/app/api/auth/[...nextauth]";
import { formatPostData } from "@/server/lib/formatPostData";
import { getServerSession } from "next-auth";
import { getCatalogByUserIdWithData } from "@/server/services/catalog/getCatalogByUserIDWithData";

export const getCategoryData = async (categoryId: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;

  const pageData = await getCatalogByUserIdWithData(
    Number(session.user.id),
    Number(categoryId),
  );

  if (!pageData) return null;

  const posts = pageData.posts
    ? formatPostData(pageData.posts, pageData.rating ?? null)
    : null;

  return {
    categories: pageData.categories,
    sub_categories: pageData.sub_categories,
    posts,
    rating: pageData.rating,
    userId: session.user.id,
  };
};

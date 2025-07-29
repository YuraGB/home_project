import { authOptions } from "@/app/api/auth/[...nextauth]";
import { baseUrl } from "@/lib/constants";
import { formatPostData } from "@/server/lib/formatPostData";
import { getServerSession } from "next-auth";

export const getCategoryData = async (categoryId: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return null;
  }

  const pageData = await fetch(
    `${baseUrl}/api/category?userId=${session.user.id}&categoryId=${categoryId}`,
    {
      next: { tags: [`categoryData`, categoryId] },
    },
  )
    .then((res) => res.json())
    .catch(() => null);

  if (pageData === null) {
    console.log("No data found for categoryId:", categoryId);
    return null;
  }

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

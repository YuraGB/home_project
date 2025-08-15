// src/lib/cache/getCategoryData.ts
import { authOptions } from '@/app/api/auth/[...nextauth]';
import { formatPostData } from '@/server/lib/formatPostData';
import { getServerSession } from 'next-auth';
import { baseUrl } from '@/lib/constants';

export const getCategoryData = async (categoryId: string) => {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) return null;

  const url = `${baseUrl}/api/category?userId=${session.user.id}&categoryId=${categoryId}`;

  console.log('fetch', url);
  const pageData = await fetch(url, {
    next: { tags: ['categoryData'] },
  })
    .then((res) => res.json())
    .catch((e) => {
      console.log(e);
      return null;
    });

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

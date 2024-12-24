import { TSubData, TSubReturnType } from "@/server/actions/subCategory/types";

export const formatDataHelper = (
  data: TSubData,
): TSubReturnType | null | [] => {
  if (!data.length) return null;
  return data.reduce(
    (acc, row) => {
      const posts = acc.posts;
      const rating = acc.rating;

      const rate = row.rating;
      const post = row.posts;

      if (post && !posts.find((i) => i.id === post.id)) {
        posts.push(post);
      }

      if (rate && !rating.find((i) => i.id === rate.id)) {
        rating.push(rate);
      }

      return acc;
    },
    {
      posts: data[0].posts ? [data[0].posts] : [],
      sub_categories: data[0].sub_categories ? data[0].sub_categories : [],
      rating: data[0].rating ? [data[0].rating] : [],
    },
  );
};

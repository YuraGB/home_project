import { TPostWithRating } from "@/server/lib/formatPostData";

export type TRatingRowPosts = {
  [key: number | string]: Array<TPostWithRating>;
};
export const formatRows = (posts: Array<TPostWithRating>): TRatingRowPosts =>
  posts.reduce<TRatingRowPosts>(
    (acc, post) => {
      if (post.rate === null) {
        acc["noRating"].push(post);
        return acc;
      }
      if (post.rate.amountRating === null) {
        acc["noRating"].push(post);
        return acc;
      }

      if (post.rate.amountRating === 0) {
        acc[0] = acc[0] || [];
        acc[0].push(post);
        return acc;
      }

      const rate = Math.round(post.rate.amountRating / (post.rate.votes ?? 1));
      if (!acc[rate]) {
        acc[rate] = [];
      }
      acc[rate].push(post);
      return acc;
    },
    { noRating: [] },
  );

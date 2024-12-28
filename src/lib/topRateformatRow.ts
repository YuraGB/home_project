import { TPostWithRating } from "@/lib/formatPostData";

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
      const rate = Math.round(post.rate.amountRating! / (post.rate.votes ?? 1));
      if (!acc[rate]) {
        acc[rate] = [];
      }
      acc[rate].push(post);
      return acc;
    },
    { noRating: [] },
  );

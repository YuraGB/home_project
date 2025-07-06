import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";

export type TPostWithRating = TDBPost & {
  rate: TRatingSchema | null;
};

export const formatPostData = (
  postData: TDBPost[],
  ratingData: TRatingSchema[] | null,
): Array<TPostWithRating> => {
  return postData.map((post) => ({
    ...post,
    rate: ratingData?.find((r) => r.postId === post.id) ?? null,
  }));
};

import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ReactNode } from "react";
import { PostItem } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostItem";
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";

export const PostsList = ({
  posts,
  rating,
}: {
  posts: TDBPost[] | null;
  rating: TRatingSchema[] | null;
}): ReactNode => {
  if (!posts) return null;

  const list = posts.map((post) => (
    <PostItem
      key={post.id}
      post={post}
      rate={rating?.find((r) => r.postId === post.id) ?? null}
    />
  ));

  return <section>{list}</section>;
};

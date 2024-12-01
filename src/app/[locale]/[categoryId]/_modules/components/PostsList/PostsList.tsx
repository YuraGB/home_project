import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ReactNode } from "react";
import { PostItem } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostItem";

export const PostsList = ({
  posts,
}: {
  posts: TDBPost[] | null;
}): ReactNode => {
  if (!posts) return null;
  const list = posts.map((post) => <PostItem key={post.id} post={post} />);
  return <section>{list}</section>;
};

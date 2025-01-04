import { ReactNode } from "react";
import { PostItem } from "@/app/_modules/Posts/PostItem";
import { TPostWithRating } from "@/lib/formatPostData";

export const PostsList = ({
  posts,
}: {
  posts: TPostWithRating[] | null;
}): ReactNode => {
  if (!posts || posts.length === 0) return null;
  const list = posts.map((post) => <PostItem key={post.id} post={post} />);

  return (
    <section className={"mb-4 justify-center flex gap-4 flex-wrap mt-4"}>
      {list}
    </section>
  );
};

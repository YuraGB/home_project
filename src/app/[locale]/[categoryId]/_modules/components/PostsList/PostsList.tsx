import { ReactNode } from "react";
import { PostItem } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostItem";
import { TPostWithRating } from "@/lib/formatPostData";

export const PostsList = ({
  posts,
}: {
  posts: TPostWithRating[] | null;
}): ReactNode => {
  if (!posts || posts.length === 0) return null;
  const list = posts.map((post) => <PostItem key={post.id} post={post} />);

  return (
    <section
      className={
        "grid grid-cols-2 items-center gap-1 pt-4 md:grid-cols-3 lg:grid-cols-4 md:gap-4"
      }
    >
      {list}
    </section>
  );
};

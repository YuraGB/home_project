import React, { ReactNode } from "react";
import { TPostWithRating } from "@/lib/formatPostData";
import { TopRateLayout } from "@/components/topRateLayout";
import { TopRateList } from "@/components/topRate/topRateList";
import { PostsList } from "@/app/[locale]/[categoryId]/_modules/components/PostsList/PostsList";

export const PostListLayout = ({
  postListType = "default",
  posts,
}: {
  posts: TPostWithRating[] | null;
  postListType?: string | null;
}): ReactNode => {
  switch (postListType) {
    case "topRate":
      return (
        <TopRateLayout>
          <TopRateList posts={posts} />
        </TopRateLayout>
      );
    case "default":
      return <PostsList posts={posts} />;
    default:
      return <PostsList posts={posts} />;
  }
};
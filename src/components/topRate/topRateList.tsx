"use client";
import { ReactNode } from "react";
import { TPostWithRating } from "@/server/lib/formatPostData";
import { formatRows } from "@/server/lib/topRateformatRow";
import { TopRateRow } from "@/components/topRate/topRateRow";
import { PostsList } from "@/modules/post/PostsList";

export const TopRateList = ({
  posts,
}: {
  posts: TPostWithRating[] | null;
}): ReactNode => {
  if (!posts || posts.length === 0) return null;

  const { noRating, ...rest } = formatRows(posts);
  const ratedList = Object.keys(rest)
    .sort((a, b) => Number(b) - Number(a))
    .map((rate, index) => {
      return <TopRateRow key={`rate-${rate}-${index}`} posts={rest[rate]} />;
    });

  if (noRating.length > 0) {
    ratedList.push(<PostsList posts={noRating} key={"noRating"} />);
  }

  return ratedList;
};

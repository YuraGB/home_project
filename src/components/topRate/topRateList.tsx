import { ReactNode } from "react";
import { TPostWithRating } from "@/lib/formatPostData";
import { formatRows } from "@/lib/topRateformatRow";
import { TopRateRow } from "@/components/topRate/topRateRow";

export const TopRateList = ({
  posts,
}: {
  posts: TPostWithRating[] | null;
}): ReactNode => {
  if (!posts || posts.length === 0) return null;

  const { noRating, ...rest } = formatRows(posts);
  const ratedList = Object.keys(rest)
    .sort((a, b) => Number(b) - Number(a))
    .map((rate) => <TopRateRow key={rate} posts={rest[rate]} />);

  if (noRating.length > 0) {
    ratedList.push(<TopRateRow key={"noRating"} posts={noRating} />);
  }

  return ratedList;
};

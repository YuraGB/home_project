import { TDBPost } from "@/db/drizzle/schemas/postsSchema";
import { ReactNode } from "react";
const RatingComponent = dynamic(() =>
  import(
    "@/app/[locale]/[categoryId]/_modules/components/PostsList/RatingComponent"
  ).then((mod) => mod.RatingComponent),
);
import { TRatingSchema } from "@/db/drizzle/schemas/ratingSchema";
import dynamic from "next/dynamic";

export const PostItem = ({
  post,
  rate,
}: {
  post: TDBPost;
  rate: TRatingSchema | null;
}): ReactNode => {
  return (
    <div>
      {post.name}
      {rate ? <RatingComponent rate={rate} /> : null}
    </div>
  );
};
